import { OPENROUTER_MODELS, OPENROUTER_EMBEDDING_MODELS } from './models';
import { Modality } from '../types';

const KNOWN_MODALITIES: Modality[] = [
  'text',
  'image',
  'audio',
  'video',
  'file',
];

describe('OPENROUTER_MODELS', () => {
  it('is non-empty and well-formed', () => {
    expect(OPENROUTER_MODELS.length).toBeGreaterThan(0);
    for (const model of OPENROUTER_MODELS) {
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
      OPENROUTER_MODELS.some((m) => m.capability.modalities !== undefined),
    ).toBe(true);
    expect(OPENROUTER_MODELS.some((m) => m.capability.features?.toolUse)).toBe(
      true,
    );
  });
});

describe('OPENROUTER_EMBEDDING_MODELS', () => {
  it('is non-empty and well-formed', () => {
    expect(OPENROUTER_EMBEDDING_MODELS.length).toBeGreaterThan(0);
    for (const model of OPENROUTER_EMBEDDING_MODELS) {
      expect(typeof model.id).toBe('string');
      expect(model.id.length).toBeGreaterThan(0);
      expect(typeof model.label).toBe('string');
      expect(model.label.length).toBeGreaterThan(0);
      expect(model.capability.contextWindowTokens).toBeGreaterThan(0);
    }
  });
});
