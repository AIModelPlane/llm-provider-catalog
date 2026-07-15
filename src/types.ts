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

export interface CatalogProvider {
  id: string;
  label: string;
  brandId?: string;
  codingPlan?: boolean;
  provider: string;
  protocols: ApiProtocol[];
  baseURLs: Partial<Record<ApiProtocol, string>>;
  models: CatalogModel[];
  fetchUsage?(apiKey: string): Promise<ProviderUsageResult>;
}
