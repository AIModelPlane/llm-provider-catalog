// Pragmatic (not full-API-surface) request/response/stream-chunk types for
// the OpenAI <-> Anthropic protocol transform. Scoped to v1 fidelity: text,
// function/tool calling, thinking/reasoning, image/document/audio input,
// and usage/token accounting. Explicitly NOT modeled: server-side tools
// (web_search/code_execution as response content), citations,
// cache_control, video input, batch API.

// ---------------------------------------------------------------------------
// Anthropic Messages API (request)
// ---------------------------------------------------------------------------

export interface AnthropicImageSource {
  type: 'base64' | 'url';
  media_type?: string;
  data?: string;
  url?: string;
}

export interface AnthropicDocumentSource {
  type: 'base64' | 'url' | 'text';
  media_type?: string;
  data?: string;
  url?: string;
}

export type AnthropicContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; source: AnthropicImageSource }
  | { type: 'document'; source: AnthropicDocumentSource; title?: string }
  | {
      type: 'tool_use';
      id: string;
      name: string;
      input: Record<string, unknown>;
    }
  | {
      type: 'tool_result';
      tool_use_id: string;
      content?: string | AnthropicContentBlock[];
      is_error?: boolean;
    };

export interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string | AnthropicContentBlock[];
}

export interface AnthropicTool {
  name: string;
  description?: string;
  input_schema: Record<string, unknown>;
}

export type AnthropicToolChoice =
  | { type: 'auto'; disable_parallel_tool_use?: boolean }
  | { type: 'any'; disable_parallel_tool_use?: boolean }
  | { type: 'tool'; name: string; disable_parallel_tool_use?: boolean }
  | { type: 'none' };

export type AnthropicThinkingConfig =
  | { type: 'enabled'; budget_tokens: number }
  | { type: 'disabled' }
  | { type: 'adaptive' };

export interface AnthropicMessagesRequest {
  model: string;
  system?: string | { type: 'text'; text: string }[];
  messages: AnthropicMessage[];
  max_tokens: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  stop_sequences?: string[];
  stream?: boolean;
  thinking?: AnthropicThinkingConfig;
  tools?: AnthropicTool[];
  tool_choice?: AnthropicToolChoice;
}

// ---------------------------------------------------------------------------
// Anthropic Messages API (non-streaming response)
// ---------------------------------------------------------------------------

export type AnthropicResponseContentBlock =
  | { type: 'text'; text: string }
  | {
      type: 'tool_use';
      id: string;
      name: string;
      input: Record<string, unknown>;
    }
  | { type: 'thinking'; thinking: string };

export type AnthropicStopReason =
  'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use' | 'refusal' | null;

export interface AnthropicUsage {
  input_tokens: number;
  output_tokens: number;
  output_tokens_details?: { thinking_tokens?: number };
}

export interface AnthropicMessageResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  model: string;
  content: AnthropicResponseContentBlock[];
  stop_reason: AnthropicStopReason;
  stop_sequence?: string | null;
  usage: AnthropicUsage;
}

// ---------------------------------------------------------------------------
// Anthropic Messages API (streaming events)
// ---------------------------------------------------------------------------

export type AnthropicStreamEvent =
  | { type: 'message_start'; message: AnthropicMessageResponse }
  | {
      type: 'content_block_start';
      index: number;
      content_block:
        | { type: 'text'; text: '' }
        | {
            type: 'tool_use';
            id: string;
            name: string;
            input: Record<string, never>;
          }
        | { type: 'thinking'; thinking: '' };
    }
  | {
      type: 'content_block_delta';
      index: number;
      delta:
        | { type: 'text_delta'; text: string }
        | { type: 'input_json_delta'; partial_json: string }
        | { type: 'thinking_delta'; thinking: string };
    }
  | { type: 'content_block_stop'; index: number }
  | {
      type: 'message_delta';
      delta: {
        stop_reason: AnthropicStopReason;
        stop_sequence?: string | null;
      };
      usage: Partial<AnthropicUsage>;
    }
  | { type: 'message_stop' };

// ---------------------------------------------------------------------------
// OpenAI Chat Completions API (request)
// ---------------------------------------------------------------------------

export type OpenAIContentPart =
  | { type: 'text'; text: string }
  | {
      type: 'image_url';
      image_url: { url: string; detail?: 'auto' | 'low' | 'high' };
    }
  | {
      type: 'input_audio';
      input_audio: { data: string; format: 'wav' | 'mp3' };
    }
  | {
      type: 'file';
      file: { file_data?: string; file_id?: string; filename?: string };
    };

export interface OpenAIToolCall {
  index?: number;
  id?: string;
  type: 'function';
  function: { name?: string; arguments: string };
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | OpenAIContentPart[] | null;
  tool_calls?: OpenAIToolCall[];
  tool_call_id?: string;
}

export interface OpenAITool {
  type: 'function';
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
}

export type OpenAIToolChoice =
  | 'none'
  | 'auto'
  | 'required'
  | { type: 'function'; function: { name: string } };

export interface OpenAIChatCompletionRequest {
  model: string;
  messages: OpenAIMessage[];
  max_completion_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
  stream?: boolean;
  stream_options?: { include_usage: boolean };
  tools?: OpenAITool[];
  tool_choice?: OpenAIToolChoice;
  [key: string]: unknown; // ReasoningMapping output merges arbitrary keys here
}

// ---------------------------------------------------------------------------
// OpenAI Chat Completions API (non-streaming response)
// ---------------------------------------------------------------------------

export interface OpenAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  completion_tokens_details?: { reasoning_tokens?: number };
}

export type OpenAIFinishReason =
  'stop' | 'length' | 'tool_calls' | 'content_filter' | null;

export interface OpenAIChatCompletionResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: 'assistant';
      content: string | null;
      tool_calls?: OpenAIToolCall[];
      reasoning_content?: string;
      reasoning?: string;
    };
    finish_reason: OpenAIFinishReason;
  }>;
  usage?: OpenAIUsage;
}

// ---------------------------------------------------------------------------
// OpenAI Chat Completions API (streaming chunk)
// ---------------------------------------------------------------------------

export interface OpenAIChatCompletionChunk {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: 'assistant';
      content?: string | null;
      tool_calls?: OpenAIToolCall[];
      reasoning_content?: string;
      reasoning?: string;
    };
    finish_reason: OpenAIFinishReason;
  }>;
  usage?: OpenAIUsage;
}
