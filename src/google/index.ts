import { CatalogProvider } from '../types';
import { GOOGLE_MODELS } from './models';

const entry: CatalogProvider = {
  id: 'google',
  label: 'Google (Gemini)',
  provider: 'google',
  protocols: ['openai'],
  baseURLs: {
    openai: 'https://generativelanguage.googleapis.com/v1beta/openai',
  },
  models: GOOGLE_MODELS,
};

export default entry;
