import { DiscoveredModel } from '../types';
import {
  asRecord,
  confirmedFeatures,
  modalitiesFrom,
  positiveInteger,
  toDiscoveredModel,
} from '../shared/discoveredModel';
import { ModelListRow } from '../shared/fetchModelIds';

/** Same field mapping as agent/scripts/fetch-openrouter-models.mjs, so a
 *  model discovered live carries the capability it will get once the next
 *  catalog refresh snapshots it. */
export function mapOpenRouterModelRow(row: ModelListRow): DiscoveredModel {
  const architecture = asRecord(row.architecture);
  const params = Array.isArray(row.supported_parameters)
    ? row.supported_parameters
    : [];
  return toDiscoveredModel(row.id, row.name, {
    contextWindowTokens: positiveInteger(row.context_length),
    maxOutputTokens: positiveInteger(
      asRecord(row.top_provider).max_completion_tokens,
    ),
    modalities: modalitiesFrom(
      architecture.input_modalities,
      architecture.output_modalities,
    ),
    features: confirmedFeatures({
      toolUse: params.includes('tools'),
      structuredOutputs: params.includes('structured_outputs'),
      webSearch: params.includes('web_search_options'),
    }),
  });
}
