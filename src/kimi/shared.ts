import { ProviderUsageResult, ReasoningInput } from '../types';

// ---------------------------------------------------------------------------
// Kimi / Moonshot AI shared logic
//
// Balance API: GET /v1/users/me/balance — same request/response shape on
// both the international (api.moonshot.ai) and China (api.moonshot.cn)
// platforms, but API keys and balances are NOT shared across the two hosts,
// and the currency differs: USD on api.moonshot.ai, CNY on api.moonshot.cn.
// Source: https://platform.kimi.ai/docs/api/balance, https://platform.kimi.com/docs/api/balance
//
// Reasoning: only kimi-k2.6 and kimi-k2.5 accept a `thinking: { type }`
// control object. kimi-k3 and kimi-k2.7-code always reason and error if a
// `thinking` field is present at all; moonshot-v1-* has no reasoning
// support. Moonshot also rejects a request that carries both `thinking` and
// `reasoning_effort` (400), so this intentionally does not also expose
// kimi-k3's `reasoning_effort` control — doing so declaratively alongside
// the `thinking` mapping above risks sending both on the same request.
// Source: https://platform.kimi.ai/docs/guide/use-kimi-k2-thinking-model,
// https://github.com/MoonshotAI/Kimi-K2/issues/129
// ---------------------------------------------------------------------------

interface MoonshotBalanceResponse {
  code: number;
  status: boolean;
  scode?: string;
  data?: {
    available_balance: number;
    voucher_balance: number;
    cash_balance: number;
  };
}

export async function fetchMoonshotBalance(
  apiKey: string,
  endpoint: string,
  provider: string,
  currency: 'USD' | 'CNY',
): Promise<ProviderUsageResult> {
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    return { ok: false, provider, error: `HTTP ${res.status}` };
  }

  const json = (await res.json()) as MoonshotBalanceResponse;
  if (!json.status || !json.data) {
    return {
      ok: false,
      provider,
      error: `Balance query failed${json.code !== undefined ? ` (${json.code})` : ''}`,
    };
  }

  return {
    ok: true,
    provider,
    balance: {
      remaining: json.data.available_balance,
      currency,
    },
  };
}

export function kimiThinkingReasoningFn(
  input: ReasoningInput | undefined,
  ctx: { model?: string },
): Record<string, unknown> | undefined {
  if (!input) return undefined;
  const model = ctx.model ?? '';
  if (!model.startsWith('kimi-k2.6') && !model.startsWith('kimi-k2.5')) {
    return undefined;
  }
  if (input.enabled === false) return { type: 'disabled' };
  if (input.enabled === true) return { type: 'enabled' };
  return undefined;
}
