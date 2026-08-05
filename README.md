# llm-provider-catalog

[GitHub](https://github.com/AIModelPlane/llm-provider-catalog)

A community-maintained registry of LLM provider metadata — base URLs, supported protocols (OpenAI-style / Anthropic-style), model lists with context/output-token capabilities, and (where available) a usage/quota lookup — for building AI gateways, routers, or any tool that needs to know "what providers and models exist and how do I talk to them."

Originally extracted from [ModelPlane.dev](https://modelplane.dev)'s AI gateway so the catalog can grow independently: adding a new provider or fixing a stale model list shouldn't require touching gateway internals, and anyone is welcome to contribute.

## Install

```bash
npm install llm-provider-catalog
```

## Usage

```ts
import { listCatalogProviders, getCatalogProvider } from 'llm-provider-catalog';

const providers = listCatalogProviders();

const zai = getCatalogProvider('zai');
console.log(zai?.baseURLs.openai); // https://api.z.ai/api/paas/v4

const zaiCoding = getCatalogProvider('zai-coding');
if (zaiCoding?.fetchUsage) {
  const usage = await zaiCoding.fetchUsage(apiKey);
  console.log(usage.quotas);
}
```

## What's in a `CatalogProvider`

```ts
export interface CatalogProvider {
  id: string; // unique catalog id, e.g. "openai" or "zhipu"
  label: string; // human-readable display name
  brandId?: string; // groups multiple catalog entries under one brand (e.g. minimax coding plan + standard plan)
  codingPlan?: boolean; // flags a coding-plan-specific entry (separate quota/billing from the standard plan)
  provider: string; // underlying protocol-transform identifier a gateway would route on
  protocols: ApiProtocol[]; // 'openai' | 'anthropic' — which request/response shapes this provider accepts
  baseURLs: Partial<Record<ApiProtocol, string>>; // base URL per supported protocol
  models: CatalogModel[]; // model id, display label, and capability (context window, max output tokens, tokenizer, modalities, features)
  embeddingModels?: CatalogEmbeddingModel[]; // same shape, for providers with an embeddings endpoint
  fetchUsage?(apiKey: string): Promise<ProviderUsageResult>; // optional balance/quota lookup
  fetchModels?(apiKey?: string): Promise<FetchModelsResult>; // optional live model-id lookup
  fetchEmbeddingModels?(apiKey?: string): Promise<FetchEmbeddingModelsResult>; // optional live embedding-model lookup
}
```

`fetchModels`/`fetchEmbeddingModels` are opt-in, per-provider live lookups against the provider's own model-list API — `fetchModels` returns just the model ids currently available to a key (most providers' `/models` endpoints don't expose capability data), while `fetchEmbeddingModels` returns full `CatalogEmbeddingModel` objects where the provider's endpoint publishes capability info (currently only OpenRouter).

`ModelCapability` also carries optional multimodal info: `modalities: { input: Modality[]; output: Modality[] }` (`Modality` is `'text' | 'image' | 'audio' | 'video' | 'file'`), omitted entirely for plain text-in/text-out models, and `features: { toolUse?, structuredOutputs?, toolUseWithVision?, codeExecution?, webSearch? }` for well-known cross-vendor capability flags. Both are populated from live data for OpenRouter/Novita AI (their `/models` APIs expose this directly); for other providers they're filled in only when the vendor's own docs explicitly confirm it — an unset field means "unverified," not "unsupported."

Full field-level type definitions live in [`src/types.ts`](./src/types.ts).

## Live testing

`npm run test:live` (see [CONTRIBUTING.md](./CONTRIBUTING.md)) exercises each catalog provider against its real API using credentials in `tests/live/.usage-creds.json` (gitignored, copy from `.usage-creds.json.example`). Cases for a provider are skipped automatically when its credential is missing.

As of this writing, these providers have **not** been exercised against a live account (no credential available) and should be treated as unverified until someone runs them with real keys:

- `anthropic`
- `google` (Gemini)
- `minimax-global` (Minimax standard plan)
- `minimax-china` (Minimax standard plan, China)
- `zhipu` (Zhipu / BigModel, China)
- `zhipu-coding` (Zhipu Coding Plan, China)
- `minimax-coding-china` (Minimax Coding Plan, China)

## Contributing

Adding a new provider, fixing a stale model list, or fixing a bug — see [CONTRIBUTING.md](./CONTRIBUTING.md). No API keys or live network calls are required to add a provider; only implementing/changing `fetchUsage` benefits from live credentials, and even that ships with a mocked unit test path.

## License

[MIT](./LICENSE)
