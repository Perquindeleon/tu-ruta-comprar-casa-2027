import { describe, it, expect } from 'vitest';
import { evaluateDiagnostic } from '../data/questions';
import { DiagnosticAnswers } from '../types';

describe('Diagnostic Evaluation Logic', () => {
  it('identifies ready_to_explore tier when buyer has good credit, savings, budget, and talks to lender', () => {
    const strongAnswers: DiagnosticAnswers = {
      timeframe: '2027_or_later',
      creditReviewed: 'yes',
      creditSituation: 'excellent',
      savings: 'over_50k',
      monthlyDebts: 'no',
      calculatedBudget: 'yes',
      talkedToLender: 'yes',
      state: 'FL',
    };

    const result = evaluateDiagnostic(strongAnswers);
    expect(result.tier).toBe('ready_to_explore');
    expect(result.title).toContain('listo para comenzar a explorar');
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('identifies in_progress tier for moderate answers', () => {
    const moderateAnswers: DiagnosticAnswers = {
      timeframe: '12_months',
      creditReviewed: 'yes',
      creditSituation: 'fair',
      savings: '10k_25k',
      monthlyDebts: 'yes',
      calculatedBudget: 'yes',
      talkedToLender: 'no',
      state: 'TX',
    };

    const result = evaluateDiagnostic(moderateAnswers);
    expect(result.tier).toBe('in_progress');
    expect(result.title).toContain('Estás avanzando');
  });

  it('identifies needs_prep tier when buyer needs to improve credit and has limited savings', () => {
    const prepAnswers: DiagnosticAnswers = {
      timeframe: '3_months',
      creditReviewed: 'no',
      creditSituation: 'needs_improvement',
      savings: 'under_3k',
      monthlyDebts: 'yes',
      calculatedBudget: 'no',
      talkedToLender: 'no',
      state: 'CA',
    };

    const result = evaluateDiagnostic(prepAnswers);
    expect(result.tier).toBe('needs_prep');
    expect(result.title).toContain('Necesitas comenzar a prepararte');
  });

  it('handles completely empty answers safely without throwing', () => {
    const emptyAnswers: DiagnosticAnswers = {};
    const result = evaluateDiagnostic(emptyAnswers);

    expect(result.tier).toBe('needs_prep');
    expect(result.title).toBeDefined();
    expect(result.recommendations.length).toBeGreaterThanOrEqual(1);
  });
});
