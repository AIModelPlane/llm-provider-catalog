import { getCatalogProvider } from './index';

function mockFetchJson(body: unknown) {
  return jest
    .spyOn(globalThis, 'fetch')
    .mockResolvedValueOnce(new Response(JSON.stringify(body), { status: 200 }));
}

function fetchModels(catalogId: string, apiKey = 'test-key') {
  return getCatalogProvider(catalogId)!.fetchModels!(apiKey);
}

describe('fetchModels discovered capability', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns id-only models for an endpoint that publishes no capability', async () => {
    mockFetchJson({
      data: [
        { id: 'gpt-x', object: 'model', owned_by: 'openai' },
        { id: 'gpt-x-mini', object: 'model', owned_by: 'openai' },
      ],
    });

    const result = await fetchModels('openai');

    expect(result).toEqual({
      ok: true,
      provider: 'OpenAI',
      modelIds: ['gpt-x', 'gpt-x-mini'],
      models: [{ id: 'gpt-x' }, { id: 'gpt-x-mini' }],
    });
  });

  it('reads common OpenAI-compatible limit fields when an endpoint publishes them', async () => {
    mockFetchJson({
      data: [
        {
          id: 'kimi-x',
          display_name: 'Kimi X',
          context_length: 262144,
          max_output_tokens: 32768,
        },
      ],
    });

    const result = await fetchModels('kimi');

    expect(result.models).toEqual([
      {
        id: 'kimi-x',
        label: 'Kimi X',
        capability: { contextWindowTokens: 262144, maxOutputTokens: 32768 },
      },
    ]);
  });

  it('maps OpenRouter rows the same way the snapshot script does', async () => {
    mockFetchJson({
      data: [
        {
          id: 'vendor/vision-model',
          name: 'Vendor: Vision Model',
          context_length: 1048576,
          architecture: {
            input_modalities: ['text', 'image'],
            output_modalities: ['text'],
          },
          top_provider: {
            context_length: 1048576,
            max_completion_tokens: 131072,
          },
          supported_parameters: ['max_tokens', 'tools', 'structured_outputs'],
        },
        {
          id: 'vendor/text-model',
          name: 'Vendor: Text Model',
          context_length: 32768,
          architecture: {
            input_modalities: ['text'],
            output_modalities: ['text'],
          },
          top_provider: { max_completion_tokens: null },
          supported_parameters: ['max_tokens'],
        },
      ],
    });

    const result = await fetchModels('openrouter');

    expect(result.models).toEqual([
      {
        id: 'vendor/vision-model',
        label: 'Vendor: Vision Model',
        capability: {
          contextWindowTokens: 1048576,
          maxOutputTokens: 131072,
          modalities: { input: ['text', 'image'], output: ['text'] },
          features: { toolUse: true, structuredOutputs: true },
        },
      },
      {
        id: 'vendor/text-model',
        label: 'Vendor: Text Model',
        capability: { contextWindowTokens: 32768 },
      },
    ]);
  });

  it('maps Novita AI rows the same way the snapshot script does', async () => {
    mockFetchJson({
      data: [
        {
          id: 'deepseek/deepseek-x',
          title: 'deepseek/deepseek-x',
          display_name: 'DeepSeek X',
          context_size: 1048576,
          max_output_tokens: 393216,
          features: ['serverless', 'function-calling', 'reasoning'],
          input_modalities: ['text', 'image'],
          output_modalities: ['text'],
        },
      ],
    });

    const result = await fetchModels('novita-ai');

    expect(result.models).toEqual([
      {
        id: 'deepseek/deepseek-x',
        label: 'DeepSeek X',
        capability: {
          contextWindowTokens: 1048576,
          maxOutputTokens: 393216,
          modalities: { input: ['text', 'image'], output: ['text'] },
          features: { toolUse: true },
        },
      },
    ]);
  });

  it('requests every Google model and maps its token limits', async () => {
    const fetchSpy = mockFetchJson({
      models: [
        {
          name: 'models/gemini-x-flash',
          displayName: 'Gemini X Flash',
          inputTokenLimit: 1048576,
          outputTokenLimit: 65536,
        },
      ],
    });

    const result = await fetchModels('google');

    expect(String(fetchSpy.mock.calls[0][0])).toContain('pageSize=1000');
    expect(result.modelIds).toEqual(['gemini-x-flash']);
    expect(result.models).toEqual([
      {
        id: 'gemini-x-flash',
        label: 'Gemini X Flash',
        capability: { contextWindowTokens: 1048576, maxOutputTokens: 65536 },
      },
    ]);
  });

  it('requests every Anthropic model and maps its limits and capabilities', async () => {
    const fetchSpy = mockFetchJson({
      data: [
        {
          id: 'claude-x',
          display_name: 'Claude X',
          max_input_tokens: 1000000,
          max_tokens: 128000,
          capabilities: {
            image_input: { supported: true },
            pdf_input: { supported: true },
            structured_outputs: { supported: true },
            code_execution: { supported: true },
            server_tools: {
              supported: true,
              web_search: { supported: true },
              code_execution: { supported: false },
            },
          },
        },
        {
          id: 'claude-legacy',
          display_name: 'Claude Legacy',
          max_input_tokens: null,
          max_tokens: 0,
          capabilities: null,
        },
      ],
    });

    const result = await fetchModels('anthropic');

    expect(String(fetchSpy.mock.calls[0][0])).toContain('limit=1000');
    expect(result.models).toEqual([
      {
        id: 'claude-x',
        label: 'Claude X',
        capability: {
          contextWindowTokens: 1000000,
          maxOutputTokens: 128000,
          modalities: { input: ['text', 'image', 'file'], output: ['text'] },
          features: { structuredOutputs: true, webSearch: true },
        },
      },
      { id: 'claude-legacy', label: 'Claude Legacy' },
    ]);
  });
});
