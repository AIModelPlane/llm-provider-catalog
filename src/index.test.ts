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
      'zai-china',
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'Z.AI / Zhipu (China)',
    ],
    [
      'glm-coding-global',
      'https://api.z.ai/api/monitor/usage/quota/limit',
      'GLM Coding Plan (Global)',
    ],
    [
      'glm-coding-china',
      'https://open.bigmodel.cn/api/monitor/usage/quota/limit',
      'GLM Coding Plan (China)',
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

    const result =
      await getCatalogProvider('zai-china')!.fetchUsage!('bad-key');

    expect(result).toEqual({
      ok: false,
      provider: 'Z.AI / Zhipu (China)',
      error: 'token expired',
    });
  });

  it('zai-intl does not support usage query (no public balance API for pay-as-you-go accounts)', async () => {
    await expect(
      getCatalogProvider('zai-intl')!.fetchUsage!('any-key'),
    ).rejects.toThrow('zai-intl does not support usage query');
  });
});
