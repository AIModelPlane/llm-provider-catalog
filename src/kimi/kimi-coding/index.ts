import { CatalogProvider, ProviderUsageResult } from '../../types';
import { KIMI_CODING_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'kimi-coding',
  label: 'Kimi Code',
  brandId: 'kimi',
  codingPlan: true,
  provider: 'moonshot',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.kimi.com/coding/v1',
    anthropic: 'https://api.kimi.com/coding',
  },
  models: KIMI_CODING_MODELS,
  // Reasoning control for the coding-plan model aliases (k3, kimi-for-coding,
  // etc.) is not documented — unlike the pay-as-you-go models, Moonshot
  // doesn't publish a request-parameter reference for the Kimi Code endpoint.
  reasoning: {
    openai: { kind: 'none' },
  },
  async fetchUsage(): Promise<ProviderUsageResult> {
    // Kimi Code's quota is only documented as visible via the Kimi Code
    // Console UI, the CLI's `/usage` command, or the Kimi web app — Moonshot
    // does not publish a documented API-key-authenticated endpoint to query
    // it (see https://www.kimi.com/code/docs/en/kimi-code/membership.html).
    throw new Error(
      'kimi-coding does not support usage query — no publicly documented quota API for Kimi Code subscribers',
    );
  },
};

export default entry;
