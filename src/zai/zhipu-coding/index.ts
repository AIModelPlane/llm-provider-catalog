import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { GLM_CODING_MODELS } from '../models';
import { fetchOpenAiCompatModelIds } from '../../shared/fetchModelIds';

const entry: CatalogProvider = {
  id: 'zhipu-coding',
  label: 'Zhipu Coding Plan (China)',
  brandId: 'zhipu',
  codingPlan: true,
  provider: 'z-ai',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://open.bigmodel.cn/api/coding/paas/v4',
    anthropic: 'https://open.bigmodel.cn/api/anthropic',
  },
  models: GLM_CODING_MODELS,
  reasoning: {
    openai: { kind: 'thinking-object', param: 'thinking' },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchZaiQuotas(
      apiKey,
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'Zhipu Coding Plan (China)',
    );
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'Zhipu Coding Plan (China)',
      apiKey,
    );
  },
};

export default entry;
