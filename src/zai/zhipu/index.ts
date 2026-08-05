import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { ZAI_MODELS } from '../models';
import { fetchOpenAiCompatModelIds } from '../../shared/fetchModelIds';

const entry: CatalogProvider = {
  id: 'zhipu',
  label: 'Zhipu / BigModel (China)',
  brandId: 'zhipu',
  provider: 'z-ai',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://open.bigmodel.cn/api/paas/v4',
    anthropic: 'https://open.bigmodel.cn/api/anthropic',
  },
  models: ZAI_MODELS,
  reasoning: {
    openai: { kind: 'thinking-object', param: 'thinking' },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchZaiQuotas(
      apiKey,
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'Zhipu / BigModel (China)',
    );
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'Zhipu / BigModel (China)',
      apiKey,
    );
  },
};

export default entry;
