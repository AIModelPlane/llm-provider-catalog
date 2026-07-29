import { CatalogProvider } from '../types';
import { ANTHROPIC_MODELS } from './models';

const entry: CatalogProvider = {
  id: 'anthropic',
  label: 'Anthropic',
  provider: 'anthropic',
  protocols: ['anthropic'],
  baseURLs: {},
  models: ANTHROPIC_MODELS,
  reasoning: {
    anthropic: {
      kind: 'thinking-object',
      param: 'thinking',
      includeBudget: true,
    },
  },
  // Anthropic does not expose a public programmatic balance endpoint
};

export default entry;
