// GENERATED FILE — do not hand-edit.
// Regenerate with: npm run fetch-novita-models
// (runs agent/scripts/fetch-novita-models.mjs against https://api.novita.ai/v3/openai/v1/models)
import { CatalogModel } from '../types';

export const NOVITA_MODELS: CatalogModel[] = [
  {
    id: 'Sao10K/L3-8B-Stheno-v3.2',
    label: 'Llama 3 8B Stheno V3.2',
    capability: { contextWindowTokens: 8192, maxOutputTokens: 32000 },
  },
  {
    id: 'apodex/apodex-1.1-mini',
    label: 'Apodex 1.1 Mini',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'baichuan/baichuan-m2-32b',
    label: 'Baichuan M2 32B',
    capability: { contextWindowTokens: 131072, maxOutputTokens: 131072 },
  },
  {
    id: 'baidu/cobuddy',
    label: 'CoBuddy',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 65536,
      features: { toolUse: true },
    },
  },
  {
    id: 'baidu/ernie-4.5-21B-a3b',
    label: 'ERNIE 4.5 21B A3B',
    capability: {
      contextWindowTokens: 120000,
      maxOutputTokens: 8000,
      features: { toolUse: true },
    },
  },
  {
    id: 'bunny',
    label: 'Bunny',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-ocr-2',
    label: 'DeepSeek OCR 2',
    capability: {
      contextWindowTokens: 8192,
      maxOutputTokens: 8192,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'deepseek/deepseek-r1-0528',
    label: 'DeepSeek R1 0528',
    capability: {
      contextWindowTokens: 163840,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-r1-0528-qwen3-8b',
    label: 'DeepSeek R1 Distill Qwen3 8B 0528',
    capability: { contextWindowTokens: 128000, maxOutputTokens: 32000 },
  },
  {
    id: 'deepseek/deepseek-r1-turbo',
    label: 'DeepSeek R1 Turbo',
    capability: {
      contextWindowTokens: 64000,
      maxOutputTokens: 16000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-r1/community',
    label: 'DeepSeek R1',
    capability: {
      contextWindowTokens: 64000,
      maxOutputTokens: 8000,
      features: { toolUse: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-flash-0731',
    label: 'DeepSeek V4 Flash 0731',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-flash-0731-p',
    label: 'deepseek/deepseek-v4-flash-0731-p',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-pro',
    label: 'DeepSeek V4 Pro',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-pro-0813',
    label: 'DeepSeek V4 Pro 0813',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4-pro-0813-p',
    label: 'deepseek/deepseek-v4-pro-0813-p',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4.1-flash',
    label: 'DeepSeek V4.1 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4.1-flash-1017',
    label: 'DeepSeek V4.1 Flash 1017',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4.1-flash-dst',
    label: 'DeepSeek V4.1 Flash DST',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek-v4.1-flash-p',
    label: 'DeepSeek V4.1 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 393216,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'deepseek/deepseek_v3',
    label: 'DeepSeek V3',
    capability: {
      contextWindowTokens: 64000,
      maxOutputTokens: 16000,
      features: { toolUse: true },
    },
  },
  {
    id: 'dev/glm46',
    label: 'dev/glm46',
    capability: {
      contextWindowTokens: 256000,
      maxOutputTokens: 256000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-3-12b-it',
    label: 'Gemma 3 12B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 8192,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'google/gemma-3-27b-it',
    label: 'Gemma 3 27B',
    capability: {
      contextWindowTokens: 98304,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'google/gemma-4-26b-a4b-it',
    label: 'Gemma 4 26B A4B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'google/gemma-4-31b-it',
    label: 'Gemma 4 31B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'gryphe/mythomax-l2-13b',
    label: 'MythoMax L2 13B',
    capability: { contextWindowTokens: 4096, maxOutputTokens: 3200 },
  },
  {
    id: 'inclusionai/ling-3.0-flash',
    label: 'Ling 3.0 Flash',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'inclusionai/ling-3.0-flash-fin',
    label: 'Ling 3.0 Flash Fin',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'inclusionai/ling-3.0-flash-sante',
    label: 'Ling 3.0 Flash Sante',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'inclusionai/ling-3.0-flash-vl',
    label: 'Ling 3.0 Flash VL',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'inclusionai/ling-3.1-flash',
    label: 'Ling 3.1 Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 262144,
      features: { toolUse: true },
    },
  },
  {
    id: 'meta-llama/llama-3.1-8b-instruct',
    label: 'Llama 3.1 8B Instruct',
    capability: {
      contextWindowTokens: 16384,
      maxOutputTokens: 16384,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-3.2-1b-instruct',
    label: 'Llama 3.2 1B Instruct\t',
    capability: {
      contextWindowTokens: 131000,
      maxOutputTokens: 32000,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    label: 'Llama 3.3 70B Instruct',
    capability: {
      contextWindowTokens: 12288,
      maxOutputTokens: 12288,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-4-maverick-17b-128e-instruct-fp8',
    label: 'Llama 4 Maverick Instruct',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 8192,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    label: 'Llama 4 Scout Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'microsoft/wizardlm-2-8x22b',
    label: 'WizardLM 2 8x22B',
    capability: {
      contextWindowTokens: 65535,
      maxOutputTokens: 8000,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'mindai/macaron-v1-tall',
    label: 'Macaron V1 Tall',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true },
    },
  },
  {
    id: 'mindai/macaron-v1-venti',
    label: 'Macaron V1 Venti',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      features: { toolUse: true },
    },
  },
  {
    id: 'minimax/minimax-m2.5',
    label: 'MiniMax M2.5',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131100,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m2.7',
    label: 'MiniMax M2.7',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m2.7-highspeed',
    label: 'MiniMax M2.7-highspeed',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m3',
    label: 'MiniMax M3',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimax/minimax-m3.1-flash',
    label: 'MiniMax M3.1 Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 524288,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'minimaxai/minimax-m1-80k',
    label: 'MiniMax M1',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 40000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2-0905',
    label: 'Kimi K2 Instruct 0905',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 98304,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2-instruct',
    label: 'Kimi K2 Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 98304,
      features: { toolUse: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2-thinking',
    label: 'Kimi K2 Thinking',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 98304,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2.5',
    label: 'Kimi K2.5',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2.6',
    label: 'Kimi K2.6',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k2.7-code',
    label: 'Kimi K2.7 Code',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k3',
    label: 'Kimi K3',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 1048576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k3-p',
    label: 'Kimi K3',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 1048576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k3.1-pro',
    label: 'Kimi K3.1 Pro',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 1048576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'moonshotai/kimi-k3.1-pro-highspeed',
    label: 'Kimi K3.1 Pro Highspeed',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 1048576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nousresearch/hermes-2-pro-llama-3-8b',
    label: 'Hermes 2 Pro Llama 3 8B',
    capability: {
      contextWindowTokens: 8192,
      maxOutputTokens: 8192,
      features: { structuredOutputs: true },
    },
  },
  {
    id: 'nvidia/nemotron-3-nano-30b-a3b',
    label: 'NVIDIA Nemotron 3 Nano 30B A3B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 32768,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nvrouter/auto',
    label: 'Auto',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 328000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'nvrouter/fusion',
    label: 'Fusion',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 328000,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'openai/gpt-oss-120b',
    label: 'OpenAI GPT OSS 120B',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'paddlepaddle/paddleocr-vl',
    label: 'PaddleOCR VL',
    capability: {
      contextWindowTokens: 16384,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'qwen/qwen-mt-plus',
    label: 'Qwen MT Plus',
    capability: { contextWindowTokens: 16384, maxOutputTokens: 8192 },
  },
  {
    id: 'qwen/qwen3-omni-30b-a3b-thinking',
    label: 'Qwen3 Omni 30B A3B Thinking',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 16384,
      modalities: {
        input: ['text', 'audio', 'video', 'image'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3-vl-30b-a3b-instruct',
    label: 'Qwen3 VL 30B A3B Instruct',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'video', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-122b-a10b',
    label: 'Qwen3.5 122B A10B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-27b',
    label: 'Qwen3.5 27B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-35b-a3b',
    label: 'Qwen3.5 35B A3B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.5-397b-a17b',
    label: 'Qwen3.5 397B A17B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-27b',
    label: 'Qwen3.6 27B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.6-35b-a3b',
    label: 'Qwen3.6 35B A3B',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.7-max',
    label: 'Qwen3.7 Max',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 65536,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.8-2.4t-a95b',
    label: 'Qwen3.8 2.4T A95B',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.8-27b',
    label: 'Qwen3.8 27B',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.8-flash',
    label: 'Qwen3.8 Flash',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'qwen/qwen3.8-max',
    label: 'Qwen3.8 Max',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'sao10k/l3-70b-euryale-v2.1',
    label: 'Llama 3 70B Euryale V2.1',
    capability: {
      contextWindowTokens: 8192,
      maxOutputTokens: 8192,
      features: { toolUse: true },
    },
  },
  {
    id: 'stepfun/step-3.7-flash',
    label: 'Step 3.7 Flash',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 256000,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'stepfun/step-5-preview',
    label: 'Step 5 Preview',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 64000,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'tencent/hy3',
    label: 'Hy3',
    capability: {
      contextWindowTokens: 262144,
      maxOutputTokens: 262144,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'tencent/hy4-preview',
    label: 'Hy4 Preview',
    capability: {
      contextWindowTokens: 1000000,
      maxOutputTokens: 64000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'xiaomimimo/mimo-v2.6-flash',
    label: 'MiMo V2.6 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      modalities: {
        input: ['text', 'image', 'video', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'xiaomimimo/mimo-v2.6-pro',
    label: 'MiMo V2.6 Pro',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      modalities: {
        input: ['text', 'image', 'video', 'audio'],
        output: ['text'],
      },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/autoglm-phone-9b-multilingual',
    label: 'AutoGLM Phone 9B Multilingual',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 65536,
      modalities: { input: ['text', 'image'], output: ['text'] },
    },
  },
  {
    id: 'zai-org/glm-4.5-air',
    label: 'GLM 4.5 Air',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 98304,
      features: { toolUse: true },
    },
  },
  {
    id: 'zai-org/glm-4.5v',
    label: 'GLM 4.5V',
    capability: {
      contextWindowTokens: 65536,
      maxOutputTokens: 16384,
      modalities: { input: ['text', 'video', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-4.6',
    label: 'GLM 4.6',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-4.6v',
    label: 'GLM 4.6V',
    capability: {
      contextWindowTokens: 131072,
      maxOutputTokens: 32768,
      modalities: { input: ['text', 'video', 'image'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-4.7',
    label: 'GLM 4.7',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-4.7-flash',
    label: 'GLM 4.7 Flash',
    capability: {
      contextWindowTokens: 200000,
      maxOutputTokens: 128000,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-4.7-h',
    label: 'GLM 4.7',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-5',
    label: 'GLM 5',
    capability: {
      contextWindowTokens: 202800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-5.1',
    label: 'GLM 5.1',
    capability: {
      contextWindowTokens: 204800,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-5.2',
    label: 'GLM 5.2',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-5.3',
    label: 'GLM 5.3',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-5.3-flash',
    label: 'GLM 5.3 Flash',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'zai-org/glm-5.3-p',
    label: 'zai-org/glm-5.3-p',
    capability: {
      contextWindowTokens: 1048576,
      maxOutputTokens: 131072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
];
