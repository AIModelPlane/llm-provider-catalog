import { CatalogProvider } from '../../types';
import { MINIMAX_MODELS } from '../models';
import { fetchOpenAiCompatModelIds } from '../../shared/fetchModelIds';

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
  // MiniMax's OpenAI-compat endpoint takes `thinking: { type: 'adaptive' |
  // 'disabled' }`, not a `reasoning` passthrough. M2.x models accept
  // `type: 'disabled'` but don't actually honor it — see MINIMAX_MODELS.
  reasoning: {
    openai: {
      kind: 'thinking-object',
      param: 'thinking',
      enabledValue: 'adaptive',
    },
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'Minimax (Global)',
      apiKey,
    );
  },
};

export default entry;
