import { CatalogModel } from '../types';

export const ANTHROPIC_MODELS: CatalogModel[] = [
  {
    id: 'claude-fable-5',
    label: 'Claude Fable 5',
    capability: {
      contextWindowTokens: 1_000_000,
      maxOutputTokens: 131_072,
      tokenizer: 'anthropic',
      supportsCountTokens: true,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
      },
    },
  },
  {
    id: 'claude-opus-4-8',
    label: 'Claude Opus 4.8',
    capability: {
      contextWindowTokens: 1_000_000,
      maxOutputTokens: 131_072,
      tokenizer: 'anthropic',
      supportsCountTokens: true,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
      },
    },
  },
  {
    id: 'claude-sonnet-5',
    label: 'Claude Sonnet 5',
    capability: {
      contextWindowTokens: 1_000_000,
      maxOutputTokens: 131_072,
      tokenizer: 'anthropic',
      supportsCountTokens: true,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
      },
    },
  },
  {
    id: 'claude-haiku-4-5-20251001',
    label: 'Claude Haiku 4.5',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 65_536,
      tokenizer: 'anthropic',
      supportsCountTokens: true,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
      },
    },
  },
  {
    id: 'claude-sonnet-4-6',
    label: 'Claude Sonnet 4.6',
    capability: {
      contextWindowTokens: 1_000_000,
      maxOutputTokens: 131_072,
      tokenizer: 'anthropic',
      supportsCountTokens: true,
      modalities: { input: ['text', 'image', 'file'], output: ['text'] },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
      },
    },
  },
];
