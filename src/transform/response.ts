import {
  AnthropicMessageResponse,
  AnthropicResponseContentBlock,
  OpenAIChatCompletionResponse,
} from './types';
import { mapFinishReason, mapUsage, parseToolCallInput } from './shared';

/** Converts a non-streaming OpenAI Chat Completions response into an
 *  Anthropic Messages API response. `reasoning_content`/`reasoning` are
 *  non-standard extensions some OpenAI-compatible reasoning providers
 *  (DeepSeek, OpenRouter) add to `message` — mapped best-effort into a
 *  `thinking` content block, since standard OpenAI has no equivalent field. */
export function openaiResponseToAnthropic(
  response: OpenAIChatCompletionResponse,
  ctx: { model: string },
): AnthropicMessageResponse {
  const choice = response.choices[0];
  const message = choice?.message;
  const content: AnthropicResponseContentBlock[] = [];

  const reasoningText = message?.reasoning_content ?? message?.reasoning;
  if (reasoningText) {
    content.push({ type: 'thinking', thinking: reasoningText });
  }
  if (message?.content) {
    content.push({ type: 'text', text: message.content });
  }
  for (const call of message?.tool_calls ?? []) {
    content.push({
      type: 'tool_use',
      id: call.id ?? '',
      name: call.function.name ?? '',
      input: parseToolCallInput(call.function.arguments),
    });
  }

  return {
    id: response.id,
    type: 'message',
    role: 'assistant',
    model: ctx.model,
    content,
    stop_reason: mapFinishReason(choice?.finish_reason ?? null),
    usage: mapUsage(response.usage),
  };
}
