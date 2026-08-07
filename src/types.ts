export type ModelTokenizer = 'openai' | 'anthropic' | 'approx';

/** 'file' covers document input (PDFs and similar) — matches the term
 *  vendors/aggregators (e.g. OpenRouter) actually use for this modality. */
export type Modality = 'text' | 'image' | 'audio' | 'video' | 'file';

/** What a model accepts as input and can produce as output, beyond plain
 *  text. Omit this field entirely for text-only models rather than writing
 *  `{ input: ['text'], output: ['text'] }` on every entry. */
export interface ModalitySupport {
  input: Modality[];
  output: Modality[];
}

/** Well-known, cross-vendor feature flags for multimodal/agentic requests.
 *  Deliberately not a free-form string bag — only fields we can actually
 *  verify per-vendor belong here. Omit fields the vendor doesn't document,
 *  rather than guessing false. */
export interface ModelFeatures {
  /** Function/tool calling support. */
  toolUse?: boolean;
  /** JSON mode / strict schema output. */
  structuredOutputs?: boolean;
  /** Whether tool calls and image/file input can be combined in one
   *  request — some vendors restrict vision to tool-free requests. Only
   *  set when explicitly confirmed; omit rather than assume. */
  toolUseWithVision?: boolean;
  /** Sandboxed code execution as a built-in tool. */
  codeExecution?: boolean;
  /** Native web search as a built-in tool. */
  webSearch?: boolean;
}

export interface ModelCapability {
  /** Required when model capability is declared. */
  contextWindowTokens: number;
  maxOutputTokens?: number;
  tokenizer?: ModelTokenizer;
  supportsCountTokens?: boolean;
  inputTokenSafetyMargin?: number;
  /** Modalities this model accepts/produces, when it's not plain text-in/
   *  text-out. Omit entirely for text-only models. */
  modalities?: ModalitySupport;
  /** Fine-grained feature support, when the vendor documents it. Omit
   *  entirely rather than guess. */
  features?: ModelFeatures;
}

export type ApiProtocol = 'openai' | 'anthropic';

export interface CatalogModel {
  id: string;
  label: string;
  capability: ModelCapability;
}

/** Capability shape for an embedding model — deliberately separate from
 *  ModelCapability: embeddings have no output-token budget, and instead
 *  expose a fixed vector size (dimensions) where the provider publishes one. */
export interface EmbeddingModelCapability {
  contextWindowTokens: number;
  /** Output vector size, when the provider publishes a fixed one. Omit
   *  rather than guess. */
  dimensions?: number;
  tokenizer?: ModelTokenizer;
}

export interface CatalogEmbeddingModel {
  id: string;
  label: string;
  capability: EmbeddingModelCapability;
}

export interface QuotaWindow {
  total: number;
  used: number;
  remaining: number;
  usagePercent: number;
  resetAt?: string;
}

export interface ProviderUsageResult {
  ok: boolean;
  provider: string;
  balance?: {
    remaining: number;
    total?: number;
    used?: number;
    currency: string;
  };
  quotas?: {
    '5h'?: QuotaWindow;
    '1w'?: QuotaWindow;
  };
  error?: string;
}

/** Result of a live query against a provider's own model-list endpoint.
 *  Deliberately just ids, not full CatalogModel objects — most providers'
 *  `/models` endpoints don't expose capability data (context window, max
 *  output tokens, etc.), so this is an availability/entitlement check
 *  ("which model ids does this key currently have access to"), not a
 *  capability source. Cross-reference against `CatalogProvider.models` for
 *  known capability info. */
export interface FetchModelsResult {
  ok: boolean;
  provider: string;
  modelIds?: string[];
  error?: string;
}

/** Result of a live query against a provider's embedding-model-list endpoint.
 *  Unlike FetchModelsResult, this returns full CatalogEmbeddingModel objects
 *  since (for the providers that expose one) the embeddings listing endpoint
 *  actually publishes usable capability data. */
