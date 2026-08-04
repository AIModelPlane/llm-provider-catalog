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
  // Best-guess mapping matching the OpenAI-protocol convention for Google's
  // OpenAI-compatibility endpoint. Not yet verified against a live call —
  // confirm the compat layer actually honors `reasoning_effort` (vs. e.g.
  // requiring a `google.thinking_config` extra_body field) before relying
  // on this in production.
  reasoning: {
    openai: { kind: 'effort-scalar', param: 'reasoning_effort' },
  },
};

export default entry;
