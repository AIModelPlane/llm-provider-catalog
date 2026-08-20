import { CatalogModel } from '../types';

export const GOOGLE_MODELS: CatalogModel[] = [
  {
    id: 'gemini-3.7-flash',
    label: 'Gemini 3.7 Flash',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-3.6-flash',
    label: 'Gemini 3.6 Flash',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-3.5-flash',
    label: 'Gemini 3.5 Flash',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-3.1-pro-preview',
    label: 'Gemini 3.1 Pro Preview',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-3-flash-preview',
    label: 'Gemini 3 Flash Preview',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-3.5-flash-lite',
    label: 'Gemini 3.5 Flash-Lite',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-3.1-flash-lite',
    label: 'Gemini 3.1 Flash-Lite',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-2.5-pro',
    label: 'Gemini 2.5 Pro',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
  {
    id: 'gemini-2.5-flash-lite',
    label: 'Gemini 2.5 Flash-Lite',
    capability: {
      contextWindowTokens: 1_048_576,
      maxOutputTokens: 65_536,
      modalities: {
        input: ['text', 'image', 'audio', 'video', 'file'],
        output: ['text'],
      },
      features: {
        toolUse: true,
        structuredOutputs: true,
        codeExecution: true,
        webSearch: true,
      },
    },
  },
];
