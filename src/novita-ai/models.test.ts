import { NOVITA_MODELS } from './models';

describe('NOVITA_MODELS', () => {
  it('is non-empty and well-formed', () => {
    expect(NOVITA_MODELS.length).toBeGreaterThan(0);
    for (const model of NOVITA_MODELS) {
      expect(typeof model.id).toBe('string');
      expect(model.id.length).toBeGreaterThan(0);
      expect(typeof model.label).toBe('string');
      expect(model.label.length).toBeGreaterThan(0);
      expect(model.capability.contextWindowTokens).toBeGreaterThan(0);
    }
  });
});
