import { DiagnosticAnswers, DiagnosticResult, Language, ReadinessTier } from '../types';

export interface QuestionOption<T = string> {
  value: T;
  label: string;
  labelEn: string;
  sublabel?: string;
  sublabelEn?: string;
}

export const TIMEFRAME_OPTIONS: QuestionOption[] = [
  { value: '3_months', label: 'En los próximos 3 meses', labelEn: 'In the next 3 months', sublabel: 'Horizonte inmediato', sublabelEn: 'Immediate horizon' },
  { value: '6_months', label: 'En 6 meses', labelEn: 'In 6 months', sublabel: 'Corto plazo', sublabelEn: 'Short term' },
  { value: '12_months', label: 'En 12 meses', labelEn: 'In 12 months', sublabel: 'Mediano plazo', sublabelEn: 'Medium term' },
  { value: '2027_or_later', label: 'En 2027 o después', labelEn: 'In 2027 or later', sublabel: 'Meta estratégica para 2027', sublabelEn: 'Strategic goal for 2027' },
  { value: 'exploring', label: 'Todavía estoy explorando', labelEn: 'Still exploring', sublabel: 'Fase de descubrimiento', sublabelEn: 'Discovery phase' },
];

export const CREDIT_REVIEW_OPTIONS: QuestionOption[] = [
  { value: 'yes', label: 'Sí, lo he revisado recientemente', labelEn: 'Yes, I reviewed it recently' },
  { value: 'no', label: 'No lo he revisado en los últimos meses', labelEn: 'I have not reviewed it in recent months' },
  { value: 'not_sure', label: 'No estoy seguro / No sé cómo revisarlo', labelEn: 'Not sure / I do not know how to check it' },
];

export const CREDIT_SITUATION_OPTIONS: QuestionOption[] = [
  { value: 'excellent', label: 'Excelente (740 o más)', labelEn: 'Excellent (740 or higher)', sublabel: 'Acceso a las mejores tasas del mercado', sublabelEn: 'Access to the best market rates' },
  { value: 'good', label: 'Buena (680 – 739)', labelEn: 'Good (680 – 739)', sublabel: 'Buenas opciones convencionales y FHA', sublabelEn: 'Good conventional and FHA options' },
  { value: 'fair', label: 'Regular (620 – 679)', labelEn: 'Fair (620 – 679)', sublabel: 'Califica para FHA y programas de ayuda', sublabelEn: 'Qualifies for FHA and assistance programs' },
  { value: 'needs_improvement', label: 'Necesito mejorarla (Menos de 620)', labelEn: 'Needs improvement (Under 620)', sublabel: 'Requiere plan de saneamiento previo', sublabelEn: 'Requires a prior credit action plan' },
  { value: 'prefer_not_to_say', label: 'Prefiero no responder', labelEn: 'Prefer not to answer', sublabel: 'Información privada', sublabelEn: 'Private information' },
];

export const SAVINGS_OPTIONS: QuestionOption[] = [
  { value: 'under_3k', label: 'Menos de $3,000', labelEn: 'Under $3,000', sublabel: 'Prioridad: construir fondo de emergencia y pronto', sublabelEn: 'Priority: build emergency fund and down payment' },
  { value: '3k_10k', label: 'Entre $3,000 y $10,000', labelEn: 'Between $3,000 and $10,000', sublabel: 'Potencial para programas FHA o asistencia estatal', sublabelEn: 'Potential for FHA or state assistance programs' },
  { value: '10k_25k', label: 'Entre $10,000 y $25,000', labelEn: 'Between $10,000 and $25,000', sublabel: 'Buena base para pronto mínimo y gastos de cierre', sublabelEn: 'Good base for minimum down payment and closing costs' },
  { value: '25k_50k', label: 'Entre $25,000 y $50,000', labelEn: 'Between $25,000 and $50,000', sublabel: 'Fondo sólido para pronto convencional y reservas', sublabelEn: 'Solid fund for conventional down payment and reserves' },
  { value: 'over_50k', label: 'Más de $50,000', labelEn: 'Over $50,000', sublabel: 'Excelente posición de liquidez', sublabelEn: 'Excellent liquidity position' },
  { value: 'prefer_not_to_say', label: 'Prefiero no responder', labelEn: 'Prefer not to answer', sublabel: 'Información privada', sublabelEn: 'Private information' },
];

export const DEBT_OPTIONS: QuestionOption[] = [
  { value: 'yes', label: 'Sí (tarjetas, auto, préstamos estudiantiles u otros)', labelEn: 'Yes (credit cards, auto, student loans, etc.)' },
  { value: 'no', label: 'No tengo deudas mensuales activas', labelEn: 'I have no active monthly debts' },
  { value: 'prefer_not_to_say', label: 'Prefiero no responder', labelEn: 'Prefer not to answer' },
];

export const YES_NO_OPTIONS: QuestionOption[] = [
  { value: 'yes', label: 'Sí', labelEn: 'Yes' },
  { value: 'no', label: 'No', labelEn: 'No' },
];

