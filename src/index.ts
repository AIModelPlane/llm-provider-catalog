import type { CatalogProvider } from './types';
import openai from './openai';
import anthropic from './anthropic';
import google from './google';
import openrouter from './openrouter';
import novitaAi from './novita-ai';
import minimaxGlobal from './minimax/minimax-global';
import minimaxChina from './minimax/minimax-china';
import zaiIntl from './zai/zai-intl';
import zaiChina from './zai/glm-china';
import glmCodingGlobal from './zai/zai-coding-intl';
import glmCodingChina from './zai/glm-coding-china';
import minimaxCodingGlobal from './minimax/minimax-coding-global';
import minimaxCodingChina from './minimax/minimax-coding-china';
import deepseek from './deepseek';

export type {
  CatalogProvider,
  ApiProtocol,
  CatalogModel,
  ModelCapability,
  ProviderUsageResult,
  QuotaWindow,
} from './types';

export const PROVIDER_CATALOG: CatalogProvider[] = [
  openai,
  anthropic,
  google,
  minimaxGlobal,
  minimaxChina,
  zaiIntl,
  zaiChina,
  glmCodingGlobal,
  glmCodingChina,
  minimaxCodingGlobal,
  openrouter,
  novitaAi,
  minimaxCodingChina,
  deepseek,
];

export function getCatalogProvider(id: string): CatalogProvider | undefined {
  return PROVIDER_CATALOG.find((p) => p.id === id);
}

export function listCatalogProviders(): CatalogProvider[] {
  return PROVIDER_CATALOG;
}
