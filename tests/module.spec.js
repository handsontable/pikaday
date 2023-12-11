import Pikaday from '../src/pikaday';

describe('Pikaday', () => {
  it('should expose as a CommonJS module', () => {
      expect(typeof Pikaday).toBe('function');
  });

  it('should NOT leak to the global object', () => {
      expect(window.Pikaday).toBeUndefined();
  });

  it('should be possible to create a new instance', () => {
      expect(() => {
        new Pikaday();
      }).not.toThrow();
  });
});
