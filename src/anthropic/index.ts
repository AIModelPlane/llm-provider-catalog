import { CatalogProvider } from '../types';
import { ANTHROPIC_MODELS } from './models';

const entry: CatalogProvider = {
  id: 'anthropic',
  label: 'Anthropic',
  provider: 'anthropic',
  protocols: ['anthropic'],
  baseURLs: {},
  models: ANTHROPIC_MODELS,
  // Anthropic does not expose a public programmatic balance endpoint
};

export default entry;
