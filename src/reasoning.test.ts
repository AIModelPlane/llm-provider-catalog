import { PROVIDER_CATALOG, getCatalogProvider } from './index';
import { openrouterReasoningMapping } from './openrouter/reasoning';

describe('CatalogProvider.reasoning coverage', () => {
  it('every catalog entry declares a reasoning mapping', () => {
    for (const p of PROVIDER_CATALOG) {
      expect(p.reasoning).toBeDefined();
    }
  });

  it.each([
    ['openai', 'openai', { kind: 'effort-scalar', param: 'reasoning_effort' }],
    [
      'anthropic',
      'anthropic',
      { kind: 'thinking-object', param: 'thinking', includeBudget: true },
    ],
    ['google', 'openai', { kind: 'effort-scalar', param: 'reasoning_effort' }],
    ['zai', 'openai', { kind: 'thinking-object', param: 'thinking' }],
    ['zhipu', 'openai', { kind: 'thinking-object', param: 'thinking' }],
    ['zai-coding', 'openai', { kind: 'thinking-object', param: 'thinking' }],
    ['zhipu-coding', 'openai', { kind: 'thinking-object', param: 'thinking' }],
    [
      'minimax-global',
      'openai',
      { kind: 'passthrough-object', param: 'reasoning' },
    ],
    [
      'minimax-china',
      'openai',
      { kind: 'passthrough-object', param: 'reasoning' },
    ],
    [
      'minimax-coding-global',
      'openai',
      { kind: 'passthrough-object', param: 'reasoning' },
    ],
    [
      'minimax-coding-china',
      'openai',
      { kind: 'passthrough-object', param: 'reasoning' },
    ],
    ['novita-ai', 'openai', { kind: 'passthrough-object', param: 'reasoning' }],
  ])(
    '%s declares the expected %s reasoning mapping',
    (id, protocol, expected) => {
      const entry = getCatalogProvider(id)!;
      expect(entry.reasoning?.[protocol as 'openai' | 'anthropic']).toEqual(
        expected,
      );
    },
  );

  it('deepseek declares both effort-scalar and thinking-object for openai protocol', () => {
    const entry = getCatalogProvider('deepseek')!;
    expect(entry.reasoning?.openai).toEqual([
      { kind: 'effort-scalar', param: 'reasoning_effort' },
      { kind: 'thinking-object', param: 'thinking' },
    ]);
  });

  it('openrouter declares a custom mapping function', () => {
    const entry = getCatalogProvider('openrouter')!;
    const mapping = entry.reasoning?.openai;
    expect(mapping && 'kind' in mapping && mapping.kind).toBe('custom');
  });
});

describe('openrouterReasoningMapping', () => {
  it('passes through a normal effort request unchanged', () => {
    expect(
      openrouterReasoningMapping({ effort: 'high' }, { model: 'openai/gpt-5' }),
    ).toEqual({ effort: 'high' });
  });

  it('returns undefined for an empty/absent reasoning object', () => {
    expect(openrouterReasoningMapping(undefined, {})).toBeUndefined();
    expect(openrouterReasoningMapping({}, {})).toBeUndefined();
  });

  it('rewrites disabled reasoning to effort:none for non-Gemini models', () => {
    expect(
      openrouterReasoningMapping(
        { enabled: false },
        { model: 'anthropic/claude-5' },
      ),
    ).toEqual({ effort: 'none' });
  });

  it('rewrites disabled reasoning to effort:minimal for Gemini 3 models', () => {
    expect(
      openrouterReasoningMapping(
        { effort: 'none' },
        { model: 'google/gemini-3-pro' },
      ),
    ).toEqual({ effort: 'minimal' });
  });

  it('drops effort/enabled and keeps only exclude for Gemini 3.1/2.5 Pro', () => {
    expect(
      openrouterReasoningMapping(
        { enabled: false, exclude: true },
        { model: 'google/gemini-3.1-pro' },
      ),
    ).toEqual({ exclude: true });
    expect(
      openrouterReasoningMapping(
        { enabled: false },
        { model: 'google/gemini-2.5-pro' },
      ),
    ).toBeUndefined();
  });
});
