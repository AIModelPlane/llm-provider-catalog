import { openaiResponseToAnthropic } from './response';
import { OpenAIChatCompletionResponse } from './types';

function baseResponse(
  overrides: Partial<OpenAIChatCompletionResponse> = {},
): OpenAIChatCompletionResponse {
  return {
    id: 'chatcmpl-1',
    model: 'gpt-5.6-sol',
    choices: [
      {
        index: 0,
        message: { role: 'assistant', content: 'Hello there' },
        finish_reason: 'stop',
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    ...overrides,
  };
}

describe('openaiResponseToAnthropic', () => {
  it('maps a plain text response', () => {
    const result = openaiResponseToAnthropic(baseResponse(), {
      model: 'gpt-5.6-sol',
    });
    expect(result).toEqual({
      id: 'chatcmpl-1',
      type: 'message',
      role: 'assistant',
      model: 'gpt-5.6-sol',
      content: [{ type: 'text', text: 'Hello there' }],
      stop_reason: 'end_turn',
      usage: { input_tokens: 10, output_tokens: 5 },
    });
  });

  it.each([
    ['stop', 'end_turn'],
    ['length', 'max_tokens'],
    ['tool_calls', 'tool_use'],
    ['content_filter', 'refusal'],
    [null, null],
  ] as const)(
    'maps finish_reason %s to stop_reason %s',
    (finishReason, stopReason) => {
      const result = openaiResponseToAnthropic(
        baseResponse({
          choices: [
            {
              index: 0,
              message: { role: 'assistant', content: 'hi' },
              finish_reason: finishReason,
            },
          ],
        }),
        { model: 'x' },
      );
      expect(result.stop_reason).toBe(stopReason);
    },
  );

  it('maps tool_calls to tool_use blocks with parsed input', () => {
    const result = openaiResponseToAnthropic(
      baseResponse({
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: 'call_1',
                  type: 'function',
                  function: { name: 'get_weather', arguments: '{"city":"NY"}' },
                },
              ],
            },
            finish_reason: 'tool_calls',
          },
        ],
      }),
      { model: 'x' },
    );
    expect(result.content).toEqual([
      {
        type: 'tool_use',
        id: 'call_1',
        name: 'get_weather',
        input: { city: 'NY' },
      },
    ]);
  });

  it('falls back to an empty object for malformed tool_call arguments', () => {
    const result = openaiResponseToAnthropic(
      baseResponse({
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: 'call_1',
                  type: 'function',
                  function: { name: 'f', arguments: 'not json' },
                },
              ],
            },
            finish_reason: 'tool_calls',
          },
        ],
      }),
      { model: 'x' },
    );
    expect(result.content).toEqual([
      { type: 'tool_use', id: 'call_1', name: 'f', input: {} },
    ]);
  });

  it('maps reasoning_content into a thinking block, ordered before text', () => {
    const result = openaiResponseToAnthropic(
      baseResponse({
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: 'The answer is 42.',
              reasoning_content: 'Let me think...',
            },
            finish_reason: 'stop',
          },
        ],
      }),
      { model: 'x' },
    );
    expect(result.content).toEqual([
      { type: 'thinking', thinking: 'Let me think...' },
      { type: 'text', text: 'The answer is 42.' },
    ]);
  });

  it('falls back to the reasoning field when reasoning_content is absent (OpenRouter convention)', () => {
    const result = openaiResponseToAnthropic(
      baseResponse({
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: 'hi',
              reasoning: 'thinking via openrouter',
            },
            finish_reason: 'stop',
          },
        ],
      }),
      { model: 'x' },
    );
    expect(result.content[0]).toEqual({
      type: 'thinking',
      thinking: 'thinking via openrouter',
    });
  });

  it('maps usage including reasoning_tokens to output_tokens_details.thinking_tokens', () => {
    const result = openaiResponseToAnthropic(
      baseResponse({
        usage: {
          prompt_tokens: 20,
          completion_tokens: 30,
          total_tokens: 50,
          completion_tokens_details: { reasoning_tokens: 12 },
        },
      }),
      { model: 'x' },
    );
    expect(result.usage).toEqual({
      input_tokens: 20,
      output_tokens: 30,
      output_tokens_details: { thinking_tokens: 12 },
    });
  });

  it('defaults usage to zero when absent', () => {
    const result = openaiResponseToAnthropic(
      baseResponse({ usage: undefined }),
      {
        model: 'x',
      },
    );
    expect(result.usage).toEqual({ input_tokens: 0, output_tokens: 0 });
  });
});
