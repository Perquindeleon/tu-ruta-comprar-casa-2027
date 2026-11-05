import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiagnosticModule } from './components/DiagnosticModule';
import { CalculatorModule } from './components/CalculatorModule';
import { ChecklistModule } from './components/ChecklistModule';
import { AssistanceModule } from './components/AssistanceModule';
import { EducationModule } from './components/EducationModule';
import { PdfExportModule } from './components/PdfExportModule';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { AssistantChatbot } from './components/AssistantChatbot';
import { FloridaIncentivesPage } from './components/FloridaIncentivesPage';

import { DiagnosticAnswers, CalculatorInputs } from './types';
import { evaluateDiagnostic } from './data/questions';
import { calculateRealMortgage, calculateRateComparisons } from './utils/calculator';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const STORAGE_KEY = 'tu_ruta_2027_data';

interface AppSavedState {
  diagnosticAnswers?: DiagnosticAnswers;
  calculatorInputs?: CalculatorInputs;
  completedChecklistIds?: string[];
  comparisonRates?: [number, number, number];
  ratesUserModified?: boolean;
}

function loadSavedState(): AppSavedState {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage parse errors
  }
  return {};
}

const AppContent: React.FC = () => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const initialSaved = React.useMemo(() => loadSavedState(), []);

  // 1. Diagnostic state (persisted locally)
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<DiagnosticAnswers>(
    initialSaved.diagnosticAnswers || {
      timeframe: undefined,
      creditReviewed: undefined,
      creditSituation: undefined,
      savings: undefined,
      monthlyDebts: undefined,
      calculatedBudget: undefined,
      talkedToLender: undefined,
      state: '',
      countyOrCity: '',
    }
  );

  // 2. Calculator state (persisted locally)
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs>(
    initialSaved.calculatorInputs || {
      purchasePrice: 0,
      downPaymentMode: 'percent',
      downPaymentPercent: 0,
      downPaymentDollar: 0,
      annualInterestRate: 0,
      loanTermYears: 30,
      annualPropertyTax: 0,
      annualHomeInsurance: 0,
      monthlyPMI: 0,
      monthlyHOA: 0,
      monthlyFloodInsurance: 0,
      otherMonthlyExpenses: 0,
      closingCostsMode: 'percent',
      closingCostsPercent: 0,
      closingCostsDollar: 0,
      inspectionCost: 0,
      appraisalCost: 0,
      movingCost: 0,
      initialRepairsCost: 0,
      emergencyReserveCost: 0,
    }
  );

  // 3. Checklist state (persisted locally)
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(
    initialSaved.completedChecklistIds || []
  );

  // 4. Rate comparison scenarios state (initialized with 3 positive numbers)
  const [comparisonRates, setComparisonRates] = useState<[number, number, number]>(() => {
    const saved = initialSaved.comparisonRates;
    if (saved && Array.isArray(saved) && saved.length === 3 && saved.every((r) => typeof r === 'number' && r > 0)) {
      return saved as [number, number, number];
    }
    const base = initialSaved.calculatorInputs?.annualInterestRate && initialSaved.calculatorInputs.annualInterestRate > 0
      ? initialSaved.calculatorInputs.annualInterestRate
      : 7.0;
    return [
      Math.max(0.5, Number((base - 1).toFixed(2))),
      Number(base.toFixed(2)),
      Number((base + 1).toFixed(2)),
    ];
  });
  const [ratesUserModified, setRatesUserModified] = useState<boolean>(
    initialSaved.ratesUserModified || false
  );

  // Routing state for Florida New Construction Incentives (/incentivos-florida)
  const [currentRoute, setCurrentRoute] = useState<'main' | 'florida'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path.includes('incentivos-florida') || hash.includes('incentivos-florida')
        ? 'florida'
        : 'main';
    }
    return 'main';
  });

  // Listen to browser forward/backward navigation and hash change
  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window === 'undefined') return;
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('incentivos-florida') || hash.includes('incentivos-florida')) {
        setCurrentRoute('florida');
      } else {
        setCurrentRoute('main');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleGoToFloridaIncentives = () => {
    setCurrentRoute('florida');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/incentivos-florida');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToMain = () => {
    setCurrentRoute('main');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-save all simulation state to localStorage (100% private to user's device)
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          diagnosticAnswers,
          calculatorInputs,
          completedChecklistIds,
          comparisonRates,
          ratesUserModified,
        })
      );
    } catch {
      // Ignore private-browsing or quota errors
    }
  }, [diagnosticAnswers, calculatorInputs, completedChecklistIds, comparisonRates, ratesUserModified]);

  // 5. Assistance module selected state
  const [selectedState, setSelectedState] = useState<string>('');

  // 6. Legal Modals
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Dynamically sync rate comparison scenarios when the user inputs their own interest rate
  useEffect(() => {
    if (calculatorInputs.annualInterestRate > 0) {
      const base = calculatorInputs.annualInterestRate;
      const r1 = Math.max(0.5, Number((base - 1).toFixed(2)));
      const r2 = Number(base.toFixed(2));
      const r3 = Number((base + 1).toFixed(2));
      if (!ratesUserModified || comparisonRates.some((r) => !r || r <= 0)) {
        setComparisonRates([r1, r2, r3]);
      }
    }
  }, [calculatorInputs.annualInterestRate, ratesUserModified]);

  // Sync state selection from diagnostic to assistance filter
  useEffect(() => {
    if (diagnosticAnswers.state && diagnosticAnswers.state !== selectedState) {
      setSelectedState(diagnosticAnswers.state);
    }
  }, [diagnosticAnswers.state]);

  // Update HTML lang attribute dynamically
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleUpdateDiagnostic = (updated: Partial<DiagnosticAnswers>) => {
    setDiagnosticAnswers((prev) => ({ ...prev, ...updated }));
  };

  const handleResetDiagnostic = () => {
    setDiagnosticAnswers({
      timeframe: undefined,
      creditReviewed: undefined,
      creditSituation: undefined,
      savings: undefined,
      monthlyDebts: undefined,
      calculatedBudget: undefined,
      talkedToLender: undefined,
      state: '',
      countyOrCity: '',
    });
  };

  const handleUpdateCalculator = (updated: Partial<CalculatorInputs>) => {
    setCalculatorInputs((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleChecklist = (id: string) => {
    setCompletedChecklistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetChecklist = () => {
    const confirmMsg = isEn
      ? 'Do you want to reset all your checklist items back to pending?'
      : '¿Deseas reiniciar todas las casillas de tu checklist a pendientes?';
    if (window.confirm(confirmMsg)) {
      setCompletedChecklistIds([]);
    }
  };

  const handleResetEntireSession = () => {
    const msg = isEn
      ? 'Do you want to reset all your answers, calculator inputs, and checklist to start fresh?'
      : '¿Deseas reiniciar toda la información, calculadora y checklist a valores en blanco?';
    if (window.confirm(msg)) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
      handleResetDiagnostic();
      setCalculatorInputs({
        purchasePrice: 0,
        downPaymentMode: 'percent',
        downPaymentPercent: 0,
        downPaymentDollar: 0,
        annualInterestRate: 0,
        loanTermYears: 30,
        annualPropertyTax: 0,
        annualHomeInsurance: 0,
        monthlyPMI: 0,
        monthlyHOA: 0,
        monthlyFloodInsurance: 0,
        otherMonthlyExpenses: 0,
        closingCostsMode: 'percent',
        closingCostsPercent: 0,
        closingCostsDollar: 0,
        inspectionCost: 0,
        appraisalCost: 0,
        movingCost: 0,
        initialRepairsCost: 0,
        emergencyReserveCost: 0,
      });
      setCompletedChecklistIds([]);
      setComparisonRates([6.0, 7.0, 8.0]);
      setRatesUserModified(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const diagnosticResult = evaluateDiagnostic(diagnosticAnswers, lang);
  const calculatorOutputs = calculateRealMortgage(calculatorInputs);
  const rateScenarios = calculateRateComparisons(
    calculatorOutputs.loanAmount,
    calculatorInputs.loanTermYears,
    comparisonRates
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenPdf={() => scrollToSection('mi-pdf')}
        onResetSession={handleResetEntireSession}
        onGoToFloridaIncentives={handleGoToFloridaIncentives}
      />

      {currentRoute === 'florida' ? (
        <FloridaIncentivesPage onBackToMain={handleBackToMain} />
      ) : (
        /* Main Body */
        <main id="inicio" className="flex-1">
          {/* Hero Section */}
          <Hero
            onStartDiagnostic={() => scrollToSection('diagnostico')}
            onGoToCalculator={() => scrollToSection('calculadora')}
            onGoToFloridaIncentives={handleGoToFloridaIncentives}
          />

          {/* MÓDULO A: DIAGNÓSTICO */}
          <DiagnosticModule
            answers={diagnosticAnswers}
            onUpdateAnswers={handleUpdateDiagnostic}
            onReset={handleResetDiagnostic}
            onContinueToCalculator={() => scrollToSection('calculadora')}
          />

          {/* MÓDULO B: CALCULADORA DEL COSTO REAL */}
          <CalculatorModule
            inputs={calculatorInputs}
            onUpdateInputs={handleUpdateCalculator}
            comparisonRates={comparisonRates}
            onUpdateComparisonRates={(newRates) => {
              setRatesUserModified(true);
              setComparisonRates(newRates);
            }}
            onContinueToChecklist={() => scrollToSection('checklist')}
          />

          {/* MÓDULO C: CHECKLIST INTERACTIVO */}
          <ChecklistModule
            completedIds={completedChecklistIds}
            onToggleItem={handleToggleChecklist}
            onResetChecklist={handleResetChecklist}
            onOpenPdf={() => scrollToSection('mi-pdf')}
          />

          {/* MÓDULO D: BUSCADOR DE PROGRAMAS DE ASISTENCIA */}
          <AssistanceModule
            selectedState={selectedState}
            onSelectState={(st) => {
              setSelectedState(st);
              if (st !== diagnosticAnswers.state) {
                setDiagnosticAnswers((prev) => ({ ...prev, state: st }));
              }
            }}
            onGoToFloridaIncentives={handleGoToFloridaIncentives}
          />

          {/* MÓDULO E: BIBLIOTECA EDUCATIVA */}
          <EducationModule />

          {/* GENERADOR DE PDF Y ENVÍO POR CORREO */}
          <PdfExportModule
            answers={diagnosticAnswers}
            diagnosticResult={diagnosticResult}
            calculatorInputs={calculatorInputs}
            calculatorOutputs={calculatorOutputs}
            rateScenarios={rateScenarios}
            completedChecklistIds={completedChecklistIds}
          />

          {/* SECCIÓN PREGUNTAS FRECUENTES (FAQ) */}
          <FaqSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onScrollToTop={() => scrollToSection('inicio')}
      />

      {/* Legal Modals */}
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Floating 2027 Virtual Assistant */}
      <AssistantChatbot onNavigateToSection={scrollToSection} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
