import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getFaqs } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const faqs = getFaqs(lang);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4" />
          <span>{isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          {isEn ? 'Answers to Your Homebuying Questions' : 'Resolvemos tus Dudas sobre la Compra de Vivienda'}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
          {isEn
            ? 'Transparent answers about privacy, financial preparation, and how to use this educational tool.'
            : 'Respuestas transparentes sobre privacidad, preparación financiera y cómo utilizar esta herramienta educativa.'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#2B7A55] transition-colors focus:outline-none"
              >
                <span className="text-sm sm:text-base">{faq.question}</span>
                <span className="shrink-0 p-1 rounded-md bg-slate-50 text-slate-500">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#2B7A55]" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
