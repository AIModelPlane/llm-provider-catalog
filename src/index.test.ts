import { getCatalogProvider } from './index';

const quotaResponse = {
  code: 200,
  msg: 'success',
  success: true,
  data: {
    limits: [
      {
        type: 'TOKENS_LIMIT',
        unit: 3,
        number: 5,
        usage: 1000,
        currentValue: 250,
        remaining: 750,
        percentage: 25,
        nextResetTime: 1781416000000,
      },
      {
        type: 'TOKENS_LIMIT',
        unit: 6,
        number: 1,
        usage: 10000,
        currentValue: 4000,
        remaining: 6000,
        percentage: 40,
        nextResetTime: 1781816000000,
      },
    ],
  },
};

describe('catalog fetchUsage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    [
      'zhipu',
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'Zhipu / BigModel (China)',
    ],
    [
      'zai-coding',
      'https://api.z.ai/api/monitor/usage/quota/limit',
      'Z.AI Coding Plan',
    ],
    [
      'zhipu-coding',
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'Zhipu Coding Plan (China)',
    ],
  ])(
    '%s queries Z.ai quota endpoint',
    async (catalogId, endpoint, provider) => {
      const fetchSpy = jest
        .spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(
          new Response(JSON.stringify(quotaResponse), { status: 200 }),
        );

      const result =
        await getCatalogProvider(catalogId)!.fetchUsage!('zai-key');

      expect(fetchSpy).toHaveBeenCalledWith(endpoint, {
        headers: {
          Authorization: 'zai-key',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual({
        ok: true,
        provider,
        quotas: {
          '5h': {
            total: 1000,
            used: 250,
            remaining: 750,
            usagePercent: 25,
            resetAt: '2026-06-14T05:46:40.000Z',
          },
          '1w': {
            total: 10000,
            used: 4000,
            remaining: 6000,
            usagePercent: 40,
            resetAt: '2026-06-18T20:53:20.000Z',
          },
        },
      });
    },
  );

  it('returns Z.ai quota API error messages', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ code: 401, msg: 'token expired', success: false }),
          { status: 200 },
        ),
      );

    const result = await getCatalogProvider('zhipu')!.fetchUsage!('bad-key');

    expect(result).toEqual({
      ok: false,
      provider: 'Zhipu / BigModel (China)',
      error: 'token expired',
    });
  });

  it('zai does not support usage query (no public balance API for pay-as-you-go accounts)', async () => {
    await expect(
      getCatalogProvider('zai')!.fetchUsage!('any-key'),
    ).rejects.toThrow('zai does not support usage query');
  });

  it.each([
    [
      'kimi',
      'https://api.moonshot.ai/v1/users/me/balance',
      'Kimi (International)',
      'USD',
    ],
    [
      'kimi-china',
      'https://api.moonshot.cn/v1/users/me/balance',
      'Kimi (China)',
      'CNY',
    ],
  ])(
    '%s queries the Moonshot balance endpoint',
    async (catalogId, endpoint, provider, currency) => {
      const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            code: 0,
            status: true,
            scode: '0x0',
            data: {
              available_balance: 49.58894,
              voucher_balance: 46.58893,
              cash_balance: 3.00001,
            },
          }),
          { status: 200 },
        ),
      );

      const result =
        await getCatalogProvider(catalogId)!.fetchUsage!('kimi-key');

      expect(fetchSpy).toHaveBeenCalledWith(endpoint, {
        headers: {
          Authorization: 'Bearer kimi-key',
          Accept: 'application/json',
        },
      });
      expect(result).toEqual({
        ok: true,
        provider,
        balance: { remaining: 49.58894, currency },
      });
    },
  );

  it('returns Kimi balance API error messages', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ code: 401, status: false }), {
        status: 200,
      }),
    );

    const result = await getCatalogProvider('kimi')!.fetchUsage!('bad-key');

    expect(result).toEqual({
      ok: false,
      provider: 'Kimi (International)',
      error: 'Balance query failed (401)',
    });
  });

  it('kimi-coding does not support usage query (no publicly documented quota API)', async () => {
    await expect(
      getCatalogProvider('kimi-coding')!.fetchUsage!('any-key'),
    ).rejects.toThrow('kimi-coding does not support usage query');
  });
});

