import { CatalogProvider, ReasoningInput, ReasoningMapping } from '../types';
import {
  AnthropicContentBlock,
  AnthropicDocumentSource,
  AnthropicImageSource,
  AnthropicMessage,
  AnthropicMessagesRequest,
  AnthropicThinkingConfig,
  AnthropicTool,
  AnthropicToolChoice,
  OpenAIChatCompletionRequest,
  OpenAIContentPart,
  OpenAIMessage,
  OpenAIToolCall,
  OpenAITool,
  OpenAIToolChoice,
} from './types';

/** Interprets a declarative `ReasoningMapping` (this repo already ships the
 *  descriptor, but nothing previously applied one) and returns the field(s)
 *  to merge into an outgoing OpenAI-protocol request body. An array of
 *  mappings means "apply all of these and merge the results," matching
 *  `CatalogProvider.reasoning`'s own documented semantics. */
export function applyReasoningMapping(
  mapping: ReasoningMapping | ReasoningMapping[] | undefined,
  input: ReasoningInput | undefined,
  ctx: { model?: string },
): Record<string, unknown> {
  if (!mapping) return {};
  const mappings = Array.isArray(mapping) ? mapping : [mapping];
  const result: Record<string, unknown> = {};
  for (const m of mappings) {
    const fields = applyOneReasoningMapping(m, input, ctx);
    if (fields) Object.assign(result, fields);
  }
  return result;
}

function applyOneReasoningMapping(
  mapping: ReasoningMapping,
  input: ReasoningInput | undefined,
  ctx: { model?: string },
): Record<string, unknown> | undefined {
  switch (mapping.kind) {
    case 'none':
      return undefined;
    case 'effort-scalar': {
      if (!input || input.enabled === false || input.effort === 'none') {
        return undefined;
      }
      if (!input.effort) return undefined;
      return { [mapping.param]: input.effort };
    }
    case 'thinking-object': {
      if (!input) return undefined;
      if (input.enabled === false || input.effort === 'none') {
        return { [mapping.param]: { type: 'disabled' } };
      }
      const thinking: Record<string, unknown> = { type: 'enabled' };
      if (mapping.includeBudget && input.max_tokens !== undefined) {
        thinking.budget_tokens = input.max_tokens;
      }
      return { [mapping.param]: thinking };
    }
    case 'passthrough-object': {
      if (!input || Object.keys(input).length === 0) return undefined;
      return { [mapping.param]: input };
    }
    case 'custom': {
      const value = mapping.fn(input, ctx);
      if (value === undefined) return undefined;
      return { [mapping.param]: value };
    }
  }
}

// Anthropic's `thinking` config has no notion of effort tiers ('low'/'high'
// etc.) — only on/off (+ optional token budget). When enabling reasoning
// without an explicit equivalent, default effort to 'medium' so
// effort-scalar-mapped providers (e.g. OpenAI) still turn reasoning on
// instead of silently no-op'ing.
function anthropicThinkingToReasoningInput(
  thinking: AnthropicThinkingConfig | undefined,
): ReasoningInput | undefined {
  if (!thinking) return undefined;
  if (thinking.type === 'disabled') return { enabled: false };
  const input: ReasoningInput = { enabled: true, effort: 'medium' };
  if (thinking.type === 'enabled') input.max_tokens = thinking.budget_tokens;
  return input;
}

function systemToOpenAIMessage(
  system: AnthropicMessagesRequest['system'],
): OpenAIMessage | undefined {
  if (!system) return undefined;
  if (typeof system === 'string') return { role: 'system', content: system };
  const text = system.map((block) => block.text).join('\n\n');
  return { role: 'system', content: text };
}

function anthropicSourceToDataUrlOrUrl(
  source: AnthropicImageSource | AnthropicDocumentSource,
): string | undefined {
  if (source.type === 'url' && source.url) return source.url;
  if (source.type === 'base64' && source.data) {
    const mediaType = source.media_type ?? 'application/octet-stream';
    return `data:${mediaType};base64,${source.data}`;
  }
  if (source.type === 'text' && source.data) {
    const mediaType = source.media_type ?? 'text/plain';
    const base64 = Buffer.from(source.data, 'utf8').toString('base64');
    return `data:${mediaType};base64,${base64}`;
  }
  return undefined;
}

function anthropicBlockToOpenAIPart(
  block: AnthropicContentBlock,
): OpenAIContentPart | undefined {
  if (block.type === 'text') return { type: 'text', text: block.text };
  if (block.type === 'image') {
    const url = anthropicSourceToDataUrlOrUrl(block.source);
    return url ? { type: 'image_url', image_url: { url } } : undefined;
  }
  if (block.type === 'document') {
    const fileData = anthropicSourceToDataUrlOrUrl(block.source);
    return fileData
      ? { type: 'file', file: { file_data: fileData, filename: block.title } }
      : undefined;
  }
  return undefined;
}

