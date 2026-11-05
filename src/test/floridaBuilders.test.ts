import { describe, it, expect } from 'vitest';
import { 
  FLORIDA_BUILDERS_DATA, 
  isOfferActive, 
  getDaysRemaining, 
  BuilderIncentive 
} from '../data/floridaBuildersData';

describe('Florida Builders Data & Expiration Logic', () => {
  it('contains all 11 Central Florida homebuilders with valid fields', () => {
    expect(FLORIDA_BUILDERS_DATA.length).toBe(11);

    FLORIDA_BUILDERS_DATA.forEach((b) => {
      expect(b.id).toBeTruthy();
      expect(b.name).toBeTruthy();
      expect(b.rateNumeric).toBeGreaterThan(0);
      expect(b.closingNumeric).toBeGreaterThan(0);
      expect(['fixed', 'buydown', 'arm']).toContain(b.rateType);
      expect(b.expirationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(b.isBalloon).toBe(false);
      expect(b.balloonText).toBeTruthy();
      expect(b.counties.length).toBeGreaterThan(0);
    });
  });

  it('correctly determines whether an offer is active or expired based on date', () => {
    const mockOffer: BuilderIncentive = {
      id: 'test-builder',
      name: 'Test Builder',
      promoName: 'Test Promo',
      rate: '4.99%',
      rateNumeric: 4.99,
      rateType: 'fixed',
      structureTag: 'Tasa Fija 30 Años',
      structureDesc: 'Préstamo fijo 30 años',
      isBalloon: false,
      balloonText: 'Sin Balloon',
      closingCredits: '$20,000',
      closingNumeric: 20000,
      closingDetails: 'Créditos de cierre',
      firstTimePerk: 'Electrodomésticos incluidos',
      counties: ['Orange'],
      keyAreas: 'Orlando',
      lender: 'Test Mortgage',
      contractDeadline: 'Hasta 30 de Noviembre de 2026',
      closingDeadline: 'Cierre antes de fin de año',
      expirationDate: '2026-11-30',
      link: 'https://example.com',
      badge: 'Test'
    };

    // Active test: Nov 5, 2026
    const activeDate = new Date(2026, 10, 5, 12, 0, 0); // month 10 = Nov
    expect(isOfferActive(mockOffer, activeDate)).toBe(true);

    // Active test: Nov 30, 2026 23:00 (1 hour before expiry)
    const exactDayDate = new Date(2026, 10, 30, 23, 0, 0);
    expect(isOfferActive(mockOffer, exactDayDate)).toBe(true);

    // Expired test: Dec 1, 2026 00:00:01
    const expiredDate = new Date(2026, 11, 1, 0, 0, 1); // month 11 = Dec
    expect(isOfferActive(mockOffer, expiredDate)).toBe(false);
  });

  it('calculates remaining days accurately', () => {
    const mockOffer: BuilderIncentive = {
      id: 'test-builder-2',
      name: 'Test Builder',
      promoName: 'Test Promo',
      rate: '5.25%',
      rateNumeric: 5.25,
      rateType: 'fixed',
      structureTag: 'Tasa Fija 30 Años',
      structureDesc: 'Fija 30 años',
      isBalloon: false,
      balloonText: 'Sin Balloon',
      closingCredits: '$15,000',
      closingNumeric: 15000,
      closingDetails: 'Gastos de cierre',
      firstTimePerk: 'Depósito mínimo',
      counties: ['Osceola'],
      keyAreas: 'Kissimmee',
      lender: 'Test Lender',
      contractDeadline: 'Hasta 30 de Noviembre de 2026',
      closingDeadline: 'Cierre en 30 días',
      expirationDate: '2026-11-30',
      link: 'https://example.com',
      badge: 'Test'
    };

    // Nov 5, 2026 to Nov 30, 2026
    const refDate = new Date(2026, 10, 5, 12, 0, 0);
    const days = getDaysRemaining(mockOffer, refDate);
    expect(days).toBeGreaterThanOrEqual(25);
    expect(days).toBeLessThanOrEqual(26);

    // Past date should return 0
    const pastDate = new Date(2026, 11, 5, 12, 0, 0);
    expect(getDaysRemaining(mockOffer, pastDate)).toBe(0);
  });
});
