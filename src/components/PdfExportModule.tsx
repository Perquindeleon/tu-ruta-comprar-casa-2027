import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Share2, 
  Smartphone, 
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  CalculatorInputs, 
  CalculatorOutputs, 
  DiagnosticAnswers, 
  DiagnosticResult, 
  RateComparisonScenario 
} from '../types';
import { generatePlanPdf } from '../utils/pdfGenerator';
import { APP_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface PdfExportModuleProps {
  answers: DiagnosticAnswers;
  diagnosticResult: DiagnosticResult;
  calculatorInputs: CalculatorInputs;
  calculatorOutputs: CalculatorOutputs;
  rateScenarios: RateComparisonScenario[];
  completedChecklistIds: string[];
}

export const PdfExportModule: React.FC<PdfExportModuleProps> = ({
  answers,
  diagnosticResult,
  calculatorInputs,
  calculatorOutputs,
  rateScenarios,
  completedChecklistIds,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [includeFinancials, setIncludeFinancials] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const pdfFilename = isEn
    ? 'My_Homebuying_Plan_2027_Perquin_de_Leon.pdf'
    : 'Mi_Plan_Comprar_Casa_2027_Perquin_de_Leon.pdf';

  const createPdfDoc = () => {
    return generatePlanPdf(
      answers,
      diagnosticResult,
      calculatorInputs,
      calculatorOutputs,
      rateScenarios,
      completedChecklistIds,
      { includeFinancials, lang }
    );
  };

  // 1. Download PDF directly
  const handleDownloadPdf = () => {
    try {
      const doc = createPdfDoc();
      doc.save(pdfFilename);
      setActionMessage(
        isEn
          ? 'PDF downloaded! Check your device downloads or Files app.'
          : '¡PDF descargado! Revisa la carpeta de descargas o la app Archivos de tu celular.'
      );
    } catch {
      alert(
        isEn
          ? 'There was an issue generating the PDF document. Please verify your inputs and try again.'
          : 'Hubo un problema al generar el documento PDF. Por favor verifica tus datos e inténtalo de nuevo.'
      );
    }
  };

  // 2. View PDF directly on phone/browser
  const handleViewPdf = () => {
    try {
      const doc = createPdfDoc();
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // Also attempt to open in native mobile browser PDF viewer tab
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        // If in-app browser (like TikTok/Instagram) blocks new tab, the inline preview below is already open!
        setActionMessage(
          isEn
            ? 'Preview opened below. You can scroll through your PDF or download it.'
            : 'Vista previa abierta aquí abajo. Puedes leer tu PDF en pantalla o descargarlo.'
        );
      }
    } catch {
      alert(
        isEn
          ? 'Could not open PDF preview.'
          : 'No se pudo abrir la vista previa del PDF.'
      );
    }
  };

  // 3. Native Mobile Share (WhatsApp, iOS Files, Email app, AirDrop, etc.)
  const handleSharePdf = async () => {
    try {
      const doc = createPdfDoc();
      const blob = doc.output('blob');
      const file = new File([blob], pdfFilename, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: isEn
            ? 'My Homebuying Plan 2027 — Perquin de León'
            : 'Mi Plan para Comprar Casa en 2027 — Perquin de León',
          text: isEn
            ? 'Here is my personalized 2027 homebuying plan.'
            : 'Aquí está mi plan personalizado para comprar casa en 2027.',
          files: [file],
        });
      } else {
        // Fallback if browser doesn't support file sharing: open or download
        handleViewPdf();
      }
    } catch {
      // User cancelled share sheet or not supported
    }
  };

  return (
    <section id="mi-pdf" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-4 h-4" />
          <span>{isEn ? 'Your Final Document' : 'Tu Documento Final'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          {isEn ? 'View & Download Your Personalized PDF Plan' : 'Ve y Descarga tu Plan Personalizado en PDF'}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
          {isEn
            ? 'Open your complete report right on your phone or computer screen, download it, or save it to your apps with one tap—100% free and private.'
            : 'Abre tu reporte completo directamente en la pantalla de tu celular o computadora, descárgalo o guárdalo en tus archivos con un toque: 100% gratis y privado.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Main Action Card */}
        <div className="bg-gradient-to-r from-[#102C46] to-[#1C4368] p-6 sm:p-10 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#0B1E30]/60 border border-[#C7E7A4]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#C7E7A4]">
              <Smartphone className="w-4 h-4" />
              <span>
                {isEn
                  ? 'Optimized for Mobile & Desktop'
                  : 'Optimizado para Celular (iPhone / Android) y Computadora'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isEn
                ? 'My Plan to Buy a Home in 2027 — Perquin de León'
                : 'Mi Plan para Comprar Casa en 2027 — Perquin de León'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? 'Includes your readiness assessment, monthly payment breakdown, upfront cash required, rate comparison, 4-stage checklist, and essential questions for your lender, agent, and inspector.'
                : 'Incluye tu diagnóstico, desglose del pago mensual, efectivo inicial necesario, comparación de tasas, tu checklist de 4 etapas y las preguntas clave para el banco, agente e inspector.'}
            </p>

            {/* Primary Mobile-Friendly Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              {/* Button 1: Open / View on Phone */}
              <button
                type="button"
                onClick={handleViewPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#2B7A55] hover:bg-[#36986A] text-white px-7 py-4 rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-[#2B7A55]/30 transition-all transform hover:-translate-y-0.5"
              >
                <ExternalLink className="w-5 h-5 text-[#C7E7A4]" />
                <span>{isEn ? 'OPEN & VIEW PDF ON SCREEN' : 'ABRIR Y VER PDF EN EL CELULAR'}</span>
              </button>

              {/* Button 2: Download PDF */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-white hover:bg-slate-100 text-[#102C46] px-7 py-4 rounded-xl text-sm sm:text-base font-bold shadow transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5 text-[#2B7A55]" />
                <span>{isEn ? 'DOWNLOAD PDF' : 'DESCARGAR PDF'}</span>
              </button>

              {/* Button 3: Native Share on Mobile */}
              <button
                type="button"
                onClick={handleSharePdf}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0B1E30] hover:bg-slate-900 text-[#C7E7A4] border border-[#C7E7A4]/30 px-5 py-4 rounded-xl text-sm font-bold transition-all"
                title={isEn ? 'Share or Save to Phone' : 'Compartir por WhatsApp, Correo o Guardar en Archivos'}
              >
                <Share2 className="w-4 h-4" />
                <span>{isEn ? 'Share / Save' : 'Compartir / Guardar'}</span>
              </button>
            </div>

            {actionMessage && (
              <div className="inline-flex items-center space-x-2 bg-[#0B1E30]/90 border border-[#C7E7A4]/40 text-[#C7E7A4] px-4 py-2 rounded-xl text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{actionMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Options and Inline Preview */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Privacy Toggle: Full vs Redacted */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                {isEn ? 'Document Mode' : 'Modalidad del Documento'}
              </span>
              <h4 className="text-sm font-bold text-[#102C46]">
                {includeFinancials
                  ? (isEn ? 'Include calculated financial figures' : 'Incluir cifras financieras calculadas')
                  : (isEn ? 'Educational version without personal figures' : 'Versión educativa sin cifras personales')}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {includeFinancials 
                  ? (isEn
                      ? 'The PDF will contain the home price, monthly payment, down payment, and closing costs you entered.'
                      : 'El PDF contendrá los números de precio, cuota mensual, pronto y costos de cierre que introdujiste.') 
                  : (isEn
                      ? 'The PDF will contain the methodology and checklist while hiding dollar amounts.'
                      : 'El PDF contendrá la metodología y checklist, ocultando los montos en dólares.')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIncludeFinancials(!includeFinancials);
                setPreviewUrl(null);
              }}
              className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                includeFinancials
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  : 'bg-[#102C46] border-[#102C46] text-[#C7E7A4]'
              }`}
            >
              {includeFinancials ? <Eye className="w-4 h-4 text-[#2B7A55]" /> : <EyeOff className="w-4 h-4" />}
              <span>
                {includeFinancials
                  ? (isEn ? 'Switch to version without figures' : 'Cambiar a versión sin cifras')
                  : (isEn ? 'Switch to full version' : 'Cambiar a versión completa')}
              </span>
            </button>
          </div>

          {/* Embedded PDF Viewer when user clicks "ABRIR Y VER PDF" */}
          {previewUrl && (
            <div className="border-2 border-[#2B7A55] rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
              <div className="bg-[#102C46] text-white px-4 py-3 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#C7E7A4]" />
                  <span>
                    {isEn ? 'PDF Plan Preview' : 'Vista Previa de tu Plan en PDF'}
                  </span>
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-[#2B7A55] hover:bg-[#36986A] text-white px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1"
                  >
                    <span>{isEn ? 'Full Screen' : 'Pantalla Completa'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(null)}
                    className="p-1 text-slate-300 hover:text-white rounded-lg"
                    title={isEn ? 'Close preview' : 'Cerrar vista previa'}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <iframe
                src={previewUrl}
                title="PDF Plan Preview"
                className="w-full h-[520px] sm:h-[680px] bg-white"
              />
            </div>
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>
            {isEn
              ? `${APP_CONFIG.brandName} guarantees 100% privacy: your PDF is created locally on your phone or computer without accounts, emails, or server storage.`
              : `${APP_CONFIG.brandName} garantiza 100% privacidad: tu PDF se crea directamente en tu celular o computadora sin cuentas, sin pedir tu correo y sin guardar nada en servidores.`}
          </p>
        </div>
      </div>
    </section>
  );
};