function partsToContent(
  parts: OpenAIContentPart[],
): string | OpenAIContentPart[] | null {
  if (parts.length === 0) return null;
  if (parts.length === 1 && parts[0].type === 'text') return parts[0].text;
  return parts;
}

function toolResultToString(
  content: string | AnthropicContentBlock[] | undefined,
): string {
  if (content === undefined) return '';
  if (typeof content === 'string') return content;
  // OpenAI's `tool` role message content is plain text — flatten to text
  // blocks only (images inside a tool_result are dropped, a v1 simplification).
  return content
    .filter(
      (b): b is Extract<AnthropicContentBlock, { type: 'text' }> =>
        b.type === 'text',
    )
    .map((b) => b.text)
    .join('\n');
}

function anthropicMessagesToOpenAI(
  messages: AnthropicMessage[],
): OpenAIMessage[] {
  const result: OpenAIMessage[] = [];

  for (const msg of messages) {
    if (typeof msg.content === 'string') {
      result.push({ role: msg.role, content: msg.content });
      continue;
    }

    if (msg.role === 'assistant') {
      const textParts: OpenAIContentPart[] = [];
      const toolCalls: OpenAIToolCall[] = [];
      for (const block of msg.content) {
        if (block.type === 'text') {
          textParts.push({ type: 'text', text: block.text });
        } else if (block.type === 'tool_use') {
          toolCalls.push({
            id: block.id,
            type: 'function',
            function: {
              name: block.name,
              arguments: JSON.stringify(block.input),
            },
          });
        }
        // 'thinking' blocks fed back in have no OpenAI request equivalent — dropped.
      }
      const message: OpenAIMessage = {
        role: 'assistant',
        content: partsToContent(textParts),
      };
      if (toolCalls.length > 0) message.tool_calls = toolCalls;
      result.push(message);
      continue;
    }

    // role === 'user': tool_result blocks become separate `tool` messages;
    // remaining text/image/document blocks become one `user` message.
    const userParts: OpenAIContentPart[] = [];
    for (const block of msg.content) {
      if (block.type === 'tool_result') {
        result.push({
          role: 'tool',
          content: toolResultToString(block.content),
          tool_call_id: block.tool_use_id,
        });
      } else {
        const part = anthropicBlockToOpenAIPart(block);
        if (part) userParts.push(part);
      }
    }
    if (userParts.length > 0) {
      result.push({ role: 'user', content: partsToContent(userParts) });
    }
  }

  return result;
}

function anthropicToolsToOpenAI(
  tools: AnthropicTool[] | undefined,
): OpenAITool[] | undefined {
  if (!tools || tools.length === 0) return undefined;
  return tools.map((t) => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.input_schema,
    },
  }));
}

function anthropicToolChoiceToOpenAI(
  choice: AnthropicToolChoice | undefined,
): OpenAIToolChoice | undefined {
  if (!choice) return undefined;
  switch (choice.type) {
    case 'auto':
      return 'auto';
    case 'any':
      return 'required';
    case 'none':
      return 'none';
    case 'tool':
      return { type: 'function', function: { name: choice.name } };
  }
}

/** Converts an Anthropic Messages API request into an OpenAI Chat
 *  Completions request for `provider`, using that provider's own declared
 *  `reasoning.openai` mapping to encode `thinking` — no per-provider code
 *  needed beyond what's already in the catalog. */
export function anthropicRequestToOpenAI(
  request: AnthropicMessagesRequest,
  provider: CatalogProvider,
): OpenAIChatCompletionRequest {
  const messages: OpenAIMessage[] = [];
  const systemMessage = systemToOpenAIMessage(request.system);
  if (systemMessage) messages.push(systemMessage);
  messages.push(...anthropicMessagesToOpenAI(request.messages));

  const body: OpenAIChatCompletionRequest = {
    model: request.model,
    messages,
    max_completion_tokens: request.max_tokens,
  };
  if (request.temperature !== undefined) body.temperature = request.temperature;
  if (request.top_p !== undefined) body.top_p = request.top_p;
  if (request.stop_sequences && request.stop_sequences.length > 0) {
    body.stop = request.stop_sequences;
  }
  if (request.stream !== undefined) {
    body.stream = request.stream;
    if (request.stream) body.stream_options = { include_usage: true };
  }
  const tools = anthropicToolsToOpenAI(request.tools);
  if (tools) body.tools = tools;
  const toolChoice = anthropicToolChoiceToOpenAI(request.tool_choice);
  if (toolChoice !== undefined) body.tool_choice = toolChoice;

  const reasoningInput = anthropicThinkingToReasoningInput(request.thinking);
  const reasoningFields = applyReasoningMapping(
    provider.reasoning?.openai,
    reasoningInput,
    { model: request.model },
  );
  Object.assign(body, reasoningFields);

  return body;
}
