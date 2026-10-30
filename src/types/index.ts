export type PurchaseTimeframe = 
  | '3_months' 
  | '6_months' 
  | '12_months' 
  | '2027_or_later' 
  | 'exploring';

export type CreditReviewStatus = 'yes' | 'no' | 'not_sure';

export type CreditSituation = 
  | 'excellent' 
  | 'good' 
  | 'fair' 
  | 'needs_improvement' 
  | 'prefer_not_to_say';

export type SavingsRange = 
  | 'under_3k' 
  | '3k_10k' 
  | '10k_25k' 
  | '25k_50k' 
  | 'over_50k' 
  | 'prefer_not_to_say';

export type DiagnosticAnswers = {
  timeframe?: PurchaseTimeframe;
  creditReviewed?: CreditReviewStatus;
  creditSituation?: CreditSituation;
  savings?: SavingsRange;
  monthlyDebts?: 'yes' | 'no' | 'prefer_not_to_say';
  calculatedBudget?: 'yes' | 'no';
  talkedToLender?: 'yes' | 'no';
  state?: string;
  countyOrCity?: string;
};

export type ReadinessTier = 'needs_prep' | 'in_progress' | 'ready_to_explore';

export interface DiagnosticResult {
  tier: ReadinessTier;
  title: string;
  badge: string;
  summary: string;
  reasons: string[];
  recommendations: string[];
}

export interface CalculatorInputs {
  purchasePrice: number;
  downPaymentMode: 'percent' | 'dollar';
  downPaymentPercent: number;
  downPaymentDollar: number;
  annualInterestRate: number;
  loanTermYears: number;
  annualPropertyTax: number;
  annualHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  monthlyFloodInsurance: number;
  otherMonthlyExpenses: number;
  closingCostsMode: 'percent' | 'dollar';
  closingCostsPercent: number;
  closingCostsDollar: number;
  // Extra upfront expenses
  inspectionCost: number;
  appraisalCost: number;
  movingCost: number;
  initialRepairsCost: number;
  emergencyReserveCost: number;
}

export interface CalculatorOutputs {
  downPaymentAmount: number;
  downPaymentPercentActual: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  monthlyFloodInsurance: number;
  monthlyOtherExpenses: number;
  monthlyTotalPayment: number;
  estimatedClosingCosts: number;
  totalAdditionalUpfront: number;
  totalCashNeeded: number;
}

export interface RateComparisonScenario {
  id: string;
  name: string;
  rate: number;
  monthlyPayment: number;
  monthlyDifferenceVsBase: number;
  annualDifferenceVsBase: number;
  lifetimeDifferenceVsBase: number;
  totalInterestPaid: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'etapa1' | 'etapa2' | 'etapa3' | 'etapa4';
  description?: string;
}

export interface AssistanceProgram {
  id: string;
  name: string;
  agency: string;
  description: string;
  jurisdiction: string; // 'Nacional' or State Code / Name
  type: 'dpa' | 'loan' | 'counseling' | 'tax_credit';
  targetAudience: 'first_time' | 'all' | 'veteran' | 'rural';
  officialUrl: string;
  lastVerified: string;
  status: 'verified' | 'pending_verification';
}

export interface EducationalArticle {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  explanation: string;
  whyItMatters: string;
  questionsToAsk: string[];
  recommendedActions: string[];
  officialSourceLabel: string;
  officialSourceUrl: string;
  lastUpdated: string;
}
