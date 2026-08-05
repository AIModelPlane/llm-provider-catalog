import { OPENROUTER_MODELS, OPENROUTER_EMBEDDING_MODELS } from './models';

describe('OPENROUTER_MODELS', () => {
  it('is non-empty and well-formed', () => {
    expect(OPENROUTER_MODELS.length).toBeGreaterThan(0);
    for (const model of OPENROUTER_MODELS) {
      expect(typeof model.id).toBe('string');
      expect(model.id.length).toBeGreaterThan(0);
      expect(typeof model.label).toBe('string');
      expect(model.label.length).toBeGreaterThan(0);
      expect(model.capability.contextWindowTokens).toBeGreaterThan(0);
    }
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
