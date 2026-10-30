import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { getAppConfig } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onStartDiagnostic: () => void;
  onGoToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDiagnostic, onGoToCalculator }) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const appConfig = getAppConfig(lang);

  return (
    <div className="relative bg-gradient-to-b from-[#102C46] via-[#163654] to-slate-50 pt-12 pb-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-[#2B7A55]/20 via-[#C7E7A4]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Brand Tag / Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#1C4368]/80 border border-[#C7E7A4]/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#C7E7A4] mb-6 shadow-sm">
          <Award className="w-4 h-4 text-[#D5AD57]" />
          <span>
            {isEn
              ? `Independent Educational Tool — ${appConfig.brandName}`
              : `Herramienta Educativa Independiente — ${appConfig.brandName}`}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {isEn ? 'Want to buy a home in 2027?' : '¿Quieres comprar casa en 2027?'}{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C7E7A4] via-[#D5AD57] to-[#C7E7A4]">
            {isEn ? 'Start by preparing today.' : 'Empieza por prepararte.'}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed font-normal">
          {isEn
            ? 'Discover how much money you might need, which hidden expenses to consider, and the exact steps to complete before buying.'
            : 'Descubre cuánto dinero podrías necesitar, qué gastos debes considerar y qué pasos debes completar antes de comprar.'}
        </p>

        {/* Brand Quote Box */}
        <div className="max-w-2xl mx-auto mb-10 bg-[#0B1E30]/70 border-l-4 border-[#2B7A55] p-4 sm:p-5 rounded-r-xl text-left backdrop-blur-sm shadow-md">
          <p className="text-[#C7E7A4] text-xs uppercase tracking-wider font-bold mb-1">
            {isEn ? 'Perquin de León’s Guiding Principle:' : 'Principio Guía de Perquin de León:'}
          </p>
          <p className="text-sm sm:text-base text-slate-100 font-medium italic">
            "{appConfig.slogan}"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartDiagnostic}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#2B7A55] hover:bg-[#36986A] text-white px-8 py-4 rounded-xl text-base sm:text-lg font-bold shadow-lg shadow-[#2B7A55]/30 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#C7E7A4]"
          >
            <span>{isEn ? 'START MY FREE PLAN' : 'COMENZAR MI PLAN GRATUITO'}</span>
            <ArrowRight className="w-5 h-5 text-[#C7E7A4]" />
          </button>

          <button
            onClick={onGoToCalculator}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#1C4368] hover:bg-[#235381] text-white border border-slate-400/30 px-7 py-4 rounded-xl text-base sm:text-lg font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-slate-400"
          >
            <Calculator className="w-5 h-5 text-[#D5AD57]" />
            <span>{isEn ? 'CALCULATE HOW MUCH A HOME WOULD COST' : 'CALCULAR CUÁNTO ME COSTARÍA UNA CASA'}</span>
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300 border-t border-slate-700/50 pt-8 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#C7E7A4]" />
            <span>{isEn ? '100% Free & No Sign-Up Required' : '100% Gratuito y Sin Registro'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#C7E7A4]" />
            <span>{isEn ? 'Your Financial Data Is Never Stored' : 'Tus Datos Financieros No Se Guardan'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#C7E7A4]" />
            <span>{isEn ? 'Instant PDF Download' : 'Descarga en PDF al Instante'}</span>
          </div>
        </div>
      </div>

      {/* Five Steps Roadmap Card Grid */}
      <div className="max-w-6xl mx-auto mt-16 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isEn ? 'The 5 Steps of Your 2027 Preparation' : 'Los 5 Pasos de tu Preparación Hacia 2027'}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {isEn
              ? 'A clear, structured roadmap to take control of your finances before signing any contract.'
              : 'Una ruta clara y estructurada para que tomes el control de tus finanzas antes de firmar cualquier contrato.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-slate-800 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#102C46] text-[#C7E7A4] flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-sm text-[#102C46] mb-1">
              {isEn ? 'Assessment' : 'Diagnóstico'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? 'Evaluate your credit starting point, savings, and optimal timeline to buy.'
                : 'Evalúa tu punto de partida crediticio, tus ahorros y el plazo óptimo para comprar.'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-slate-800 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#2B7A55] text-white flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-sm text-[#102C46] mb-1">
              {isEn ? 'True Cost' : 'Costo Real'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? 'Calculate your full monthly payment (PITI + HOA) and total cash needed to close.'
                : 'Calcula el pago mensual completo (PITI + HOA) y el efectivo real necesario para cerrar.'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-slate-800 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#D5AD57] text-[#102C46] flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-sm text-[#102C46] mb-1">
              {isEn ? 'Checklist' : 'Checklist'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? '38 tasks across 4 stages from today until you get the keys.'
                : '38 tareas divididas en 4 etapas desde hoy hasta la entrega de llaves.'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-slate-800 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#102C46] text-[#C7E7A4] flex items-center justify-center font-bold text-sm mb-3">
              4
            </div>
            <h3 className="font-bold text-sm text-[#102C46] mb-1">
              {isEn ? 'Assistance' : 'Asistencia'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? 'Find official government programs (HUD, FHA, VA, USDA, and state agencies).'
                : 'Localiza programas oficiales del gobierno (HUD, FHA, VA, USDA y agencias estatales).'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-slate-800 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#2B7A55] text-[#C7E7A4] flex items-center justify-center font-bold text-sm mb-3">
              5
            </div>
            <h3 className="font-bold text-sm text-[#102C46] mb-1">
              {isEn ? 'PDF Plan' : 'Plan en PDF'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? 'Generate your full report with your numbers, questions for pros, and official links.'
                : 'Genera tu informe completo con tus números, preguntas para profesionales y recursos.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
