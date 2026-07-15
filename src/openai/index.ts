import { CatalogProvider, ProviderUsageResult } from '../types';
import { OPENAI_MODELS } from './models';

const entry: CatalogProvider = {
  id: 'openai',
  label: 'OpenAI',
  provider: 'openai',
  protocols: ['openai'],
  baseURLs: {},
  models: OPENAI_MODELS,
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    // Unofficial endpoint — works for prepaid accounts; may return 403 for org-billed accounts
    const res = await fetch(
      'https://api.openai.com/dashboard/billing/credit_grants',
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    if (!res.ok) {
      return {
        ok: false,
        provider: 'OpenAI',
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as {
      total_granted?: number;
      total_used?: number;
      total_available?: number;
    };
    const remaining =
      json.total_available ??
      (json.total_granted ?? 0) - (json.total_used ?? 0);
    return {
      ok: true,
      provider: 'OpenAI',
      balance: {
        total: json.total_granted,
        used: json.total_used,
        remaining,
        currency: 'USD',
      },
    };
  },
};

export default entry;
