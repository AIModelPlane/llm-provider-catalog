import { NOVITA_MODELS } from './models';
import { Modality } from '../types';

const KNOWN_MODALITIES: Modality[] = [
  'text',
  'image',
  'audio',
  'video',
  'file',
];

describe('NOVITA_MODELS', () => {
  it('is non-empty and well-formed', () => {
    expect(NOVITA_MODELS.length).toBeGreaterThan(0);
    for (const model of NOVITA_MODELS) {
      expect(typeof model.id).toBe('string');
      expect(model.id.length).toBeGreaterThan(0);
      expect(typeof model.label).toBe('string');
      expect(model.label.length).toBeGreaterThan(0);
      expect(model.capability.contextWindowTokens).toBeGreaterThan(0);
      if (model.capability.modalities) {
        const { input, output } = model.capability.modalities;
        expect(input).toContain('text');
        expect(output).toContain('text');
        for (const m of [...input, ...output]) {
          expect(KNOWN_MODALITIES).toContain(m);
        }
      }
    }
  });

  it('includes at least some models with non-text modalities and known features', () => {
    expect(
      NOVITA_MODELS.some((m) => m.capability.modalities !== undefined),
    ).toBe(true);
    expect(NOVITA_MODELS.some((m) => m.capability.features?.toolUse)).toBe(
      true,
    );
  });
});
