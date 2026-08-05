import { CatalogModel } from '../types';

// Shared by zai, zhipu.
export const ZAI_MODELS: CatalogModel[] = [
  {
    id: 'glm-5.2',
    label: 'GLM-5.2',
    capability: {
      contextWindowTokens: 1_000_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-5.1',
    label: 'GLM-5.1',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-5',
    label: 'GLM-5',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-5-turbo',
    label: 'GLM-5 Turbo',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.7',
    label: 'GLM-4.7',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.7-flashx',
    label: 'GLM-4.7 FlashX',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.7-flash',
    label: 'GLM-4.7 Flash',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.6',
    label: 'GLM-4.6',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true },
    },
  },
  {
    id: 'glm-4.5-airx',
    label: 'GLM-4.5 AirX',
    capability: {
      contextWindowTokens: 128_000,
      maxOutputTokens: 98_304,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.5-air',
    label: 'GLM-4.5 Air',
    capability: {
      contextWindowTokens: 128_000,
      maxOutputTokens: 98_304,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4-long',
    label: 'GLM-4 Long',
    capability: { contextWindowTokens: 1_000_000, maxOutputTokens: 4_096 },
  },
];

// Shared by zai-coding, zhipu-coding.
export const GLM_CODING_MODELS: CatalogModel[] = [
  {
    id: 'glm-5.2',
    label: 'GLM-5.2',
    capability: {
      contextWindowTokens: 1_000_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-5.1',
    label: 'GLM-5.1',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-5',
    label: 'GLM-5',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-5-turbo',
    label: 'GLM-5 Turbo',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.7',
    label: 'GLM-4.7',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.7-flashx',
    label: 'GLM-4.7 FlashX',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true, structuredOutputs: true },
    },
  },
  {
    id: 'glm-4.6',
    label: 'GLM-4.6',
    capability: {
      contextWindowTokens: 200_000,
      maxOutputTokens: 131_072,
      features: { toolUse: true },
    },
  },
];
