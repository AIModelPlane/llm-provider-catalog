import type { CatalogProvider } from './types';
import openai from './openai';
import anthropic from './anthropic';
import google from './google';
import openrouter from './openrouter';
import novitaAi from './novita-ai';
import minimaxGlobal from './minimax/minimax-global';
import minimaxChina from './minimax/minimax-china';
import zai from './zai/zai';
import zhipu from './zai/zhipu';
import zaiCoding from './zai/zai-coding';
import zhipuCoding from './zai/zhipu-coding';
import minimaxCodingGlobal from './minimax/minimax-coding-global';
import minimaxCodingChina from './minimax/minimax-coding-china';
import deepseek from './deepseek';

export type {
  CatalogProvider,
  ApiProtocol,
  CatalogModel,
  ModelCapability,
  ModelTokenizer,
  CatalogEmbeddingModel,
  EmbeddingModelCapability,
  ProviderUsageResult,
  FetchModelsResult,
  FetchEmbeddingModelsResult,
  QuotaWindow,
  ReasoningInput,
  ReasoningMapping,
} from './types';

export const PROVIDER_CATALOG: CatalogProvider[] = [
  openai,
  anthropic,
  google,
  minimaxGlobal,
  minimaxChina,
  zai,
  zhipu,
  zaiCoding,
  zhipuCoding,
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
