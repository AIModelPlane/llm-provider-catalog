import { DiscoveredModel, FetchModelsResult } from '../types';
import { positiveInteger, toDiscoveredModel } from './discoveredModel';

export type ModelListRow = { id: string } & Record<string, unknown>;

/** Turns one `/models` row into a DiscoveredModel. Providers whose rows
 *  publish capability data in their own vocabulary pass their own mapper
 *  (see openrouter/novita-ai); everyone else gets mapGenericModelRow. */
export type ModelRowMapper = (row: ModelListRow) => DiscoveredModel;

/** Reads the few field names OpenAI-compatible servers commonly add beyond
 *  `id` (e.g. vLLM's `max_model_len`) — only when present, never assumed.
 *  OpenAI itself publishes none of them, so its models come back id-only. */
export const mapGenericModelRow: ModelRowMapper = (row) =>
  toDiscoveredModel(row.id, row.display_name ?? row.name, {
    contextWindowTokens:
      positiveInteger(row.context_length) ??
      positiveInteger(row.context_window) ??
      positiveInteger(row.max_model_len),
    maxOutputTokens:
      positiveInteger(row.max_output_tokens) ??
      positiveInteger(row.max_completion_tokens),
  });

/** Shared `fetchModels` implementation for any OpenAI-protocol-compatible
 *  provider whose model-list endpoint is `{baseURL}/models` returning
 *  `{ data: [{ id, ... }] }` — covers OpenAI, DeepSeek, MiniMax, Z.ai/Zhipu,
 *  Kimi, OpenRouter, and Novita AI. */
export async function fetchOpenAiCompatModelIds(
  baseURL: string,
  provider: string,
  apiKey?: string,
  mapRow: ModelRowMapper = mapGenericModelRow,
): Promise<FetchModelsResult> {
  const res = await fetch(`${baseURL}/models`, {
    headers: {
      Accept: 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
  });
  if (!res.ok) {
    return { ok: false, provider, error: `HTTP ${res.status}` };
  }
  const json = (await res.json()) as { data?: ModelListRow[] };
  if (!Array.isArray(json.data)) {
    return { ok: false, provider, error: 'Invalid models response' };
  }
  const models = json.data.map(mapRow);
  return { ok: true, provider, modelIds: models.map((m) => m.id), models };
}
