#!/usr/bin/env node
// Fetches OpenRouter's live model list and regenerates src/openrouter/models.ts.
// Usage: node agent/scripts/fetch-openrouter-models.mjs  (or: npm run fetch-openrouter-models)
//
// Do not hand-edit src/openrouter/models.ts — re-run this script instead.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const CHAT_URL = 'https://openrouter.ai/api/v1/models';
const EMBEDDING_URL = 'https://openrouter.ai/api/v1/models?output_modalities=embeddings';

async function fetchModelList(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
  }
  const json = await res.json();
  if (!Array.isArray(json.data)) {
    throw new Error(`Unexpected response shape from ${url}: no data[] array`);
  }
  return json.data;
}

// Omit modalities entirely for plain text-in/text-out models, per the
// "no speculative/redundant fields" convention.
function toModalities(m) {
  const input = m.architecture?.input_modalities;
  const output = m.architecture?.output_modalities;
  if (!Array.isArray(input) || !Array.isArray(output)) return undefined;
  if (
    input.length === 1 &&
    input[0] === 'text' &&
    output.length === 1 &&
    output[0] === 'text'
  ) {
    return undefined;
  }
  return { input, output };
}

// Mapping verified against OpenRouter's actual supported_parameters
// vocabulary (fetched live) — 'tools'/'structured_outputs'/'web_search_options'
// are the only entries with a confirmed, unambiguous meaning here.
function toFeatures(m) {
  const params = m.supported_parameters ?? [];
  const features = {};
  if (params.includes('tools')) features.toolUse = true;
  if (params.includes('structured_outputs')) features.structuredOutputs = true;
  if (params.includes('web_search_options')) features.webSearch = true;
  return Object.keys(features).length > 0 ? features : undefined;
}

function toChatModel(m) {
  const capability = { contextWindowTokens: m.context_length };
  if (m.top_provider?.max_completion_tokens != null) {
    capability.maxOutputTokens = m.top_provider.max_completion_tokens;
  }
  const modalities = toModalities(m);
  if (modalities) capability.modalities = modalities;
  const features = toFeatures(m);
  if (features) capability.features = features;
  return { id: m.id, label: m.name, capability };
}

function toEmbeddingModel(m) {
  return {
    id: m.id,
    label: m.name,
    capability: { contextWindowTokens: m.context_length },
  };
}

function byId(a, b) {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function renderCapability(capability) {
  const fields = Object.entries(capability)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(', ');
  return `{ ${fields} }`;
}

function renderArray(varName, typeName, models) {
  const entries = models
    .map(
      (m) =>
        `  { id: ${JSON.stringify(m.id)}, label: ${JSON.stringify(m.label)}, capability: ${renderCapability(m.capability)} },`,
    )
    .join('\n');
  return `export const ${varName}: ${typeName}[] = [\n${entries}\n];\n`;
}

async function main() {
  const [chatRaw, embeddingRaw] = await Promise.all([
    fetchModelList(CHAT_URL),
    fetchModelList(EMBEDDING_URL),
  ]);

  const chatModels = chatRaw
    .filter((m) => m.architecture?.output_modalities?.includes('text'))
    .map(toChatModel)
    .sort(byId);
  const embeddingModels = embeddingRaw.map(toEmbeddingModel).sort(byId);

  if (chatModels.length === 0) {
    throw new Error('Fetched zero chat models from OpenRouter — refusing to overwrite models.ts');
  }
  if (embeddingModels.length === 0) {
    throw new Error(
      'Fetched zero embedding models from OpenRouter — refusing to overwrite models.ts',
    );
  }

  const header = `// GENERATED FILE — do not hand-edit.
// Regenerate with: npm run fetch-openrouter-models
// (runs agent/scripts/fetch-openrouter-models.mjs against ${CHAT_URL} and
// ${EMBEDDING_URL})
import { CatalogModel, CatalogEmbeddingModel } from '../types';

`;

  const content =
    header +
    renderArray('OPENROUTER_MODELS', 'CatalogModel', chatModels) +
    '\n' +
    renderArray('OPENROUTER_EMBEDDING_MODELS', 'CatalogEmbeddingModel', embeddingModels);

  const outPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../src/openrouter/models.ts',
  );
  writeFileSync(outPath, content);

  console.error(
    `Wrote ${chatModels.length} chat models and ${embeddingModels.length} embedding models to ${outPath}`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
