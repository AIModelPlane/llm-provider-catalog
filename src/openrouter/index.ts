import { CatalogProvider, ProviderUsageResult } from '../types';
import { openrouterReasoningMapping } from './reasoning';

const entry: CatalogProvider = {
  id: 'openrouter',
  label: 'OpenRouter',
  provider: 'openrouter',
  protocols: ['openai'],
  baseURLs: {
    openai: 'https://openrouter.ai/api/v1',
  },
  models: [],
  reasoning: {
    openai: {
      kind: 'custom',
      param: 'reasoning',
      fn: openrouterReasoningMapping,
    },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    const res = await fetch('https://openrouter.ai/api/v1/credits', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      return { ok: false, provider: 'OpenRouter', error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      data: { total_credits: number; total_usage: number };
    };
    const { total_credits: total, total_usage: used } = json.data;
    return {
      ok: true,
      provider: 'OpenRouter',
      balance: { total, used, remaining: total - used, currency: 'USD' },
    };
  },
};

export default entry;
