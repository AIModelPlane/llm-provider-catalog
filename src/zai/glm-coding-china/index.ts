import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { GLM_CODING_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'glm-coding-china',
  label: 'GLM Coding Plan (China)',
  brandId: 'zai',
  codingPlan: true,
  provider: 'z-ai',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://open.bigmodel.cn/api/coding/paas/v4',
    anthropic: 'https://open.bigmodel.cn/api/anthropic',
  },
  models: GLM_CODING_MODELS,
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchZaiQuotas(
      apiKey,
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'GLM Coding Plan (China)',
    );
  },
};

export default entry;
