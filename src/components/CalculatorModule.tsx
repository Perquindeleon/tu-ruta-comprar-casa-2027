import React from 'react';
import { 
  Calculator as CalcIcon, 
  ExternalLink, 
  TrendingUp, 
  ArrowRight,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { CalculatorInputs, CalculatorOutputs, RateComparisonScenario } from '../types';
import { 
  calculateRealMortgage, 
  calculateRateComparisons, 
  formatCurrency 
} from '../utils/calculator';
import { APP_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { CurrencyInput } from './CurrencyInput';

interface CalculatorModuleProps {
  inputs: CalculatorInputs;
  onUpdateInputs: (updated: Partial<CalculatorInputs>) => void;
  comparisonRates: [number, number, number];
  onUpdateComparisonRates: (rates: [number, number, number]) => void;
  onContinueToChecklist: () => void;
}

// Quick price options from $50,000 to $1,500,000 in $50,000 increments
const QUICK_PRICE_OPTIONS = Array.from({ length: 30 }, (_, i) => (i + 1) * 50000);

export const CalculatorModule: React.FC<CalculatorModuleProps> = ({
  inputs,
  onUpdateInputs,
  comparisonRates,
  onUpdateComparisonRates,
  onContinueToChecklist,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const outputs: CalculatorOutputs = calculateRealMortgage(inputs);
  
  // Real-time calculated rate scenarios based on active comparison rates
  // Guarantee fallback positive rates if user hasn't set them or if 0 was passed
  const safeBaseRate = inputs.annualInterestRate > 0 ? inputs.annualInterestRate : 7.0;
  const effectiveComparisonRates: [number, number, number] = [
    comparisonRates[0] > 0 ? comparisonRates[0] : Math.max(0.5, Number((safeBaseRate - 1).toFixed(2))),
    comparisonRates[1] > 0 ? comparisonRates[1] : Number(safeBaseRate.toFixed(2)),
    comparisonRates[2] > 0 ? comparisonRates[2] : Number((safeBaseRate + 1).toFixed(2)),
  ];

  const rateScenarios: RateComparisonScenario[] = calculateRateComparisons(
    outputs.loanAmount,
    inputs.loanTermYears,
    effectiveComparisonRates
  );

  const handlePriceChange = (val: number) => {
    const price = Math.max(0, val);
    let newDownDollar = inputs.downPaymentDollar;
    if (inputs.downPaymentMode === 'percent') {
      newDownDollar = (price * inputs.downPaymentPercent) / 100;
    }
    onUpdateInputs({
      purchasePrice: price,
      downPaymentDollar: newDownDollar,
    });
  };

  const handleDownPercentChange = (pct: number) => {
    const validPct = Math.max(0, Math.min(100, pct));
    const dollar = (inputs.purchasePrice * validPct) / 100;
    onUpdateInputs({
      downPaymentMode: 'percent',
      downPaymentPercent: validPct,
      downPaymentDollar: dollar,
    });
  };

  const handleDownDollarChange = (dollar: number) => {
    const validDollar = Math.max(0, inputs.purchasePrice > 0 ? Math.min(inputs.purchasePrice, dollar) : dollar);
    const pct = inputs.purchasePrice > 0 ? (validDollar / inputs.purchasePrice) * 100 : 0;
    onUpdateInputs({
      downPaymentMode: 'dollar',
      downPaymentDollar: validDollar,
      downPaymentPercent: pct,
    });
  };

  const handleClosingPercentChange = (pct: number) => {
    const validPct = Math.max(0, pct);
    const dollar = (inputs.purchasePrice * validPct) / 100;
    onUpdateInputs({
      closingCostsMode: 'percent',
      closingCostsPercent: validPct,
      closingCostsDollar: dollar,
    });
  };

  const handleClosingDollarChange = (dollar: number) => {
    const validDollar = Math.max(0, dollar);
    const pct = inputs.purchasePrice > 0 ? (validDollar / inputs.purchasePrice) * 100 : 0;
    onUpdateInputs({
      closingCostsMode: 'dollar',
      closingCostsDollar: validDollar,
      closingCostsPercent: pct,
    });
  };

  const handleApplyLoanPreset = (type: 'fha' | 'conv5' | 'conv20' | 'va') => {
    if (type === 'fha') {
      const downPct = 3.5;
      const downDollar = (inputs.purchasePrice * downPct) / 100;
      const loan = Math.max(0, inputs.purchasePrice - downDollar);
      const mip = Math.round((loan * 0.0055) / 12);
      onUpdateInputs({
        downPaymentMode: 'percent',
        downPaymentPercent: downPct,
        downPaymentDollar: downDollar,
        monthlyPMI: mip,
      });
    } else if (type === 'conv5') {
      const downPct = 5.0;
      const downDollar = (inputs.purchasePrice * downPct) / 100;
      const loan = Math.max(0, inputs.purchasePrice - downDollar);
      const pmi = Math.round((loan * 0.006) / 12);
      onUpdateInputs({
        downPaymentMode: 'percent',
        downPaymentPercent: downPct,
        downPaymentDollar: downDollar,
        monthlyPMI: pmi,
      });
    } else if (type === 'conv20') {
      const downPct = 20.0;
      const downDollar = (inputs.purchasePrice * downPct) / 100;
      onUpdateInputs({
        downPaymentMode: 'percent',
        downPaymentPercent: downPct,
        downPaymentDollar: downDollar,
        monthlyPMI: 0,
      });
    } else if (type === 'va') {
      onUpdateInputs({
        downPaymentMode: 'percent',
        downPaymentPercent: 0,
        downPaymentDollar: 0,
        monthlyPMI: 0,
      });
    }
  };

  const handleLoadTypicalUpfrontCosts = () => {
    onUpdateInputs({
      inspectionCost: 450,
      appraisalCost: 550,
      movingCost: 1200,
      initialRepairsCost: 1500,
      emergencyReserveCost: 5000,
    });
  };

  const handleClearUpfrontCosts = () => {
    onUpdateInputs({
      inspectionCost: 0,
      appraisalCost: 0,
      movingCost: 0,
      initialRepairsCost: 0,
      emergencyReserveCost: 0,
    });
  };

  const handleResetRatesToDefaults = () => {
    if (inputs.annualInterestRate > 0) {
      const base = inputs.annualInterestRate;
      const r1 = Math.max(0.5, Number((base - 1).toFixed(2)));
      const r2 = Number(base.toFixed(2));
      const r3 = Number((base + 1).toFixed(2));
      onUpdateComparisonRates([r1, r2, r3]);
    } else {
      onUpdateComparisonRates([6.0, 7.0, 8.0]);
    }
  };

  return (
    <section id="calculadora" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <CalcIcon className="w-4 h-4" />
          <span>{isEn ? 'Module B: Complete & Transparent Calculation' : 'Módulo B: Cálculo Completo y Transparente'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          {isEn ? 'How much does it really cost to buy this home?' : '¿Cuánto cuesta realmente comprar esta casa?'}
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl mx-auto text-base">
          {isEn
            ? 'Many buyers only calculate principal and interest. Here we break down property taxes, insurance, HOA fees, closing costs, and emergency reserves so you know the true total cost before committing your money.'
            : 'Muchos compradores solo calculan el capital y los intereses. Aquí desglosamos impuestos, seguros, cuotas de HOA, costos de cierre y fondos de reserva para que conozcas el costo total antes de comprometer tu dinero.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-6">
            <h3 className="text-lg font-bold text-[#102C46] border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>{isEn ? '1. Purchase & Financing Details' : '1. Datos de Compra y Financiamiento'}</span>
              <span className="text-xs font-semibold text-[#2B7A55] bg-[#F1F9EC] px-2.5 py-0.5 rounded-full">
                {isEn ? 'Commas auto-format' : 'Comas automáticas'}
              </span>
            </h3>

            {/* Purchase Price with $50k Dropdown Quick-Pick */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-1.5">
                <label htmlFor="purchase-price-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? 'Home Purchase Price' : 'Precio de Compra de la Vivienda'}
                </label>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] font-bold text-[#2B7A55]">
                    {isEn ? 'Quick pick ($50k steps):' : 'Precios de $50k en $50k:'}
                  </span>
                  <select
                    value={QUICK_PRICE_OPTIONS.includes(inputs.purchasePrice) ? inputs.purchasePrice : ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (val > 0) handlePriceChange(val);
                    }}
                    className="text-xs font-bold text-[#102C46] bg-[#F1F9EC] border border-[#C7E7A4] rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-[#2B7A55] cursor-pointer"
                  >
                    <option value="">{isEn ? '-- Select price --' : '-- Selecciona un precio --'}</option>
                    {QUICK_PRICE_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {formatCurrency(p)} ({p >= 1000000 ? `$${(p / 1000000).toFixed(p % 1000000 === 0 ? 0 : 2)}M` : `$${Math.round(p / 1000)}k`})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-extrabold text-lg">
                  $
                </div>
                <CurrencyInput
                  id="purchase-price-input"
                  value={inputs.purchasePrice}
                  onChange={handlePriceChange}
                  placeholder="0"
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-extrabold text-slate-900 text-lg focus:bg-white focus:ring-2 focus:ring-[#2B7A55] focus:border-[#2B7A55] transition-all"
                />
              </div>

              {/* Popular quick price buttons */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">
                  {isEn ? 'Popular:' : 'Frecuentes:'}
                </span>
                {[250000, 300000, 350000, 400000, 450000, 500000].map((pr) => (
                  <button
                    key={pr}
                    type="button"
                    onClick={() => handlePriceChange(pr)}
                    className={`px-2 py-0.5 text-xs font-bold rounded-lg border transition-all ${
                      inputs.purchasePrice === pr
                        ? 'bg-[#2B7A55] text-white border-[#2B7A55]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#2B7A55] hover:text-[#2B7A55]'
                    }`}
                  >
                    ${pr / 1000}k
                  </button>
                ))}
              </div>

              <span className="text-[11px] text-slate-500 font-medium block mt-1">
                {isEn
                  ? 'Type any exact price with automatic commas, or select directly from the $50k dropdown.'
                  : 'Escribe cualquier valor (las comas se colocan solas) o selecciona del desplegable de $50k en $50k.'}
              </span>
            </div>

            {/* Down Payment ($ or %) */}
            <div>
              {/* Loan Type Presets */}
              <div className="mb-3 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#102C46]">
                    {isEn ? 'Loan Presets (1-Click):' : 'Programas de Préstamo (1 Clic):'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {isEn ? 'Auto-sets down payment & PMI' : 'Ajusta pronto y PMI'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleApplyLoanPreset('fha')}
                    className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition-all text-center ${
                      inputs.downPaymentMode === 'percent' && inputs.downPaymentPercent === 3.5
                        ? 'border-[#2B7A55] bg-[#2B7A55] text-white shadow-xs'
                        : 'border-slate-300 bg-white hover:border-[#2B7A55] text-slate-700 hover:text-[#2B7A55]'
                    }`}
                  >
                    <span>FHA (3.5%)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyLoanPreset('conv5')}
                    className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition-all text-center ${
                      inputs.downPaymentMode === 'percent' && inputs.downPaymentPercent === 5.0
                        ? 'border-[#2B7A55] bg-[#2B7A55] text-white shadow-xs'
                        : 'border-slate-300 bg-white hover:border-[#2B7A55] text-slate-700 hover:text-[#2B7A55]'
                    }`}
                  >
                    <span>{isEn ? 'Conv 5%' : 'Conv. (5%)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyLoanPreset('conv20')}
                    className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition-all text-center ${
                      inputs.downPaymentMode === 'percent' && inputs.downPaymentPercent === 20.0
                        ? 'border-[#2B7A55] bg-[#2B7A55] text-white shadow-xs'
                        : 'border-slate-300 bg-white hover:border-[#2B7A55] text-slate-700 hover:text-[#2B7A55]'
                    }`}
                  >
                    <span>{isEn ? 'Conv 20% (No PMI)' : 'Conv. 20% (Sin PMI)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyLoanPreset('va')}
                    className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition-all text-center ${
                      inputs.downPaymentMode === 'percent' && inputs.downPaymentPercent === 0
                        ? 'border-[#2B7A55] bg-[#2B7A55] text-white shadow-xs'
                        : 'border-slate-300 bg-white hover:border-[#2B7A55] text-slate-700 hover:text-[#2B7A55]'
                    }`}
                  >
                    <span>{isEn ? 'VA (0% Military)' : 'VA (0% Militar)'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? 'Down Payment' : 'Pronto (Pago Inicial / Down Payment)'}
                </label>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100">
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ downPaymentMode: 'percent' })}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      inputs.downPaymentMode === 'percent'
                        ? 'bg-[#2B7A55] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isEn ? '% Percent' : '% Porcentaje'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ downPaymentMode: 'dollar' })}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      inputs.downPaymentMode === 'dollar'
                        ? 'bg-[#2B7A55] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isEn ? '$ Dollars' : '$ Dólares'}
                  </button>
                </div>
              </div>

              {inputs.downPaymentMode === 'percent' ? (
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={inputs.downPaymentPercent || ''}
                    onChange={(e) => handleDownPercentChange(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500 font-bold">
                    %
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    value={inputs.downPaymentDollar}
                    onChange={handleDownDollarChange}
                    placeholder="0"
                    max={inputs.purchasePrice > 0 ? inputs.purchasePrice : undefined}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-slate-600 font-medium mt-1.5 px-1">
                <span>
                  {isEn ? 'Equivalent: ' : 'Equivalente: '}
                  <strong className="text-slate-900">{formatCurrency(outputs.downPaymentAmount)}</strong> ({outputs.downPaymentPercentActual.toFixed(1)}%)
                </span>
                <span>
                  {isEn ? 'Loan Amount: ' : 'Monto a financiar: '}
                  <strong className="text-[#102C46]">{formatCurrency(outputs.loanAmount)}</strong>
                </span>
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="interest-rate-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isEn ? 'Annual Interest Rate' : 'Tasa de Interés Anual'}
                  </label>
                  <a
                    href={APP_CONFIG.pmmsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#2B7A55] hover:underline flex items-center space-x-1 font-semibold"
                    title={isEn ? 'View Freddie Mac PMMS official weekly benchmark' : 'Ver promedio semanal oficial Freddie Mac PMMS'}
                  >
                    <span>{isEn ? 'Check Freddie Mac' : 'Ver Freddie Mac'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="interest-rate-input"
                    type="number"
                    min="0"
                    max="25"
                    step="0.125"
                    placeholder="0.0"
                    value={inputs.annualInterestRate || ''}
                    onChange={(e) => onUpdateInputs({ annualInterestRate: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500 font-bold">
                    %
                  </div>
                </div>
                <span className="text-[11px] text-slate-600 font-medium block mt-1">
                  {isEn ? 'Enter the rate quoted by your lender.' : 'Introduce la tasa que te cotice tu prestamista.'}
                </span>
              </div>

              <div>
                <label htmlFor="loan-term-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isEn ? 'Loan Term' : 'Plazo del Préstamo'}
                </label>
                <select
                  id="loan-term-select"
                  value={inputs.loanTermYears}
                  onChange={(e) => onUpdateInputs({ loanTermYears: parseInt(e.target.value, 10) || 30 })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                >
                  <option value={30}>{isEn ? '30 years (360 mos) — Most common' : '30 años (360 meses) — El más común'}</option>
                  <option value={20}>{isEn ? '20 years (240 mos)' : '20 años (240 meses)'}</option>
                  <option value={15}>{isEn ? '15 years (180 mos) — Less total interest' : '15 años (180 meses) — Menos interés total'}</option>
                  <option value={10}>{isEn ? '10 years (120 mos)' : '10 años (120 meses)'}</option>
                </select>
                <span className="text-[11px] text-slate-600 font-medium block mt-1">
                  {isEn
                    ? 'Shorter terms have higher monthly payments but lower total interest.'
                    : 'A menor plazo, mayor pago mensual pero menor costo en intereses.'}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Housing Escrow & HOA */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-5">
            <h3 className="text-lg font-bold text-[#102C46] border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>{isEn ? '2. Taxes, Insurance & Monthly Fees (Escrow)' : '2. Impuestos, Seguros y Gastos Mensuales (Escrow)'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Annual Property Tax */}
              <div>
                <label htmlFor="annual-property-tax-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isEn ? 'Annual Property Taxes' : 'Impuestos de Propiedad Anuales'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    id="annual-property-tax-input"
                    value={inputs.annualPropertyTax}
                    onChange={(val) => onUpdateInputs({ annualPropertyTax: val })}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-600 font-medium block mt-1">
                  {isEn ? `Approx: ${formatCurrency(outputs.monthlyPropertyTax)} / month` : `Aprox: ${formatCurrency(outputs.monthlyPropertyTax)} al mes`}
                </span>
              </div>

              {/* Annual Home Insurance */}
              <div>
                <label htmlFor="annual-home-insurance-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isEn ? 'Annual Homeowners Insurance (HO-3)' : 'Seguro de Vivienda Anual (Haz/HO-3)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    id="annual-home-insurance-input"
                    value={inputs.annualHomeInsurance}
                    onChange={(val) => onUpdateInputs({ annualHomeInsurance: val })}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-600 font-medium block mt-1">
                  {isEn ? `Approx: ${formatCurrency(outputs.monthlyHomeInsurance)} / month` : `Aprox: ${formatCurrency(outputs.monthlyHomeInsurance)} al mes`}
                </span>
              </div>

              {/* Monthly PMI */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="monthly-pmi-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isEn ? 'Monthly Mortgage Insurance (PMI / MIP)' : 'Seguro Hipotecario Mensual (PMI / MIP)'}
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    id="monthly-pmi-input"
                    value={inputs.monthlyPMI}
                    onChange={(val) => onUpdateInputs({ monthlyPMI: val })}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-600 font-medium block mt-1">
                  {isEn ? 'Generally applies if down payment is under 20%.' : 'Aplica generalmente si el pronto es menor al 20%.'}
                </span>

                {/* Smart detection if user enters an annual PMI figure (e.g. $1,250) instead of monthly */}
                {inputs.monthlyPMI > 400 && (
                  <div className="mt-2.5 p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start space-x-2.5 text-xs text-amber-900 shadow-2xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-extrabold text-amber-950 block">
                        {isEn ? '⚠️ Did you enter ANNUAL PMI instead of MONTHLY?' : '⚠️ ¿Ingresaste el PMI ANUAL en vez de MENSUAL?'}
                      </span>
                      <p className="mt-0.5 text-slate-700 leading-snug">
                        {isEn
                          ? `If $${new Intl.NumberFormat('en-US').format(inputs.monthlyPMI)} is your annual PMI, your monthly payment is ~$${Math.round(inputs.monthlyPMI / 12)}/mo. (Typical monthly PMI is $100–$220).`
                          : `Si $${new Intl.NumberFormat('en-US').format(inputs.monthlyPMI)} es lo que pagarías al año, tu cuota mensual real es de ~$${Math.round(inputs.monthlyPMI / 12)}/mes. (El PMI mensual típico está entre $100 y $220).`}
                      </p>
                      <button
                        type="button"
                        onClick={() => onUpdateInputs({ monthlyPMI: Math.round(inputs.monthlyPMI / 12) })}
                        className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-2xs"
                      >
                        <span>{isEn ? `Convert to $${Math.round(inputs.monthlyPMI / 12)}/month` : `Convertir a $${Math.round(inputs.monthlyPMI / 12)}/mes`}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly HOA */}
              <div>
                <label htmlFor="monthly-hoa-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isEn ? 'Monthly HOA Dues (If applicable)' : 'Cuota Mensual de HOA (Si aplica)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    id="monthly-hoa-input"
                    value={inputs.monthlyHOA}
                    onChange={(val) => onUpdateInputs({ monthlyHOA: val })}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-600 font-medium block mt-1">
                  {isEn ? 'Condos, townhomes, or HOA communities.' : 'Condominios o urbanizaciones con asociación.'}
                </span>
              </div>

              {/* Monthly Flood Insurance */}
              <div>
                <label htmlFor="monthly-flood-insurance-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isEn ? 'Monthly Flood Insurance (If applicable)' : 'Seguro de Inundación Mensual (Si aplica)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    id="monthly-flood-insurance-input"
                    value={inputs.monthlyFloodInsurance}
                    onChange={(val) => onUpdateInputs({ monthlyFloodInsurance: val })}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>

              {/* Other Monthly Expenses */}
              <div>
                <label htmlFor="other-monthly-expenses-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isEn ? 'Other Related Monthly Costs' : 'Otros Gastos Mensuales Vinculados'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    id="other-monthly-expenses-input"
                    value={inputs.otherMonthlyExpenses}
                    onChange={(val) => onUpdateInputs({ otherMonthlyExpenses: val })}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Closing Costs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-5">
            <h3 className="text-lg font-bold text-[#102C46] border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>{isEn ? '3. Closing Costs (Escrow & Settlement)' : '3. Costos de Cierre (Closing Costs)'}</span>
            </h3>

            {/* Closing costs toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? 'Estimated Closing Costs' : 'Costos de Cierre Estimados'}
                </label>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100">
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ closingCostsMode: 'percent' })}
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      inputs.closingCostsMode === 'percent'
                        ? 'bg-[#2B7A55] text-white'
                        : 'text-slate-600'
                    }`}
                  >
                    % Ref (2-5%)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ closingCostsMode: 'dollar' })}
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      inputs.closingCostsMode === 'dollar'
                        ? 'bg-[#2B7A55] text-white'
                        : 'text-slate-600'
                    }`}
                  >
                    {isEn ? '$ Fixed' : '$ Fijo'}
                  </button>
                </div>
              </div>

              {inputs.closingCostsMode === 'percent' ? (
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="15"
                    step="0.25"
                    value={inputs.closingCostsPercent || ''}
                    onChange={(e) => handleClosingPercentChange(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500 font-bold">
                    %
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <CurrencyInput
                    value={inputs.closingCostsDollar}
                    onChange={handleClosingDollarChange}
                    placeholder="0"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              )}
              <div className="text-[11px] text-slate-600 font-medium mt-1.5 flex items-center justify-between">
                <span>
                  {isEn ? 'Calculated: ' : 'Cálculo: '}
                  <strong className="text-slate-900">{formatCurrency(outputs.estimatedClosingCosts)}</strong>
                </span>
                <span className="text-amber-900 bg-amber-100 font-semibold px-2 py-0.5 rounded">
                  {isEn ? 'Typical range: 2% to 5% of price' : 'Referencia habitual: 2% a 5% del precio'}
                </span>
              </div>
            </div>
          </div>

          {/* HIGH-IMPACT WARNING CARD: Expenses many buyers forget to budget for (SCREENSHOT FIX) */}
          <div className="border-2 border-amber-400 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden transition-all">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/40 rounded-full pointer-events-none blur-xl" />

            {/* Banner Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-amber-200 gap-4 relative z-10">
              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md shrink-0">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1.5 bg-amber-200/80 border border-amber-300 text-amber-950 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1.5">
                    <span>⚠️ {isEn ? 'CRITICAL STEP • DO NOT SKIP' : 'PASO CRÍTICO • NO LO SALTES'}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-[#102C46] tracking-tight">
                    {isEn
                      ? 'Expenses 90% of buyers forget to budget for'
                      : 'Gastos que muchas personas olvidan presupuestar'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed max-w-xl font-medium">
                    {isEn
                      ? 'Most first-time buyers only save for the down payment and end up financially stranded at the closing table. These 5 costs are real and unavoidable — plan for them now:'
                      : 'La mayoría de compradores ahorra únicamente para el pronto y llega al cierre sin fondos para inspección, mudanza o reparaciones. Llena estos 5 rubros para tener tranquilidad total:'}
                  </p>
                </div>
              </div>

              {/* Quick action buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  onClick={handleLoadTypicalUpfrontCosts}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#2B7A55] hover:bg-[#226344] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5"
                  title={isEn ? 'Preload realistic typical expenses ($8,700 total)' : 'Cargar valores realistas sugeridos ($8,700 en total)'}
                >
                  <Sparkles className="w-4 h-4 text-[#C7E7A4]" />
                  <span>{isEn ? 'Load typical ($8.7k)' : 'Cargar típicos ($8.7k)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearUpfrontCosts}
                  className="px-2.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-colors shadow-2xs"
                  title={isEn ? 'Reset to zero' : 'Limpiar a cero'}
                >
                  {isEn ? 'Clear' : 'Limpiar'}
                </button>
              </div>
            </div>

            {/* Inputs grid with automatic commas */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {/* Inspection */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="inspection-cost-input" className="block text-xs font-bold text-slate-800">
                    {isEn ? 'Independent Home Inspection' : 'Inspección técnica independiente'}
                  </label>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ inspectionCost: 500 })}
                    className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title={isEn ? 'Set to typical $500' : 'Fijar en $500 típico'}
                  >
                    + {isEn ? 'Use $500' : 'Usar $500'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-extrabold">
                    $
                  </div>
                  <CurrencyInput
                    id="inspection-cost-input"
                    value={inputs.inspectionCost}
                    onChange={(val) => onUpdateInputs({ inspectionCost: val })}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>

              {/* Appraisal */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="appraisal-cost-input" className="block text-xs font-bold text-slate-800">
                    {isEn ? 'Bank Appraisal (Required)' : 'Tasación del banco (Appraisal)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ appraisalCost: 600 })}
                    className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title={isEn ? 'Set to typical $600' : 'Fijar en $600 típico'}
                  >
                    + {isEn ? 'Use $600' : 'Usar $600'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-extrabold">
                    $
                  </div>
                  <CurrencyInput
                    id="appraisal-cost-input"
                    value={inputs.appraisalCost}
                    onChange={(val) => onUpdateInputs({ appraisalCost: val })}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>

              {/* Moving */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="moving-cost-input" className="block text-xs font-bold text-slate-800">
                    {isEn ? 'Moving & Initial Logistics' : 'Mudanza y logística inicial'}
                  </label>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ movingCost: 1200 })}
                    className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title={isEn ? 'Set to typical $1,200' : 'Fijar en $1,200 típico'}
                  >
                    + {isEn ? 'Use $1,200' : 'Usar $1,200'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-extrabold">
                    $
                  </div>
                  <CurrencyInput
                    id="moving-cost-input"
                    value={inputs.movingCost}
                    onChange={(val) => onUpdateInputs({ movingCost: val })}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>

              {/* Repairs */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="initial-repairs-cost-input" className="block text-xs font-bold text-slate-800">
                    {isEn ? 'Initial Repairs & Painting' : 'Reparaciones y pintura inicial'}
                  </label>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ initialRepairsCost: 1500 })}
                    className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title={isEn ? 'Set to typical $1,500' : 'Fijar en $1,500 típico'}
                  >
                    + {isEn ? 'Use $1,500' : 'Usar $1,500'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-extrabold">
                    $
                  </div>
                  <CurrencyInput
                    id="initial-repairs-cost-input"
                    value={inputs.initialRepairsCost}
                    onChange={(val) => onUpdateInputs({ initialRepairsCost: val })}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>

              {/* Emergency Reserve */}
              <div className="sm:col-span-2 bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="emergency-reserve-cost-input" className="block text-xs font-bold text-slate-800">
                    {isEn
                      ? 'Untouchable Post-Closing Emergency Reserve (3 months cushion)'
                      : 'Reserva intocable para emergencias post-compra (3 meses recomendado)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => onUpdateInputs({ emergencyReserveCost: 5000 })}
                    className="text-[10px] font-bold text-[#2B7A55] bg-[#F1F9EC] hover:bg-[#E2F3D9] border border-[#C7E7A4] px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title={isEn ? 'Set to recommended $5,000 cushion' : 'Fijar en $5,000 de colchón'}
                  >
                    + {isEn ? 'Use $5,000 cushion' : 'Usar $5,000 colchón'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-extrabold">
                    $
                  </div>
                  <CurrencyInput
                    id="emergency-reserve-cost-input"
                    value={inputs.emergencyReserveCost}
                    onChange={(val) => onUpdateInputs({ emergencyReserveCost: val })}
                    placeholder="0"
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-extrabold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-600 font-medium block mt-1.5">
                  {isEn
                    ? 'Do not spend this on the house. It is your family shield if appliances break or work hours fluctuate.'
                    : 'Este dinero no se gasta en la compra; es tu escudo familiar por si se daña un aire acondicionado o baja el trabajo.'}
                </span>
              </div>
            </div>

            {/* Live Status Strip for forgotten expenses */}
            {(() => {
              const totalForgottenExpenses =
                (inputs.inspectionCost || 0) +
                (inputs.appraisalCost || 0) +
                (inputs.movingCost || 0) +
                (inputs.initialRepairsCost || 0) +
                (inputs.emergencyReserveCost || 0);

              if (totalForgottenExpenses === 0) {
                return (
                  <div className="mt-4 p-3 bg-amber-100/90 border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-950 font-medium relative z-10">
                    <span className="flex items-center space-x-2 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        {isEn
                          ? '⚠️ $0 budgeted for hidden costs: High risk of financial shortfall at closing table.'
                          : '⚠️ $0 presupuestado para imprevistos: Riesgo alto de quedarte sin dinero en la mesa de cierre.'}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={handleLoadTypicalUpfrontCosts}
                      className="font-extrabold text-[#2B7A55] underline hover:text-[#1e583c] self-start sm:self-auto cursor-pointer"
                    >
                      {isEn ? 'Click here to load typical ($8.7k) →' : 'Pulsa aquí para cargar típicos ($8.7k) →'}
                    </button>
                  </div>
                );
              }

              return (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-950 relative z-10">
                  <span className="font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {isEn
                        ? `Shielded for move-in & emergency cushion: ${formatCurrency(totalForgottenExpenses)}`
                        : `Protegido para mudanza, inspección y colchón familiar: ${formatCurrency(totalForgottenExpenses)}`}
                    </span>
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                    {isEn ? 'Included in total cash needed' : 'Sumado en Efectivo Total Necesario'}
                  </span>
                </div>
              );
            })()}
          </div>
        </div>

        {/* RIGHT COLUMN: REAL SUMMARY CARDS (Sticky) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          {/* Main Payment Result Card */}
          <div className="bg-[#102C46] text-white rounded-2xl shadow-xl p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B7A55]/30 rounded-bl-full pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#C7E7A4] block mb-1">
                {isEn ? 'Estimated Total Monthly Payment' : 'Pago Mensual Total Estimado'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                {formatCurrency(outputs.monthlyTotalPayment)}
                <span className="text-sm font-normal text-slate-300 ml-1">{isEn ? '/ mo' : '/ mes'}</span>
              </div>

              {/* Segmented Color Bar Breakdown */}
              {outputs.monthlyTotalPayment > 0 && (() => {
                const totalPay = outputs.monthlyTotalPayment || 1;
                const pctPI = Math.min(100, Math.max(0, (outputs.monthlyPrincipalAndInterest / totalPay) * 100));
                const pctTax = Math.min(100, Math.max(0, (outputs.monthlyPropertyTax / totalPay) * 100));
                const pctIns = Math.min(100, Math.max(0, ((outputs.monthlyHomeInsurance + outputs.monthlyFloodInsurance) / totalPay) * 100));
                const pctOther = Math.min(100, Math.max(0, ((outputs.monthlyPMI + outputs.monthlyHOA + outputs.monthlyOtherExpenses) / totalPay) * 100));

                return (
                  <div className="mb-4">
                    <div className="h-3 w-full bg-slate-900/90 rounded-full flex overflow-hidden p-0.5 gap-0.5 shadow-inner">
                      {pctPI > 0 && (
                        <div style={{ width: `${pctPI}%` }} className="bg-[#38BDF8] rounded-l-full transition-all" title={`P&I: ${pctPI.toFixed(0)}%`} />
                      )}
                      {pctTax > 0 && (
                        <div style={{ width: `${pctTax}%` }} className="bg-[#34D399] transition-all" title={`Taxes: ${pctTax.toFixed(0)}%`} />
                      )}
                      {pctIns > 0 && (
                        <div style={{ width: `${pctIns}%` }} className="bg-[#FBBF24] transition-all" title={`Insurance: ${pctIns.toFixed(0)}%`} />
                      )}
                      {pctOther > 0 && (
                        <div style={{ width: `${pctOther}%` }} className="bg-[#F472B6] rounded-r-full transition-all" title={`PMI/HOA/Other: ${pctOther.toFixed(0)}%`} />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-300 mt-2 font-medium">
                      <span className="inline-flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                        <span>{isEn ? 'P&I' : 'Capital e Interés'} ({pctPI.toFixed(0)}%)</span>
                      </span>
                      <span className="inline-flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                        <span>{isEn ? 'Taxes' : 'Impuestos'} ({pctTax.toFixed(0)}%)</span>
                      </span>
                      <span className="inline-flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                        <span>{isEn ? 'Insurance' : 'Seguro'} ({pctIns.toFixed(0)}%)</span>
                      </span>
                      {pctOther > 0 && (
                        <span className="inline-flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                          <span>PMI/HOA ({pctOther.toFixed(0)}%)</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Monthly breakdown itemization */}
              <div className="space-y-2 text-xs border-t border-slate-700 pt-4 pb-2">
                <div className="flex justify-between items-center text-slate-200">
                  <span>{isEn ? 'Principal & Interest (P&I):' : 'Capital e Intereses (P&I):'}</span>
                  <span className="font-bold text-white">{formatCurrency(outputs.monthlyPrincipalAndInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>{isEn ? 'Property Taxes (mo):' : 'Impuestos de propiedad (mes):'}</span>
                  <span className="font-bold text-white">{formatCurrency(outputs.monthlyPropertyTax)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>{isEn ? 'Homeowners Insurance (mo):' : 'Seguro de vivienda (mes):'}</span>
                  <span className="font-bold text-white">{formatCurrency(outputs.monthlyHomeInsurance)}</span>
                </div>
                {outputs.monthlyPMI > 0 && (
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{isEn ? 'Mortgage Insurance (PMI):' : 'Seguro hipotecario (PMI):'}</span>
                    <span className="font-bold text-[#C7E7A4]">{formatCurrency(outputs.monthlyPMI)}</span>
                  </div>
                )}
                {outputs.monthlyHOA > 0 && (
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{isEn ? 'HOA Dues (mo):' : 'Cuota de HOA (mes):'}</span>
                    <span className="font-bold text-white">{formatCurrency(outputs.monthlyHOA)}</span>
                  </div>
                )}
                {(outputs.monthlyFloodInsurance + outputs.monthlyOtherExpenses) > 0 && (
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{isEn ? 'Flood Insurance / Other:' : 'Seguro Inundación / Otros:'}</span>
                    <span className="font-bold text-white">
                      {formatCurrency(outputs.monthlyFloodInsurance + outputs.monthlyOtherExpenses)}
                    </span>
                  </div>
                )}
              </div>

              {/* Suggested Gross Household Income (DTI 28%) */}
              {outputs.monthlyTotalPayment > 0 && (
                <div className="mt-4 bg-white/10 border border-white/15 rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between text-[#C7E7A4] font-black mb-1">
                    <span>{isEn ? '💡 Suggested Household Gross Income:' : '💡 Ingreso Bruto Familiar Sugerido:'}</span>
                    <span className="text-[10px] uppercase bg-[#2B7A55] text-white px-2 py-0.5 rounded-full font-bold">
                      {isEn ? 'DTI Rule (28%-32%)' : 'Regla 28% DTI'}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white">
                    ~{formatCurrency(outputs.recommendedMonthlyIncome28)} <span className="text-xs font-normal text-slate-300">{isEn ? '/ mo' : '/ mes'}</span>
                    <span className="text-xs text-[#C7E7A4] font-medium ml-2">({formatCurrency(outputs.recommendedAnnualIncome28)} {isEn ? '/ yr' : '/ año'})</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1.5 leading-snug">
                    {isEn
                      ? 'Gross income before taxes recommended so this housing payment stays below 28%-32% of your budget.'
                      : 'Ingreso antes de impuestos recomendado para que tu vivienda no supere el 28%-32% y vivas sin asfixia financiera.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cash to Close Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isEn ? 'Total Upfront Cash Needed' : 'Efectivo Total Necesario'}
              </span>
              <span className="text-xs font-bold text-[#2B7A55] bg-[#F1F9EC] px-2.5 py-0.5 rounded-full">
                {isEn ? 'Cash to Close + Reserves' : 'Cash to Close + Reservas'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-[#102C46]">
              {formatCurrency(outputs.totalCashNeeded)}
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
              <div className="flex justify-between">
                <span>{isEn ? 'Down Payment:' : 'Pronto (Pago Inicial):'}</span>
                <span className="font-semibold text-slate-800">{formatCurrency(outputs.downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? 'Estimated Closing Costs:' : 'Costos de Cierre estimados:'}</span>
                <span className="font-semibold text-slate-800">{formatCurrency(outputs.estimatedClosingCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? 'Inspection + Appraisal:' : 'Inspección + Avalúo:'}</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(inputs.inspectionCost + inputs.appraisalCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? 'Moving + Initial Repairs:' : 'Mudanza + Reparaciones:'}</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(inputs.movingCost + inputs.initialRepairsCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? 'Emergency Reserve:' : 'Reserva para Emergencias:'}</span>
                <span className="font-semibold text-slate-800">{formatCurrency(inputs.emergencyReserveCost)}</span>
              </div>
            </div>

            <button
              onClick={onContinueToChecklist}
              className="w-full flex items-center justify-center space-x-2 bg-[#2B7A55] hover:bg-[#36986A] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow transition-all transform hover:-translate-y-0.5 mt-2"
            >
              <span>{isEn ? 'CONTINUE TO PREPARATION CHECKLIST' : 'CONTINUAR AL CHECKLIST DE PREPARACIÓN'}</span>
              <ArrowRight className="w-4 h-4 text-[#C7E7A4]" />
            </button>
          </div>

          {/* Quick Disclaimer */}
          <div className="text-xs text-slate-500 bg-slate-100 p-3.5 rounded-xl border border-slate-200">
            <strong>{isEn ? 'Informational Note:' : 'Nota informativa:'}</strong>{' '}
            {isEn
              ? 'Figures are mathematical estimates. Actual rates, county taxes, and insurance premiums vary based on your credit qualification and the specific property.'
              : 'Las cifras son estimaciones matemáticas. Las tasas reales, impuestos de condado y costos de seguro varían según tu calificación crediticia y la propiedad exacta.'}
          </div>
        </div>
      </div>

      {/* RATE COMPARISON TOOL SECTION (SCREENSHOT FIX) */}
      <div className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#2B7A55] mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>{isEn ? 'Interest Rate Sensitivity Simulator' : 'Simulador de Sensibilidad de Tasas'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#102C46]">
              {isEn
                ? 'How much does your payment change if the rate moves by 1%?'
                : '¿Cuánto cambia tu pago si la tasa sube o baja 1%?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isEn ? (
                <>
                  Compare 3 editable scenarios for a loan of <strong>{formatCurrency(outputs.loanAmount)}</strong> over{' '}
                  <strong>{inputs.loanTermYears} years</strong>.
                </>
              ) : (
                <>
                  Compara 3 escenarios editables para un préstamo de <strong>{formatCurrency(outputs.loanAmount)}</strong> a{' '}
                  <strong>{inputs.loanTermYears} años</strong>.
                </>
              )}
            </p>
          </div>

          {/* Rate inputs with instant real-time sync */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={handleResetRatesToDefaults}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#F1F9EC] hover:bg-[#E2F3D9] text-[#2B7A55] border border-[#C7E7A4] rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs self-start sm:self-center"
              title={isEn ? 'Sync scenarios to base rate (-1% / Base / +1%)' : 'Sincronizar escenarios con tasa base (-1% / Base / +1%)'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? `Sync to ${safeBaseRate}%` : `Sincronizar a ${safeBaseRate}%`}</span>
            </button>

            <div className="flex items-center space-x-2">
              {[0, 1, 2].map((idx) => {
                const currentVal = comparisonRates[idx] > 0 ? comparisonRates[idx] : effectiveComparisonRates[idx];
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                      {isEn ? `Scen ${idx + 1}` : `Esc ${idx + 1}`}
                    </span>
                    <div className="relative w-20">
                      <input
                        type="number"
                        step="0.125"
                        min="0.5"
                        max="25"
                        value={currentVal}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const newRates: [number, number, number] = [...effectiveComparisonRates];
                          newRates[idx] = val;
                          onUpdateComparisonRates(newRates);
                        }}
                        className="w-full text-center py-1.5 px-1 bg-slate-50 border-2 border-slate-300 rounded-lg text-xs font-extrabold text-slate-900 focus:bg-white focus:border-[#2B7A55] focus:ring-2 focus:ring-[#2B7A55]/20"
                      />
                      <span className="absolute right-1 top-1.5 text-[11px] font-bold text-slate-400 pointer-events-none">%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rate Scenarios Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {rateScenarios.map((sc, idx) => {
            const isBase = idx === 0;
            const scenarioName = isEn 
              ? `Scenario ${idx + 1} (${sc.rate.toFixed(2)}%)` 
              : `Escenario ${idx + 1} (${sc.rate.toFixed(2)}%)`;
            return (
              <div
                key={sc.id}
                className={`rounded-xl p-5 border-2 transition-all flex flex-col justify-between ${
                  isBase 
                    ? 'border-[#2B7A55] bg-[#F1F9EC]/50 shadow-xs' 
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-extrabold uppercase text-[#102C46]">
                      {scenarioName}
                    </span>
                    {isBase && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2B7A55] text-white px-2 py-0.5 rounded-full">
                        Base
                      </span>
                    )}
                  </div>

                  <div className="text-2xl font-extrabold text-[#102C46] mb-4">
                    {formatCurrency(sc.monthlyPayment)}
                    <span className="text-xs font-normal text-slate-500"> {isEn ? '/ mo (P&I)' : '/ mes (P&I)'}</span>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-200 pt-3 text-slate-600">
                    <div className="flex justify-between">
                      <span>{isEn ? 'Monthly difference:' : 'Diferencia mensual:'}</span>
                      <span className={`font-bold ${sc.monthlyDifferenceVsBase > 0 ? 'text-red-700' : sc.monthlyDifferenceVsBase < 0 ? 'text-green-700' : 'text-slate-700'}`}>
                        {sc.monthlyDifferenceVsBase === 0 
                          ? (isEn ? '$0 (Baseline)' : '$0 (Referencia)') 
                          : `${sc.monthlyDifferenceVsBase > 0 ? '+' : ''}${formatCurrency(sc.monthlyDifferenceVsBase)} / ${isEn ? 'mo' : 'mes'}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>{isEn ? 'Annual difference:' : 'Diferencia anual:'}</span>
                      <span className="font-semibold text-slate-800">
                        {sc.annualDifferenceVsBase === 0 
                          ? '$0' 
                          : `${sc.annualDifferenceVsBase > 0 ? '+' : ''}${formatCurrency(sc.annualDifferenceVsBase)} / ${isEn ? 'yr' : 'año'}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>{isEn ? `Difference over ${inputs.loanTermYears} yrs:` : `Diferencia en ${inputs.loanTermYears} años:`}</span>
                      <span className="font-bold text-[#102C46]">
                        {sc.lifetimeDifferenceVsBase === 0 
                          ? '$0' 
                          : `${sc.lifetimeDifferenceVsBase > 0 ? '+' : ''}${formatCurrency(sc.lifetimeDifferenceVsBase)}`}
                      </span>
                    </div>

                    <div className="flex justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                      <span>{isEn ? 'Total interest paid:' : 'Interés total pagado:'}</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(sc.totalInterestPaid)}</span>
                    </div>
                  </div>
                </div>

                {/* 1-Click apply scenario rate to main calculator */}
                <button
                  type="button"
                  onClick={() => {
                    onUpdateInputs({ annualInterestRate: sc.rate });
                    const el = document.getElementById('purchase-price-input');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="w-full mt-4 py-2 px-3 bg-white hover:bg-[#2B7A55] text-slate-700 hover:text-white border border-slate-200 hover:border-[#2B7A55] rounded-xl text-xs font-bold transition-all shadow-2xs text-center cursor-pointer"
                >
                  {isEn ? `Apply ${sc.rate.toFixed(2)}% to calculator ↑` : `Aplicar ${sc.rate.toFixed(2)}% al cálculo ↑`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
