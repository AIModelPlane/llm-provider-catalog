/**
 * Live integration tests for all catalog providers. Not run by default `npm
 * test` / CI (see jest.config.js's testPathIgnorePatterns) — invoke
 * explicitly via `npm run test:live`.
 *
 * Structure per (provider × protocol):
 *   Factor tests  — one representative model, test each dimension independently:
 *     stream:off, stream:on, thinking:on (if supported), thinking:off (if default-on)
 *   Model availability — every catalog model, just verify HTTP 200 + valid shape
 *   Usage/balance API — if the catalog provider implements fetchUsage()
 *
 * Run:
 *   npm run test:live -- --verbose
 *
 * Credentials — copy .usage-creds.json.example to tests/live/.usage-creds.json
 * (gitignored) and fill in real API keys:
 *   {
 *     "zai": "...",
 *     "zai_coding": "...",
 *     "minimax_coding_global": "...",
 *     "deepseek": "...",
 *     ...
 *   }
 *
 * Credential key = catalog ID with hyphens → underscores. Auth headers are the
 * two schemes every catalog entry's protocol implies: `Authorization: Bearer
 * <key>` for openai-protocol endpoints, `x-api-key: <key>` for
 * anthropic-protocol endpoints — this library only asserts against the
 * provider's raw HTTP API, not any particular gateway's request-transform
 * layer.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { PROVIDER_CATALOG, type CatalogProvider } from '../../src/index';

// ---------------------------------------------------------------------------
// Credentials
// ---------------------------------------------------------------------------
const credsPath = join(__dirname, '.usage-creds.json');
const creds: Record<string, string> = existsSync(credsPath)
  ? JSON.parse(readFileSync(credsPath, 'utf8'))
  : {};

function credKey(catalogId: string): string {
  return catalogId.replace(/-/g, '_');
}
function apiKey(cat: CatalogProvider): string | undefined {
  const k = creds[credKey(cat.id)];
  return k || undefined;
}

// ---------------------------------------------------------------------------
// Thinking support config — test-only metadata, not in production code.
// Keyed by catalogId.
// ---------------------------------------------------------------------------
interface ThinkingConfig {
  // Extra body params to ENABLE thinking
  anthropic?: Record<string, unknown>;
  openai?: Record<string, unknown>;
  // True if thinking is on by default (need explicit disable to test "off")
  defaultOn?: { anthropic?: boolean; openai?: boolean };
  // Params to DISABLE thinking when defaultOn is true
  disableAnthropic?: Record<string, unknown>;
  disableOpenAI?: Record<string, unknown>;
}
// M3 honors `thinking: { type: 'disabled' }`; M2.x models accept the param
// without erroring but keep thinking on regardless (see src/minimax/models.ts).
// Factor tests only exercise each catalog's first model, which for every
// MiniMax entry is MiniMax-M3 (src/minimax/models.ts), so this reliably
// proves the openai-protocol thinking mapping.
const MINIMAX_THINKING: ThinkingConfig = {
  openai: { thinking: { type: 'adaptive' } },
  defaultOn: { openai: true },
  disableOpenAI: { thinking: { type: 'disabled' } },
};

const THINKING: Record<string, ThinkingConfig> = {
  deepseek: {
    anthropic: { thinking: { type: 'enabled', budget_tokens: 512 } },
    defaultOn: { anthropic: true },
    disableAnthropic: { thinking: { type: 'disabled' } },
  },
  'minimax-global': MINIMAX_THINKING,
  'minimax-china': MINIMAX_THINKING,
  'minimax-coding-global': MINIMAX_THINKING,
  'minimax-coding-china': MINIMAX_THINKING,
};

// ---------------------------------------------------------------------------
// Request helpers
// ---------------------------------------------------------------------------
const TEST_PROMPT = 'Reply with exactly one word: pong';
const BASE_MAX_TOKENS = 256;

function buildAnthropicBody(
  model: string,
  extra: Record<string, unknown> = {}
): string {
  return JSON.stringify({
    model,
    max_tokens: BASE_MAX_TOKENS,
    messages: [{ role: 'user', content: TEST_PROMPT }],
    ...extra,
  });
}

function buildOpenAIBody(
  model: string,
  extra: Record<string, unknown> = {}
): string {
  return JSON.stringify({
    model,
    max_tokens: BASE_MAX_TOKENS,
    messages: [{ role: 'user', content: TEST_PROMPT }],
    ...extra,
  });
}

// Every catalog entry's protocol implies its own auth scheme — openai-style
// endpoints take a bearer token, anthropic-style endpoints take x-api-key.
function authHeaders(
  key: string,
  protocol: 'openai' | 'anthropic'
): Record<string, string> {
  return protocol === 'anthropic'
    ? { 'x-api-key': key, 'anthropic-version': '2023-06-01' }
    : { Authorization: `Bearer ${key}` };
}

async function post(
  url: string,
  headers: Record<string, string>,
  body: string
): Promise<{ status: number; body: unknown; text: string }> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
  });
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  return { status: res.status, body: parsed, text };
}

function isValidAnthropicResponse(body: unknown): boolean {
  const b = body as any;
  if (!Array.isArray(b?.content) || b.content.length === 0) return false;
  // Reject wrapped errors like {"code":500,"msg":"404 NOT_FOUND"}
  if (b.code != null && b.content == null) return false;
  return true;
}

function isValidOpenAIResponse(body: unknown): boolean {
  const b = body as any;
  return Array.isArray(b?.choices) && b.choices.length > 0;
}

function hasTextContent(body: unknown): boolean {
  const content: any[] = (body as any)?.content ?? [];
  // OpenAI format
  const choices: any[] = (body as any)?.choices ?? [];
  return (
    content.some((c) => c.type === 'text') ||
    choices.some((c) => c.message?.content || c.delta?.content)
  );
}

// Anthropic responses put reasoning in a dedicated `content[].type ===
// 'thinking'` block. OpenAI-protocol responses vary by provider: some use a
// `reasoning_content` field, others (e.g. MiniMax's non-split default) embed
// a `<think>...</think>` span directly inside `message.content`.
function hasThinkingContent(
  body: unknown,
  protocol: 'openai' | 'anthropic'
): boolean {
  if (protocol === 'anthropic') {
    const content: any[] = (body as any)?.content ?? [];
    return content.some((c) => c.type === 'thinking');
  }
  const choices: any[] = (body as any)?.choices ?? [];
  return choices.some((c) => {
    const message = c.message ?? {};
    if (message.reasoning_content) return true;
    return typeof message.content === 'string'
      ? message.content.includes('<think>')
      : false;
  });
}

// Coding-plan accounts have narrow rolling quotas (5h/1w windows) that
// repeated live-test runs can exhaust, and providers report transient
// overload (HTTP 429 or 529) the same way. These are account/upstream state,
// not catalog defects — log and soft-skip instead of failing the suite.
function exhaustionReason(status: number, body: unknown): string | undefined {
  if (status !== 429 && status !== 529) return undefined;
  const err = (body as any)?.error;
  const code = err?.code;
  const message: string = err?.message ?? '';
  if (
    code === '1113' ||
    code === '1305' ||
    /insufficient balance|no resource package|temporarily overloaded/i.test(
      message
    )
  ) {
    return message || `HTTP ${status} (code ${code})`;
  }
  return undefined;
}

// Minimal SSE parser: returns true if the response body looks like a valid stream
async function validateStream(res: Response): Promise<boolean> {
  const reader = res.body?.getReader();
  if (!reader) return false;
  const decoder = new TextDecoder();
  let gotData = false;
  let totalBytes = 0;
  while (totalBytes < 32_000) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    totalBytes += chunk.length;
    if (chunk.includes('data:')) {
      gotData = true;
      break;
    }
  }
  reader.cancel().catch(() => {});
  return gotData;
}

// ---------------------------------------------------------------------------
// Build test suite entries from catalog
// ---------------------------------------------------------------------------
interface ProtocolCase {
  cat: CatalogProvider;
  protocol: 'openai' | 'anthropic';
  endpoint: string;
  key: string;
  firstModelId: string;
  buildBody: (model: string, extra?: Record<string, unknown>) => string;
  isValidResponse: (body: unknown) => boolean;
}

const protocolCases: ProtocolCase[] = [];
for (const cat of PROVIDER_CATALOG) {
  const key = apiKey(cat);
  if (!key) continue;
  const firstModelId = cat.models[0]?.id;
  if (!firstModelId) continue;

  for (const protocol of ['openai', 'anthropic'] as const) {
    const baseURL = cat.baseURLs[protocol];
    if (!baseURL || !cat.protocols.includes(protocol)) continue;
    const endpoint =
      protocol === 'anthropic'
        ? `${baseURL}/messages`
        : `${baseURL}/chat/completions`;
    protocolCases.push({
      cat,
      protocol,
      endpoint,
      key,
      firstModelId,
      buildBody:
        protocol === 'anthropic' ? buildAnthropicBody : buildOpenAIBody,
      isValidResponse:
        protocol === 'anthropic'
          ? isValidAnthropicResponse
          : isValidOpenAIResponse,
    });
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
// Some models (e.g. reasoning-heavy "flash" variants) can legitimately take
// longer than 30s to respond to a trivial prompt.
const TIMEOUT = 45_000;

describe('catalog provider live', () => {
  if (protocolCases.length === 0) {
    it.skip('no credentials configured — see .usage-creds.json.example', () => {});
  }

  // Factor tests: one describe per (catalog × protocol)
  for (const pc of protocolCases) {
    const {
      cat,
      protocol,
      endpoint,
      key,
      firstModelId,
      buildBody,
      isValidResponse,
    } = pc;
    const headers = authHeaders(key, protocol);
    const thinking = THINKING[cat.id];

    describe(`${cat.label} (${cat.id}) — ${protocol} — factor tests`, () => {
      it(
        `stream:off — baseline call (model: ${firstModelId})`,
        async () => {
          const { status, body } = await post(
            endpoint,
            headers,
            buildBody(firstModelId)
          );
          console.log(
            `[${cat.id}/${protocol}/stream:off] HTTP ${status}`,
            JSON.stringify(body).slice(0, 200)
          );
          const reason = exhaustionReason(status, body);
          if (reason) {
            console.warn(
              `[${cat.id}/${protocol}/stream:off] soft-skip — ${reason}`
            );
            return;
          }
          expect(status).toBe(200);
          expect(isValidResponse(body)).toBe(true);
          expect(hasTextContent(body)).toBe(true);
        },
        TIMEOUT
      );

      it(
        `stream:on — streaming response (model: ${firstModelId})`,
        async () => {
          const body = buildBody(firstModelId, { stream: true });
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body,
          });
          console.log(
            `[${cat.id}/${protocol}/stream:on] HTTP ${res.status} content-type: ${res.headers.get('content-type')}`
          );
          if (res.status !== 200) {
            const text = await res.text();
            let parsed: unknown;
            try {
              parsed = JSON.parse(text);
            } catch {
              parsed = text;
            }
            const reason = exhaustionReason(res.status, parsed);
            if (reason) {
              console.warn(
                `[${cat.id}/${protocol}/stream:on] soft-skip — ${reason}`
              );
              return;
            }
          }
          expect(res.status).toBe(200);
          const gotData = await validateStream(res);
          expect(gotData).toBe(true);
        },
        TIMEOUT
      );

      if (thinking?.[protocol]) {
        it(
          `thinking:on — response includes thinking block (model: ${firstModelId})`,
          async () => {
            const extra = thinking[protocol];
            const { status, body } = await post(
              endpoint,
              headers,
              buildBody(firstModelId, extra)
            );
            console.log(
              `[${cat.id}/${protocol}/thinking:on] HTTP ${status}`,
              JSON.stringify(body).slice(0, 300)
            );
            const reason = exhaustionReason(status, body);
            if (reason) {
              console.warn(
                `[${cat.id}/${protocol}/thinking:on] soft-skip — ${reason}`
              );
              return;
            }
            expect(status).toBe(200);
            expect(isValidResponse(body)).toBe(true);
            expect(hasThinkingContent(body, protocol)).toBe(true);
          },
          TIMEOUT
        );
      }

      if (thinking?.defaultOn?.[protocol]) {
        const disableExtra =
          protocol === 'anthropic'
            ? thinking.disableAnthropic
            : thinking.disableOpenAI;
        if (disableExtra) {
          it(
            `thinking:off — no thinking block (model: ${firstModelId})`,
            async () => {
              const { status, body } = await post(
                endpoint,
                headers,
                buildBody(firstModelId, disableExtra)
              );
              console.log(
                `[${cat.id}/${protocol}/thinking:off] HTTP ${status}`,
                JSON.stringify(body).slice(0, 300)
              );
              const reason = exhaustionReason(status, body);
              if (reason) {
                console.warn(
                  `[${cat.id}/${protocol}/thinking:off] soft-skip — ${reason}`
                );
                return;
              }
              expect(status).toBe(200);
              expect(isValidResponse(body)).toBe(true);
              expect(hasThinkingContent(body, protocol)).toBe(false);
            },
            TIMEOUT
          );
        }
      }
    });

    // Model availability: all models
    if (cat.models.length > 0) {
      describe(`${cat.label} (${cat.id}) — ${protocol} — model availability`, () => {
        it.each(cat.models)(
          `$id is accepted by ${protocol} endpoint`,
          async (model) => {
            const { status, body } = await post(
              endpoint,
              headers,
              buildBody(model.id)
            );
            console.log(
              `[${cat.id}/${protocol}/${model.id}] HTTP ${status}`,
              JSON.stringify(body).slice(0, 150)
            );
            const reason = exhaustionReason(status, body);
            if (reason) {
              console.warn(
                `[${cat.id}/${protocol}/${model.id}] soft-skip — ${reason}`
              );
              return;
            }
            expect(status).toBe(200);
            expect(isValidResponse(body)).toBe(true);
          },
          TIMEOUT
        );
      });
    }
  }

  // Usage/balance API: one describe per catalog provider that implements fetchUsage.
  // zai is excluded — it intentionally throws (no public balance API for
  // pay-as-you-go accounts), which is covered by its own unit test instead.
  for (const cat of PROVIDER_CATALOG) {
    const key = apiKey(cat);
    if (!key || typeof cat.fetchUsage !== 'function' || cat.id === 'zai')
      continue;

    describe(`${cat.label} (${cat.id}) — usage/balance API`, () => {
      it(
        'fetchUsage returns valid data',
        async () => {
          const result = await cat.fetchUsage!(key);
          console.log(`[${cat.id}/usage]`, JSON.stringify(result));
          expect(result).toBeDefined();
          expect(typeof result.ok).toBe('boolean');
          if (result.ok) {
            expect(result.provider).toBeTruthy();
          }
        },
        TIMEOUT
      );
    });
  }

  // Model-list API: one describe per catalog provider that implements
  // fetchModels. OpenRouter/Novita AI don't require a key for /models — every
  // other provider does, so skip those without a credential.
  for (const cat of PROVIDER_CATALOG) {
    if (typeof cat.fetchModels !== 'function') continue;
    const key = apiKey(cat);
    if (!key && cat.id !== 'openrouter' && cat.id !== 'novita-ai') continue;

    describe(`${cat.label} (${cat.id}) — fetchModels`, () => {
      it(
        'returns model ids',
        async () => {
          const result = await cat.fetchModels!(key);
          console.log(
            `[${cat.id}/models]`,
            JSON.stringify(result).slice(0, 300)
          );
          expect(result).toBeDefined();
          expect(typeof result.ok).toBe('boolean');
          if (result.ok) {
            expect(Array.isArray(result.modelIds)).toBe(true);
            expect(result.modelIds!.length).toBeGreaterThan(0);
          }
        },
        TIMEOUT
      );
    });
  }

  // Embedding model-list API: only providers implementing fetchEmbeddingModels
  // (currently just OpenRouter).
  for (const cat of PROVIDER_CATALOG) {
    if (typeof cat.fetchEmbeddingModels !== 'function') continue;
    const key = apiKey(cat);

    describe(`${cat.label} (${cat.id}) — fetchEmbeddingModels`, () => {
      it(
        'returns embedding model objects',
        async () => {
          const result = await cat.fetchEmbeddingModels!(key);
          console.log(
            `[${cat.id}/embeddingModels]`,
            JSON.stringify(result).slice(0, 300)
          );
          expect(result).toBeDefined();
          expect(typeof result.ok).toBe('boolean');
          if (result.ok) {
            expect(Array.isArray(result.models)).toBe(true);
            expect(result.models!.length).toBeGreaterThan(0);
          }
        },
        TIMEOUT
      );
    });
  }
});
