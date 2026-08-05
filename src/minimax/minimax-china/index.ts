import { CatalogProvider } from '../../types';
import { MINIMAX_MODELS } from '../models';
import { fetchOpenAiCompatModelIds } from '../../shared/fetchModelIds';

const entry: CatalogProvider = {
  id: 'minimax-china',
  label: 'Minimax (China)',
  brandId: 'minimax',
  provider: 'minimax',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.minimax.com/v1',
    anthropic: 'https://api.minimax.com/anthropic/v1',
  },
  models: MINIMAX_MODELS,
  reasoning: {
    openai: { kind: 'passthrough-object', param: 'reasoning' },
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'Minimax (China)',
      apiKey,
    );
  },
};

export default entry;
