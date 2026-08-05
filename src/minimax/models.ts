import { CatalogModel } from '../types';

// Shared by minimax-global, minimax-china, minimax-coding-global, minimax-coding-china.
export const MINIMAX_MODELS: CatalogModel[] = [
  {
    id: 'MiniMax-M3',
    label: 'MiniMax M3',
    capability: {
      contextWindowTokens: 1_000_000,
      modalities: { input: ['text', 'image', 'video'], output: ['text'] },
      features: { toolUse: true },
    },
  },
  {
    id: 'MiniMax-M2.7',
    label: 'MiniMax M2.7',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'MiniMax-M2.7-highspeed',
    label: 'MiniMax M2.7 Highspeed',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'MiniMax-M2.5',
    label: 'MiniMax M2.5',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'MiniMax-M2.5-highspeed',
    label: 'MiniMax M2.5 Highspeed',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'MiniMax-M2.1',
    label: 'MiniMax M2.1',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'MiniMax-M2.1-highspeed',
    label: 'MiniMax M2.1 Highspeed',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'MiniMax-M2',
    label: 'MiniMax M2',
    capability: { contextWindowTokens: 204_800, features: { toolUse: true } },
  },
  {
    id: 'M2-her',
    label: 'M2-her',
    capability: { contextWindowTokens: 65_536 },
  },
];
