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

import { DiagnosticAnswers, CalculatorInputs } from './types';
import { evaluateDiagnostic } from './data/questions';
import { calculateRealMortgage, calculateRateComparisons } from './utils/calculator';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  // 1. Diagnostic state (ephemeral in-memory)
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<DiagnosticAnswers>({
    timeframe: '2027_or_later',
    creditReviewed: 'yes',
    creditSituation: 'good',
    savings: '10k_25k',
    monthlyDebts: 'yes',
    calculatedBudget: 'no',
    talkedToLender: 'no',
    state: '',
    countyOrCity: '',
  });

  // 2. Calculator state (sensible defaults: $300k, 5% down, 7.0% rate, 30 yrs)
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs>({
    purchasePrice: 300000,
    downPaymentMode: 'percent',
    downPaymentPercent: 5,
    downPaymentDollar: 15000,
    annualInterestRate: 7.0,
    loanTermYears: 30,
    annualPropertyTax: 3600,
    annualHomeInsurance: 1500,
    monthlyPMI: 140,
    monthlyHOA: 0,
    monthlyFloodInsurance: 0,
    otherMonthlyExpenses: 0,
    closingCostsMode: 'percent',
    closingCostsPercent: 3.0,
    closingCostsDollar: 9000,
    inspectionCost: 450,
    appraisalCost: 550,
    movingCost: 1200,
    initialRepairsCost: 1500,
    emergencyReserveCost: 5000,
  });

  // 3. Checklist state (array of completed task IDs in memory)
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>([
    'e1-1', // Initially mark review credit report as an encouraging starter
  ]);

  // 4. Assistance module selected state
  const [selectedState, setSelectedState] = useState<string>('');

  // 5. Legal Modals
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

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
    [6.0, 7.0, 8.0]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenPdf={() => scrollToSection('mi-pdf')}
      />

      {/* Main Body */}
      <main id="inicio" className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartDiagnostic={() => scrollToSection('diagnostico')}
          onGoToCalculator={() => scrollToSection('calculadora')}
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
