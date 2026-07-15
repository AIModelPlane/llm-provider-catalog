import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchZaiQuotas } from '../shared';
import { ZAI_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'zai-china',
  label: 'Z.AI / Zhipu (China)',
  brandId: 'zai',
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
      'Z.AI / Zhipu (China)',
    );
  },
};

export default entry;
