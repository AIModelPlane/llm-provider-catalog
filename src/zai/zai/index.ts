import { CatalogProvider, ProviderUsageResult } from '../../types';
import { ZAI_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'zai',
  label: 'Z.AI (International)',
  brandId: 'zhipu',
  provider: 'z-ai',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.z.ai/api/paas/v4',
    anthropic: 'https://api.z.ai/api/anthropic/v1',
  },
  // glm-4-long is bigmodel.cn (zhipu) only — the international API
  // rejects it with "Unknown Model, please check the model code."
  models: ZAI_MODELS.filter((m) => m.id !== 'glm-4-long'),
  reasoning: {
    openai: { kind: 'thinking-object', param: 'thinking' },
  },
  async fetchUsage(): Promise<ProviderUsageResult> {
    // This is the pay-as-you-go entry — Z.ai does not expose a public API to
    // query pay-as-you-go wallet balance (the coding-plan quota endpoint
    // rejects these accounts with "当前用户不存在coding plan").
    throw new Error(
      'zai does not support usage query — no public balance API for pay-as-you-go accounts',
    );
  },
};

export default entry;
