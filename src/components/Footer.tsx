import React from 'react';
import { ExternalLink, ArrowUp } from 'lucide-react';
import { getAppConfig } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onScrollToTop,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const appConfig = getAppConfig(lang);

  return (
    <footer className="bg-[#102C46] text-white pt-16 pb-12 border-t border-[#1C4368]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-700/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#2B7A55] border border-[#C7E7A4]/30 flex items-center justify-center font-bold text-lg text-[#C7E7A4] shadow-sm">
                PL
              </div>
              <div>
                <span className="font-extrabold tracking-wide text-lg block text-white leading-tight">
                  {appConfig.brandName}
                </span>
                <span className="text-xs text-[#C7E7A4] font-medium block">
                  {appConfig.appName}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 italic font-medium leading-relaxed max-w-sm">
              "{appConfig.slogan}"
            </p>

            <p className="text-xs text-[#C7E7A4] font-semibold tracking-wide">
              {appConfig.subSlogan}
            </p>
          </div>

          {/* Social Links & Community */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D5AD57]">
              {isEn ? 'Follow Perquin de León' : 'Sigue a Perquin de León'}
            </h4>
            <div className="space-y-2">
              <a
                href={appConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-slate-200 hover:text-white transition-colors group"
              >
                <span className="w-6 h-6 rounded bg-[#1C4368] group-hover:bg-[#2B7A55] flex items-center justify-center text-xs font-bold text-[#C7E7A4]">
                  f
                </span>
                <span>{isEn ? 'Official Facebook: facebook.com/perquindeleon' : 'Facebook Oficial: facebook.com/perquindeleon'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={appConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-slate-200 hover:text-white transition-colors group"
              >
                <span className="w-6 h-6 rounded bg-[#1C4368] group-hover:bg-[#2B7A55] flex items-center justify-center text-xs font-bold text-[#C7E7A4]">
                  tt
                </span>
                <span>TikTok: @perquindeleon</span>
                <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            <p className="text-xs text-slate-200 pt-2">
              {isEn
                ? 'Short videos, weekly practical tips, and clear breakdowns on personal finance in the U.S.'
                : 'Videos cortos, consejos prácticos semanales y análisis claros sobre finanzas personales en EE. UU.'}
            </p>
          </div>

          {/* Legal and Privacy Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D5AD57]">
              {isEn ? 'Transparency & Legal' : 'Transparencia y Legal'}
            </h4>
            <div className="space-y-2 text-sm">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="block text-left text-slate-100 hover:text-[#C7E7A4] hover:underline transition-colors"
              >
                {isEn ? 'Privacy Policy (Zero Data Storage)' : 'Política de Privacidad (Cero Almacenamiento)'}
              </button>

              <button
                type="button"
                onClick={onOpenTerms}
                className="block text-left text-slate-100 hover:text-[#C7E7A4] hover:underline transition-colors"
              >
                {isEn ? 'Terms of Use & Disclaimer' : 'Condiciones de Uso y Exención de Responsabilidad'}
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onScrollToTop}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C7E7A4] hover:text-white transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Back to top' : 'Volver al inicio'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 text-xs text-slate-200 space-y-3 text-center sm:text-left">
          <p className="leading-relaxed">
            <strong className="text-white">{isEn ? 'Legal & Educational Notice:' : 'Aviso Legal y Educativo:'}</strong>{' '}
            {isEn
              ? 'This web application is a non-commercial educational initiative to promote community financial literacy. It is not a bank, mortgage lender, insurance carrier, real estate brokerage, or government agency. We do not guarantee credit approval or specific interest rates. Always consult licensed professionals in your jurisdiction before making any financial decisions.'
              : 'Esta aplicación web es una iniciativa personal sin fines comerciales para promover la alfabetización financiera comunitaria. No es una entidad bancaria, prestamista hipotecario, aseguradora, corredor de bienes raíces ni agencia gubernamental. No garantizamos aprobación de créditos ni tasas específicas. Consulta siempre a profesionales con licencia en tu jurisdicción antes de cualquier decisión patrimonial.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 pt-4 border-t border-slate-700 gap-2">
            <div>
              © {new Date().getFullYear()} {appConfig.brandName} — {isEn ? 'All rights reserved.' : 'Todos los derechos reservados.'}
            </div>
            <div>
              {isEn
                ? 'Designed and optimized for homebuyers in the United States toward 2027.'
                : 'Diseñado y optimizado para la comunidad hispana en Estados Unidos hacia el año 2027.'}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
