import React, { useState } from 'react';
import { 
  Download, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Send,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  CalculatorInputs, 
  CalculatorOutputs, 
  DiagnosticAnswers, 
  DiagnosticResult, 
  RateComparisonScenario 
} from '../types';
import { generatePlanPdf } from '../utils/pdfGenerator';
import { isValidEmail } from '../utils/validation';
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
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [serviceConsent, setServiceConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    type: 'success' | 'warning' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const pdfFilename = isEn
    ? 'My_Homebuying_Plan_2027_Perquin_de_Leon.pdf'
    : 'Mi_Plan_Comprar_Casa_2027_Perquin_de_Leon.pdf';

  const handleDownloadPdf = () => {
    try {
      const doc = generatePlanPdf(
        answers,
        diagnosticResult,
        calculatorInputs,
        calculatorOutputs,
        rateScenarios,
        completedChecklistIds,
        { includeFinancials, lang }
      );
      doc.save(pdfFilename);
    } catch {
      alert(
        isEn
          ? 'There was an issue generating the PDF document. Please verify your inputs and try again.'
          : 'Hubo un problema al generar el documento PDF. Por favor verifica tus datos e inténtalo de nuevo.'
      );
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendResult({ type: null, message: '' });

    // Honeypot check
    if (honeypot.trim().length > 0) {
      setSendResult({
        type: 'error',
        message: isEn ? 'Request rejected.' : 'Solicitud rechazada.'
      });
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setSendResult({
        type: 'error',
        message: isEn
          ? 'Please enter a valid email address.'
          : 'Por favor introduce un correo electrónico válido.'
      });
      return;
    }

    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setSendResult({
        type: 'error',
        message: isEn
          ? 'The two email addresses do not match.'
          : 'Las dos direcciones de correo electrónico no coinciden.'
      });
      return;
    }

    if (!serviceConsent) {
      setSendResult({
        type: 'error',
        message: isEn
          ? 'You must accept the secure delivery processing terms to authorize sending the document.'
          : 'Debes aceptar los términos de procesamiento seguro para autorizar el envío del documento.',
      });
      return;
    }

    setIsSending(true);

    try {
      // 1. Generate PDF on client side
      const doc = generatePlanPdf(
        answers,
        diagnosticResult,
        calculatorInputs,
        calculatorOutputs,
        rateScenarios,
        completedChecklistIds,
        { includeFinancials, lang }
      );

      // Get base64 string without data-uri prefix
      const pdfBase64 = doc.output('datauristring');

      // 2. Post to Cloudflare Pages Functions endpoint
      const response = await fetch('/api/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          pdfBase64: pdfBase64,
          filename: pdfFilename,
          honeypot: honeypot,
          marketingConsent: marketingConsent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSendResult({
          type: 'success',
          message: isEn
            ? 'Success! Your PDF plan has been sent to your email. Check your inbox or promotions folder.'
            : '¡Excelente! Tu plan en PDF ha sido enviado a tu correo. Revisa tu bandeja de entrada o carpeta de promociones.',
        });
      } else if (data.configured === false) {
        setSendResult({
          type: 'warning',
          message: isEn
            ? 'Email service is not yet configured on the server. However, you can download your PDF directly to your device using the green download button above.'
            : (data.message || 'El servicio de correo aún no está configurado en el servidor. Puedes descargar tu PDF directamente usando el botón verde de descarga.'),
        });
      } else {
        setSendResult({
          type: 'error',
          message: isEn
            ? 'Unable to complete email delivery right now. Please download your PDF directly using the download button above.'
            : (data.error || data.message || 'No fue posible completar el envío en este momento. Puedes descargar tu PDF directamente con el botón de descarga.'),
        });
      }
    } catch {
      setSendResult({
        type: 'warning',
        message: isEn
          ? 'Could not connect to the email server. Please download your PDF directly to your device using the green button above.'
          : 'No se pudo conectar con el servidor de correo o la función backend no está disponible en este entorno local. Por favor descarga tu PDF directamente a tu dispositivo.',
      });
    } finally {
      setIsSending(false);
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
          {isEn ? 'Generate Your Personalized PDF Plan' : 'Genera tu Plan Personalizado en PDF'}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
          {isEn
            ? 'Compile your assessment, cost breakdown, rate simulation, checklist, and key questions into a professional report ready to save or print.'
            : 'Reúne tu diagnóstico, el desglose de costos, la simulación de tasas, tu checklist y las preguntas clave en un reporte profesional listo para guardar o imprimir.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Banner Top */}
        <div className="bg-gradient-to-r from-[#102C46] to-[#1C4368] p-6 sm:p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C7E7A4]">
              {isEn ? 'Instant & Free Download' : 'Descarga Inmediata y Gratuita'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isEn ? 'My Plan to Buy a Home in 2027' : 'Mi Plan para Comprar Casa en 2027'}
            </h3>
            <p className="text-xs text-slate-300">
              {isEn
                ? 'US Letter format, professional brand layout, detailed tables, and official government links.'
                : 'Formato Carta (Letter), diseño profesional con colores de marca, tablas detalladas y enlaces oficiales.'}
            </p>
          </div>

          {/* Big Download Button */}
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center justify-center space-x-3 bg-[#2B7A55] hover:bg-[#36986A] text-white px-7 py-4 rounded-xl text-base font-bold shadow-lg shadow-[#2B7A55]/30 transition-all transform hover:-translate-y-0.5 shrink-0"
          >
            <Download className="w-5 h-5 text-[#C7E7A4]" />
            <span>{isEn ? 'DOWNLOAD MY PDF PLAN' : 'DESCARGAR MI PLAN EN PDF'}</span>
          </button>
        </div>

        {/* Options and Email Delivery Form */}
        <div className="p-6 sm:p-10 space-y-8">
          
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
              onClick={() => setIncludeFinancials(!includeFinancials)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all shrink-0 ${
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

          {/* EMAIL SECTION */}
          <div className="border-t border-slate-100 pt-8">
            <div className="max-w-xl mx-auto text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#2B7A55] mb-2">
                <Mail className="w-5 h-5" />
                <h3 className="text-lg font-bold text-[#102C46]">
                  {isEn ? 'Want to receive your plan by email?' : '¿Quieres recibir tu plan en tu correo?'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-6">
                {isEn
                  ? 'We will send your generated PDF file as a direct attachment. No user account or mandatory registration required.'
                  : 'Te enviaremos el archivo PDF generado como un archivo adjunto directo. Sin cuentas de usuario ni registro obligatorio.'}
              </p>

              <form onSubmit={handleSendEmail} className="space-y-4">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="email-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    {isEn ? 'Email Address' : 'Dirección de Correo Electrónico'}
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder={isEn ? 'you@example.com' : 'ejemplo@correo.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-email-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    {isEn ? 'Confirm Email Address' : 'Confirmar Dirección de Correo Electrónico'}
                  </label>
                  <input
                    id="confirm-email-input"
                    type="email"
                    required
                    placeholder={isEn ? 'Confirm your email address' : 'Confirma tu correo electrónico'}
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
                  />
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-3 pt-2 text-left">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={serviceConsent}
                      onChange={(e) => setServiceConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2B7A55] focus:ring-[#2B7A55]"
                    />
                    <span className="text-xs text-slate-600 leading-normal">
                      <strong>{isEn ? 'Required consent:' : 'Consentimiento obligatorio:'}</strong>{' '}
                      {isEn
                        ? 'I authorize sending the PDF through the secure external delivery service Resend. I understand that no financial data is permanently stored on servers.'
                        : 'Autorizo el envío del PDF a través del servicio de entrega seguro externo Resend. Entiendo que ningún dato financiero se almacena de forma permanente en servidores.'}
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2B7A55] focus:ring-[#2B7A55]"
                    />
                    <span className="text-xs text-slate-500 leading-normal">
                      <em>{isEn ? '(Optional - unchecked by default):' : '(Opcional - desmarcado por defecto):'}</em>{' '}
                      {isEn
                        ? 'I would like to receive future educational emails and financial tips from Perquin de León. You can unsubscribe at any time with one click.'
                        : 'Deseo recibir futuros correos educativos y consejos financieros de Perquin de León. Podrás darte de baja en cualquier momento con un clic.'}
                    </span>
                  </label>
                </div>

                {/* Status Message Display */}
                {sendResult.type && (
                  <div
                    className={`p-4 rounded-xl text-xs flex items-start space-x-2.5 ${
                      sendResult.type === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                        : sendResult.type === 'warning'
                        ? 'bg-amber-50 border border-amber-200 text-amber-900'
                        : 'bg-red-50 border border-red-200 text-red-900'
                    }`}
                  >
                    {sendResult.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <p>{sendResult.message}</p>
                  </div>
                )}

                {/* Submit Email Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#102C46] hover:bg-[#1C4368] text-white px-7 py-3.5 rounded-xl text-sm font-bold shadow transition-all disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C7E7A4]" />
                      <span>{isEn ? 'Sending document...' : 'Enviando documento...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C7E7A4]" />
                      <span>{isEn ? 'SEND MY PLAN BY EMAIL' : 'ENVIAR MI PLAN POR CORREO'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>
            {isEn
              ? `${APP_CONFIG.brandName} guarantees that your document is generated exclusively inside your browser. You can save the PDF directly to your device as many times as you like without providing your email address.`
              : `${APP_CONFIG.brandName} garantiza que tu documento se genera exclusivamente en tu navegador. Puedes guardar el PDF directamente a tu dispositivo cuantas veces desees sin entregar tu dirección de correo electrónico.`}
          </p>
        </div>
      </div>
    </section>
  );
};
