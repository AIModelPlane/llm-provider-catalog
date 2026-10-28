import {
  DiscoveredModel,
  Modality,
  ModalitySupport,
  ModelCapability,
  ModelFeatures,
} from '../types';

const MODALITIES: ReadonlySet<Modality> = new Set([
  'text',
  'image',
  'audio',
  'video',
  'file',
]);

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function positiveInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : undefined;
}

function modalityList(value: unknown): Modality[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter((v): v is Modality => MODALITIES.has(v as Modality));
}

/** Same convention as the curated catalog entries: undefined for plain
 *  text-in/text-out (or when the endpoint doesn't publish modalities).
 *  Unrecognized values (e.g. OpenRouter's "embeddings" output) are dropped,
 *  so a non-text-output model keeps an `output` without 'text'. */
export function modalitiesFrom(
  input: unknown,
  output: unknown,
): ModalitySupport | undefined {
  const inputList = modalityList(input);
  const outputList = modalityList(output);
  if (!inputList || !outputList) return undefined;
  const textOnly = (list: Modality[]) =>
    list.length === 1 && list[0] === 'text';
  if (textOnly(inputList) && textOnly(outputList)) return undefined;
  return { input: inputList, output: outputList };
}

/** Keeps only the flags the endpoint confirmed — an unconfirmed feature is
 *  omitted rather than written as false, per ModelFeatures' convention. */
export function confirmedFeatures(
  flags: Partial<Record<keyof ModelFeatures, boolean>>,
): ModelFeatures | undefined {
  const confirmed = Object.entries(flags).filter(([, on]) => on === true);
  return confirmed.length
    ? (Object.fromEntries(confirmed) as ModelFeatures)
    : undefined;
}

export function toDiscoveredModel(
  id: string,
  label: unknown,
  capability: Partial<ModelCapability>,
): DiscoveredModel {
  const published = Object.entries(capability).filter(
    ([, value]) => value !== undefined,
  );
  return {
    id,
    ...(typeof label === 'string' && label ? { label } : {}),
    ...(published.length
      ? {
          capability: Object.fromEntries(published) as Partial<ModelCapability>,
        }
      : {}),
  };
}
