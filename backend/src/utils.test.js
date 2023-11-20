import { convertRanksToPoints, generateRandomString } from './utils.js';

describe('utils', () => {
  describe('convertRanksToPoints', () => {
    test('converts cards to points', () => {  
      expect(convertRanksToPoints('9')).toBe(9);
      expect(convertRanksToPoints('king')).toBe(10);
      expect(convertRanksToPoints('ace')).toEqual([1, 11]);
    });
  });

  describe('generateRandomString', () => {
    test('generates a string of a given length', () => {  
      expect(typeof generateRandomString(5)).toBe('string');
      expect(generateRandomString(0).length).toBe(0);
      expect(generateRandomString(5).length).toBe(5);
    });
  });
});
