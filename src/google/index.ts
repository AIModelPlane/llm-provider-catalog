import { CatalogProvider, FetchModelsResult } from '../types';
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
  // Uses Google's native models.list endpoint (not the OpenAI-compat layer,
  // which doesn't expose a models list) — auth is an apiKey query param, and
  // ids come back as "models/gemini-x" so the prefix is stripped to match
  // GOOGLE_MODELS' id format.
  async fetchModels(apiKey?: string): Promise<FetchModelsResult> {
    if (!apiKey) {
      return {
        ok: false,
        provider: 'Google (Gemini)',
        error: 'apiKey required',
      };
    }
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) {
      return {
        ok: false,
        provider: 'Google (Gemini)',
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as { models?: Array<{ name: string }> };
    if (!Array.isArray(json.models)) {
      return {
        ok: false,
        provider: 'Google (Gemini)',
        error: 'Invalid models response',
      };
    }
    return {
      ok: true,
      provider: 'Google (Gemini)',
      modelIds: json.models.map((m) => m.name.replace(/^models\//, '')),
    };
  },
};

export default entry;
