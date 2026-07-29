import { CatalogProvider, ProviderUsageResult } from '../../types';
import { parseMinimaxQuotas } from '../shared';
import { MINIMAX_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'minimax-coding-global',
  label: 'Minimax Coding Plan (Global)',
  brandId: 'minimax',
  codingPlan: true,
  provider: 'minimax',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.minimax.io/v1',
    anthropic: 'https://api.minimax.io/anthropic/v1',
  },
  models: MINIMAX_MODELS,
  reasoning: {
    openai: { kind: 'passthrough-object', param: 'reasoning' },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    const res = await fetch('https://api.minimax.io/v1/token_plan/remains', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      return {
        ok: false,
        provider: 'Minimax Coding Plan (Global)',
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as Record<string, unknown>;
    const baseResp = json.base_resp as
      { status_code?: number; status_msg?: string } | undefined;
    if (baseResp && baseResp.status_code && baseResp.status_code !== 0) {
      return {
        ok: false,
        provider: 'Minimax Coding Plan (Global)',
        error: baseResp.status_msg ?? `Error code ${baseResp.status_code}`,
      };
    }
    return {
      ok: true,
      provider: 'Minimax Coding Plan (Global)',
      quotas: parseMinimaxQuotas(json),
    };
  },
};

export default entry;
