import {
  formatAnthropicSSEEvent,
  parseOpenAIStream,
  parseSSEStream,
} from './sse';
import { AnthropicStreamEvent } from './types';

async function* bytesFrom(chunks: string[]): AsyncGenerator<Uint8Array> {
  const encoder = new TextEncoder();
  for (const chunk of chunks) yield encoder.encode(chunk);
}

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const item of iterable) out.push(item);
  return out;
}

describe('parseSSEStream', () => {
  it('parses complete frames with event and data', async () => {
    const frames = await collect(
      parseSSEStream(
        bytesFrom([
          'event: message_start\ndata: {"a":1}\n\n',
          'event: message_stop\ndata: {}\n\n',
        ]),
      ),
    );
    expect(frames).toEqual([
      { event: 'message_start', data: '{"a":1}' },
      { event: 'message_stop', data: '{}' },
    ]);
  });

  it('handles a frame split across multiple chunk reads', async () => {
    const frames = await collect(
      parseSSEStream(
        bytesFrom([
          'event: content_block_delta\nda',
          'ta: {"index":0}',
          '\n\n',
        ]),
      ),
    );
    expect(frames).toEqual([
      { event: 'content_block_delta', data: '{"index":0}' },
    ]);
  });

  it('parses a trailing frame with no closing blank line', async () => {
    const frames = await collect(parseSSEStream(bytesFrom(['data: [DONE]'])));
    expect(frames).toEqual([{ data: '[DONE]' }]);
  });

  it('joins multiple data: lines within one frame with newlines', async () => {
    const frames = await collect(
      parseSSEStream(bytesFrom(['data: line1\ndata: line2\n\n'])),
    );
    expect(frames).toEqual([{ data: 'line1\nline2' }]);
  });

  it('ignores frames with no data line', async () => {
    const frames = await collect(
      parseSSEStream(bytesFrom([': keep-alive comment\n\ndata: real\n\n'])),
    );
    expect(frames).toEqual([{ data: 'real' }]);
  });
});

describe('parseOpenAIStream', () => {
  it('parses chat.completion.chunk objects and stops at [DONE]', async () => {
    const chunks = await collect(
      parseOpenAIStream(
        bytesFrom([
          'data: {"id":"c1","model":"m","choices":[{"index":0,"delta":{"role":"assistant"},"finish_reason":null}]}\n\n',
          'data: {"id":"c1","model":"m","choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":null}]}\n\n',
          'data: [DONE]\n\n',
          'data: {"id":"should-not-appear","model":"m","choices":[]}\n\n',
        ]),
      ),
    );
    expect(chunks).toHaveLength(2);
    expect(chunks[1].choices[0].delta.content).toBe('hi');
  });
});

describe('formatAnthropicSSEEvent', () => {
  it('serializes an event to the SSE wire format', () => {
    const event: AnthropicStreamEvent = { type: 'message_stop' };
    expect(formatAnthropicSSEEvent(event)).toBe(
      'event: message_stop\ndata: {"type":"message_stop"}\n\n',
    );
  });

  it('round-trips through parseSSEStream', async () => {
    const event: AnthropicStreamEvent = {
      type: 'content_block_delta',
      index: 0,
      delta: { type: 'text_delta', text: 'hi' },
    };
    const wire = formatAnthropicSSEEvent(event);
    const frames = await collect(parseSSEStream(bytesFrom([wire])));
    expect(frames).toEqual([
      { event: 'content_block_delta', data: JSON.stringify(event) },
    ]);
  });
});
