import React from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#102C46] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-[#C7E7A4]" />
            ) : (
              <Scale className="w-5 h-5 text-[#D5AD57]" />
            )}
            <h3 className="text-lg font-bold text-white">
              {type === 'privacy'
                ? (isEn ? 'Privacy & Data Protection Policy' : 'Política de Privacidad y Protección de Datos')
                : (isEn ? 'Terms of Use & Legal Disclaimer' : 'Condiciones de Uso y Exención de Responsabilidad')}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            isEn ? (
              <>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <strong>Core Privacy Commitment:</strong> Your financial information (income, savings, debt amounts, or home price) is NEVER stored in databases, sent to permanent servers, or shared with banks or commercial brokers.
                </div>

                <h4 className="font-bold text-[#102C46] text-base">1. Ephemeral In-Browser Processing</h4>
                <p>
                  All calculations in the calculator, interactive checklist, and readiness assessment are processed locally inside your web browser’s temporary memory. When you refresh or close the page, those values are cleared. We do not use permanent local storage (localStorage or sessionStorage) for confidential financial figures.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">2. Client-Side PDF Generation</h4>
                <p>
                  Your PDF plan is compiled entirely inside your browser using the open-source jsPDF library. When you click "DOWNLOAD MY PDF PLAN", the document is generated on your device and saved directly to your downloads folder without transmitting any data over the internet.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">3. Optional Email Delivery</h4>
                <p>
                  If you voluntarily choose to receive your document by email, the compiled PDF file is transmitted securely through a Cloudflare Pages serverless function to the transactional email provider Resend.
                </p>
                <p>
                  The backend only validates the destination email address and the integrity of the attached PDF. No permanent database records of your answers or credit profile are created.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">4. No Collection of Sensitive Identifiers</h4>
                <p>
                  This application will NEVER ask for Social Security Numbers (SSN), bank account numbers, passwords, credit/debit card numbers, or dates of birth.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">5. Independent Opt-In Newsletter</h4>
                <p>
                  Requesting your PDF plan by email does not automatically subscribe you to marketing lists. The checkbox to receive future educational tips from Perquin de León is 100% optional and unchecked by default.
                </p>
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <strong>Compromiso Fundamental de Privacidad:</strong> Tu información financiera (ingresos, ahorros, montos de deuda o precio de vivienda) NUNCA se almacena en bases de datos, no se envía a servidores permanentes ni se comparte con agencias bancarias o comerciales.
                </div>

                <h4 className="font-bold text-[#102C46] text-base">1. Tratamiento Efímero en Navegador</h4>
                <p>
                  Todos los cálculos de la calculadora, el checklist interactivo y el diagnóstico se procesan localmente en la memoria volátil de tu propio navegador web. Si recargas o cierras la página, esos valores desaparecen por completo. No utilizamos almacenamiento local permanente (localStorage ni sessionStorage) para variables financieras confidenciales.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">2. Generación Local del PDF</h4>
                <p>
                  La creación de tu plan en documento PDF se realiza íntegramente en tu navegador utilizando la librería abierta jsPDF. Al hacer clic en "DESCARGAR MI PLAN EN PDF", el documento se compila en tu procesador y se guarda directamente en tu carpeta de descargas sin enviar ninguna información a internet.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">3. Envío Opcional por Correo Electrónico</h4>
                <p>
                  Si decides voluntariamente recibir tu documento por correo, el archivo PDF ya compilado se transmite de forma cifrada a través de una función de servidor de Cloudflare Pages hacia el proveedor de infraestructura de correo transaccional Resend.
                </p>
                <p>
                  El servidor backend valida exclusivamente el correo de destino y la integridad del PDF adjunto. No se crean registros permanentes de tus respuestas individuales ni de tus datos crediticios. El proveedor de entrega (Resend) gestiona la entrega del mensaje conforme a sus propias normativas de seguridad y privacidad vigentes.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">4. No Solicitud de Información Sensible</h4>
                <p>
                  Esta aplicación NUNCA te solicitará números de Seguro Social (SSN), números de cuentas bancarias, contraseñas, números de tarjetas de crédito o débito ni fecha de nacimiento.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">5. Boletines Comerciales Separados</h4>
                <p>
                  Solicitar el envío de tu plan en PDF no te suscribe automáticamente a listas de mercadeo. La casilla de suscripción voluntaria para recibir consejos de Perquin de León es 100% opcional, está desmarcada por defecto y permite cancelar la suscripción en cualquier momento.
                </p>
              </>
            )
          ) : (
            isEn ? (
              <>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <strong>Educational Nature:</strong> This application is not a mortgage lender, bank, mortgage broker, licensed financial advisor, real estate brokerage, or government agency.
                </div>

                <h4 className="font-bold text-[#102C46] text-base">1. Strictly Educational Purpose</h4>
                <p>
                  The tool "Your Roadmap to Buying a Home in 2027", developed for the personal brand of Perquin de León, is designed solely to provide general educational guidance for prospective homebuyers in the United States.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">2. Illustrative Figures & Rates</h4>
                <p>
                  Interest rates, closing cost percentages (2% to 5%), insurance premiums, and mathematical calculations are illustrative estimates. They do not constitute loan offers, binding Loan Estimates, or promises of mortgage approval. Actual terms depend on your chosen lender and verified credit profile.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">3. Links to Government & External Portals</h4>
                <p>
                  This app links to official federal and state portals such as HUD (hud.gov), CFPB (consumerfinance.gov), Fannie Mae, Freddie Mac, VA, and USDA. Perquin de León does not control or guarantee the availability of funds or eligibility changes of those public agencies.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">4. Consult Licensed Professionals</h4>
                <p>
                  Before signing any purchase contract or committing earnest money deposits, always consult with:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>An NMLS-licensed mortgage loan officer in your state.</li>
                  <li>A HUD-certified housing counselor (hud.gov/counseling).</li>
                  <li>A licensed real estate agent.</li>
                  <li>An independent licensed home inspector.</li>
                  <li>A real estate attorney in your jurisdiction when applicable.</li>
                </ul>
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <strong>Naturaleza Educativa:</strong> Esta aplicación no es un prestamista hipotecario, banco, corredor de hipotecas (broker), asesor financiero licenciado ni agencia gubernamental.
                </div>

                <h4 className="font-bold text-[#102C46] text-base">1. Finalidad Exclusivamente Educativa</h4>
                <p>
                  La herramienta "Tu Ruta para Comprar Casa en 2027", desarrollada para la marca personal de Perquin de León, tiene como único propósito brindar información orientativa y pedagógica en español para la comunidad hispanohablante en Estados Unidos.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">2. Cifras y Tasas Ilustrativas</h4>
                <p>
                  Las tasas de interés, porcentajes de costos de cierre (2% a 5%), primas de seguro y cálculos matemáticos son estimaciones referenciales. No constituyen ofertas de crédito, estimaciones de préstamo vinculantes (Loan Estimates) ni promesas de aprobación o elegibilidad. Las condiciones reales dependerán del prestamista que elijas y de tu expediente crediticio verificado.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">3. Enlaces a Sitios Gubernamentales y Externos</h4>
                <p>
                  La aplicación enlaza a portales oficiales de agencias federales y estatales como HUD (hud.gov), CFPB (consumerfinance.gov), Fannie Mae, Freddie Mac, VA y USDA. Perquin de León no administra ni se responsabiliza por las actualizaciones, cambios de requisitos ni disponibilidad de fondos de dichos organismos públicos.
                </p>

                <h4 className="font-bold text-[#102C46] text-base">4. Consulta con Profesionales Autorizados</h4>
                <p>
                  Antes de asumir cualquier compromiso legal, firmar contratos de compraventa o pagar depósitos de garantía, debes consultar con:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Un oficial de préstamos hipotecarios con licencia NMLS en tu estado.</li>
                  <li>Un asesor de vivienda certificado por HUD (hud.gov/counseling).</li>
                  <li>Un agente de bienes raíces con licencia activa.</li>
                  <li>Un inspector de viviendas profesional independiente.</li>
                  <li>Un abogado especialista en bienes raíces en tu estado cuando corresponda.</li>
                </ul>
              </>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#102C46] hover:bg-[#1C4368] text-white rounded-xl text-xs font-bold transition-colors"
          >
            {isEn ? 'Understood & Close' : 'Entendido y Aceptar'}
          </button>
        </div>
      </div>
    </div>
  );
};
