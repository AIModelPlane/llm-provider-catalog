import { CatalogModel } from '../types';

// Shared by kimi, kimi-china.
// Source: https://platform.kimi.ai/docs/models, https://platform.kimi.ai/docs/pricing/chat-k3,
// chat-k26, chat-k27-code, chat-v1, and https://platform.kimi.ai/docs/guide/use-kimi-vision-model
// (image/video input support).
export const KIMI_MODELS: CatalogModel[] = [
  {
    id: 'kimi-k3.1-pro',
    label: 'Kimi K3.1 Pro',
    capability: {
      contextWindowTokens: 1_048_576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'kimi-k3.1-pro-highspeed',
    label: 'Kimi K3.1 Pro Highspeed',
    capability: {
      contextWindowTokens: 1_048_576,
      features: { toolUse: true },
    },
  },
  {
    id: 'kimi-k3',
    label: 'Kimi K3',
    capability: {
      contextWindowTokens: 1_048_576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'kimi-k2.7-code',
    label: 'Kimi K2.7 Code',
    capability: {
      contextWindowTokens: 262_144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'kimi-k2.7-code-highspeed',
    label: 'Kimi K2.7 Code Highspeed',
    capability: {
      contextWindowTokens: 262_144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'kimi-k2.6',
    label: 'Kimi K2.6',
    capability: {
      contextWindowTokens: 262_144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true, structuredOutputs: true },
    },
  },
];

// Kimi Code (coding plan) models — distinct aliases from the pay-as-you-go
// model ids above; the Kimi Code endpoint rejects the regular model ids.
// Source: https://www.kimi.com/code/docs/en/kimi-code/models.html
export const KIMI_CODING_MODELS: CatalogModel[] = [
  {
    id: 'k3.1-pro',
    label: 'Kimi K3.1 Pro (Coding Plan)',
    capability: {
      contextWindowTokens: 1_048_576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'k3.1-pro-highspeed',
    label: 'Kimi K3.1 Pro Highspeed (Coding Plan)',
    capability: {
      contextWindowTokens: 1_048_576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'k3',
    label: 'Kimi K3 (Coding Plan)',
    capability: {
      contextWindowTokens: 1_048_576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'k3-256k',
    label: 'Kimi K3 256k (Coding Plan)',
    capability: {
      contextWindowTokens: 262_144,
      modalities: { input: ['text', 'image'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'kimi-for-coding',
    label: 'Kimi for Coding (K2.8 Preview)',
    capability: {
      contextWindowTokens: 1_048_576,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'kimi-for-coding-highspeed',
    label: 'Kimi for Coding Highspeed (K2.7 Code Highspeed)',
    capability: {
      contextWindowTokens: 262_144,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
];
