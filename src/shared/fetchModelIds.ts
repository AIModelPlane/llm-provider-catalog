import { FetchModelsResult } from '../types';

/** Shared `fetchModels` implementation for any OpenAI-protocol-compatible
 *  provider whose model-list endpoint is `{baseURL}/models` returning
 *  `{ data: [{ id }] }` — covers OpenAI, DeepSeek, MiniMax, Z.ai/Zhipu,
 *  OpenRouter, and Novita AI. */
export async function fetchOpenAiCompatModelIds(
  baseURL: string,
  provider: string,
  apiKey?: string,
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
  const json = (await res.json()) as { data?: Array<{ id: string }> };
  if (!Array.isArray(json.data)) {
    return { ok: false, provider, error: 'Invalid models response' };
  }
  return { ok: true, provider, modelIds: json.data.map((m) => m.id) };
}
