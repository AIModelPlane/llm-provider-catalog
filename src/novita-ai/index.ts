import { CatalogProvider, ProviderUsageResult } from '../types';

const entry: CatalogProvider = {
  id: 'novita-ai',
  label: 'Novita AI',
  provider: 'novita-ai',
  protocols: ['openai'],
  baseURLs: {
    // Must include /v1 — callers append /chat/completions directly to this
    // base URL, and the previous value 'https://api.novita.ai/v3/openai'
    // (missing /v1) resolved to the wrong endpoint.
    openai: 'https://api.novita.ai/v3/openai/v1',
  },
  models: [],
  reasoning: {
    openai: { kind: 'passthrough-object', param: 'reasoning' },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    const res = await fetch(
      'https://api.novita.ai/openapi/v1/billing/balance/detail',
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    if (!res.ok) {
      return { ok: false, provider: 'Novita AI', error: `HTTP ${res.status}` };
    }
    // All monetary values in 1/10000 USD units (10000 = $1.00)
    const json = (await res.json()) as {
      availableBalance?: string;
      cashBalance?: string;
      creditLimit?: string;
      pendingCharges?: string;
      outstandingInvoices?: string;
    };
    const remaining = Number(json.availableBalance ?? '0') / 10000;
    const cash = Number(json.cashBalance ?? '0') / 10000;
    return {
      ok: true,
      provider: 'Novita AI',
      balance: { remaining, total: cash, currency: 'USD' },
    };
  },
};

export default entry;
