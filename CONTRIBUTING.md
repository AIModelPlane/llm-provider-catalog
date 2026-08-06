# Contributing

## Setup

```bash
git clone https://github.com/AIModelPlane/llm-provider-catalog.git
cd llm-provider-catalog
npm install
```

## Adding a new provider

Each provider lives in its own directory under `src/<provider-id>/index.ts` and exports a single default `CatalogProvider` (see [README.md](./README.md#whats-in-a-catalogprovider) for the full shape). Providers that share a brand and a response shape (e.g. the Z.ai/GLM family, the Minimax family) are grouped under `src/<brand>/<provider-id>/index.ts`, with a `src/<brand>/shared.ts` for their shared fetch/parse logic.

1. Add `src/<your-provider-id>/index.ts` (or `src/<brand>/<your-provider-id>/index.ts` if it belongs to an existing brand group).
   - See `src/openai/index.ts` for a minimal example (no `fetchUsage`).
   - See `src/zai/zhipu/index.ts` for one with `fetchUsage`.
   - `id` must be unique across the catalog and should be lowercase, hyphenated (e.g. `my-provider` or `my-provider-china` for a regional variant). It does not need to match the directory name.
   - `provider` is a routing identifier a consuming gateway matches against its own provider-transform implementations — it does not need to be unique per catalog entry (e.g. `minimax-global` and `minimax-coding-global` both use `provider: 'minimax'`).
2. Register it in `src/index.ts`: import the entry and add it to the `PROVIDER_CATALOG` array.
3. If your provider's `fetchUsage` shares a quota/balance response shape with an existing one, add a parser to that brand's `shared.ts` instead of duplicating fetch/parse logic (see `src/zai/shared.ts`'s `fetchZaiQuotas` or `src/minimax/shared.ts`'s `parseMinimaxQuotas` for the pattern). Provider-specific quirks (e.g. a custom error message) belong in the provider's own `index.ts`, not in `shared.ts`.
4. If your provider is OpenAI-protocol-compatible with a `{baseURLs.openai}/models` endpoint returning `{ data: [{ id }] }`, implement `fetchModels` with the cross-brand `fetchOpenAiCompatModelIds` helper in `src/shared/fetchModelIds.ts` rather than duplicating the fetch/parse logic (see `src/openai/index.ts` or `src/openrouter/index.ts`). Only write a bespoke `fetchModels` (see `src/anthropic/index.ts`, `src/google/index.ts`) if the provider's models endpoint has different auth or response shape.
5. Add or update a test in `src/index.test.ts` if you implemented `fetchUsage`, `fetchModels`, or `fetchEmbeddingModels` — mock `fetch`, no real credentials needed (see the existing Z.ai/OpenAI/Anthropic/Google cases for the pattern).
6. Run `npm run build && npm test` before opening a PR.

## OpenRouter / Novita AI model lists

Unlike every other provider, `src/openrouter/models.ts` and `src/novita-ai/models.ts` are **generated files** — regenerate them with `npm run fetch-openrouter-models` / `npm run fetch-novita-models` (see `agent/scripts/`) rather than hand-editing. Both providers publish a live, unauthenticated bulk model-list API, which is far more reliable than hand-curating 100+ entries from docs. See `agent/update-models.md` for the full policy.

## OpenAI ↔ Anthropic transform (`src/transform/`)

This module is exempt from the "just metadata" convention described above — it's a deliberate, self-contained second capability (see [README.md](./README.md#optional-openai--anthropic-protocol-transform)), not something every contribution needs to touch. If you change it, keep it consistent with its confirmed v1 fidelity scope (text, tool calling, thinking via each provider's existing `reasoning` mapping, image/document/audio input, usage/token accounting) rather than incrementally bolting on more surface (server-side tools, citations, `cache_control`, video) — that's a deliberate future decision, not something to creep into piecemeal. Add tests alongside the function you change (`request.test.ts`/`response.test.ts`/`stream.test.ts`/`sse.test.ts`), mocked/no-network, following the existing per-branch style.

## Testing

Two separate test surfaces:

- **`npm test`** — fast, no network calls, no credentials required. Runs against mocked `fetch`. This is what CI runs on every PR.
- **`npm run test:live`** — hits real provider APIs end-to-end (chat completion, streaming, model availability, `fetchUsage`) using real API keys. Never run in CI. To use it locally:
  1. `cp tests/live/.usage-creds.json.example tests/live/.usage-creds.json`
  2. Fill in whichever provider keys you have (see the file for the expected key names — catalog id with hyphens replaced by underscores, e.g. `zhipu-coding` → `zhipu_coding`).
  3. `npm run test:live`

Cases for providers you didn't add a key for are skipped, not failed — you only need credentials for the provider(s) you're actually changing.

## Pull requests

- Keep unrelated providers/formatting out of the diff — one provider addition or fix per PR is easiest to review.
- Run `npm run format` (Prettier) and `npm run lint` (ESLint) before submitting — CI runs both on every PR.
- If you're changing an existing provider's `baseURLs` or auth convention, explain why in the PR description (a link to the provider's own API docs is ideal).
