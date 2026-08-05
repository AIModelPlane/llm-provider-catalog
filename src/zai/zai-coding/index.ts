import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { GLM_CODING_MODELS } from '../models';
import { fetchOpenAiCompatModelIds } from '../../shared/fetchModelIds';

const entry: CatalogProvider = {
  id: 'zai-coding',
  label: 'Z.AI Coding Plan',
  brandId: 'zhipu',
  codingPlan: true,
  provider: 'z-ai',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.z.ai/api/coding/paas/v4',
    anthropic: 'https://api.z.ai/api/anthropic/v1',
  },
  models: GLM_CODING_MODELS,
  reasoning: {
    openai: { kind: 'thinking-object', param: 'thinking' },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchZaiQuotas(
      apiKey,
      'https://api.z.ai/api/monitor/usage/quota/limit',
      'Z.AI Coding Plan',
    );
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'Z.AI Coding Plan',
      apiKey,
    );
  },
};

export default entry;
