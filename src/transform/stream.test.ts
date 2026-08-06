import { openaiChunksToAnthropicEvents } from './stream';
import { AnthropicStreamEvent, OpenAIChatCompletionChunk } from './types';

async function* toAsyncIterable<T>(items: T[]): AsyncGenerator<T> {
  for (const item of items) yield item;
}

async function collect(
  chunks: OpenAIChatCompletionChunk[],
): Promise<AnthropicStreamEvent[]> {
  const events: AnthropicStreamEvent[] = [];
  for await (const event of openaiChunksToAnthropicEvents(
    toAsyncIterable(chunks),
    { model: 'test-model' },
  )) {
    events.push(event);
  }
  return events;
}

function chunk(
  overrides: Partial<OpenAIChatCompletionChunk['choices'][number]> & {
    usage?: OpenAIChatCompletionChunk['usage'];
  } = {},
): OpenAIChatCompletionChunk {
  const { usage, ...choiceOverrides } = overrides;
  return {
    id: 'chatcmpl-1',
    model: 'test-model',
    choices: [{ index: 0, delta: {}, finish_reason: null, ...choiceOverrides }],
    ...(usage ? { usage } : {}),
  };
}

describe('openaiChunksToAnthropicEvents', () => {
  it('streams plain text with a trailing usage-only chunk', async () => {
    const events = await collect([
      chunk({ delta: { role: 'assistant', content: '' } }),
      chunk({ delta: { content: 'Hello' } }),
      chunk({ delta: { content: ' world' } }),
      chunk({ delta: {}, finish_reason: 'stop' }),
      {
        id: 'chatcmpl-1',
        model: 'test-model',
        choices: [],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      },
    ]);

    expect(events).toEqual([
      {
        type: 'message_start',
        message: {
          id: 'chatcmpl-1',
          type: 'message',
          role: 'assistant',
          model: 'test-model',
          content: [],
          stop_reason: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      },
      {
        type: 'content_block_start',
        index: 0,
        content_block: { type: 'text', text: '' },
      },
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'text_delta', text: 'Hello' },
      },
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'text_delta', text: ' world' },
      },
      { type: 'content_block_stop', index: 0 },
      {
        type: 'message_delta',
        delta: { stop_reason: 'end_turn' },
        usage: { input_tokens: 10, output_tokens: 5 },
      },
      { type: 'message_stop' },
    ]);
  });

  it('streams a single tool call', async () => {
    const events = await collect([
      chunk({ delta: { role: 'assistant' } }),
      chunk({
        delta: {
          tool_calls: [
            {
              index: 0,
              id: 'call_1',
              type: 'function',
              function: { name: 'get_weather', arguments: '' },
            },
          ],
        },
      }),
      chunk({
        delta: {
          tool_calls: [
            { index: 0, type: 'function', function: { arguments: '{"city":' } },
          ],
        },
      }),
      chunk({
        delta: {
          tool_calls: [
            { index: 0, type: 'function', function: { arguments: '"NY"}' } },
          ],
        },
      }),
      chunk({ delta: {}, finish_reason: 'tool_calls' }),
    ]);

    expect(events).toEqual([
      expect.objectContaining({ type: 'message_start' }),
      {
        type: 'content_block_start',
        index: 0,
        content_block: {
          type: 'tool_use',
          id: 'call_1',
          name: 'get_weather',
          input: {},
        },
      },
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'input_json_delta', partial_json: '{"city":' },
      },
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'input_json_delta', partial_json: '"NY"}' },
      },
      { type: 'content_block_stop', index: 0 },
      {
        type: 'message_delta',
        delta: { stop_reason: 'tool_use' },
        usage: { input_tokens: 0, output_tokens: 0 },
      },
      { type: 'message_stop' },
    ]);
  });

  it('assigns sequential Anthropic indices across parallel tool calls', async () => {
    const events = await collect([
      chunk({
        delta: {
          tool_calls: [
            {
              index: 0,
              id: 'call_1',
              type: 'function',
              function: { name: 'a', arguments: '' },
            },
          ],
        },
      }),
      chunk({
        delta: {
          tool_calls: [
            {
              index: 1,
              id: 'call_2',
              type: 'function',
              function: { name: 'b', arguments: '' },
            },
          ],
        },
      }),
      chunk({ delta: {}, finish_reason: 'tool_calls' }),
    ]);

    const starts = events.filter((e) => e.type === 'content_block_start');
    expect(starts).toEqual([
      {
        type: 'content_block_start',
        index: 0,
        content_block: { type: 'tool_use', id: 'call_1', name: 'a', input: {} },
      },
      {
        type: 'content_block_start',
        index: 1,
        content_block: { type: 'tool_use', id: 'call_2', name: 'b', input: {} },
      },
    ]);
    // moving from tool 0 to tool 1 closes index 0 before opening index 1
    const stops = events.filter((e) => e.type === 'content_block_stop');
    expect(stops).toEqual([
      { type: 'content_block_stop', index: 0 },
      { type: 'content_block_stop', index: 1 },
    ]);
  });

  it('streams reasoning_content as a thinking block before text', async () => {
    const events = await collect([
      chunk({ delta: { reasoning_content: 'Let me ' } }),
      chunk({ delta: { reasoning_content: 'think.' } }),
      chunk({ delta: { content: 'Answer: 42' } }),
      chunk({ delta: {}, finish_reason: 'stop' }),
    ]);

    expect(events.filter((e) => e.type === 'content_block_start')).toEqual([
      {
        type: 'content_block_start',
        index: 0,
        content_block: { type: 'thinking', thinking: '' },
      },
      {
        type: 'content_block_start',
        index: 1,
        content_block: { type: 'text', text: '' },
      },
    ]);
    expect(events.filter((e) => e.type === 'content_block_delta')).toEqual([
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'thinking_delta', thinking: 'Let me ' },
      },
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'thinking_delta', thinking: 'think.' },
      },
      {
        type: 'content_block_delta',
        index: 1,
        delta: { type: 'text_delta', text: 'Answer: 42' },
      },
    ]);
  });

  it('uses the reasoning field (OpenRouter convention) when reasoning_content is absent', async () => {
    const events = await collect([
      chunk({ delta: { reasoning: 'thinking via openrouter' } }),
      chunk({ delta: {}, finish_reason: 'stop' }),
    ]);
    expect(events.filter((e) => e.type === 'content_block_delta')).toEqual([
      {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'thinking_delta', thinking: 'thinking via openrouter' },
      },
    ]);
  });

  it('maps finish_reason and closes any open block even with no trailing usage chunk', async () => {
    const events = await collect([
      chunk({ delta: { content: 'hi' } }),
      chunk({ delta: {}, finish_reason: 'length' }),
    ]);
    expect(events.at(-2)).toEqual({
      type: 'message_delta',
      delta: { stop_reason: 'max_tokens' },
      usage: { input_tokens: 0, output_tokens: 0 },
    });
    expect(events.at(-1)).toEqual({ type: 'message_stop' });
  });
});
