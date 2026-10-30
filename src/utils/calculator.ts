import { CalculatorInputs, CalculatorOutputs, RateComparisonScenario } from '../types';

/**
 * Calculates the monthly principal and interest using standard amortization formula:
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * 
 * Special cases:
 * - When r == 0, M = P / n
 * - When P <= 0 or n <= 0, M = 0
 */
export function calculateMonthlyPrincipalAndInterest(
  principal: number,
  annualRatePercent: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return 0;
  
  const totalMonths = Math.round(years * 12);
  if (totalMonths <= 0) return 0;

  // Handle 0% interest rate
  if (annualRatePercent <= 0) {
    return principal / totalMonths;
  }

  const monthlyRate = (annualRatePercent / 100) / 12;
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  
  if (!isFinite(factor) || factor <= 1) {
    return principal / totalMonths;
  }

  const monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
  return isFinite(monthlyPayment) && monthlyPayment > 0 ? monthlyPayment : 0;
}

export function calculateRealMortgage(inputs: CalculatorInputs): CalculatorOutputs {
  const price = Math.max(0, Number(inputs.purchasePrice) || 0);
  
  // Calculate down payment
  let downPaymentAmount = 0;
  let downPaymentPercentActual = 0;

  if (inputs.downPaymentMode === 'percent') {
    const pct = Math.max(0, Math.min(100, Number(inputs.downPaymentPercent) || 0));
    downPaymentAmount = (price * pct) / 100;
    downPaymentPercentActual = pct;
  } else {
    downPaymentAmount = Math.max(0, Math.min(price, Number(inputs.downPaymentDollar) || 0));
    downPaymentPercentActual = price > 0 ? (downPaymentAmount / price) * 100 : 0;
  }

  const loanAmount = Math.max(0, price - downPaymentAmount);
  const annualRate = Math.max(0, Number(inputs.annualInterestRate) || 0);
  const termYears = Math.max(1, Math.min(50, Number(inputs.loanTermYears) || 30));

  const monthlyPrincipalAndInterest = calculateMonthlyPrincipalAndInterest(
    loanAmount,
    annualRate,
    termYears
  );

  const monthlyPropertyTax = Math.max(0, (Number(inputs.annualPropertyTax) || 0) / 12);
  const monthlyHomeInsurance = Math.max(0, (Number(inputs.annualHomeInsurance) || 0) / 12);
  const monthlyPMI = Math.max(0, Number(inputs.monthlyPMI) || 0);
  const monthlyHOA = Math.max(0, Number(inputs.monthlyHOA) || 0);
  const monthlyFloodInsurance = Math.max(0, Number(inputs.monthlyFloodInsurance) || 0);
  const monthlyOtherExpenses = Math.max(0, Number(inputs.otherMonthlyExpenses) || 0);

  const monthlyTotalPayment = 
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyPMI +
    monthlyHOA +
    monthlyFloodInsurance +
    monthlyOtherExpenses;

  // Closing costs
  let estimatedClosingCosts = 0;
  if (inputs.closingCostsMode === 'percent') {
    const pct = Math.max(0, Number(inputs.closingCostsPercent) || 0);
    estimatedClosingCosts = (price * pct) / 100;
  } else {
    estimatedClosingCosts = Math.max(0, Number(inputs.closingCostsDollar) || 0);
  }

  // Additional upfront costs
  const totalAdditionalUpfront = 
    Math.max(0, Number(inputs.inspectionCost) || 0) +
    Math.max(0, Number(inputs.appraisalCost) || 0) +
    Math.max(0, Number(inputs.movingCost) || 0) +
    Math.max(0, Number(inputs.initialRepairsCost) || 0) +
    Math.max(0, Number(inputs.emergencyReserveCost) || 0);

  const totalCashNeeded = downPaymentAmount + estimatedClosingCosts + totalAdditionalUpfront;

  return {
    downPaymentAmount,
    downPaymentPercentActual,
    loanAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPMI,
    monthlyHOA,
    monthlyFloodInsurance,
    monthlyOtherExpenses,
    monthlyTotalPayment,
    estimatedClosingCosts,
    totalAdditionalUpfront,
    totalCashNeeded
  };
}

export function calculateRateComparisons(
  loanAmount: number,
  termYears: number,
  rates: [number, number, number]
): RateComparisonScenario[] {
  const safeLoan = Math.max(0, loanAmount);
  const safeYears = Math.max(1, termYears);
  const totalMonths = safeYears * 12;

  const scenarios: RateComparisonScenario[] = rates.map((rate, index) => {
    const safeRate = Math.max(0, rate);
    const monthlyPayment = calculateMonthlyPrincipalAndInterest(safeLoan, safeRate, safeYears);
    const totalPayments = monthlyPayment * totalMonths;
    const totalInterestPaid = Math.max(0, totalPayments - safeLoan);

    return {
      id: `scenario-${index + 1}`,
      name: `Escenario ${index + 1} (${safeRate.toFixed(2)}%)`,
      rate: safeRate,
      monthlyPayment,
      monthlyDifferenceVsBase: 0,
      annualDifferenceVsBase: 0,
      lifetimeDifferenceVsBase: 0,
      totalInterestPaid
    };
  });

  const basePayment = scenarios[0]?.monthlyPayment || 0;

  return scenarios.map((scenario) => {
    const monthlyDiff = scenario.monthlyPayment - basePayment;
    return {
      ...scenario,
      monthlyDifferenceVsBase: monthlyDiff,
      annualDifferenceVsBase: monthlyDiff * 12,
      lifetimeDifferenceVsBase: monthlyDiff * totalMonths
    };
  });
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
}
