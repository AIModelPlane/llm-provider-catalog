import { CatalogProvider, ReasoningMapping } from '../types';
import { getCatalogProvider } from '../index';
import { openrouterReasoningMapping } from '../openrouter/reasoning';
import { anthropicRequestToOpenAI, applyReasoningMapping } from './request';
import { AnthropicMessagesRequest } from './types';

function fixtureProvider(
  reasoning: ReasoningMapping | ReasoningMapping[] | undefined,
): CatalogProvider {
  return {
    id: 'fixture',
    label: 'Fixture',
    provider: 'fixture',
    protocols: ['openai'],
    baseURLs: { openai: 'https://example.com/v1' },
    models: [],
    reasoning: reasoning === undefined ? undefined : { openai: reasoning },
  };
}

describe('applyReasoningMapping', () => {
  it('returns {} for kind: none', () => {
    expect(
      applyReasoningMapping(
        { kind: 'none' },
        { enabled: true, effort: 'high' },
        {},
      ),
    ).toEqual({});
  });

  it('returns {} when mapping is undefined', () => {
    expect(applyReasoningMapping(undefined, { effort: 'high' }, {})).toEqual(
      {},
    );
  });

  describe('effort-scalar', () => {
    const mapping: ReasoningMapping = {
      kind: 'effort-scalar',
      param: 'reasoning_effort',
    };
    it('sets the scalar field for a real effort', () => {
      expect(applyReasoningMapping(mapping, { effort: 'high' }, {})).toEqual({
        reasoning_effort: 'high',
      });
    });
    it('omits the field when disabled', () => {
      expect(applyReasoningMapping(mapping, { enabled: false }, {})).toEqual(
        {},
      );
      expect(applyReasoningMapping(mapping, { effort: 'none' }, {})).toEqual(
        {},
      );
    });
    it('omits the field when input is absent', () => {
      expect(applyReasoningMapping(mapping, undefined, {})).toEqual({});
    });
  });

  describe('thinking-object', () => {
    const mapping: ReasoningMapping = {
      kind: 'thinking-object',
      param: 'thinking',
      includeBudget: true,
    };
    it('emits an enabled object with budget_tokens', () => {
      expect(
        applyReasoningMapping(mapping, { enabled: true, max_tokens: 5000 }, {}),
      ).toEqual({ thinking: { type: 'enabled', budget_tokens: 5000 } });
    });
    it('omits budget_tokens when includeBudget is false', () => {
      const noBudget: ReasoningMapping = {
        kind: 'thinking-object',
        param: 'thinking',
      };
      expect(
        applyReasoningMapping(
          noBudget,
          { enabled: true, max_tokens: 5000 },
          {},
        ),
      ).toEqual({ thinking: { type: 'enabled' } });
    });
    it('emits a disabled object when reasoning is off', () => {
      expect(applyReasoningMapping(mapping, { enabled: false }, {})).toEqual({
        thinking: { type: 'disabled' },
      });
    });
    it('omits the field entirely when input is absent', () => {
      expect(applyReasoningMapping(mapping, undefined, {})).toEqual({});
    });
  });

  describe('passthrough-object', () => {
    const mapping: ReasoningMapping = {
      kind: 'passthrough-object',
      param: 'reasoning',
    };
    it('forwards the input verbatim', () => {
      expect(applyReasoningMapping(mapping, { effort: 'low' }, {})).toEqual({
        reasoning: { effort: 'low' },
      });
    });
    it('omits when input is absent or empty', () => {
      expect(applyReasoningMapping(mapping, undefined, {})).toEqual({});
      expect(applyReasoningMapping(mapping, {}, {})).toEqual({});
    });
  });

  describe('custom', () => {
    const mapping: ReasoningMapping = {
      kind: 'custom',
      param: 'reasoning',
      fn: openrouterReasoningMapping,
    };
    it('nests the fn result under param', () => {
      expect(
        applyReasoningMapping(
          mapping,
          { effort: 'high' },
          { model: 'openai/gpt-5' },
        ),
      ).toEqual({ reasoning: { effort: 'high' } });
    });
    it('omits the field when fn returns undefined', () => {
      expect(applyReasoningMapping(mapping, undefined, {})).toEqual({});
    });
  });

  it('merges results across an array of mappings', () => {
    const mappings: ReasoningMapping[] = [
      { kind: 'effort-scalar', param: 'reasoning_effort' },
      { kind: 'thinking-object', param: 'thinking' },
    ];
    expect(
      applyReasoningMapping(mappings, { enabled: true, effort: 'high' }, {}),
    ).toEqual({ reasoning_effort: 'high', thinking: { type: 'enabled' } });
  });
});

