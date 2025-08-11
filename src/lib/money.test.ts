import { describe, it, expect } from 'vitest';
import { formatMoney, calculateItemPrice } from './money';

describe('Money utilities', () => {
  describe('formatMoney', () => {
    it('formats INR currency correctly', () => {
      expect(formatMoney(100)).toBe('₹100');
      expect(formatMoney(1500)).toBe('₹1,500');
      expect(formatMoney(999999)).toBe('₹9,99,999');
    });

    it('handles zero and negative values', () => {
      expect(formatMoney(0)).toBe('₹0');
      expect(formatMoney(-100)).toBe('-₹100');
    });

    it('formats other currencies when specified', () => {
      expect(formatMoney(100, 'USD')).toBe('$100');
      expect(formatMoney(100, 'EUR')).toBe('€100');
    });
  });

  describe('calculateItemPrice', () => {
    it('calculates base price correctly', () => {
      expect(calculateItemPrice(100)).toBe(100);
    });

    it('adds variant price delta', () => {
      const variant = { id: 'test', name: 'Large', price_delta: 50 };
      expect(calculateItemPrice(100, variant)).toBe(150);
    });

    it('adds add-on prices', () => {
      const addOns = [
        { id: 'add1', name: 'Extra shot', price: 30 },
        { id: 'add2', name: 'Syrup', price: 20 }
      ];
      expect(calculateItemPrice(100, undefined, addOns)).toBe(150);
    });

    it('calculates total with variant and add-ons', () => {
      const variant = { id: 'test', name: 'Large', price_delta: 50 };
      const addOns = [
        { id: 'add1', name: 'Extra shot', price: 30 }
      ];
      expect(calculateItemPrice(100, variant, addOns)).toBe(180);
    });
  });
});
