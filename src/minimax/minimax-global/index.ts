import { CatalogProvider } from '../../types';
import { MINIMAX_MODELS } from '../models';

const entry: CatalogProvider = {
  id: 'minimax-global',
  label: 'Minimax (Global)',
  brandId: 'minimax',
  provider: 'minimax',
  protocols: ['openai', 'anthropic'],
  baseURLs: {
    openai: 'https://api.minimax.io/v1',
    anthropic: 'https://api.minimax.io/anthropic/v1',
  },
  models: MINIMAX_MODELS,
  reasoning: {
    openai: { kind: 'passthrough-object', param: 'reasoning' },
  },
};

export default entry;
