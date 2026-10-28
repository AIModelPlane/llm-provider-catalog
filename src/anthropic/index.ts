import { CatalogProvider, FetchModelsResult } from '../types';
import { ANTHROPIC_MODELS } from './models';
import {
  asRecord,
  confirmedFeatures,
  modalitiesFrom,
  positiveInteger,
  toDiscoveredModel,
} from '../shared/discoveredModel';

function supported(capability: unknown): boolean {
  return asRecord(capability).supported === true;
}

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

  // limit=1000 is the endpoint's max; the default of 20 would silently
  // truncate the list. Each row publishes max_input_tokens/max_tokens and a
  // `capabilities` object (image/PDF input, structured outputs, server
  // tools) — server_tools.code_execution is the built-in tool that
  // ModelFeatures.codeExecution means, not the top-level code_execution
  // (programmatic tool calling).
  async fetchModels(apiKey?: string): Promise<FetchModelsResult> {
    if (!apiKey) {
      return { ok: false, provider: 'Anthropic', error: 'apiKey required' };
    }
    const res = await fetch(`${entry.baseURLs.anthropic}/models?limit=1000`, {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      return { ok: false, provider: 'Anthropic', error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      data?: Array<{
        id: string;
        display_name?: string;
        max_input_tokens?: number | null;
        max_tokens?: number | null;
        capabilities?: Record<string, unknown> | null;
      }>;
    };
    if (!Array.isArray(json.data)) {
      return {
        ok: false,
        provider: 'Anthropic',
        error: 'Invalid models response',
      };
    }
    const models = json.data.map((m) => {
      const caps = asRecord(m.capabilities);
      const serverTools = asRecord(caps.server_tools);
      return toDiscoveredModel(m.id, m.display_name, {
        contextWindowTokens: positiveInteger(m.max_input_tokens),
        maxOutputTokens: positiveInteger(m.max_tokens),
        modalities: m.capabilities
          ? modalitiesFrom(
              [
                'text',
                ...(supported(caps.image_input) ? ['image'] : []),
                ...(supported(caps.pdf_input) ? ['file'] : []),
              ],
              ['text'],
            )
          : undefined,
        features: confirmedFeatures({
          structuredOutputs: supported(caps.structured_outputs),
          webSearch: supported(serverTools.web_search),
          codeExecution: supported(serverTools.code_execution),
        }),
      });
    });
    return {
      ok: true,
      provider: 'Anthropic',
      modelIds: models.map((m) => m.id),
      models,
    };
  },
};

export default entry;
