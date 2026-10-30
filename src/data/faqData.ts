import { Language } from '../types';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: '¿Por qué prepararse para 2027 si todavía falta tiempo?',
    answer: 'La compra de una vivienda exitosa en Estados Unidos no se improvisa en dos semanas. Construir un historial crediticio sólido, corregir errores en los reportes, reducir deudas y acumular el pronto y los costos de cierre toma entre 12 y 24 meses. Prepararte con calma te permite negociar desde una posición de fuerza financiera sin cometer errores costosos.'
  },
  {
    question: '¿Esta aplicación guarda mi información financiera o crediticia?',
    answer: 'No. La herramienta opera bajo una estricta política de privacidad sin almacenamiento de datos personales. Todos los cálculos se realizan localmente en tu propio navegador web. Nada se envía a bases de datos ni se comparte con bancos o agencias inmobiliarias. Al cerrar o recargar la página, tus datos se borran de la memoria.'
  },
  {
    question: '¿Necesito pagar o registrarme para descargar mi plan en PDF?',
    answer: 'No. La descarga de tu plan personalizado en PDF es 100% gratuita, instantánea y no requiere que te registres, inicies sesión ni proporciones tu correo electrónico.'
  },
  {
    question: '¿Por qué la calculadora incluye costos como inspección, tasación y HOA?',
    answer: 'Porque muchas personas cometen el error de presupuestar únicamente el "pronto" y luego se ven en aprietos al descubrir que necesitan miles de dólares para gastos de cierre, inspecciones, mudanza, reservas y cuotas de mantenimiento mensual. Esta herramienta te muestra el panorama financiero real completo.'
  },
  {
    question: '¿Qué diferencia hay entre la tasa de interés y el APR?',
    answer: 'La tasa de interés es el porcentaje anual que el banco te cobra directamente por el capital prestado. El APR (Annual Percentage Rate o Tasa Anual Efectiva) es una medida más amplia que incluye tanto la tasa de interés como los costos y cargos adicionales del prestamista (puntos de descuento, tarifas de originación, etc.), lo que te ayuda a comparar el costo real entre diferentes bancos.'
  },
  {
    question: '¿Puedo comprar casa si no tengo el 20% de pronto ahorrado?',
    answer: 'Sí. Existen múltiples programas hipotecarios con pagos iniciales desde el 3% (préstamos convencionales como HomeReady o Home Possible), 3.5% (préstamos FHA) o incluso 0% de pronto para veteranos (VA) o propiedades en zonas rurales elegibles (USDA). Además, existen programas estatales y locales de asistencia para el pronto (DPA).'
  }
];

export const FAQS_EN: FaqItem[] = [
  {
    question: 'Why start preparing for 2027 now?',
    answer: 'A successful home purchase in the United States is not improvised in two weeks. Building a strong credit profile, disputing report errors, paying down debt, and saving for both down payment and closing costs takes 12 to 24 months. Preparing ahead of time lets you negotiate from a position of financial strength.'
  },
  {
    question: 'Does this app store my financial or credit information?',
    answer: 'No. This tool operates under a strict zero-storage privacy policy. All calculations run locally in your own web browser. Nothing is saved to databases or shared with banks or real estate agencies. When you close or refresh the page, your inputs are cleared from memory.'
  },
  {
    question: 'Do I have to pay or sign up to download my PDF plan?',
    answer: 'No. Downloading your customized PDF plan is 100% free, instant, and does not require creating an account, logging in, or providing your email address.'
  },
  {
    question: 'Why does the calculator include inspection, appraisal, and HOA fees?',
    answer: 'Because many buyers make the mistake of budgeting only for the down payment and are caught off guard when they need thousands of dollars more for closing costs, inspections, moving, emergency reserves, and monthly HOA dues. This tool shows you the complete financial picture.'
  },
  {
    question: 'What is the difference between the interest rate and the APR?',
    answer: 'The interest rate is the annual percentage the lender charges for borrowing the principal. The APR (Annual Percentage Rate) is a broader measure that includes both the interest rate and additional lender fees (discount points, origination charges, etc.), helping you compare the true cost across lenders.'
  },
  {
    question: 'Can I buy a house if I do not have 20% saved for a down payment?',
    answer: 'Yes. There are multiple mortgage programs with down payments starting at 3% (Conventional loans like HomeReady or Home Possible), 3.5% (FHA loans), or even 0% down for veterans (VA) and eligible rural/suburban properties (USDA). In addition, state and local Down Payment Assistance (DPA) programs are available.'
  }
];

export function getFaqs(lang: Language = 'es'): FaqItem[] {
  return lang === 'en' ? FAQS_EN : FAQS;
}
