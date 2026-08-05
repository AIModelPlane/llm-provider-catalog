import { CatalogModel } from '../types';

export const OPENAI_MODELS: CatalogModel[] = [
  {
    id: 'gpt-5.6-sol',
    label: 'GPT-5.6 Sol',
    capability: {
      contextWindowTokens: 1_050_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gpt-5.6-terra',
    label: 'GPT-5.6 Terra',
    capability: {
      contextWindowTokens: 1_050_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gpt-5.6-luna',
    label: 'GPT-5.6 Luna',
    capability: {
      contextWindowTokens: 1_050_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gpt-5.5',
    label: 'GPT-5.5',
    capability: {
      contextWindowTokens: 1_050_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gpt-5.4',
    label: 'GPT-5.4',
    capability: {
      contextWindowTokens: 1_050_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gpt-5.4-mini',
    label: 'GPT-5.4 Mini',
    capability: {
      contextWindowTokens: 400_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gpt-5.4-nano',
    label: 'GPT-5.4 Nano',
    capability: {
      contextWindowTokens: 400_000,
      maxOutputTokens: 128_000,
      tokenizer: 'openai',
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
];