describe('anthropicRequestToOpenAI', () => {
  const baseRequest: AnthropicMessagesRequest = {
    model: 'test-model',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Hello' }],
  };

  it('maps model, system, plain text message, and max_tokens', () => {
    const result = anthropicRequestToOpenAI(
      { ...baseRequest, system: 'Be nice.' },
      fixtureProvider(undefined),
    );
    expect(result).toMatchObject({
      model: 'test-model',
      max_completion_tokens: 1024,
      messages: [
        { role: 'system', content: 'Be nice.' },
        { role: 'user', content: 'Hello' },
      ],
    });
  });

  it('maps a base64 image content block to image_url', () => {
    const result = anthropicRequestToOpenAI(
      {
        ...baseRequest,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'What is this?' },
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/png',
                  data: 'AAAA',
                },
              },
            ],
          },
        ],
      },
      fixtureProvider(undefined),
    );
    expect(result.messages[0]).toEqual({
      role: 'user',
      content: [
        { type: 'text', text: 'What is this?' },
        { type: 'image_url', image_url: { url: 'data:image/png;base64,AAAA' } },
      ],
    });
  });

  it('maps a base64 document content block to file', () => {
    const result = anthropicRequestToOpenAI(
      {
        ...baseRequest,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'document',
                source: {
                  type: 'base64',
                  media_type: 'application/pdf',
                  data: 'BBBB',
                },
                title: 'report.pdf',
              },
            ],
          },
        ],
      },
      fixtureProvider(undefined),
    );
    expect(result.messages[0]).toEqual({
      role: 'user',
      content: [
        {
          type: 'file',
          file: {
            file_data: 'data:application/pdf;base64,BBBB',
            filename: 'report.pdf',
          },
        },
      ],
    });
  });

  it('maps tools and tool_choice', () => {
    const result = anthropicRequestToOpenAI(
      {
        ...baseRequest,
        tools: [
          {
            name: 'get_weather',
            description: 'Get weather',
            input_schema: { type: 'object', properties: {} },
          },
        ],
        tool_choice: { type: 'tool', name: 'get_weather' },
      },
      fixtureProvider(undefined),
    );
    expect(result.tools).toEqual([
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get weather',
          parameters: { type: 'object', properties: {} },
        },
      },
    ]);
    expect(result.tool_choice).toEqual({
      type: 'function',
      function: { name: 'get_weather' },
    });
  });

  it('maps an assistant tool_use block to tool_calls', () => {
    const result = anthropicRequestToOpenAI(
      {
        ...baseRequest,
        messages: [
          { role: 'user', content: 'weather?' },
          {
            role: 'assistant',
            content: [
              { type: 'text', text: 'checking' },
              {
                type: 'tool_use',
                id: 'toolu_1',
                name: 'get_weather',
                input: { city: 'NY' },
              },
            ],
          },
          {
            role: 'user',
            content: [
              { type: 'tool_result', tool_use_id: 'toolu_1', content: 'sunny' },
            ],
          },
        ],
      },
      fixtureProvider(undefined),
    );
    expect(result.messages[1]).toEqual({
      role: 'assistant',
      content: 'checking',
      tool_calls: [
        {
          id: 'toolu_1',
          type: 'function',
          function: { name: 'get_weather', arguments: '{"city":"NY"}' },
        },
      ],
    });
    expect(result.messages[2]).toEqual({
      role: 'tool',
      content: 'sunny',
      tool_call_id: 'toolu_1',
    });
  });

  it('encodes thinking via an effort-scalar provider mapping', () => {
    const provider = fixtureProvider({
      kind: 'effort-scalar',
      param: 'reasoning_effort',
    });
    const result = anthropicRequestToOpenAI(
      { ...baseRequest, thinking: { type: 'enabled', budget_tokens: 2000 } },
      provider,
    );
    expect(result.reasoning_effort).toBe('medium');
  });

  it('encodes thinking via a thinking-object provider mapping', () => {
    const provider = fixtureProvider({
      kind: 'thinking-object',
      param: 'thinking',
      includeBudget: true,
    });
    const result = anthropicRequestToOpenAI(
      { ...baseRequest, thinking: { type: 'enabled', budget_tokens: 2000 } },
      provider,
    );
    expect(result.thinking).toEqual({ type: 'enabled', budget_tokens: 2000 });
  });

  it('sets disabled thinking correctly', () => {
    const provider = fixtureProvider({
      kind: 'thinking-object',
      param: 'thinking',
    });
    const result = anthropicRequestToOpenAI(
      { ...baseRequest, thinking: { type: 'disabled' } },
      provider,
    );
    expect(result.thinking).toEqual({ type: 'disabled' });
  });

  it('sets stream and stream_options.include_usage together', () => {
    const result = anthropicRequestToOpenAI(
      { ...baseRequest, stream: true },
      fixtureProvider(undefined),
    );
    expect(result.stream).toBe(true);
    expect(result.stream_options).toEqual({ include_usage: true });
  });

  it('works end-to-end against the real openai catalog entry', () => {
    const provider = getCatalogProvider('openai')!;
    const result = anthropicRequestToOpenAI(
      { ...baseRequest, thinking: { type: 'enabled', budget_tokens: 1000 } },
      provider,
    );
    expect(result.reasoning_effort).toBe('medium');
  });

  it('works end-to-end against the real openrouter catalog entry (custom mapping)', () => {
    const provider = getCatalogProvider('openrouter')!;
    const result = anthropicRequestToOpenAI(
      {
        ...baseRequest,
        model: 'anthropic/claude-5',
        thinking: { type: 'disabled' },
      },
      provider,
    );
    expect(result.reasoning).toEqual({ effort: 'none' });
  });
});
