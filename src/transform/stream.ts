import {
  AnthropicStopReason,
  AnthropicStreamEvent,
  AnthropicUsage,
  OpenAIChatCompletionChunk,
} from './types';
import { mapFinishReason, mapUsage } from './shared';

interface ToolCallBlockState {
  anthropicIndex: number;
}

/** Converts a stream of OpenAI `chat.completion.chunk` objects into
 *  Anthropic Messages API stream events. Anthropic's content-block indices
 *  are sequential across ALL block types (text/thinking/tool_use); OpenAI's
 *  `tool_calls[].index` is only sequential among tool calls, so this tracks
 *  its own index assignment separately.
 *
 *  Assumes (matching real-world provider behavior) that deltas for a given
 *  `tool_calls[].index` arrive in one contiguous run, not interleaved with
 *  another index or with text/thinking deltas — a provider that violates
 *  this would get duplicate/incorrect block boundaries.
 *
 *  `message_start`'s usage starts at 0/0 (OpenAI doesn't report prompt
 *  tokens until the response completes) — matching Anthropic's own
 *  documented behavior where `message_delta.usage` is the
 *  cumulative/authoritative source, not `message_start`. */
export async function* openaiChunksToAnthropicEvents(
  chunks: AsyncIterable<OpenAIChatCompletionChunk>,
  ctx: { model: string },
): AsyncGenerator<AnthropicStreamEvent> {
  let started = false;
  let nextBlockIndex = 0;
  let openTarget: 'text' | 'thinking' | { tool: number } | undefined;
  let openAnthropicIndex: number | undefined;
  const toolCallBlocks = new Map<number, ToolCallBlockState>();
  let finalStopReason: AnthropicStopReason = null;
  let finalUsage: AnthropicUsage = { input_tokens: 0, output_tokens: 0 };

  function* closeOpenBlock(): Generator<AnthropicStreamEvent> {
    if (openAnthropicIndex !== undefined) {
      yield { type: 'content_block_stop', index: openAnthropicIndex };
      openTarget = undefined;
      openAnthropicIndex = undefined;
    }
  }

  for await (const chunk of chunks) {
    if (!started) {
      started = true;
      yield {
        type: 'message_start',
        message: {
          id: chunk.id,
          type: 'message',
          role: 'assistant',
          model: ctx.model,
          content: [],
          stop_reason: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      };
    }

    const choice = chunk.choices?.[0];
    const delta = choice?.delta;

    if (delta) {
      const reasoningDelta = delta.reasoning_content ?? delta.reasoning;
      if (reasoningDelta) {
        if (openTarget !== 'thinking') {
          yield* closeOpenBlock();
          const idx = nextBlockIndex++;
          yield {
            type: 'content_block_start',
            index: idx,
            content_block: { type: 'thinking', thinking: '' },
          };
          openTarget = 'thinking';
          openAnthropicIndex = idx;
        }
        yield {
          type: 'content_block_delta',
          index: openAnthropicIndex!,
          delta: { type: 'thinking_delta', thinking: reasoningDelta },
        };
      } else if (delta.content) {
        if (openTarget !== 'text') {
          yield* closeOpenBlock();
          const idx = nextBlockIndex++;
          yield {
            type: 'content_block_start',
            index: idx,
            content_block: { type: 'text', text: '' },
          };
          openTarget = 'text';
          openAnthropicIndex = idx;
        }
        yield {
          type: 'content_block_delta',
          index: openAnthropicIndex!,
          delta: { type: 'text_delta', text: delta.content },
        };
      }

      if (delta.tool_calls) {
        for (const call of delta.tool_calls) {
          const toolIndex = call.index ?? 0;
          let block = toolCallBlocks.get(toolIndex);
          if (!block) {
            yield* closeOpenBlock();
            const anthropicIndex = nextBlockIndex++;
            block = { anthropicIndex };
            toolCallBlocks.set(toolIndex, block);
            yield {
              type: 'content_block_start',
              index: anthropicIndex,
              content_block: {
                type: 'tool_use',
                id: call.id ?? '',
                name: call.function.name ?? '',
                input: {},
              },
            };
            openTarget = { tool: toolIndex };
            openAnthropicIndex = anthropicIndex;
          }
          if (call.function.arguments) {
            yield {
              type: 'content_block_delta',
              index: block.anthropicIndex,
              delta: {
                type: 'input_json_delta',
                partial_json: call.function.arguments,
              },
            };
          }
        }
      }
    }

    if (choice?.finish_reason) {
      yield* closeOpenBlock();
      finalStopReason = mapFinishReason(choice.finish_reason);
    }
    if (chunk.usage) {
      finalUsage = mapUsage(chunk.usage);
    }
  }

  yield* closeOpenBlock();
  yield {
    type: 'message_delta',
    delta: { stop_reason: finalStopReason },
    usage: finalUsage,
  };
  yield { type: 'message_stop' };
}
