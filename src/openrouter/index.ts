import {
  CatalogProvider,
  ProviderUsageResult,
  FetchEmbeddingModelsResult,
} from '../types';
import { openrouterReasoningMapping } from './reasoning';
import { OPENROUTER_MODELS, OPENROUTER_EMBEDDING_MODELS } from './models';
import { fetchOpenAiCompatModelIds } from '../shared/fetchModelIds';

const entry: CatalogProvider = {
  id: 'openrouter',
  label: 'OpenRouter',
  provider: 'openrouter',
  protocols: ['openai'],
  baseURLs: {
    openai: 'https://openrouter.ai/api/v1',
  },
  models: OPENROUTER_MODELS,
  embeddingModels: OPENROUTER_EMBEDDING_MODELS,
  reasoning: {
    openai: {
      kind: 'custom',
      param: 'reasoning',
      fn: openrouterReasoningMapping,
    },
  },
  async fetchUsage(apiKey: string): Promise<ProviderUsageResult> {
    const res = await fetch('https://openrouter.ai/api/v1/credits', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      return { ok: false, provider: 'OpenRouter', error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      data: { total_credits: number; total_usage: number };
    };
    const { total_credits: total, total_usage: used } = json.data;
    return {
      ok: true,
      provider: 'OpenRouter',
      balance: { total, used, remaining: total - used, currency: 'USD' },
    };
  },
  fetchModels(apiKey?: string) {
    return fetchOpenAiCompatModelIds(
      entry.baseURLs.openai!,
      'OpenRouter',
      apiKey,
    );
  },
  async fetchEmbeddingModels(): Promise<FetchEmbeddingModelsResult> {
    const res = await fetch(
      'https://openrouter.ai/api/v1/models?output_modalities=embeddings',
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) {
      return { ok: false, provider: 'OpenRouter', error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      data?: Array<{ id: string; name: string; context_length: number }>;
    };
    if (!Array.isArray(json.data)) {
      return {
        ok: false,
        provider: 'OpenRouter',
        error: 'Invalid models response',
      };
    }
    return {
      ok: true,
      provider: 'OpenRouter',
      models: json.data.map((m) => ({
        id: m.id,
        label: m.name,
        capability: { contextWindowTokens: m.context_length },
      })),
    };
  },
};

export default entry;
