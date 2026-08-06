import {
  AnthropicStopReason,
  AnthropicUsage,
  OpenAIFinishReason,
  OpenAIUsage,
} from './types';

const FINISH_REASON_MAP: Record<
  Exclude<OpenAIFinishReason, null>,
  AnthropicStopReason
> = {
  stop: 'end_turn',
  length: 'max_tokens',
  tool_calls: 'tool_use',
  // Anthropic has no direct "content_filter" stop_reason; 'refusal' is the
  // closest existing value — best-effort, not a documented equivalence.
  content_filter: 'refusal',
};

export function mapFinishReason(
  reason: OpenAIFinishReason,
): AnthropicStopReason {
  if (reason === null) return null;
  return FINISH_REASON_MAP[reason] ?? null;
}

export function mapUsage(usage: OpenAIUsage | undefined): AnthropicUsage {
  if (!usage) return { input_tokens: 0, output_tokens: 0 };
  const result: AnthropicUsage = {
    input_tokens: usage.prompt_tokens,
    output_tokens: usage.completion_tokens,
  };
  const reasoningTokens = usage.completion_tokens_details?.reasoning_tokens;
  if (reasoningTokens !== undefined) {
    result.output_tokens_details = { thinking_tokens: reasoningTokens };
  }
  return result;
}

export function parseToolCallInput(
  argumentsJson: string,
): Record<string, unknown> {
  if (!argumentsJson) return {};
  try {
    return JSON.parse(argumentsJson) as Record<string, unknown>;
  } catch {
    return {};
  }
}
