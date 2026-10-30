import React, { useState } from 'react';
import { Menu, X, FileText, Calculator, CheckSquare, HelpCircle, BookOpen, Download } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenPdf: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenPdf }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'diagnostico', label: 'Mi Diagnóstico', icon: HelpCircle },
    { id: 'calculadora', label: 'Calculadora', icon: Calculator },
    { id: 'checklist', label: 'Mi Checklist', icon: CheckSquare },
    { id: 'asistencia', label: 'Ayuda para Comprar', icon: HelpCircle },
    { id: 'biblioteca', label: 'Recursos', icon: BookOpen },
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
                Tu Ruta 2027
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

          {/* Header Action: Generate PDF */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center space-x-2 bg-[#2B7A55] hover:bg-[#36986A] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C7E7A4]"
            >
              <Download className="w-4 h-4 text-[#C7E7A4]" />
              <span>Mi PDF</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
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
              <span>Generar mi Plan en PDF</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
