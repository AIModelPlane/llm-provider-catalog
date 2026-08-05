// GENERATED FILE — do not hand-edit.
// Regenerate with: npm run fetch-openrouter-models
// (runs agent/scripts/fetch-openrouter-models.mjs against https://openrouter.ai/api/v1/models and
// https://openrouter.ai/api/v1/models?output_modalities=embeddings)
import { CatalogModel, CatalogEmbeddingModel } from '../types';

export const OPENROUTER_MODELS: CatalogModel[] = [
  {
    id: 'ai21/jamba-large-1.7',
    label: 'AI21: Jamba Large 1.7',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 4096,
      features: { toolUse: true },
    },
  },
  {
    id: 'aion-labs/aion-2.0',
    label: 'AionLabs: Aion-2.0',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'aion-labs/aion-3.0',
    label: 'AionLabs: Aion-3.0',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'aion-labs/aion-3.0-mini',
    label: 'AionLabs: Aion-3.0-Mini',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'aion-labs/aion-rp-llama-3.1-8b',
    label: 'AionLabs: Aion-RP 1.0 (8B)',
    capability: { contextWindowTokens: 32768, maxOutputTokens: 32768 },
  },
  {
    id: 'allenai/olmo-3-32b-think',
    label: 'AllenAI: Olmo 3 32B Think',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 65536,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'amazon/nova-2-lite-v1',
    label: 'Amazon: Nova 2 Lite',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65535,
      modalities: {
        input: ['text', 'image', 'video', 'file'],
        output: ['text'],
      },
      features: { toolUse: true },
    },
  },
  {
    id: 'amazon/nova-lite-v1',
    label: 'Amazon: Nova Lite 1.0',
    capability: {
      contextWindowTokens: 300000,
      maxOutputTokens: 5120,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'amazon/nova-micro-v1',
    label: 'Amazon: Nova Micro 1.0',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 5120,
      features: { toolUse: true },
    },
  },
  {
    id: 'amazon/nova-premier-v1',
    label: 'Amazon: Nova Premier 1.0',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 32000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'amazon/nova-pro-v1',
    label: 'Amazon: Nova Pro 1.0',
    capability: {
      contextWindowTokens: 300000,
      maxOutputTokens: 5120,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'anthracite-org/magnum-v4-72b',
    label: 'Magnum v4 72B',
    capability: {
      contextWindowTokens: 16384,
      maxOutputTokens: 2048,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-3-haiku',
    label: 'Anthropic: Claude 3 Haiku',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 4096,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'anthropic/claude-fable-5',
    label: 'Anthropic: Claude Fable 5',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-haiku-4.5',
    label: 'Anthropic: Claude Haiku 4.5',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 64000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4',
    label: 'Anthropic: Claude Opus 4',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 32000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.1',
    label: 'Anthropic: Claude Opus 4.1',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 32000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.5',
    label: 'Anthropic: Claude Opus 4.5',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 64000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.6',
    label: 'Anthropic: Claude Opus 4.6',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.7',
    label: 'Anthropic: Claude Opus 4.7',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.7-fast',
    label: 'Anthropic: Claude Opus 4.7 (Fast)',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.8',
    label: 'Anthropic: Claude Opus 4.8',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-4.8-fast',
    label: 'Anthropic: Claude Opus 4.8 (Fast)',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-5',
    label: 'Claude Opus 5',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-opus-5-fast',
    label: 'Claude Opus 5 (Fast)',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-sonnet-4',
    label: 'Anthropic: Claude Sonnet 4',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 64000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'anthropic/claude-sonnet-4.5',
    label: 'Anthropic: Claude Sonnet 4.5',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 64000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-sonnet-4.6',
    label: 'Anthropic: Claude Sonnet 4.6',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'anthropic/claude-sonnet-5',
    label: 'Anthropic: Claude Sonnet 5',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'arcee-ai/trinity-large-thinking',
    label: 'Arcee AI: Trinity Large Thinking',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'arcee-ai/virtuoso-large',
    label: 'Arcee AI: Virtuoso Large',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 64000,
      features: { toolUse: true },
    },
  },
  {
    id: 'baidu/ernie-4.5-vl-424b-a47b',
    label: 'Baidu: ERNIE 4.5 VL 424B A47B ',
    capability: {
      contextWindowTokens: 123000,
      maxOutputTokens: 16000,
      modalities: { input: ['image', 'text'], output: ['text'] },
    },
  },
  {
    id: 'bytedance-seed/seed-1.6',
    label: 'ByteDance Seed: Seed 1.6',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'bytedance-seed/seed-1.6-flash',
    label: 'ByteDance Seed: Seed 1.6 Flash',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'bytedance-seed/seed-2.0-lite',
    label: 'ByteDance Seed: Seed-2.0-Lite',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'bytedance-seed/seed-2.0-mini',
    label: 'ByteDance Seed: Seed-2.0-Mini',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'bytedance/ui-tars-1.5-7b',
    label: 'ByteDance: UI-TARS 7B ',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 2048,
      modalities: { input: ['image', 'text'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition',
    label: 'Venice: Uncensored',
    capability: { contextWindowTokens: 128000, maxOutputTokens: 8192 },
  },
  {
    id: 'cohere/command-a',
    label: 'Cohere: Command A',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 8192,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'cohere/command-r-08-2024',
    label: 'Cohere: Command R (08-2024)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 4000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'cohere/command-r-plus-08-2024',
    label: 'Cohere: Command R+ (08-2024)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 4000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'cohere/command-r7b-12-2024',
    label: 'Cohere: Command R7B (12-2024)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 4000,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'cohere/north-mini-code:free',
    label: 'Cohere: North Mini Code (free)',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 64000,
      features: { toolUse: true },
    },
  },
  {
    id: 'deepcogito/cogito-v2.1-671b',
    label: 'Deep Cogito: Cogito v2.1 671B',
    capability: {
      contextWindowTokens: 128000,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-chat',
    label: 'DeepSeek: DeepSeek V3',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 16000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324',
    label: 'DeepSeek: DeepSeek V3 0324',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-chat-v3.1',
    label: 'DeepSeek: DeepSeek V3.1',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-r1',
    label: 'DeepSeek: R1',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 16000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-r1-0528',
    label: 'DeepSeek: R1 0528',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-r1-distill-llama-70b',
    label: 'DeepSeek: R1 Distill Llama 70B',
    capability: { contextWindowTokens: 8192, maxOutputTokens: 8192 },
  },
  {
    id: 'deepseek/deepseek-v3.1-terminus',
    label: 'DeepSeek: DeepSeek V3.1 Terminus',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v3.2',
    label: 'DeepSeek: DeepSeek V3.2',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v3.2-exp',
    label: 'DeepSeek: DeepSeek V3.2 Exp',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-flash',
    label: 'DeepSeek: DeepSeek V4 Flash 0423',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-flash-0731',
    label: 'DeepSeek: DeepSeek V4 Flash 0731',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-pro',
    label: 'DeepSeek: DeepSeek V4 Pro',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 384000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-2.5-flash',
    label: 'Google: Gemini 2.5 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65535,
      modalities: {
        input: ['file', 'image', 'text', 'audio', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-2.5-flash-image',
    label: 'Google: Nano Banana (Gemini 2.5 Flash Image)',
    capability: {
      contextWindowTokens: 32768,
      maxOutputTokens: 8192,
      modalities: { input: ['image', 'text'], output: ['image', 'text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-2.5-flash-lite',
    label: 'Google: Gemini 2.5 Flash Lite',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65535,
      modalities: {
        input: ['text', 'image', 'file', 'audio', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-2.5-pro',
    label: 'Google: Gemini 2.5 Pro',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'file', 'audio', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-2.5-pro-preview',
    label: 'Google: Gemini 2.5 Pro Preview 06-05',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['file', 'image', 'text', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-2.5-pro-preview-05-06',
    label: 'Google: Gemini 2.5 Pro Preview 05-06',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65535,
      modalities: {
        input: ['text', 'image', 'file', 'audio', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3-flash-preview',
    label: 'Google: Gemini 3 Flash Preview',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65535,
      modalities: {
        input: ['text', 'image', 'file', 'audio', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3-pro-image',
    label: 'Google: Nano Banana Pro (Gemini 3 Pro Image)',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text'], output: ['image', 'text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3-pro-image-preview',
    label: 'Google: Nano Banana Pro (Gemini 3 Pro Image Preview)',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text'], output: ['image', 'text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.1-flash-image',
    label: 'Google: Nano Banana 2 (Gemini 3.1 Flash Image)',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text'], output: ['image', 'text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.1-flash-image-preview',
    label: 'Google: Nano Banana 2 (Gemini 3.1 Flash Image Preview)',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 65536,
      modalities: { input: ['image', 'text'], output: ['image', 'text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.1-flash-lite',
    label: 'Google: Gemini 3.1 Flash Lite',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.1-flash-lite-image',
    label: 'Google: Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image)',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 65536,
      modalities: { input: ['image', 'text'], output: ['image', 'text'] },
    },
  },
  {
    id: 'google/gemini-3.1-flash-lite-preview',
    label: 'Google: Gemini 3.1 Flash Lite Preview',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.1-pro-preview',
    label: 'Google: Gemini 3.1 Pro Preview',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['audio', 'file', 'image', 'text', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.1-pro-preview-customtools',
    label: 'Google: Gemini 3.1 Pro Preview Custom Tools',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'audio', 'image', 'video', 'file'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.5-flash',
    label: 'Google: Gemini 3.5 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.5-flash-lite',
    label: 'Google: Gemini 3.5 Flash Lite',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemini-3.6-flash',
    label: 'Google: Gemini 3.6 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-2-27b-it',
    label: 'Google: Gemma 2 27B',
    capability: {
      contextWindowTokens: 8192,
      maxOutputTokens: 2048,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-3-12b-it',
    label: 'Google: Gemma 3 12B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-3-27b-it',
    label: 'Google: Gemma 3 27B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-3-4b-it',
    label: 'Google: Gemma 3 4B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-3n-e4b-it',
    label: 'Google: Gemma 3n 4B',
    capability: {
      contextWindowTokens: 32768,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-4-26b-a4b-it',
    label: 'Google: Gemma 4 26B A4B ',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 16384,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-4-26b-a4b-it:free',
    label: 'Google: Gemma 4 26B A4B  (free)',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-4-31b-it',
    label: 'Google: Gemma 4 31B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-4-31b-it:free',
    label: 'Google: Gemma 4 31B (free)',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'google/lyria-3-clip-preview',
    label: 'Google: Lyria 3 Clip Preview',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image'], output: ['text', 'audio'] },
    },
  },
  {
    id: 'google/lyria-3-pro-preview',
    label: 'Google: Lyria 3 Pro Preview',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image'], output: ['text', 'audio'] },
    },
  },
  {
    id: 'gryphe/mythomax-l2-13b',
    label: 'MythoMax 13B',
    capability: {
      contextWindowTokens: 8192,
      maxOutputTokens: 4096,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'ibm-granite/granite-4.0-h-micro',
    label: 'IBM: Granite 4.0 Micro',
    capability: { contextWindowTokens: 131000, maxOutputTokens: 131000 },
  },
  {
    id: 'ibm-granite/granite-4.1-8b',
    label: 'IBM: Granite 4.1 8B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'inception/mercury-2',
    label: 'Inception: Mercury 2',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 50000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'inclusionai/ling-2.6-1t',
    label: 'inclusionAI: Ling-2.6-1T',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'inclusionai/ling-2.6-flash',
    label: 'inclusionAI: Ling-2.6-flash',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'inclusionai/ling-3.0-flash:free',
    label: 'Ling-3.0-flash (free)',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'inclusionai/ring-2.6-1t',
    label: 'inclusionAI: Ring-2.6-1T',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      features: { toolUse: true },
    },
  },
  {
    id: 'kwaipilot/kat-coder-air-v2.5',
    label: 'Kwaipilot: KAT-Coder-Air V2.5',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 80000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'kwaipilot/kat-coder-pro-v2',
    label: 'Kwaipilot: KAT-Coder-Pro V2',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 80000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'kwaipilot/kat-coder-pro-v2.5',
    label: 'Kwaipilot: KAT-Coder-Pro V2.5',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 80000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mancer/weaver',
    label: 'Mancer: Weaver (alpha)',
    capability: {
      contextWindowTokens: 8000,
      maxOutputTokens: 2000,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'meituan/longcat-2.0',
    label: 'Meituan: LongCat 2.0',
    capability: {
      contextWindowTokens: 1048756,
      maxOutputTokens: 262144,
      features: { toolUse: true },
    },
  },
  {
    id: 'meta-llama/llama-3.1-70b-instruct',
    label: 'Meta: Llama 3.1 70B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-3.1-8b-instruct',
    label: 'Meta: Llama 3.1 8B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-3.2-1b-instruct',
    label: 'Meta: Llama 3.2 1B Instruct',
    capability: { contextWindowTokens: 60000, maxOutputTokens: 60000 },
  },
  {
    id: 'meta-llama/llama-3.2-3b-instruct',
    label: 'Meta: Llama 3.2 3B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    label: 'Meta: Llama 3.3 70B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-4-maverick',
    label: 'Meta: Llama 4 Maverick',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-4-scout',
    label: 'Meta: Llama 4 Scout',
    capability: {
      contextWindowTokens: 1310720,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-guard-4-12b',
    label: 'Meta: Llama Guard 4 12B',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 16384,
      modalities: { input: ['image', 'text'], output: ['text'] },
    },
  },
  {
    id: 'meta/muse-spark-1.1',
    label: 'Meta: Muse Spark 1.1',
    capability: {
      contextWindowTokens: 1048576,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'microsoft/phi-4',
    label: 'Microsoft: Phi 4',
    capability: {
      contextWindowTokens: 16384,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'microsoft/wizardlm-2-8x22b',
    label: 'WizardLM-2 8x22B',
    capability: { contextWindowTokens: 65535, maxOutputTokens: 8000 },
  },
  {
    id: 'minimax/minimax-01',
    label: 'MiniMax: MiniMax-01',
    capability: {
      contextWindowTokens: 1000192,
      maxOutputTokens: 1000192,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'minimax/minimax-m1',
    label: 'MiniMax: MiniMax M1',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 40000,
      features: { toolUse: true },
    },
  },
  {
    id: 'minimax/minimax-m2',
    label: 'MiniMax: MiniMax M2',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m2-her',
    label: 'MiniMax: MiniMax M2-her',
    capability: { contextWindowTokens: 65536, maxOutputTokens: 2048 },
  },
  {
    id: 'minimax/minimax-m2.1',
    label: 'MiniMax: MiniMax M2.1',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true },
    },
  },
  {
    id: 'minimax/minimax-m2.5',
    label: 'MiniMax: MiniMax M2.5',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 196608,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m2.7',
    label: 'MiniMax: MiniMax M2.7',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m3',
    label: 'MiniMax: MiniMax M3',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 512000,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/codestral-2508',
    label: 'Mistral: Codestral 2508',
    capability: {
      contextWindowTokens: 256000,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/ministral-14b-2512',
    label: 'Mistral: Ministral 3 14B 2512',
    capability: {
      contextWindowTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/ministral-3b-2512',
    label: 'Mistral: Ministral 3 3B 2512',
    capability: {
      contextWindowTokens: 131072,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/ministral-8b-2512',
    label: 'Mistral: Ministral 3 8B 2512',
    capability: {
      contextWindowTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-large',
    label: 'Mistral Large',
    capability: {
      contextWindowTokens: 128000,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-large-2407',
    label: 'Mistral Large 2407',
    capability: {
      contextWindowTokens: 131072,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-large-2512',
    label: 'Mistral: Mistral Large 3 2512',
    capability: {
      contextWindowTokens: 262144,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-medium-3',
    label: 'Mistral: Mistral Medium 3',
    capability: {
      contextWindowTokens: 131072,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-medium-3-5',
    label: 'Mistral: Mistral Medium 3.5',
    capability: {
      contextWindowTokens: 262144,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-medium-3.1',
    label: 'Mistral: Mistral Medium 3.1',
    capability: {
      contextWindowTokens: 131072,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-nemo',
    label: 'Mistral: Mistral Nemo',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-saba',
    label: 'Mistral: Saba',
    capability: {
      contextWindowTokens: 32768,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-small-24b-instruct-2501',
    label: 'Mistral: Mistral Small 3',
    capability: {
      contextWindowTokens: 32768,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-small-2603',
    label: 'Mistral: Mistral Small 4',
    capability: {
      contextWindowTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mistral-small-3.1-24b-instruct',
    label: 'Mistral: Mistral Small 3.1 24B',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'mistralai/mistral-small-3.2-24b-instruct',
    label: 'Mistral: Mistral Small 3.2 24B',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 16384,
      modalities: { input: ['image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/mixtral-8x22b-instruct',
    label: 'Mistral: Mixtral 8x22B Instruct',
    capability: {
      contextWindowTokens: 65536,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'mistralai/voxtral-small-24b-2507',
    label: 'Mistral: Voxtral Small 24B 2507',
    capability: {
      contextWindowTokens: 32000,
      modalities: { input: ['text', 'audio', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2',
    label: 'MoonshotAI: Kimi K2 0711',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 100352,
      features: { toolUse: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2-0905',
    label: 'MoonshotAI: Kimi K2 0905',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 100352,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2-thinking',
    label: 'MoonshotAI: Kimi K2 Thinking',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 100352,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2.5',
    label: 'MoonshotAI: Kimi K2.5',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2.6',
    label: 'MoonshotAI: Kimi K2.6',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2.7-code',
    label: 'MoonshotAI: Kimi K2.7 Code',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k3',
    label: 'MoonshotAI: Kimi K3',
    capability: {
      contextWindowTokens: 1048576,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'morph/morph-v3-fast',
    label: 'Morph: Morph V3 Fast',
    capability: { contextWindowTokens: 81920, maxOutputTokens: 38000 },
  },
  {
    id: 'morph/morph-v3-large',
    label: 'Morph: Morph V3 Large',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'nex-agi/nex-n2-mini',
    label: 'Nex AGI: Nex-N2-Mini',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nex-agi/nex-n2-pro',
    label: 'Nex AGI: Nex-N2-Pro',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'nousresearch/hermes-3-llama-3.1-405b',
    label: 'Nous: Hermes 3 405B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'nousresearch/hermes-3-llama-3.1-70b',
    label: 'Nous: Hermes 3 70B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'nousresearch/hermes-4-405b',
    label: 'Nous: Hermes 4 405B',
    capability: { contextWindowTokens: 131072 },
  },
  {
    id: 'nousresearch/hermes-4-70b',
    label: 'Nous: Hermes 4 70B',
    capability: { contextWindowTokens: 131072 },
  },
  {
    id: 'nvidia/nemotron-3-nano-30b-a3b',
    label: 'NVIDIA: Nemotron 3 Nano 30B A3B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nvidia/nemotron-3-nano-30b-a3b:free',
    label: 'NVIDIA: Nemotron 3 Nano 30B A3B (free)',
    capability: { contextWindowTokens: 256000, features: { toolUse: true } },
  },
  {
    id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    label: 'NVIDIA: Nemotron 3 Nano Omni (free)',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'audio', 'image', 'video'],
        output: ['text'],
      },
      features: { toolUse: true },
    },
  },
  {
    id: 'nvidia/nemotron-3-super-120b-a12b',
    label: 'NVIDIA: Nemotron 3 Super',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    label: 'NVIDIA: Nemotron 3 Super (free)',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nvidia/nemotron-3-ultra-550b-a55b',
    label: 'NVIDIA: Nemotron 3 Ultra',
    capability: {
      contextWindowTokens: 512288,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    label: 'NVIDIA: Nemotron 3 Ultra (free)',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      features: { toolUse: true },
    },
  },
  {
    id: 'nvidia/nemotron-3.5-content-safety:free',
    label: 'NVIDIA: Nemotron 3.5 Content Safety (free)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 8192,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'nvidia/nemotron-nano-12b-v2-vl:free',
    label: 'NVIDIA: Nemotron Nano 12B 2 VL (free)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 128000,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'nvidia/nemotron-nano-9b-v2:free',
    label: 'NVIDIA: Nemotron Nano 9B V2 (free)',
    capability: {
      contextWindowTokens: 128000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-3.5-turbo',
    label: 'OpenAI: GPT-3.5 Turbo',
    capability: {
      contextWindowTokens: 16385,
      maxOutputTokens: 4096,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-3.5-turbo-0613',
    label: 'OpenAI: GPT-3.5 Turbo (older v0613)',
    capability: {
      contextWindowTokens: 4095,
      maxOutputTokens: 4096,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-3.5-turbo-16k',
    label: 'OpenAI: GPT-3.5 Turbo 16k',
    capability: {
      contextWindowTokens: 16385,
      maxOutputTokens: 4096,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-3.5-turbo-instruct',
    label: 'OpenAI: GPT-3.5 Turbo Instruct',
    capability: {
      contextWindowTokens: 4095,
      maxOutputTokens: 4096,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4',
    label: 'OpenAI: GPT-4',
    capability: {
      contextWindowTokens: 8191,
      maxOutputTokens: 4096,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4-turbo',
    label: 'OpenAI: GPT-4 Turbo',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 4096,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4-turbo-preview',
    label: 'OpenAI: GPT-4 Turbo Preview',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 4096,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4.1',
    label: 'OpenAI: GPT-4.1',
    capability: {
      contextWindowTokens: 1047576,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4.1-mini',
    label: 'OpenAI: GPT-4.1 Mini',
    capability: {
      contextWindowTokens: 1047576,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4.1-nano',
    label: 'OpenAI: GPT-4.1 Nano',
    capability: {
      contextWindowTokens: 1047576,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-4o',
    label: 'OpenAI: GPT-4o',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openai/gpt-4o-2024-05-13',
    label: 'OpenAI: GPT-4o (2024-05-13)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 4096,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openai/gpt-4o-2024-08-06',
    label: 'OpenAI: GPT-4o (2024-08-06)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openai/gpt-4o-2024-11-20',
    label: 'OpenAI: GPT-4o (2024-11-20)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openai/gpt-4o-mini',
    label: 'OpenAI: GPT-4o-mini',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openai/gpt-4o-mini-2024-07-18',
    label: 'OpenAI: GPT-4o-mini (2024-07-18)',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openai/gpt-5',
    label: 'OpenAI: GPT-5',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5-image',
    label: 'OpenAI: GPT-5 Image',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: {
        input: ['image', 'text', 'file'],
        output: ['image', 'text'],
      },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5-image-mini',
    label: 'OpenAI: GPT-5 Image Mini',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: {
        input: ['file', 'image', 'text'],
        output: ['image', 'text'],
      },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5-mini',
    label: 'OpenAI: GPT-5 Mini',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5-nano',
    label: 'OpenAI: GPT-5 Nano',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5-pro',
    label: 'OpenAI: GPT-5 Pro',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.1',
    label: 'OpenAI: GPT-5.1',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.1-codex',
    label: 'OpenAI: GPT-5.1-Codex',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.1-codex-max',
    label: 'OpenAI: GPT-5.1-Codex-Max',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.1-codex-mini',
    label: 'OpenAI: GPT-5.1-Codex-Mini',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.2',
    label: 'OpenAI: GPT-5.2',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.2-chat',
    label: 'OpenAI: GPT-5.2 Chat',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.2-codex',
    label: 'OpenAI: GPT-5.2-Codex',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.2-pro',
    label: 'OpenAI: GPT-5.2 Pro',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.3-chat',
    label: 'OpenAI: GPT-5.3 Chat',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.3-codex',
    label: 'OpenAI: GPT-5.3-Codex',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.4',
    label: 'OpenAI: GPT-5.4',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.4-image-2',
    label: 'OpenAI: GPT-5.4 Image 2',
    capability: {
      contextWindowTokens: 272000,
      maxOutputTokens: 128000,
      modalities: {
        input: ['image', 'text', 'file'],
        output: ['image', 'text'],
      },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.4-mini',
    label: 'OpenAI: GPT-5.4 Mini',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.4-nano',
    label: 'OpenAI: GPT-5.4 Nano',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.4-pro',
    label: 'OpenAI: GPT-5.4 Pro',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.5',
    label: 'OpenAI: GPT-5.5',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.5-pro',
    label: 'OpenAI: GPT-5.5 Pro',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.6-luna',
    label: 'OpenAI: GPT-5.6 Luna',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.6-luna-pro',
    label: 'OpenAI: GPT-5.6 Luna Pro',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.6-sol',
    label: 'OpenAI: GPT-5.6 Sol',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.6-sol-pro',
    label: 'OpenAI: GPT-5.6 Sol Pro',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.6-terra',
    label: 'OpenAI: GPT-5.6 Terra',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-5.6-terra-pro',
    label: 'OpenAI: GPT-5.6 Terra Pro',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-audio',
    label: 'OpenAI: GPT Audio',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'audio'], output: ['text', 'audio'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-audio-mini',
    label: 'OpenAI: GPT Audio Mini',
    capability: {
      contextWindowTokens: 128000,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'audio'], output: ['text', 'audio'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-chat-latest',
    label: 'OpenAI: GPT Chat Latest',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-oss-120b',
    label: 'OpenAI: gpt-oss-120b',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-oss-20b',
    label: 'OpenAI: gpt-oss-20b',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-oss-20b:free',
    label: 'OpenAI: gpt-oss-20b (free)',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-oss-safeguard-20b',
    label: 'OpenAI: gpt-oss-safeguard-20b',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o1',
    label: 'OpenAI: o1',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o1-pro',
    label: 'OpenAI: o1-pro',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'openai/o3',
    label: 'OpenAI: o3',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o3-mini',
    label: 'OpenAI: o3 Mini',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o3-mini-high',
    label: 'OpenAI: o3 Mini High',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o3-pro',
    label: 'OpenAI: o3 Pro',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['text', 'file', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o4-mini',
    label: 'OpenAI: o4 Mini',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/o4-mini-high',
    label: 'OpenAI: o4 Mini High',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 100000,
      modalities: { input: ['image', 'text', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openrouter/auto',
    label: 'Auto Router',
    capability: {
      contextWindowTokens: 2000000,
      modalities: {
        input: ['text', 'image', 'audio', 'file', 'video'],
        output: ['text', 'image'],
      },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openrouter/auto-beta',
    label: 'Auto Router (Beta)',
    capability: {
      contextWindowTokens: 2000000,
      modalities: {
        input: ['text', 'image', 'audio', 'file', 'video'],
        output: ['text', 'image'],
      },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'openrouter/bodybuilder',
    label: 'Body Builder (beta)',
    capability: { contextWindowTokens: 128000 },
  },
  {
    id: 'openrouter/free',
    label: 'Free Models Router',
    capability: {
      contextWindowTokens: 200000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openrouter/fusion',
    label: 'OpenRouter: Fusion',
    capability: { contextWindowTokens: 1000000 },
  },
  {
    id: 'openrouter/pareto-code',
    label: 'Pareto Code Router',
    capability: { contextWindowTokens: 2000000 },
  },
  {
    id: 'perceptron/perceptron-mk1',
    label: 'Perceptron: Perceptron Mk1',
    capability: {
      contextWindowTokens: 32768,
      maxOutputTokens: 8192,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'perplexity/sonar',
    label: 'Perplexity: Sonar',
    capability: {
      contextWindowTokens: 127072,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { webSearch: true },
    },
  },
  {
    id: 'perplexity/sonar-deep-research',
    label: 'Perplexity: Sonar Deep Research',
    capability: { contextWindowTokens: 128000, features: { webSearch: true } },
  },
  {
    id: 'perplexity/sonar-pro',
    label: 'Perplexity: Sonar Pro',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 8000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { webSearch: true },
    },
  },
  {
    id: 'perplexity/sonar-pro-search',
    label: 'Perplexity: Sonar Pro Search',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 8000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'perplexity/sonar-reasoning-pro',
    label: 'Perplexity: Sonar Reasoning Pro',
    capability: {
      contextWindowTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { webSearch: true },
    },
  },
  {
    id: 'poolside/laguna-s-2.1',
    label: 'Poolside: Laguna S 2.1',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      features: { toolUse: true },
    },
  },
  {
    id: 'poolside/laguna-s-2.1:free',
    label: 'Poolside: Laguna S 2.1 (free)',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'poolside/laguna-xs-2.1',
    label: 'Poolside: Laguna XS 2.1',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'poolside/laguna-xs-2.1:free',
    label: 'Poolside: Laguna XS 2.1 (free)',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct',
    label: 'Qwen2.5 72B Instruct',
    capability: {
      contextWindowTokens: 32768,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen-2.5-7b-instruct',
    label: 'Qwen: Qwen2.5 7B Instruct',
    capability: {
      contextWindowTokens: 32768,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen-2.5-coder-32b-instruct',
    label: 'Qwen2.5 Coder 32B Instruct',
    capability: { contextWindowTokens: 32768, maxOutputTokens: 32768 },
  },
  {
    id: 'qwen/qwen-plus',
    label: 'Qwen: Qwen-Plus',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen-plus-2025-07-28',
    label: 'Qwen: Qwen Plus 0728',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen-plus-2025-07-28:thinking',
    label: 'Qwen: Qwen Plus 0728 (thinking)',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen2.5-vl-72b-instruct',
    label: 'Qwen: Qwen2.5 VL 72B Instruct',
    capability: {
      contextWindowTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-14b',
    label: 'Qwen: Qwen3 14B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 8192,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-235b-a22b',
    label: 'Qwen: Qwen3 235B A22B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 8192,
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen3-235b-a22b-2507',
    label: 'Qwen: Qwen3 235B A22B Instruct 2507',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-235b-a22b-thinking-2507',
    label: 'Qwen: Qwen3 235B A22B Thinking 2507',
    capability: { contextWindowTokens: 262144, features: { toolUse: true } },
  },
  {
    id: 'qwen/qwen3-30b-a3b',
    label: 'Qwen: Qwen3 30B A3B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen3-30b-a3b-instruct-2507',
    label: 'Qwen: Qwen3 30B A3B Instruct 2507',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-30b-a3b-thinking-2507',
    label: 'Qwen: Qwen3 30B A3B Thinking 2507',
    capability: {
      contextWindowTokens: 81920,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen3-32b',
    label: 'Qwen: Qwen3 32B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-8b',
    label: 'Qwen: Qwen3 8B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 8192,
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen3-coder',
    label: 'Qwen: Qwen3 Coder 480B A35B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-coder-30b-a3b-instruct',
    label: 'Qwen: Qwen3 Coder 30B A3B Instruct',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-coder-flash',
    label: 'Qwen: Qwen3 Coder Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen3-coder-next',
    label: 'Qwen: Qwen3 Coder Next',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-coder-plus',
    label: 'Qwen: Qwen3 Coder Plus',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-max',
    label: 'Qwen: Qwen3 Max',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-max-thinking',
    label: 'Qwen: Qwen3 Max Thinking',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-next-80b-a3b-instruct',
    label: 'Qwen: Qwen3 Next 80B A3B Instruct',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-next-80b-a3b-thinking',
    label: 'Qwen: Qwen3 Next 80B A3B Thinking',
    capability: {
      contextWindowTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-235b-a22b-instruct',
    label: 'Qwen: Qwen3 VL 235B A22B Instruct',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-235b-a22b-thinking',
    label: 'Qwen: Qwen3 VL 235B A22B Thinking',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-30b-a3b-instruct',
    label: 'Qwen: Qwen3 VL 30B A3B Instruct',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-30b-a3b-thinking',
    label: 'Qwen: Qwen3 VL 30B A3B Thinking',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-32b-instruct',
    label: 'Qwen: Qwen3 VL 32B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-8b-instruct',
    label: 'Qwen: Qwen3 VL 8B Instruct',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-8b-thinking',
    label: 'Qwen: Qwen3 VL 8B Thinking',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-122b-a10b',
    label: 'Qwen: Qwen3.5-122B-A10B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-27b',
    label: 'Qwen: Qwen3.5-27B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-35b-a3b',
    label: 'Qwen: Qwen3.5-35B-A3B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-397b-a17b',
    label: 'Qwen: Qwen3.5 397B A17B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-9b',
    label: 'Qwen: Qwen3.5-9B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-flash-02-23',
    label: 'Qwen: Qwen3.5-Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-plus-02-15',
    label: 'Qwen: Qwen3.5 Plus 2026-02-15',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-plus-20260420',
    label: 'Qwen: Qwen3.5 Plus 2026-04-20',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-27b',
    label: 'Qwen: Qwen3.6 27B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-35b-a3b',
    label: 'Qwen: Qwen3.6 35B A3B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-flash',
    label: 'Qwen: Qwen3.6 Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-max-preview',
    label: 'Qwen: Qwen3.6 Max Preview',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-plus',
    label: 'Qwen: Qwen3.6 Plus',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.7-flash',
    label: 'Qwen: Qwen3.7 Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'qwen/qwen3.7-max',
    label: 'Qwen: Qwen3.7 Max',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.7-plus',
    label: 'Qwen: Qwen3.7 Plus',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.8-max',
    label: 'Qwen: Qwen3.8 Max',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'rekaai/reka-edge',
    label: 'Reka Edge',
    capability: {
      contextWindowTokens: 16384,
      maxOutputTokens: 16384,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'rekaai/reka-flash-3',
    label: 'Reka Flash 3',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 65536,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'relace/relace-apply-3',
    label: 'Relace: Relace Apply 3',
    capability: { contextWindowTokens: 256000, maxOutputTokens: 128000 },
  },
  {
    id: 'relace/relace-search',
    label: 'Relace: Relace Search',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 128000,
      features: { toolUse: true },
    },
  },
  {
    id: 'sakana/fugu-ultra',
    label: 'Sakana: Fugu Ultra',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true, webSearch: true },
    },
  },
  {
    id: 'sao10k/l3-lunaris-8b',
    label: 'Sao10K: Llama 3 8B Lunaris',
    capability: {
      contextWindowTokens: 8192,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'sao10k/l3.1-euryale-70b',
    label: 'Sao10K: Llama 3.1 Euryale 70B v2.2',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'sao10k/l3.3-euryale-70b',
    label: 'Sao10K: Llama 3.3 Euryale 70B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'stepfun/step-3.5-flash',
    label: 'StepFun: Step 3.5 Flash',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      features: { toolUse: true },
    },
  },
  {
    id: 'stepfun/step-3.7-flash',
    label: 'StepFun: Step 3.7 Flash',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 256000,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'tencent/hunyuan-a13b-instruct',
    label: 'Tencent: Hunyuan A13B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'tencent/hy3',
    label: 'Tencent: Hy3',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 128000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'tencent/hy3-preview',
    label: 'Tencent: Hy3 preview',
    capability: { contextWindowTokens: 262144, features: { toolUse: true } },
  },
  {
    id: 'thedrummer/cydonia-24b-v4.1',
    label: 'TheDrummer: Cydonia 24B V4.1',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'thedrummer/rocinante-12b',
    label: 'TheDrummer: Rocinante 12B',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 65536,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'thedrummer/skyfall-36b-v2',
    label: 'TheDrummer: Skyfall 36B V2',
    capability: {
      contextWindowTokens: 32768,
      maxOutputTokens: 32768,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'thedrummer/unslopnemo-12b',
    label: 'TheDrummer: UnslopNemo 12B',
    capability: {
      contextWindowTokens: 1024000,
      maxOutputTokens: 1024000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'thinkingmachines/inkling',
    label: 'Thinking Machines: Inkling',
    capability: {
      contextWindowTokens: 1048576,
      modalities: { input: ['text', 'image', 'audio'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'thinkingmachines/inkling-small',
    label: 'Thinking Machines: Inkling Small',
    capability: {
      contextWindowTokens: 524288,
      modalities: { input: ['text', 'image', 'audio'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'undi95/remm-slerp-l2-13b',
    label: 'ReMM SLERP 13B',
    capability: {
      contextWindowTokens: 6144,
      maxOutputTokens: 2048,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'upstage/solar-pro-3',
    label: 'Upstage: Solar Pro 3',
    capability: {
      contextWindowTokens: 128000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'writer/palmyra-x5',
    label: 'Writer: Palmyra X5',
    capability: { contextWindowTokens: 1040000, maxOutputTokens: 8192 },
  },
  {
    id: 'x-ai/grok-4.20',
    label: 'SpaceXAI: Grok 4.20',
    capability: {
      contextWindowTokens: 2000000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'x-ai/grok-4.20-multi-agent',
    label: 'SpaceXAI: Grok 4.20 Multi-Agent',
    capability: {
      contextWindowTokens: 2000000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'x-ai/grok-4.3',
    label: 'SpaceXAI: Grok 4.3',
    capability: {
      contextWindowTokens: 1000000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'x-ai/grok-4.5',
    label: 'SpaceXAI: Grok 4.5',
    capability: {
      contextWindowTokens: 500000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'x-ai/grok-build-0.1',
    label: 'SpaceXAI: Grok Build 0.1',
    capability: {
      contextWindowTokens: 256000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'xiaomi/mimo-v2.5',
    label: 'Xiaomi: MiMo-V2.5',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 131072,
      modalities: {
        input: ['text', 'audio', 'image', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'xiaomi/mimo-v2.5-pro',
    label: 'Xiaomi: MiMo-V2.5-Pro',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-4.5',
    label: 'Z.ai: GLM 4.5',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 98304,
      features: { toolUse: true },
    },
  },
  {
    id: 'z-ai/glm-4.5-air',
    label: 'Z.ai: GLM 4.5 Air',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 98304,
      features: { toolUse: true },
    },
  },
  {
    id: 'z-ai/glm-4.5v',
    label: 'Z.ai: GLM 4.5V',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'z-ai/glm-4.6',
    label: 'Z.ai: GLM 4.6',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-4.6v',
    label: 'Z.ai: GLM 4.6V',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'z-ai/glm-4.7',
    label: 'Z.ai: GLM 4.7',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-4.7-flash',
    label: 'Z.ai: GLM 4.7 Flash',
    capability: {
      contextWindowTokens: 202752,
      maxOutputTokens: 16384,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-5',
    label: 'Z.ai: GLM 5',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-5-turbo',
    label: 'Z.ai: GLM 5 Turbo',
    capability: {
      contextWindowTokens: 202752,
      maxOutputTokens: 131072,
      features: { toolUse: true },
    },
  },
  {
    id: 'z-ai/glm-5.1',
    label: 'Z.ai: GLM 5.1',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 128000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-5.2',
    label: 'Z.ai: GLM 5.2',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'z-ai/glm-5v-turbo',
    label: 'Z.ai: GLM 5V Turbo',
    capability: {
      contextWindowTokens: 202752,
      maxOutputTokens: 131072,
      modalities: { input: ['image', 'text', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: '~anthropic/claude-fable-latest',
    label: 'Anthropic: Claude Fable Latest',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~anthropic/claude-haiku-latest',
    label: 'Anthropic Claude Haiku Latest',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 64000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~anthropic/claude-opus-latest',
    label: 'Anthropic: Claude Opus Latest',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~anthropic/claude-sonnet-latest',
    label: 'Anthropic Claude Sonnet Latest',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 128000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~deepseek/deepseek-v4-flash-latest',
    label: 'DeepSeek V4 Flash Latest',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~google/gemini-flash-latest',
    label: 'Google Gemini Flash Latest',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['text', 'image', 'video', 'file', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~google/gemini-pro-latest',
    label: 'Google Gemini Pro Latest',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 65536,
      modalities: {
        input: ['audio', 'file', 'image', 'text', 'video'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~moonshotai/kimi-latest',
    label: 'MoonshotAI Kimi Latest',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 1048576,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~openai/gpt-latest',
    label: 'OpenAI GPT Latest',
    capability: {
      contextWindowTokens: 1050000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~openai/gpt-mini-latest',
    label: 'OpenAI GPT Mini Latest',
    capability: {
      contextWindowTokens: 400000,
      maxOutputTokens: 128000,
      modalities: { input: ['file', 'image', 'text'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: '~x-ai/grok-latest',
    label: 'xAI: Grok Latest',
    capability: {
      contextWindowTokens: 500000,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
];

export const OPENROUTER_EMBEDDING_MODELS: CatalogEmbeddingModel[] = [
  {
    id: 'baai/bge-base-en-v1.5',
    label: 'BAAI: bge-base-en-v1.5',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'baai/bge-large-en-v1.5',
    label: 'BAAI: bge-large-en-v1.5',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'baai/bge-m3',
    label: 'BAAI: bge-m3',
    capability: { contextWindowTokens: 8194 },
  },
  {
    id: 'google/gemini-embedding-001',
    label: 'Google: Gemini Embedding 001',
    capability: { contextWindowTokens: 20000 },
  },
  {
    id: 'google/gemini-embedding-2',
    label: 'Google: Gemini Embedding 2',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'google/gemini-embedding-2-preview',
    label: 'Google: Gemini Embedding 2 Preview',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'intfloat/e5-base-v2',
    label: 'Intfloat: E5-Base-v2',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'intfloat/e5-large-v2',
    label: 'Intfloat: E5-Large-v2',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'intfloat/multilingual-e5-large',
    label: 'Intfloat: Multilingual-E5-Large',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'mistralai/codestral-embed-2505',
    label: 'Mistral: Codestral Embed 2505',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'mistralai/mistral-embed-2312',
    label: 'Mistral: Mistral Embed 2312',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'nvidia/llama-nemotron-embed-vl-1b-v2:free',
    label: 'NVIDIA: Llama Nemotron Embed VL 1B V2 (free)',
    capability: { contextWindowTokens: 131072 },
  },
  {
    id: 'nvidia/nemotron-3-embed-1b:free',
    label: 'NVIDIA: Nemotron 3 Embed 1B (free)',
    capability: { contextWindowTokens: 32768 },
  },
  {
    id: 'openai/text-embedding-3-large',
    label: 'OpenAI: Text Embedding 3 Large',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'openai/text-embedding-3-small',
    label: 'OpenAI: Text Embedding 3 Small',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'openai/text-embedding-ada-002',
    label: 'OpenAI: Text Embedding Ada 002',
    capability: { contextWindowTokens: 8192 },
  },
  {
    id: 'perplexity/pplx-embed-v1-0.6b',
    label: 'Perplexity: Embed V1 0.6B',
    capability: { contextWindowTokens: 32000 },
  },
  {
    id: 'perplexity/pplx-embed-v1-4b',
    label: 'Perplexity: Embed V1 4B',
    capability: { contextWindowTokens: 32000 },
  },
  {
    id: 'qwen/qwen3-embedding-4b',
    label: 'Qwen: Qwen3 Embedding 4B',
    capability: { contextWindowTokens: 32768 },
  },
  {
    id: 'qwen/qwen3-embedding-8b',
    label: 'Qwen: Qwen3 Embedding 8B',
    capability: { contextWindowTokens: 32768 },
  },
  {
    id: 'sentence-transformers/all-minilm-l12-v2',
    label: 'Sentence Transformers: all-MiniLM-L12-v2',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'sentence-transformers/all-minilm-l6-v2',
    label: 'Sentence Transformers: all-MiniLM-L6-v2',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'sentence-transformers/all-mpnet-base-v2',
    label: 'Sentence Transformers: all-mpnet-base-v2',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'sentence-transformers/multi-qa-mpnet-base-dot-v1',
    label: 'Sentence Transformers: multi-qa-mpnet-base-dot-v1',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'sentence-transformers/paraphrase-minilm-l6-v2',
    label: 'Sentence Transformers: paraphrase-MiniLM-L6-v2',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'thenlper/gte-base',
    label: 'Thenlper: GTE-Base',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'thenlper/gte-large',
    label: 'Thenlper: GTE-Large',
    capability: { contextWindowTokens: 512 },
  },
  {
    id: 'voyageai/voyage-4',
    label: 'VoyageAI by MongoDB: voyage-4',
    capability: { contextWindowTokens: 32000 },
  },
  {
    id: 'voyageai/voyage-4-large',
    label: 'VoyageAI by MongoDB: voyage-4-large',
    capability: { contextWindowTokens: 32000 },
  },
  {
    id: 'voyageai/voyage-4-lite',
    label: 'VoyageAI by MongoDB: voyage-4-lite',
    capability: { contextWindowTokens: 32000 },
  },
  {
    id: 'voyageai/voyage-multimodal-3.5',
    label: 'VoyageAI by MongoDB: voyage-multimodal-3.5',
    capability: { contextWindowTokens: 32000 },
  },
];
