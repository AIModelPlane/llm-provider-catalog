import { DiscoveredModel } from '../types';
import {
  confirmedFeatures,
  modalitiesFrom,
  positiveInteger,
  toDiscoveredModel,
} from '../shared/discoveredModel';
import { ModelListRow } from '../shared/fetchModelIds';

/** Same field mapping as agent/scripts/fetch-novita-models.mjs, so a model
 *  discovered live carries the capability it will get once the next catalog
 *  refresh snapshots it. */
export function mapNovitaModelRow(row: ModelListRow): DiscoveredModel {
  const features = Array.isArray(row.features) ? row.features : [];
  return toDiscoveredModel(row.id, row.display_name ?? row.title, {
    contextWindowTokens: positiveInteger(row.context_size),
    maxOutputTokens: positiveInteger(row.max_output_tokens),
    modalities: modalitiesFrom(row.input_modalities, row.output_modalities),
    features: confirmedFeatures({
      toolUse: features.includes('function-calling'),
      structuredOutputs: features.includes('structured-outputs'),
    }),
  });
}
