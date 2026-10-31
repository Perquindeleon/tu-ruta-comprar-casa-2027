import React from 'react';
import { 
  HelpCircle, 
  CheckCircle, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  DiagnosticAnswers, 
  DiagnosticResult, 
  PurchaseTimeframe, 
  CreditReviewStatus, 
  CreditSituation, 
  SavingsRange 
} from '../types';
import { 
  TIMEFRAME_OPTIONS, 
  CREDIT_REVIEW_OPTIONS, 
  CREDIT_SITUATION_OPTIONS, 
  SAVINGS_OPTIONS, 
  DEBT_OPTIONS, 
  YES_NO_OPTIONS, 
  evaluateDiagnostic 
} from '../data/questions';
import { US_STATES } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface DiagnosticModuleProps {
  answers: DiagnosticAnswers;
  onUpdateAnswers: (updated: Partial<DiagnosticAnswers>) => void;
  onReset: () => void;
  onContinueToCalculator: () => void;
}

export const DiagnosticModule: React.FC<DiagnosticModuleProps> = ({
  answers,
  onUpdateAnswers,
  onReset,
  onContinueToCalculator,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const result: DiagnosticResult = evaluateDiagnostic(answers, lang);

  const answeredCount = [
    answers.timeframe,
    answers.creditReviewed,
    answers.creditSituation,
    answers.savings,
    answers.monthlyDebts,
    answers.calculatedBudget,
    answers.talkedToLender,
    answers.state
  ].filter(Boolean).length;

  const totalQuestions = 8;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <section id="diagnostico" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4" />
          <span>{isEn ? 'Module A: Readiness Assessment' : 'Módulo A: Evaluación Orientativa'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          {isEn ? 'How ready are you to buy a house?' : '¿Qué tan preparado estás para comprar una casa?'}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
          {isEn
            ? 'Answer these simple questions to identify your strengths and the areas you need to strengthen before starting the formal buying process.'
            : 'Responde estas sencillas preguntas para identificar tus fortalezas y las áreas que necesitas fortalecer antes de iniciar el proceso formal de compra.'}
        </p>

        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span>{isEn ? 'Assessment progress' : 'Progreso del diagnóstico'}</span>
            <span>
              {isEn
                ? `${answeredCount} of ${totalQuestions} answered (${progressPercent}%)`
                : `${answeredCount} de ${totalQuestions} respondidas (${progressPercent}%)`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#2B7A55] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Questionnaire Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">
          
          {/* Question 1: Timeframe */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '1. When would you like to buy?' : '1. ¿Cuándo te gustaría comprar?'}
            </label>
            <div className="space-y-2">
              {TIMEFRAME_OPTIONS.map((opt) => {
                const isSelected = answers.timeframe === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ timeframe: opt.value as PurchaseTimeframe })}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-semibold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <span>{isEn ? opt.labelEn : opt.label}</span>
                      {(isEn ? opt.sublabelEn : opt.sublabel) && (
                        <span className="block text-xs font-medium text-slate-600">
                          {isEn ? opt.sublabelEn : opt.sublabel}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2B7A55] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Credit Review */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '2. Have you checked your credit recently?' : '2. ¿Has revisado tu crédito recientemente?'}
            </label>
            <div className="space-y-2">
              {CREDIT_REVIEW_OPTIONS.map((opt) => {
                const isSelected = answers.creditReviewed === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ creditReviewed: opt.value as CreditReviewStatus })}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-semibold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{isEn ? opt.labelEn : opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#2B7A55] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Credit Situation */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '3. How would you describe your credit standing?' : '3. ¿Cómo describirías tu situación crediticia?'}
            </label>
            <div className="space-y-2">
              {CREDIT_SITUATION_OPTIONS.map((opt) => {
                const isSelected = answers.creditSituation === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ creditSituation: opt.value as CreditSituation })}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-semibold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <span>{isEn ? opt.labelEn : opt.label}</span>
                      {(isEn ? opt.sublabelEn : opt.sublabel) && (
                        <span className="block text-xs font-medium text-slate-600">
                          {isEn ? opt.sublabelEn : opt.sublabel}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2B7A55] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 4: Savings */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '4. About how much do you have saved to buy?' : '4. ¿Cuánto tienes ahorrado aproximadamente para comprar?'}
            </label>
            <div className="space-y-2">
              {SAVINGS_OPTIONS.map((opt) => {
                const isSelected = answers.savings === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ savings: opt.value as SavingsRange })}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-semibold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <span>{isEn ? opt.labelEn : opt.label}</span>
                      {(isEn ? opt.sublabelEn : opt.sublabel) && (
                        <span className="block text-xs font-medium text-slate-600">
                          {isEn ? opt.sublabelEn : opt.sublabel}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2B7A55] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 5: Debts */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '5. Do you have active monthly debts?' : '5. ¿Tienes deudas mensuales activas?'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEBT_OPTIONS.map((opt) => {
                const isSelected = answers.monthlyDebts === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ monthlyDebts: opt.value as 'yes' | 'no' | 'prefer_not_to_say' })}
                    className={`text-center p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-bold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {isEn ? opt.labelEn : opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 6: Budget calculation */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '6. Have you calculated how much you can pay monthly for housing?' : '6. ¿Has calculado cuánto puedes pagar mensualmente por una vivienda?'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {YES_NO_OPTIONS.map((opt) => {
                const isSelected = answers.calculatedBudget === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ calculatedBudget: opt.value as 'yes' | 'no' })}
                    className={`text-center p-3 rounded-xl border text-sm font-medium transition-all ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-bold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {isEn ? opt.labelEn : opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 7: Talked to lender */}
          <div>
            <label className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '7. Have you spoken with a mortgage lender?' : '7. ¿Has hablado con un prestamista hipotecario?'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {YES_NO_OPTIONS.map((opt) => {
                const isSelected = answers.talkedToLender === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateAnswers({ talkedToLender: opt.value as 'yes' | 'no' })}
                    className={`text-center p-3 rounded-xl border text-sm font-medium transition-all ${
                      isSelected 
                        ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#102C46] font-bold ring-1 ring-[#2B7A55]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {isEn ? opt.labelEn : opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 8: State */}
          <div>
            <label htmlFor="state-select" className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '8. In which state do you want to buy?' : '8. ¿En qué estado quieres comprar?'}
            </label>
            <div className="relative">
              <select
                id="state-select"
                value={answers.state || ''}
                onChange={(e) => onUpdateAnswers({ state: e.target.value })}
                className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-[#2B7A55] focus:border-[#2B7A55] shadow-sm"
              >
                <option value="">{isEn ? '-- Select a state --' : '-- Selecciona un estado --'}</option>
                {US_STATES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question 9: County or City */}
          <div>
            <label htmlFor="county-city-input" className="block text-sm font-bold text-[#102C46] mb-2">
              {isEn ? '9. County or City' : '9. Condado o ciudad'}{' '}
              <span className="text-slate-400 font-normal">{isEn ? '(Optional)' : '(Opcional)'}</span>
            </label>
            <div className="relative">
              <input
                id="county-city-input"
                type="text"
                placeholder={isEn ? 'e.g. Miami-Dade, Houston, Dallas, Los Angeles...' : 'Ej. Miami-Dade, Houston, Dallas, Los Ángeles, etc.'}
                value={answers.countyOrCity || ''}
                onChange={(e) => onUpdateAnswers({ countyOrCity: e.target.value })}
                className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-[#2B7A55] focus:border-[#2B7A55] shadow-sm"
              />
            </div>
          </div>

          {/* Reset button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reset questionnaire' : 'Reiniciar cuestionario'}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Results Card (Sticky on desktop) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7">
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-[#102C46] text-[#C7E7A4]">
                {result.badge}
              </span>
              <span className="text-xs text-slate-400">
                {isEn ? 'Guidance Result' : 'Resultado Orientativo'}
              </span>
            </div>

            {/* Title & Status */}
            <h3 className="text-xl font-bold text-[#102C46] mb-3 leading-snug">
              {result.title}
            </h3>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {result.summary}
            </p>

            {/* Reasons / Hallazgos */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-[#2B7A55]" />
                <span>{isEn ? 'Why is this result shown?' : '¿Por qué se muestra este resultado?'}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#2B7A55] font-bold mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Recommendations */}
            <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C46] mb-2 flex items-center space-x-1.5">
                <ArrowRight className="w-4 h-4 text-[#D5AD57]" />
                <span>{isEn ? 'Concrete recommended actions:' : 'Acciones concretas recomendadas:'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#D5AD57] font-bold">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA to Next Module */}
            <button
              onClick={onContinueToCalculator}
              className="w-full flex items-center justify-center space-x-2 bg-[#2B7A55] hover:bg-[#36986A] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow transition-all transform hover:-translate-y-0.5"
            >
              <span>{isEn ? 'CONTINUE TO REAL COST CALCULATOR' : 'PASAR A LA CALCULADORA DE COSTO REAL'}</span>
              <ArrowRight className="w-4 h-4 text-[#C7E7A4]" />
            </button>
          </div>

          {/* Transparency Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>{isEn ? 'Transparency Notice:' : 'Aviso de Transparencia:'}</strong>{' '}
              {isEn
                ? 'This assessment does not invent a FICO score or claim you are pre-approved for a mortgage. It works without requesting Social Security numbers or sensitive financial data.'
                : 'Este diagnóstico no inventa un puntaje de crédito FICO ni afirma que estés preaprobado para una hipoteca. Funciona sin solicitar números de Seguro Social ni datos financieros sensibles.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