describe('catalog fetchModels', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('openai queries its models endpoint via the shared OpenAI-compat helper', async () => {
    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ data: [{ id: 'gpt-5.6-sol' }, { id: 'gpt-5.5' }] }),
          { status: 200 },
        ),
      );

    const result = await getCatalogProvider('openai')!.fetchModels!('key-1');

    expect(fetchSpy).toHaveBeenCalledWith('https://api.openai.com/v1/models', {
      headers: { Accept: 'application/json', Authorization: 'Bearer key-1' },
    });
    expect(result).toEqual({
      ok: true,
      provider: 'OpenAI',
      modelIds: ['gpt-5.6-sol', 'gpt-5.5'],
    });
  });

  it('anthropic queries its models endpoint with x-api-key/anthropic-version headers', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ data: [{ id: 'claude-opus-5' }] }), {
        status: 200,
      }),
    );

    const result = await getCatalogProvider('anthropic')!.fetchModels!('key-2');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/models',
      {
        headers: {
          'x-api-key': 'key-2',
          'anthropic-version': '2023-06-01',
          Accept: 'application/json',
        },
      },
    );
    expect(result).toEqual({
      ok: true,
      provider: 'Anthropic',
      modelIds: ['claude-opus-5'],
    });
  });

  it('anthropic requires an apiKey', async () => {
    const result = await getCatalogProvider('anthropic')!.fetchModels!();
    expect(result).toEqual({
      ok: false,
      provider: 'Anthropic',
      error: 'apiKey required',
    });
  });

  it('google queries models.list with the apiKey as a query param and strips the models/ id prefix', async () => {
    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ models: [{ name: 'models/gemini-3.5-flash' }] }),
          { status: 200 },
        ),
      );

    const result = await getCatalogProvider('google')!.fetchModels!('key-3');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://generativelanguage.googleapis.com/v1beta/models?key=key-3',
      { headers: { Accept: 'application/json' } },
    );
    expect(result).toEqual({
      ok: true,
      provider: 'Google (Gemini)',
      modelIds: ['gemini-3.5-flash'],
    });
  });

  it('kimi queries its models endpoint via the shared OpenAI-compat helper', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ data: [{ id: 'kimi-k3' }] }), {
        status: 200,
      }),
    );

    const result = await getCatalogProvider('kimi')!.fetchModels!('key-4');

    expect(fetchSpy).toHaveBeenCalledWith('https://api.moonshot.ai/v1/models', {
      headers: { Accept: 'application/json', Authorization: 'Bearer key-4' },
    });
    expect(result).toEqual({
      ok: true,
      provider: 'Kimi (International)',
      modelIds: ['kimi-k3'],
    });
  });

  it('openrouter queries its models endpoint without requiring an apiKey', async () => {
    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ data: [{ id: 'anthropic/claude-opus-5' }] }),
          { status: 200 },
        ),
      );

    const result = await getCatalogProvider('openrouter')!.fetchModels!();

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://openrouter.ai/api/v1/models',
      {
        headers: { Accept: 'application/json' },
      },
    );
    expect(result).toEqual({
      ok: true,
      provider: 'OpenRouter',
      modelIds: ['anthropic/claude-opus-5'],
    });
  });
});

describe('catalog fetchEmbeddingModels', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('openrouter returns full embedding model objects', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          data: [
            {
              id: 'openai/text-embedding-3-small',
              name: 'OpenAI: Text Embedding 3 Small',
              context_length: 8192,
            },
          ],
        }),
        { status: 200 },
      ),
    );

    const result =
      await getCatalogProvider('openrouter')!.fetchEmbeddingModels!();

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://openrouter.ai/api/v1/models?output_modalities=embeddings',
      { headers: { Accept: 'application/json' } },
    );
    expect(result).toEqual({
      ok: true,
      provider: 'OpenRouter',
      models: [
        {
          id: 'openai/text-embedding-3-small',
          label: 'OpenAI: Text Embedding 3 Small',
          capability: { contextWindowTokens: 8192 },
        },
      ],
    });
  });
});
