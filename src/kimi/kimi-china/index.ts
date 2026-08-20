import { CatalogProvider, ProviderUsageResult } from '../../types';
import { fetchMoonshotBalance, kimiThinkingReasoningFn } from '../shared';
import { KIMI_MODELS } from '../models';
import { fetchOpenAiCompatModelIds } from '../../shared/fetchModelIds';

const entry: CatalogProvider = {
  id: 'kimi-china',
  label: 'Kimi (China)',
  brandId: 'kimi',
  provider: 'moonshot',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.moonshot.cn/v1',
    anthropic: 'https://api.moonshot.cn/anthropic',
  },
  models: KIMI_MODELS,
  reasoning: {
    openai: { kind: 'custom', param: 'thinking', fn: kimiThinkingReasoningFn },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    return fetchMoonshotBalance(
      apiKey,
      'https://api.moonshot.cn/v1/users/me/balance',
      'Kimi (China)',
      'CNY',
    );
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'Kimi (China)',
      apiKey,
    );
  },
};

export default entry;
