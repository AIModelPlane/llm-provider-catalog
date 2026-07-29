import { ReasoningInput } from '../types';

function isReasoningDisabled(reasoning: ReasoningInput) {
  return reasoning.enabled === false || reasoning.effort === 'none';
}

function isGemini3Model(model: unknown) {
  return (
    typeof model === 'string' &&
    /^google\/gemini-3(?:\.|[-/])/.test(model.toLowerCase())
  );
}

function isGemini31ProModel(model: unknown) {
  return (
    typeof model === 'string' &&
    /^google\/gemini-3\.1-pro(?:[-/:]|$)/.test(model.toLowerCase())
  );
}

function isGemini25ProModel(model: unknown) {
  return (
    typeof model === 'string' &&
    /^google\/gemini-2\.5-pro(?:[-/:]|$)/.test(model.toLowerCase())
  );
}

/** OpenRouter's `reasoning` field is a near-verbatim passthrough of the
 *  unified shape, except some Gemini models reject `effort: 'none'`
 *  (or don't support disabling reasoning at all) and need a per-model
 *  substitute when the caller asked to disable reasoning. */
export function openrouterReasoningMapping(
  input: ReasoningInput | undefined,
  ctx: { model?: string },
): Record<string, unknown> | undefined {
  const reasoning: ReasoningInput = { ...input };
  if (isReasoningDisabled(reasoning)) {
    const rest: ReasoningInput = { ...reasoning };
    delete rest.enabled;
    delete rest.max_tokens;
    if (isGemini31ProModel(ctx.model) || isGemini25ProModel(ctx.model)) {
      return rest.exclude === undefined ? undefined : { exclude: rest.exclude };
    }
    if (isGemini3Model(ctx.model)) {
      return { ...rest, effort: 'minimal' };
    }
    return { ...rest, effort: 'none' };
  }
  return Object.keys(reasoning).length > 0 ? reasoning : undefined;
}
