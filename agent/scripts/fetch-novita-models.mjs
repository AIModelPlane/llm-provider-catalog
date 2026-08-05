#!/usr/bin/env node
// Fetches Novita AI's live model list and regenerates src/novita-ai/models.ts.
// Usage: node agent/scripts/fetch-novita-models.mjs  (or: npm run fetch-novita-models)
//
// Do not hand-edit src/novita-ai/models.ts — re-run this script instead.
//
// Novita has no public embeddings-listing endpoint (its /models endpoint only
// ever returns model_type: "chat" entries, even though embedding models like
// bge-m3 exist) — this script does not attempt to populate embeddingModels.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const MODELS_URL = 'https://api.novita.ai/v3/openai/v1/models';

// Omit modalities entirely for plain text-in/text-out models, per the
// "no speculative/redundant fields" convention.
function toModalities(m) {
  const input = m.input_modalities;
  const output = m.output_modalities;
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

// Mapping verified against Novita's actual `features` vocabulary (fetched
// live) — 'function-calling'/'structured-outputs' are the only entries with
// a confirmed, unambiguous meaning here. ('serverless'/'reasoning' are not
// modeled: 'serverless' is an infra detail, 'reasoning' is already covered
// by this catalog's separate reasoning-mapping schema.)
function toFeatures(m) {
  const list = m.features ?? [];
  const features = {};
  if (list.includes('function-calling')) features.toolUse = true;
  if (list.includes('structured-outputs')) features.structuredOutputs = true;
  return Object.keys(features).length > 0 ? features : undefined;
}

function toChatModel(m) {
  const capability = { contextWindowTokens: m.context_size };
  if (m.max_output_tokens != null) {
    capability.maxOutputTokens = m.max_output_tokens;
  }
  const modalities = toModalities(m);
  if (modalities) capability.modalities = modalities;
  const features = toFeatures(m);
  if (features) capability.features = features;
  return { id: m.id, label: m.display_name ?? m.title ?? m.id, capability };
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
  const res = await fetch(MODELS_URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${MODELS_URL}: HTTP ${res.status}`);
  }
  const json = await res.json();
  if (!Array.isArray(json.data)) {
    throw new Error(`Unexpected response shape from ${MODELS_URL}: no data[] array`);
  }

  // status === 1 is an inferred heuristic (not documented by Novita) for
  // "currently active/servable" — see agent/model-sources.json notes.
  const active = json.data.filter((m) => m.status === 1);
  const skipped = json.data.filter((m) => m.status !== 1);
  if (skipped.length > 0) {
    console.error(
      `Skipped ${skipped.length} inactive Novita models (status != 1): ${skipped.map((m) => m.id).join(', ')}`,
    );
  }

  // A handful of entries have context_size: 0 (or missing) — not usable
  // capability data, so drop them rather than emit a bogus contextWindowTokens.
  const usable = active.filter((m) => m.context_size > 0);
  const noContextSize = active.filter((m) => !(m.context_size > 0));
  if (noContextSize.length > 0) {
    console.error(
      `Skipped ${noContextSize.length} Novita models with no usable context_size: ${noContextSize.map((m) => m.id).join(', ')}`,
    );
  }

  const chatModels = usable.map(toChatModel).sort(byId);

  if (chatModels.length === 0) {
    throw new Error('Fetched zero active chat models from Novita — refusing to overwrite models.ts');
  }

  const header = `// GENERATED FILE — do not hand-edit.
// Regenerate with: npm run fetch-novita-models
// (runs agent/scripts/fetch-novita-models.mjs against ${MODELS_URL})
import { CatalogModel } from '../types';

`;

  const content = header + renderArray('NOVITA_MODELS', 'CatalogModel', chatModels);

  const outPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../src/novita-ai/models.ts',
  );
  writeFileSync(outPath, content);

  console.error(`Wrote ${chatModels.length} chat models to ${outPath}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
