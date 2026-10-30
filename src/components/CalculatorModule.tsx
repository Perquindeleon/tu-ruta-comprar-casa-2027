import React, { useState } from 'react';
import { 
  Calculator as CalcIcon, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';
import { CalculatorInputs, CalculatorOutputs, RateComparisonScenario } from '../types';
import { 
  calculateRealMortgage, 
  calculateRateComparisons, 
  formatCurrency 
} from '../utils/calculator';
import { APP_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface CalculatorModuleProps {
  inputs: CalculatorInputs;
  onUpdateInputs: (updated: Partial<CalculatorInputs>) => void;
  onContinueToChecklist: () => void;
}

export const CalculatorModule: React.FC<CalculatorModuleProps> = ({
  inputs,
  onUpdateInputs,
  onContinueToChecklist,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [showAdvancedUpfront, setShowAdvancedUpfront] = useState(false);
  const [comparisonRates, setComparisonRates] = useState<[number, number, number]>([6.0, 7.0, 8.0]);

  const outputs: CalculatorOutputs = calculateRealMortgage(inputs);
  const rateScenarios: RateComparisonScenario[] = calculateRateComparisons(
    outputs.loanAmount,
    inputs.loanTermYears,
    comparisonRates
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
    const validDollar = Math.max(0, Math.min(inputs.purchasePrice, dollar));
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
              <span className="text-xs font-normal text-slate-400">{isEn ? 'Fully editable' : 'Totalmente editable'}</span>
            </h3>

            {/* Purchase Price */}
            <div>
              <label htmlFor="purchase-price-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                {isEn ? 'Home Purchase Price' : 'Precio de Compra de la Vivienda'}
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                  $
                </div>
                <input
                  id="purchase-price-input"
                  type="number"
                  min="0"
                  step="5000"
                  value={inputs.purchasePrice || ''}
                  onChange={(e) => handlePriceChange(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55] focus:border-[#2B7A55]"
                />
              </div>
            </div>

            {/* Down Payment ($ or %) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
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
                  <input
                    type="number"
                    min="0"
                    max={inputs.purchasePrice}
                    step="1000"
                    value={inputs.downPaymentDollar || ''}
                    onChange={(e) => handleDownDollarChange(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-slate-500 mt-1.5 px-1">
                <span>
                  {isEn ? 'Equivalent: ' : 'Equivalente: '}
                  <strong>{formatCurrency(outputs.downPaymentAmount)}</strong> ({outputs.downPaymentPercentActual.toFixed(1)}%)
                </span>
                <span>
                  {isEn ? 'Loan Amount: ' : 'Monto a financiar: '}
                  <strong>{formatCurrency(outputs.loanAmount)}</strong>
                </span>
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="interest-rate-input" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    {isEn ? 'Annual Interest Rate' : 'Tasa de Interés Anual'}
                  </label>
                  <a
                    href={APP_CONFIG.pmmsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#2B7A55] hover:underline flex items-center space-x-1"
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
                    value={inputs.annualInterestRate || ''}
                    onChange={(e) => onUpdateInputs({ annualInterestRate: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500 font-bold">
                    %
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {isEn ? 'Enter the rate quoted by your lender.' : 'Introduce la tasa que te cotice tu prestamista.'}
                </span>
              </div>

              <div>
                <label htmlFor="loan-term-select" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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
                <span className="text-[11px] text-slate-400 block mt-1">
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
                <label htmlFor="annual-property-tax-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {isEn ? 'Annual Property Taxes' : 'Impuestos de Propiedad Anuales'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <input
                    id="annual-property-tax-input"
                    type="number"
                    min="0"
                    step="100"
                    value={inputs.annualPropertyTax || ''}
                    onChange={(e) => onUpdateInputs({ annualPropertyTax: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {isEn ? `Approx: ${formatCurrency(outputs.monthlyPropertyTax)} / month` : `Aprox: ${formatCurrency(outputs.monthlyPropertyTax)} al mes`}
                </span>
              </div>

              {/* Annual Home Insurance */}
              <div>
                <label htmlFor="annual-home-insurance-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {isEn ? 'Annual Homeowners Insurance (HO-3)' : 'Seguro de Vivienda Anual (Haz/HO-3)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <input
                    id="annual-home-insurance-input"
                    type="number"
                    min="0"
                    step="100"
                    value={inputs.annualHomeInsurance || ''}
                    onChange={(e) => onUpdateInputs({ annualHomeInsurance: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {isEn ? `Approx: ${formatCurrency(outputs.monthlyHomeInsurance)} / month` : `Aprox: ${formatCurrency(outputs.monthlyHomeInsurance)} al mes`}
                </span>
              </div>

              {/* Monthly PMI */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="monthly-pmi-input" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    {isEn ? 'Monthly Mortgage Insurance (PMI / MIP)' : 'Seguro Hipotecario Mensual (PMI / MIP)'}
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <input
                    id="monthly-pmi-input"
                    type="number"
                    min="0"
                    step="10"
                    value={inputs.monthlyPMI || ''}
                    onChange={(e) => onUpdateInputs({ monthlyPMI: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {isEn ? 'Generally applies if down payment is under 20%.' : 'Aplica generalmente si el pronto es menor al 20%.'}
                </span>
              </div>

              {/* Monthly HOA */}
              <div>
                <label htmlFor="monthly-hoa-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {isEn ? 'Monthly HOA Dues (If applicable)' : 'Cuota Mensual de HOA (Si aplica)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <input
                    id="monthly-hoa-input"
                    type="number"
                    min="0"
                    step="25"
                    value={inputs.monthlyHOA || ''}
                    onChange={(e) => onUpdateInputs({ monthlyHOA: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {isEn ? 'Condos, townhomes, or HOA communities.' : 'Condominios o urbanizaciones con asociación.'}
                </span>
              </div>

              {/* Monthly Flood Insurance */}
              <div>
                <label htmlFor="monthly-flood-insurance-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {isEn ? 'Monthly Flood Insurance (If applicable)' : 'Seguro de Inundación Mensual (Si aplica)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <input
                    id="monthly-flood-insurance-input"
                    type="number"
                    min="0"
                    step="10"
                    value={inputs.monthlyFloodInsurance || ''}
                    onChange={(e) => onUpdateInputs({ monthlyFloodInsurance: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>

              {/* Other Monthly Expenses */}
              <div>
                <label htmlFor="other-monthly-expenses-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {isEn ? 'Other Related Monthly Costs' : 'Otros Gastos Mensuales Vinculados'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    $
                  </div>
                  <input
                    id="other-monthly-expenses-input"
                    type="number"
                    min="0"
                    step="10"
                    value={inputs.otherMonthlyExpenses || ''}
                    onChange={(e) => onUpdateInputs({ otherMonthlyExpenses: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Closing Costs and Upfront Reserves */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-5">
            <h3 className="text-lg font-bold text-[#102C46] border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>{isEn ? '3. Closing Costs & Upfront Expenses' : '3. Costos de Cierre y Gastos Iniciales'}</span>
            </h3>

            {/* Closing costs toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {isEn ? 'Estimated Closing Costs' : 'Costos de Cierre Estimados (Closing Costs)'}
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
                    step="0.5"
                    value={inputs.closingCostsPercent || ''}
                    onChange={(e) => handleClosingPercentChange(parseFloat(e.target.value) || 0)}
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
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={inputs.closingCostsDollar || ''}
                    onChange={(e) => handleClosingDollarChange(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>
              )}
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>
                  {isEn ? 'Calculated: ' : 'Cálculo: '}
                  <strong>{formatCurrency(outputs.estimatedClosingCosts)}</strong>
                </span>
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {isEn ? 'Typical range: 2% to 5% of price' : 'Referencia habitual: 2% a 5% del precio'}
                </span>
              </div>
            </div>

            {/* Accordion for additional upfront costs */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvancedUpfront(!showAdvancedUpfront)}
                className="w-full flex items-center justify-between py-2 text-sm font-bold text-[#102C46] hover:text-[#2B7A55] transition-colors"
              >
                <span>
                  {isEn
                    ? 'Expenses many buyers forget to budget for'
                    : 'Gastos que muchas personas olvidan presupuestar'}
                </span>
                {showAdvancedUpfront ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvancedUpfront && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inspection-cost-input" className="block text-xs font-semibold text-slate-600 mb-1">
                      {isEn ? 'Independent home inspection' : 'Inspección técnica independiente'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                        $
                      </div>
                      <input
                        id="inspection-cost-input"
                        type="number"
                        min="0"
                        step="50"
                        value={inputs.inspectionCost || ''}
                        onChange={(e) => onUpdateInputs({ inspectionCost: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="appraisal-cost-input" className="block text-xs font-semibold text-slate-600 mb-1">
                      {isEn ? 'Bank appraisal fee' : 'Tasación del banco (Appraisal)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                        $
                      </div>
                      <input
                        id="appraisal-cost-input"
                        type="number"
                        min="0"
                        step="50"
                        value={inputs.appraisalCost || ''}
                        onChange={(e) => onUpdateInputs({ appraisalCost: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="moving-cost-input" className="block text-xs font-semibold text-slate-600 mb-1">
                      {isEn ? 'Moving & initial logistics' : 'Mudanza y logística inicial'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                        $
                      </div>
                      <input
                        id="moving-cost-input"
                        type="number"
                        min="0"
                        step="100"
                        value={inputs.movingCost || ''}
                        onChange={(e) => onUpdateInputs({ movingCost: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="initial-repairs-cost-input" className="block text-xs font-semibold text-slate-600 mb-1">
                      {isEn ? 'Initial repairs & painting' : 'Reparaciones y pintura inicial'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                        $
                      </div>
                      <input
                        id="initial-repairs-cost-input"
                        type="number"
                        min="0"
                        step="200"
                        value={inputs.initialRepairsCost || ''}
                        onChange={(e) => onUpdateInputs({ initialRepairsCost: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="emergency-reserve-cost-input" className="block text-xs font-semibold text-slate-600 mb-1">
                      {isEn
                        ? 'Untouchable post-closing emergency reserve (3 mos recommended)'
                        : 'Reserva intocable para emergencias post-compra (3 meses recomendado)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                        $
                      </div>
                      <input
                        id="emergency-reserve-cost-input"
                        type="number"
                        min="0"
                        step="500"
                        value={inputs.emergencyReserveCost || ''}
                        onChange={(e) => onUpdateInputs({ emergencyReserveCost: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
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
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                {formatCurrency(outputs.monthlyTotalPayment)}
                <span className="text-sm font-normal text-slate-300 ml-1">{isEn ? '/ mo' : '/ mes'}</span>
              </div>

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

      {/* RATE COMPARISON TOOL SECTION */}
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
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEn ? (
                <>
                  Compare 3 editable scenarios for a <strong>{formatCurrency(outputs.loanAmount)}</strong> loan over{' '}
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

          {/* Rate inputs */}
          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {isEn ? `Scen ${idx + 1}` : `Esc ${idx + 1}`}
                </span>
                <div className="relative w-20">
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="20"
                    value={comparisonRates[idx]}
                    onChange={(e) => {
                      const newRates: [number, number, number] = [...comparisonRates] as [number, number, number];
                      newRates[idx] = parseFloat(e.target.value) || 0;
                      setComparisonRates(newRates);
                    }}
                    className="w-full text-center py-1.5 px-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#2B7A55]"
                  />
                  <span className="absolute right-1.5 top-1.5 text-[11px] font-bold text-slate-400 pointer-events-none">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Scenarios Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {rateScenarios.map((sc, idx) => {
            const isBase = idx === 0;
            const scenarioName = isEn ? `Scenario ${idx + 1} (${sc.rate.toFixed(2)}%)` : sc.name;
            return (
              <div
                key={sc.id}
                className={`rounded-xl p-5 border transition-all ${
                  isBase 
                    ? 'border-[#2B7A55] bg-[#F1F9EC]/40' 
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
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
                    <span className="font-semibold">{formatCurrency(sc.totalInterestPaid)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
