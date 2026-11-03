import React, { useState } from 'react';
import { Menu, X, Calculator, CheckSquare, HelpCircle, BookOpen, Download, Globe, RotateCcw } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenPdf: () => void;
  onResetSession?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenPdf, onResetSession }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const isEn = lang === 'en';

  const navItems = [
    { id: 'inicio', label: isEn ? 'Home' : 'Inicio' },
    { id: 'diagnostico', label: isEn ? 'My Assessment' : 'Mi Diagnóstico', icon: HelpCircle },
    { id: 'calculadora', label: isEn ? 'Calculator' : 'Calculadora', icon: Calculator },
    { id: 'checklist', label: isEn ? 'My Checklist' : 'Mi Checklist', icon: CheckSquare },
    { id: 'asistencia', label: isEn ? 'Buyer Assistance' : 'Ayuda para Comprar', icon: HelpCircle },
    { id: 'biblioteca', label: isEn ? 'Resources' : 'Recursos', icon: BookOpen },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#102C46] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center space-x-3 cursor-pointer py-2 focus:outline-none focus:ring-2 focus:ring-[#C7E7A4] rounded-lg px-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2B7A55] to-[#102C46] border border-[#C7E7A4]/30 flex items-center justify-center font-bold text-lg text-[#C7E7A4] shadow-sm">
              PL
            </div>
            <div>
              <span className="font-extrabold tracking-wide text-base sm:text-lg block text-white leading-tight">
                {APP_CONFIG.brandName}
              </span>
              <span className="text-xs text-[#C7E7A4] font-medium block">
                {isEn ? 'Your 2027 Roadmap' : 'Tu Ruta 2027'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1C4368] rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Header Actions: Language Switcher & Generate PDF */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Language Switcher Pill */}
            <div
              role="group"
              aria-label={isEn ? 'Change language' : 'Cambiar idioma'}
              className="inline-flex items-center bg-[#0B1E30] border border-[#1C4368] rounded-lg p-1 text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-[#C7E7A4] ml-1.5 mr-1" />
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  !isEn
                    ? 'bg-[#2B7A55] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  isEn
                    ? 'bg-[#2B7A55] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {onResetSession && (
              <button
                type="button"
                onClick={onResetSession}
                className="p-2 text-slate-300 hover:text-[#C7E7A4] hover:bg-[#1C4368] rounded-lg transition-colors"
                title={isEn ? 'Start new simulation (clear saved data)' : 'Nueva simulación (borrar datos guardados)'}
                aria-label={isEn ? 'Start new simulation' : 'Nueva simulación'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenPdf}
              className="inline-flex items-center space-x-2 bg-[#2B7A55] hover:bg-[#36986A] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C7E7A4]"
            >
              <Download className="w-4 h-4 text-[#C7E7A4]" />
              <span>{isEn ? 'My PDF' : 'Mi PDF'}</span>
            </button>
          </div>

          {/* Mobile Language Toggle & Menu Button */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              type="button"
              onClick={() => setLang(isEn ? 'es' : 'en')}
              aria-label={isEn ? 'Switch to Spanish' : 'Cambiar a Inglés'}
              className="inline-flex items-center space-x-1 bg-[#0B1E30] border border-[#C7E7A4]/40 text-[#C7E7A4] px-2.5 py-1.5 rounded-lg text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isEn ? 'ES' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={isEn ? 'Open navigation menu' : 'Abrir menú de navegación'}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-[#1C4368] focus:outline-none focus:ring-2 focus:ring-[#C7E7A4]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1E30] border-t border-[#1C4368] px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Language Selector Row */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#102C46] rounded-lg mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-[#C7E7A4]" />
              <span>{isEn ? 'Language / Idioma:' : 'Idioma / Language:'}</span>
            </span>
            <div className="inline-flex rounded-md bg-[#0B1E30] p-0.5 border border-[#1C4368]">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  !isEn ? 'bg-[#2B7A55] text-white' : 'text-slate-400'
                }`}
              >
                Español
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  isEn ? 'bg-[#2B7A55] text-white' : 'text-slate-400'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left flex items-center space-x-3 px-3 py-3 text-base font-medium text-slate-200 hover:bg-[#1C4368] hover:text-white rounded-md"
            >
              {item.icon && <item.icon className="w-5 h-5 text-[#C7E7A4]" />}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenPdf();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#2B7A55] hover:bg-[#36986A] text-white px-4 py-3 rounded-lg text-base font-semibold shadow"
            >
              <Download className="w-5 h-5 text-[#C7E7A4]" />
              <span>{isEn ? 'Generate My PDF Plan' : 'Generar mi Plan en PDF'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
