export interface ModelCapability {
  /** Required when model capability is declared. */
  contextWindowTokens: number;
  maxOutputTokens?: number;
  tokenizer?: 'openai' | 'anthropic' | 'approx';
  supportsCountTokens?: boolean;
  inputTokenSafetyMargin?: number;
}

export type ApiProtocol = 'openai' | 'anthropic';

export interface CatalogModel {
  id: string;
  label: string;
  capability: ModelCapability;
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
  // accepts a budget).
  | { kind: 'thinking-object'; param: string; includeBudget?: boolean }
  // Forward the normalized ReasoningInput object verbatim under `param`;
  // omitted when reasoning is absent or would be empty.
  | { kind: 'passthrough-object'; param: string }
  | {
      kind: 'custom';
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
}
