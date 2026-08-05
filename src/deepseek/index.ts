import { CatalogProvider, CatalogModel, ProviderUsageResult } from '../types';
import { fetchOpenAiCompatModelIds } from '../shared/fetchModelIds';

const DEEPSEEK_MODELS: CatalogModel[] = [
  {
    id: 'deepseek-v4-pro',
    label: 'DeepSeek V4 Pro',
    capability: { contextWindowTokens: 1_000_000, maxOutputTokens: 384_000 },
  },
  {
    id: 'deepseek-v4-flash',
    label: 'DeepSeek V4 Flash',
    capability: { contextWindowTokens: 1_000_000, maxOutputTokens: 384_000 },
  },
];

const entry: CatalogProvider = {
  id: 'deepseek',
  label: 'DeepSeek',
  provider: 'deepseek',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.deepseek.com',
    anthropic: 'https://api.deepseek.com/anthropic',
  },
  models: DEEPSEEK_MODELS,
  reasoning: {
    openai: [
      { kind: 'effort-scalar', param: 'reasoning_effort' },
      { kind: 'thinking-object', param: 'thinking' },
    ],
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    const res = await fetch('https://api.deepseek.com/user/balance', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      return { ok: false, provider: entry.label, error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      is_available: boolean;
      balance_infos: Array<{
        currency: string;
        total_balance: string;
        granted_balance: string;
        topped_up_balance: string;
      }>;
    };
    const info = json.balance_infos?.[0];
    if (!info) {
      return {
        ok: false,
        provider: entry.label,
        error: 'Empty balance response',
      };
    }
    const total = parseFloat(info.total_balance);
    return {
      ok: true,
      provider: entry.label,
      balance: {
        remaining: total,
        currency: info.currency,
      },
    };
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'DeepSeek',
      apiKey,
    );
  },
};

export default entry;
