import { CatalogProvider, FetchModelsResult } from '../types';
import { ANTHROPIC_MODELS } from './models';

const entry: CatalogProvider = {
  id: 'anthropic',
  label: 'Anthropic',
  provider: 'anthropic',
  protocols: ['anthropic'],
  baseURLs: { anthropic: 'https://api.anthropic.com/v1' },
  models: ANTHROPIC_MODELS,
  reasoning: {
    anthropic: {
      kind: 'thinking-object',
      param: 'thinking',
      includeBudget: true,
    },
  },
  // Anthropic does not expose a public programmatic balance endpoint
  async fetchModels(apiKey?: string): Promise<FetchModelsResult> {
    if (!apiKey) {
      return { ok: false, provider: 'Anthropic', error: 'apiKey required' };
    }
    const res = await fetch(`${entry.baseURLs.anthropic}/models`, {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      return { ok: false, provider: 'Anthropic', error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as { data?: Array<{ id: string }> };
    if (!Array.isArray(json.data)) {
      return {
        ok: false,
        provider: 'Anthropic',
        error: 'Invalid models response',
      };
    }
    return {
      ok: true,
      provider: 'Anthropic',
      modelIds: json.data.map((m) => m.id),
    };
  },
};

export default entry;