export function evaluateDiagnostic(answers: DiagnosticAnswers, lang: Language = 'es'): DiagnosticResult {
  const isEn = lang === 'en';
  let score = 0;
  const reasons: string[] = [];
  const recommendations: string[] = [];

  // 1. Credit review
  if (answers.creditReviewed === 'yes') {
    score += 2;
    reasons.push(
      isEn
        ? 'You have taken the initiative to review your credit reports.'
        : 'Has tomado la iniciativa de revisar tus reportes de crédito.'
    );
  } else if (answers.creditReviewed === 'no') {
    reasons.push(
      isEn
        ? 'You have not yet reviewed your credit reports with the 3 bureaus (Equifax, Experian, TransUnion).'
        : 'Aún no has revisado tus reportes de crédito con las 3 agencias (Equifax, Experian, TransUnion).'
    );
    recommendations.push(
      isEn
        ? 'Download your free reports at AnnualCreditReport.com and check for errors affecting your score.'
        : 'Descarga tus reportes gratuitos en AnnualCreditReport.com y busca posibles errores que afecten tu puntaje.'
    );
  } else if (answers.creditReviewed === 'not_sure') {
    reasons.push(
      isEn
        ? 'You are unsure about the status of your credit reports.'
        : 'No estás seguro del estado de tus reportes de crédito.'
    );
    recommendations.push(
      isEn
        ? 'Check your credit history for free at AnnualCreditReport.com before applying for any quotes.'
        : 'Revisa tu historial crediticio sin costo en AnnualCreditReport.com antes de solicitar cualquier cotización.'
    );
  }

  // 2. Credit condition
  if (answers.creditSituation === 'excellent' || answers.creditSituation === 'good') {
    score += 3;
    reasons.push(
      isEn
        ? 'Your credit standing is favorable for accessing competitive mortgage options.'
        : 'Tu percepción crediticia es favorable para acceder a opciones competitivas.'
    );
  } else if (answers.creditSituation === 'fair') {
    score += 1;
    reasons.push(
      isEn
        ? 'Your credit is in a fair range; it qualifies for FHA loans, though optimizing it will save you thousands.'
        : 'Tu crédito se encuentra en rango regular; califica para préstamos FHA, pero optimizarlo te ahorrará miles de dólares.'
    );
    recommendations.push(
      isEn
        ? 'Pay on time and reduce credit card utilization below 30% (ideally below 10%).'
        : 'Paga a tiempo y reduce la utilización de tus tarjetas de crédito a menos del 30% (idealmente menos del 10%).'
    );
  } else if (answers.creditSituation === 'needs_improvement') {
    reasons.push(
      isEn
        ? 'Your credit needs prior improvement to avoid unfavorable rates or denials.'
        : 'Tu crédito necesita mejoras previas para evitar tasas desfavorables o rechazos.'
    );
    recommendations.push(
      isEn
        ? 'Build a 6-to-12 month plan: eliminate past-due balances, avoid opening new credit lines, and keep cards current.'
        : 'Diseña un plan de 6 a 12 meses: elimina moras, no abras nuevas líneas de crédito y mantén tus tarjetas al día.'
    );
  }

  // 3. Savings
  if (answers.savings === 'over_50k' || answers.savings === '25k_50k') {
    score += 3;
    reasons.push(
      isEn
        ? 'You have a solid savings fund to cover down payment, closing costs, and reserves.'
        : 'Cuentas con un fondo de ahorros sólido para cubrir pronto, costos de cierre y reservas.'
    );
  } else if (answers.savings === '10k_25k') {
    score += 2;
    reasons.push(
      isEn
        ? 'You have an initial savings base; evaluate whether it covers down payment plus closing costs (2% to 5% of home price).'
        : 'Tienes una base de ahorro inicial; evalúa si cubre pronto más costos de cierre (2% a 5% del valor de la casa).'
    );
    recommendations.push(
      isEn
        ? 'Use Module B (Calculator) to break down how much total cash you need before committing all your savings.'
        : 'Utiliza el Módulo B (Calculadora) para desglosar cuánto efectivo total necesitas antes de comprometer todos tus ahorros.'
    );
  } else if (answers.savings === '3k_10k') {
    score += 1;
    reasons.push(
      isEn
        ? 'Your current savings may be tight for a traditional purchase without assistance.'
        : 'Tus ahorros actuales pueden ser justos para una compra tradicional sin asistencia.'
    );
    recommendations.push(
      isEn
        ? 'Explore down payment assistance (DPA) programs in Module D of this tool.'
        : 'Explora programas de asistencia para el pronto (DPA) en el Módulo D de esta herramienta.'
    );
  } else if (answers.savings === 'under_3k') {
    reasons.push(
      isEn
        ? 'Your savings level requires accelerating your financial plan before signing any contract.'
        : 'Tu nivel de ahorro requiere acelerar el plan financiero antes de firmar cualquier contrato.'
    );
    recommendations.push(
      isEn
        ? 'Set up a dedicated separate savings account exclusively for your 2027 homebuying goal.'
        : 'Establece una cuenta de ahorro separada dedicada exclusivamente a tu meta de vivienda hacia 2027.'
    );
  }

  // 4. Budget
  if (answers.calculatedBudget === 'yes') {
    score += 2;
    reasons.push(
      isEn
        ? 'You have already analyzed your real monthly housing budget.'
        : 'Ya has analizado tu presupuesto mensual real para vivienda.'
    );
  } else {
    reasons.push(
      isEn
        ? 'You have not yet determined accurately how much you can comfortably pay monthly.'
        : 'Aún no has determinado con precisión cuánto puedes pagar mensualmente sin comprometer tu tranquilidad.'
    );
    recommendations.push(
      isEn
        ? 'Calculate your full monthly payment (PITI + HOA) in the Real Cost Calculator so it stays under 28%-32% of gross income.'
        : 'Calcula tu pago mensual completo (PITI + HOA) en la Calculadora de Costo Real para que no supere el 28%-32% de tus ingresos brutos.'
    );
  }

  // 5. Lender conversation
  if (answers.talkedToLender === 'yes') {
    score += 2;
    reasons.push(
      isEn
        ? 'You have already spoken with a lender to understand preliminary requirements.'
        : 'Ya has conversado con un prestamista para conocer requisitos preliminares.'
    );
  } else {
    recommendations.push(
      isEn
        ? 'When you are 6-12 months away from buying, consult at least 3 different lenders to compare Loan Estimates.'
        : 'Cuando estés a 6-12 meses de comprar, consulta al menos con 3 prestamistas diferentes para comparar Loan Estimates.'
    );
  }

  // 6. Timeframe context
  if (answers.timeframe === '2027_or_later') {
    recommendations.push(
      isEn
        ? 'The 2027 horizon gives you a huge strategic advantage: plenty of time to optimize credit, build savings, and research neighborhoods.'
        : 'El horizonte 2027 te da una ventaja estratégica enorme: tienes tiempo suficiente para optimizar crédito, acumular ahorros e investigar vecindarios.'
    );
  } else if (answers.timeframe === '3_months' || answers.timeframe === '6_months') {
    if (score < 4) {
      recommendations.push(
        isEn
          ? 'Your desired purchase date is very close given the pending tasks identified. Consider extending your timeline to avoid rushed decisions.'
          : 'Tu fecha deseada está muy cerca para los pendientes identificados. Considera extender tu plazo para evitar decisiones apresuradas.'
      );
    }
  }

  // Default recommendations if list is short
  if (recommendations.length < 3) {
    recommendations.push(
      isEn
        ? 'Review the Interactive Checklist (Module C) and complete Stage 1 tasks.'
        : 'Revisa el Checklist Interactivo (Módulo C) y completa las tareas de la Etapa 1.'
    );
    recommendations.push(
      isEn
        ? 'Check your state assistance programs in Module D.'
        : 'Consulta los programas de asistencia de tu estado en el Módulo D.'
    );
  }

  let tier: ReadinessTier = 'needs_prep';
  let title = isEn ? 'You need to start preparing' : 'Necesitas comenzar a prepararte';
  let badge = isEn ? 'Initial Preparation Phase' : 'Fase de Preparación Inicial';
  let summary = isEn
    ? 'You have the goal in mind, but key pillars such as credit optimization, cash reserves, or defining a real budget still need work.'
    : 'Tienes la meta en mente, pero aún faltan pilares esenciales como optimizar tu historial crediticio, acumular reservas o definir tu presupuesto real.';

  if (score >= 8) {
    tier = 'ready_to_explore';
    title = isEn
      ? 'You are ready to start exploring options with professionals'
      : 'Estás listo para comenzar a explorar opciones con profesionales';
    badge = isEn ? 'Advanced Exploration Phase' : 'Fase Avanzada de Exploración';
    summary = isEn
      ? 'You have the core foundations in place (savings, credit awareness, and budget). It is time to compare options with licensed lenders and agents.'
      : 'Cuentas con las bases clave (ahorros, comprensión de tu crédito y presupuesto). Es el momento de comparar opciones con prestamistas y agentes certificados.';
  } else if (score >= 4) {
    tier = 'in_progress';
    title = isEn
      ? 'You are making progress, but still have pending tasks'
      : 'Estás avanzando, pero todavía tienes tareas pendientes';
    badge = isEn ? 'Strengthening Phase' : 'Fase de Fortalecimiento';
    summary = isEn
      ? 'You are on the right track with several strengths, but you need to build extra savings or fine-tune your numbers before making an offer.'
      : 'Vas por buen camino y tienes varios puntos a favor, pero necesitas consolidar ahorros adicionales o afinar números antes de comprometerte con una oferta.';
  }

  return {
    tier,
    title,
    badge,
    summary,
    reasons,
    recommendations
  };
}
