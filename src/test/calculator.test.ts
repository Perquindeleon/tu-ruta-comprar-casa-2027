import { describe, it, expect } from 'vitest';
import { 
  calculateMonthlyPrincipalAndInterest, 
  calculateRealMortgage, 
  calculateRateComparisons 
} from '../utils/calculator';
import { CalculatorInputs } from '../types';

describe('Calculator Mortgage Formula & Real Costs', () => {
  it('calculates standard mortgage for $300k, 5% down ($285k loan), 7% rate, 30 years correctly', () => {
    const loan = 285000;
    const rate = 7.0;
    const years = 30;

    const monthlyPI = calculateMonthlyPrincipalAndInterest(loan, rate, years);
    // Standard financial calculation: approx $1896.11
    expect(monthlyPI).toBeCloseTo(1896.11, 1);
  });

  it('handles 0% interest rate correctly (P / totalMonths)', () => {
    const loan = 285000;
    const rate = 0;
    const years = 30;

    const monthlyPI = calculateMonthlyPrincipalAndInterest(loan, rate, years);
    expect(monthlyPI).toBeCloseTo(285000 / 360, 2);
    expect(monthlyPI).toBeCloseTo(791.67, 1);
  });

  it('handles negative or zero values safely', () => {
    expect(calculateMonthlyPrincipalAndInterest(-100000, 7, 30)).toBe(0);
    expect(calculateMonthlyPrincipalAndInterest(300000, -5, 30)).toBe(300000 / 360);
    expect(calculateMonthlyPrincipalAndInterest(300000, 7, 0)).toBe(0);
    expect(calculateMonthlyPrincipalAndInterest(0, 7, 30)).toBe(0);
  });

  it('handles empty / invalid inputs without throwing in calculateRealMortgage', () => {
    const emptyInputs: CalculatorInputs = {
      purchasePrice: 0,
      downPaymentMode: 'percent',
      downPaymentPercent: 0,
      downPaymentDollar: 0,
      annualInterestRate: 0,
      loanTermYears: 30,
      annualPropertyTax: 0,
      annualHomeInsurance: 0,
      monthlyPMI: 0,
      monthlyHOA: 0,
      monthlyFloodInsurance: 0,
      otherMonthlyExpenses: 0,
      closingCostsMode: 'percent',
      closingCostsPercent: 3,
      closingCostsDollar: 0,
      inspectionCost: 0,
      appraisalCost: 0,
      movingCost: 0,
      initialRepairsCost: 0,
      emergencyReserveCost: 0,
    };

    const result = calculateRealMortgage(emptyInputs);
    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPrincipalAndInterest).toBe(0);
    expect(result.monthlyTotalPayment).toBe(0);
    expect(result.totalCashNeeded).toBe(0);
  });

  it('calculates full escrow, closing costs, and cash to close correctly', () => {
    const sampleInputs: CalculatorInputs = {
      purchasePrice: 300000,
      downPaymentMode: 'percent',
      downPaymentPercent: 5,
      downPaymentDollar: 15000,
      annualInterestRate: 7.0,
      loanTermYears: 30,
      annualPropertyTax: 3600, // $300/mo
      annualHomeInsurance: 1200, // $100/mo
      monthlyPMI: 150,
      monthlyHOA: 50,
      monthlyFloodInsurance: 0,
      otherMonthlyExpenses: 0,
      closingCostsMode: 'percent',
      closingCostsPercent: 3.0, // $9,000
      closingCostsDollar: 9000,
      inspectionCost: 500,
      appraisalCost: 500,
      movingCost: 1000,
      initialRepairsCost: 1000,
      emergencyReserveCost: 3000,
    };

    const res = calculateRealMortgage(sampleInputs);

    expect(res.downPaymentAmount).toBe(15000);
    expect(res.loanAmount).toBe(285000);
    expect(res.monthlyPropertyTax).toBe(300);
    expect(res.monthlyHomeInsurance).toBe(100);
    expect(res.monthlyPMI).toBe(150);
    expect(res.monthlyHOA).toBe(50);
    expect(res.estimatedClosingCosts).toBe(9000);

    // monthly total = ~1896.11 + 300 + 100 + 150 + 50 = ~2496.11
    expect(res.monthlyTotalPayment).toBeCloseTo(2496.11, 1);

    // total upfront = 15000 (down) + 9000 (closing) + (500+500+1000+1000+3000) = 15000 + 9000 + 6000 = 30000
    expect(res.totalCashNeeded).toBe(30000);
  });

  it('calculates rate comparison scenarios properly', () => {
    const loan = 285000;
    const term = 30;
    const scenarios = calculateRateComparisons(loan, term, [6.0, 7.0, 8.0]);

    expect(scenarios).toHaveLength(3);
    expect(scenarios[0].rate).toBe(6.0);
    expect(scenarios[1].rate).toBe(7.0);
    expect(scenarios[2].rate).toBe(8.0);

    // Scenario 1 is base: diff vs base should be 0
    expect(scenarios[0].monthlyDifferenceVsBase).toBe(0);

    // Higher rates should yield higher payments
    expect(scenarios[1].monthlyPayment).toBeGreaterThan(scenarios[0].monthlyPayment);
    expect(scenarios[2].monthlyPayment).toBeGreaterThan(scenarios[1].monthlyPayment);

    // Annual difference = monthly * 12
    expect(scenarios[1].annualDifferenceVsBase).toBeCloseTo(scenarios[1].monthlyDifferenceVsBase * 12, 1);
  });
});
