import { fetchOpenAiCompatModelIds } from './fetchModelIds';

describe('fetchOpenAiCompatModelIds', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns model ids on success, with Authorization header when apiKey given', async () => {
    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ data: [{ id: 'model-a' }, { id: 'model-b' }] }),
          { status: 200 },
        ),
      );

    const result = await fetchOpenAiCompatModelIds(
      'https://api.example.com/v1',
      'Example',
      'secret-key',
    );

    expect(fetchSpy).toHaveBeenCalledWith('https://api.example.com/v1/models', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer secret-key',
      },
    });
    expect(result).toEqual({
      ok: true,
      provider: 'Example',
      modelIds: ['model-a', 'model-b'],
    });
  });

  it('omits Authorization header when no apiKey given', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ data: [{ id: 'model-a' }] }), {
        status: 200,
      }),
    );

    await fetchOpenAiCompatModelIds('https://api.example.com/v1', 'Example');

    expect(fetchSpy).toHaveBeenCalledWith('https://api.example.com/v1/models', {
      headers: { Accept: 'application/json' },
    });
  });

  it('returns an error on non-OK HTTP status', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('', { status: 401 }));

    const result = await fetchOpenAiCompatModelIds(
      'https://api.example.com/v1',
      'Example',
      'bad-key',
    );

    expect(result).toEqual({
      ok: false,
      provider: 'Example',
      error: 'HTTP 401',
    });
  });

  it('returns an error when the response has no data array', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ unexpected: true }), { status: 200 }),
      );

    const result = await fetchOpenAiCompatModelIds(
      'https://api.example.com/v1',
      'Example',
    );

    expect(result).toEqual({
      ok: false,
      provider: 'Example',
      error: 'Invalid models response',
    });
  });
});
