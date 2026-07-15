import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { GLM_CODING_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'glm-coding-global',
  label: 'GLM Coding Plan (Global)',
  brandId: 'zai',
  codingPlan: true,
  provider: 'z-ai',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.z.ai/api/coding/paas/v4',
    anthropic: 'https://api.z.ai/api/anthropic/v1',
  },
  models: GLM_CODING_MODELS,
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchZaiQuotas(
      apiKey,
      'https://api.z.ai/api/monitor/usage/quota/limit',
      'GLM Coding Plan (Global)',
    );
  },
};

export default entry;
