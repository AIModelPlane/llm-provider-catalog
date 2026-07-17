import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { ZAI_MODELS } from '../models';

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
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchZaiQuotas(
      apiKey,
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'Zhipu / BigModel (China)',
    );
  },
};

export default entry;
