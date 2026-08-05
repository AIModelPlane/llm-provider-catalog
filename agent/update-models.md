You are updating the "known models" lists in this repository (llm-provider-catalog).

## Goal

For each provider below, use web search to find that provider's current official
model catalog (docs / model list / changelog page), then update the corresponding
`CatalogModel[]` array in this repo so it matches reality as of today.

| Provider brand | File(s) to update | Export(s) |
| --- | --- | --- |
| OpenAI | `src/openai/models.ts` | `OPENAI_MODELS` |
| Anthropic | `src/anthropic/models.ts` | `ANTHROPIC_MODELS` |
| Google Gemini | `src/google/models.ts` | `GOOGLE_MODELS` |
| Zhipu (Z.AI / BigModel, GLM models) | `src/zai/models.ts` | `ZAI_MODELS`, `GLM_CODING_MODELS` |
| MiniMax | `src/minimax/models.ts` | `MINIMAX_MODELS` |
| DeepSeek | `src/deepseek/index.ts` | inline `DEEPSEEK_MODELS` const |

OpenRouter and Novita AI are aggregator gateways with model lists too large and
volatile to hand-curate from vendor docs — instead of web-searching, regenerate
them from their live model-list APIs:

- Run `npm run fetch-openrouter-models` to regenerate `src/openrouter/models.ts`
  (`OPENROUTER_MODELS` + `OPENROUTER_EMBEDDING_MODELS`) from
  `https://openrouter.ai/api/v1/models` and
  `https://openrouter.ai/api/v1/models?output_modalities=embeddings`.
- Run `npm run fetch-novita-models` to regenerate `src/novita-ai/models.ts`
  (`NOVITA_MODELS`) from `https://api.novita.ai/v3/openai/v1/models`.

Do **not** hand-edit `src/openrouter/models.ts` or `src/novita-ai/models.ts` —
they are generated files; re-run the scripts instead. Do not hand-edit
`src/openrouter/index.ts` / `src/novita-ai/index.ts` either, beyond what the
scripts already wire up.

Novita has no public embeddings-listing endpoint (its `/models` endpoint only
ever returns `model_type: "chat"` entries, even though embedding models like
bge-m3 exist) — leave `embeddingModels` unset for `novita-ai`. Don't invent an
endpoint or hand-curate one.

## Source memory

`agent/model-sources.json` records, per provider brand, the source URL(s) used in
the *previous* run and when they were last checked. Before searching:

- Read `agent/model-sources.json` if it exists. Use its `sources` for each
  provider as your first stop — but verify, don't take them on faith. A vendor
  docs URL can move, get restructured, or stop being the canonical model list.
- If a listed source is stale/wrong, replace it with the correct one rather than
  leaving it.

After you finish updating the model lists, update `agent/model-sources.json`:

- Set each provider's `sources` to the URL(s) you actually relied on this run.
- Set `lastChecked` to today's date (`YYYY-MM-DD`).
- Keep `notes` short (one line) — only note something non-obvious you had to
  cross-reference (e.g. a second page needed to confirm a default/availability).
- Do this for every provider in scope, even ones where you made no model-list
  changes — "verified, no changes" still means the source was checked today.

## Per-model fields

Each entry is a `CatalogModel` (see `src/types.ts`):

```ts
{
  id: string;           // exact API model identifier, not a marketing name
  label: string;         // human-readable display name
  capability: {
    contextWindowTokens: number;  // required
    maxOutputTokens?: number;
    tokenizer?: 'openai' | 'anthropic' | 'approx';
    supportsCountTokens?: boolean;
    inputTokenSafetyMargin?: number;
  };
}
```

## What to do for each provider

1. Search for the provider's current official model list/docs page (prefer the
   vendor's own docs over third-party aggregators).
2. Add models that are now generally available (or in a documented public preview)
   but missing from the file.
3. Remove models the vendor has fully retired/decommissioned. If a model is
   deprecated-but-still-serving, keep it but you may leave it as the lowest-priority
   entry — don't guess; only remove if the vendor docs say it's no longer available.
4. Fix `contextWindowTokens` / `maxOutputTokens` values that no longer match the
   vendor's published limits.
5. Keep `id` values byte-for-byte matching what the provider's API expects (this is
   what a consuming gateway sends on the wire) — never invent or guess an id.

## Constraints

- Match the existing formatting/ordering conventions already in each file (e.g. the
  `// Shared by ...` comment header in `src/zai/models.ts` — keep it, update the list
  of consumers only if you actually change which providers share the array).
- Only edit the model-list arrays. Do not change `baseURLs`, `protocols`, `provider`,
  `fetchUsage`, or any other `CatalogProvider` field, and do not touch files for
  providers you have no update for.
- No speculative fields, no reformatting of untouched files, no unrelated cleanup.
- After editing, run `npm run format && npm run build && npm test` from the repo
  root and fix anything your edits broke.
- Do not `git commit` or `git push`. Leave the changes in the working tree for the
  human to review and test.

## Output

When done, summarize per provider: what changed (added/removed/updated) and the
source URL you used to verify it. If a provider's model list is already accurate,
say so explicitly rather than making no-op edits.