export interface FetchEmbeddingModelsResult {
  ok: boolean;
  provider: string;
  models?: CatalogEmbeddingModel[];
  error?: string;
}

/** Canonical, protocol-agnostic shape of a gateway's unified "reasoning"
 *  chatComplete request field, e.g. `{ effort: 'high' }` or
 *  `{ enabled: false }`. Mirrors OpenAI's reasoning_effort /
 *  Anthropic's thinking budget concepts under one shape. */
export interface ReasoningInput {
  enabled?: boolean;
  effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | string;
  max_tokens?: number;
  exclude?: boolean;
  [key: string]: unknown;
}

/** Declarative strategy for encoding a ReasoningInput into a chatComplete
 *  request body. Each variant describes the field(s) to merge into the
 *  outgoing body; `kind: 'custom'` is an escape hatch for providers whose
 *  encoding can't be expressed declaratively (e.g. per-model rewrites). */
export type ReasoningMapping =
  | { kind: 'none' }
  // Scalar effort string (e.g. OpenAI's reasoning_effort). Omitted when
  // reasoning is absent, disabled, or effort is 'none'.
  | { kind: 'effort-scalar'; param: string }
  // Anthropic-style thinking object: { type: 'enabled'|'disabled',
  // budget_tokens?, token_budget? }. Omitted entirely when reasoning is
  // absent. `includeBudget` controls whether max_tokens is forwarded as
  // budget_tokens/token_budget (not every provider's thinking object
  // accepts a budget). `enabledValue` overrides the `type` string used for
  // an enabled/default request (e.g. MiniMax's `'adaptive'` in place of
  // `'enabled'`); defaults to `'enabled'`. `'disabled'` is always used as-is.
  | {
      kind: 'thinking-object';
      param: string;
      includeBudget?: boolean;
      enabledValue?: string;
    }
  // Forward the normalized ReasoningInput object verbatim under `param`;
  // omitted when reasoning is absent or would be empty.
  | { kind: 'passthrough-object'; param: string }
  // Escape hatch for encodings that can't be expressed declaratively (e.g.
  // per-model rewrites). `fn`'s return value is written verbatim under `param`.
  | {
      kind: 'custom';
      param: string;
      fn: (
        input: ReasoningInput | undefined,
        ctx: { model?: string },
      ) => Record<string, unknown> | undefined;
    };

export interface CatalogProvider {
  id: string;
  label: string;
  brandId?: string;
  codingPlan?: boolean;
  provider: string;
  protocols: ApiProtocol[];
  baseURLs: Partial<Record<ApiProtocol, string>>;
  models: CatalogModel[];
  /** Optional embedding-model catalog, parallel to `models` (chat/completions
   *  models). Omit entirely for providers with no embeddings endpoint. */
  embeddingModels?: CatalogEmbeddingModel[];
  /** How to encode the gateway's unified `reasoning` field into a
   *  chatComplete request, keyed by protocol. An array means "apply all of
   *  these and merge the results" (e.g. a provider that expects both a
   *  scalar effort field AND a thinking object). Only relevant to
   *  chatComplete — protocol-native endpoints (e.g. Anthropic's /messages)
   *  accept their own native reasoning shape directly and don't consult
   *  this. Omit entirely for providers with no reasoning support. */
  reasoning?: Partial<
    Record<ApiProtocol, ReasoningMapping | ReasoningMapping[]>
  >;
  fetchUsage?(apiKey: string): Promise<ProviderUsageResult>;
  /** Live query against the provider's own model-list endpoint. Optional
   *  apiKey since some providers (OpenRouter, Novita AI) expose this
   *  unauthenticated. */
  fetchModels?(apiKey?: string): Promise<FetchModelsResult>;
  /** Live query against the provider's own embedding-model-list endpoint.
   *  Omit entirely for providers with no such endpoint. */
  fetchEmbeddingModels?(apiKey?: string): Promise<FetchEmbeddingModelsResult>;
}
