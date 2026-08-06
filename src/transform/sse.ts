import { AnthropicStreamEvent, OpenAIChatCompletionChunk } from './types';

async function* toByteIterable(
  body: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>,
): AsyncGenerator<Uint8Array> {
  if (Symbol.asyncIterator in body) {
    yield* body as AsyncIterable<Uint8Array>;
    return;
  }
  const reader = (body as ReadableStream<Uint8Array>).getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

function parseFrame(
  frame: string,
): { event?: string; data: string } | undefined {
  let event: string | undefined;
  const dataLines: string[] = [];
  for (const rawLine of frame.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trimStart());
    }
  }
  if (dataLines.length === 0) return undefined;
  return { event, data: dataLines.join('\n') };
}

/** Generic SSE frame parser: splits a raw byte stream into `{event?, data}`
 *  frames (frames are separated by a blank line, i.e. "\n\n"). Assumes `\n`
 *  line endings, matching every real vendor SSE stream (OpenAI, Anthropic,
 *  and every OpenAI-compatible provider in this catalog) — not a general
 *  CRLF-safe SSE parser. Handles reads split mid-frame across chunk
 *  boundaries. */
export async function* parseSSEStream(
  body: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>,
): AsyncGenerator<{ event?: string; data: string }> {
  const decoder = new TextDecoder();
  let buffer = '';

  for await (const chunk of toByteIterable(body)) {
    buffer += decoder.decode(chunk, { stream: true });
    let sepIndex: number;
    while ((sepIndex = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, sepIndex);
      buffer = buffer.slice(sepIndex + 2);
      const parsed = parseFrame(frame);
      if (parsed) yield parsed;
    }
  }

  buffer += decoder.decode();
  const trailing = buffer.trim();
  if (trailing) {
    const parsed = parseFrame(trailing);
    if (parsed) yield parsed;
  }
}

/** Parses an OpenAI Chat Completions SSE stream into `chat.completion.chunk`
 *  objects, stopping at the literal `data: [DONE]` terminator. */
export async function* parseOpenAIStream(
  body: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>,
): AsyncGenerator<OpenAIChatCompletionChunk> {
  for await (const frame of parseSSEStream(body)) {
    if (frame.data === '[DONE]') return;
    yield JSON.parse(frame.data) as OpenAIChatCompletionChunk;
  }
}

/** Serializes an Anthropic stream event into its SSE wire format
 *  (`event: <type>\ndata: <json>\n\n`). */
export function formatAnthropicSSEEvent(event: AnthropicStreamEvent): string {
  return `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
}
