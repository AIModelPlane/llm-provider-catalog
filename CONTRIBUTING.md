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
   - See `src/zai/glm-china/index.ts` for one with `fetchUsage`.
   - `id` must be unique across the catalog and should be lowercase, hyphenated (e.g. `my-provider` or `my-provider-china` for a regional variant). It does not need to match the directory name.
   - `provider` is a routing identifier a consuming gateway matches against its own provider-transform implementations — it does not need to be unique per catalog entry (e.g. `minimax-global` and `minimax-coding-global` both use `provider: 'minimax'`).
2. Register it in `src/index.ts`: import the entry and add it to the `PROVIDER_CATALOG` array.
3. If your provider's `fetchUsage` shares a quota/balance response shape with an existing one, add a parser to that brand's `shared.ts` instead of duplicating fetch/parse logic (see `src/zai/shared.ts`'s `fetchZaiQuotas` or `src/minimax/shared.ts`'s `parseMinimaxQuotas` for the pattern). Provider-specific quirks (e.g. a custom error message) belong in the provider's own `index.ts`, not in `shared.ts`.
4. Add or update a test in `src/index.test.ts` if you implemented `fetchUsage` — mock `fetch`, no real credentials needed (see the existing Z.ai cases for the pattern).
5. Run `npm run build && npm test` before opening a PR.

## Testing

Two separate test surfaces:

- **`npm test`** — fast, no network calls, no credentials required. Runs against mocked `fetch`. This is what CI runs on every PR.
- **`npm run test:live`** — hits real provider APIs end-to-end (chat completion, streaming, model availability, `fetchUsage`) using real API keys. Never run in CI. To use it locally:
  1. `cp tests/live/.usage-creds.json.example tests/live/.usage-creds.json`
  2. Fill in whichever provider keys you have (see the file for the expected key names — catalog id with hyphens replaced by underscores, e.g. `zai-china` → `zai_china`).
  3. `npm run test:live`

Cases for providers you didn't add a key for are skipped, not failed — you only need credentials for the provider(s) you're actually changing.

## Pull requests

- Keep unrelated providers/formatting out of the diff — one provider addition or fix per PR is easiest to review.
- Run `npm run format` (Prettier) and `npm run lint` (ESLint) before submitting — CI runs both on every PR.
- If you're changing an existing provider's `baseURLs` or auth convention, explain why in the PR description (a link to the provider's own API docs is ideal).
