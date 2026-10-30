import { DiagnosticAnswers, DiagnosticResult, ReadinessTier } from '../types';

export interface QuestionOption<T = string> {
  value: T;
  label: string;
  sublabel?: string;
}

export const TIMEFRAME_OPTIONS: QuestionOption[] = [
  { value: '3_months', label: 'En los próximos 3 meses', sublabel: 'Horizonte inmediato' },
  { value: '6_months', label: 'En 6 meses', sublabel: 'Corto plazo' },
  { value: '12_months', label: 'En 12 meses', sublabel: 'Mediano plazo' },
  { value: '2027_or_later', label: 'En 2027 o después', sublabel: 'Meta estratégica para 2027' },
  { value: 'exploring', label: 'Todavía estoy explorando', sublabel: 'Fase de descubrimiento' },
];

export const CREDIT_REVIEW_OPTIONS: QuestionOption[] = [
  { value: 'yes', label: 'Sí, lo he revisado recientemente' },
  { value: 'no', label: 'No lo he revisado en los últimos meses' },
  { value: 'not_sure', label: 'No estoy seguro / No sé cómo revisarlo' },
];

export const CREDIT_SITUATION_OPTIONS: QuestionOption[] = [
  { value: 'excellent', label: 'Excelente (740 o más)', sublabel: 'Acceso a las mejores tasas del mercado' },
  { value: 'good', label: 'Buena (680 – 739)', sublabel: 'Buenas opciones convencionales y FHA' },
  { value: 'fair', label: 'Regular (620 – 679)', sublabel: 'Califica para FHA y programas de ayuda' },
  { value: 'needs_improvement', label: 'Necesito mejorarla (Menos de 620)', sublabel: 'Requiere plan de saneamiento previo' },
  { value: 'prefer_not_to_say', label: 'Prefiero no responder', sublabel: 'Información privada' },
];

export const SAVINGS_OPTIONS: QuestionOption[] = [
  { value: 'under_3k', label: 'Menos de $3,000', sublabel: 'Prioridad: construir fondo de emergencia y pronto' },
  { value: '3k_10k', label: 'Entre $3,000 y $10,000', sublabel: 'Potencial para programas FHA o asistencia estatal' },
  { value: '10k_25k', label: 'Entre $10,000 y $25,000', sublabel: 'Buena base para pronto mínimo y gastos de cierre' },
  { value: '25k_50k', label: 'Entre $25,000 y $50,000', sublabel: 'Fondo sólido para pronto convencional y reservas' },
  { value: 'over_50k', label: 'Más de $50,000', sublabel: 'Excelente posición de liquidez' },
  { value: 'prefer_not_to_say', label: 'Prefiero no responder', sublabel: 'Información privada' },
];

export const DEBT_OPTIONS: QuestionOption[] = [
  { value: 'yes', label: 'Sí (tarjetas, auto, préstamos estudiantiles u otros)' },
  { value: 'no', label: 'No tengo deudas mensuales activas' },
  { value: 'prefer_not_to_say', label: 'Prefiero no responder' },
];

export const YES_NO_OPTIONS: QuestionOption[] = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' },
];

export function evaluateDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  let score = 0;
  const reasons: string[] = [];
  const recommendations: string[] = [];

  // 1. Credit review
  if (answers.creditReviewed === 'yes') {
    score += 2;
    reasons.push('Has tomado la iniciativa de revisar tus reportes de crédito.');
  } else if (answers.creditReviewed === 'no') {
    reasons.push('Aún no has revisado tus reportes de crédito con las 3 agencias (Equifax, Experian, TransUnion).');
    recommendations.push('Descarga tus reportes gratuitos en AnnualCreditReport.com y busca posibles errores que afecten tu puntaje.');
  } else if (answers.creditReviewed === 'not_sure') {
    reasons.push('No estás seguro del estado de tus reportes de crédito.');
    recommendations.push('Revisa tu historial crediticio sin costo en AnnualCreditReport.com antes de solicitar cualquier cotización.');
  }

  // 2. Credit condition
  if (answers.creditSituation === 'excellent' || answers.creditSituation === 'good') {
    score += 3;
    reasons.push('Tu percepción crediticia es favorable para acceder a opciones competitivas.');
  } else if (answers.creditSituation === 'fair') {
    score += 1;
    reasons.push('Tu crédito se encuentra en rango regular; califica para préstamos FHA, pero optimizarlo te ahorrará miles de dólares.');
    recommendations.push('Paga a tiempo y reduce la utilización de tus tarjetas de crédito a menos del 30% (idealmente menos del 10%).');
  } else if (answers.creditSituation === 'needs_improvement') {
    reasons.push('Tu crédito necesita mejoras previas para evitar tasas desfavorables o rechazos.');
    recommendations.push('Diseña un plan de 6 a 12 meses: elimina moras, no abras nuevas líneas de crédito y mantén tus tarjetas al día.');
  }

  // 3. Savings
  if (answers.savings === 'over_50k' || answers.savings === '25k_50k') {
    score += 3;
    reasons.push('Cuentas con un fondo de ahorros sólido para cubrir pronto, costos de cierre y reservas.');
  } else if (answers.savings === '10k_25k') {
    score += 2;
    reasons.push('Tienes una base de ahorro inicial; evalúa si cubre pronto más costos de cierre (2% a 5% del valor de la casa).');
    recommendations.push('Utiliza el Módulo B (Calculadora) para desglosar cuánto efectivo total necesitas antes de comprometer todos tus ahorros.');
  } else if (answers.savings === '3k_10k') {
    score += 1;
    reasons.push('Tus ahorros actuales pueden ser justos para una compra tradicional sin asistencia.');
    recommendations.push('Explora programas de asistencia para el pronto (DPA) en el Módulo D de esta herramienta.');
  } else if (answers.savings === 'under_3k') {
    reasons.push('Tu nivel de ahorro requiere acelerar el plan financiero antes de firmar cualquier contrato.');
    recommendations.push('Establece una cuenta de ahorro separada dedicada exclusivamente a tu meta de vivienda hacia 2027.');
  }

  // 4. Budget
  if (answers.calculatedBudget === 'yes') {
    score += 2;
    reasons.push('Ya has analizado tu presupuesto mensual real para vivienda.');
  } else {
    reasons.push('Aún no has determinado con precisión cuánto puedes pagar mensualmente sin comprometer tu tranquilidad.');
    recommendations.push('Calcula tu pago mensual completo (PITI + HOA) en la Calculadora de Costo Real para que no supere el 28%-32% de tus ingresos brutos.');
  }

  // 5. Lender conversation
  if (answers.talkedToLender === 'yes') {
    score += 2;
    reasons.push('Ya has conversado con un prestamista para conocer requisitos preliminares.');
  } else {
    recommendations.push('Cuando estés a 6-12 meses de comprar, consulta al menos con 3 prestamistas diferentes para comparar Loan Estimates.');
  }

  // 6. Timeframe context
  if (answers.timeframe === '2027_or_later') {
    recommendations.push('El horizonte 2027 te da una ventaja estratégica enorme: tienes tiempo suficiente para optimizar crédito, acumular ahorros e investigar vecindarios.');
  } else if (answers.timeframe === '3_months' || answers.timeframe === '6_months') {
    if (score < 4) {
      recommendations.push('Tu fecha deseada está muy cerca para los pendientes identificados. Considera extender tu plazo para evitar decisiones apresuradas.');
    }
  }

  // Default recommendations if list is short
  if (recommendations.length < 3) {
    recommendations.push('Revisa el Checklist Interactivo (Módulo C) y completa las tareas de la Etapa 1.');
    recommendations.push('Consulta los programas de asistencia de tu estado en el Módulo D.');
  }

  let tier: ReadinessTier = 'needs_prep';
  let title = 'Necesitas comenzar a prepararte';
  let badge = 'Fase de Preparación Inicial';
  let summary = 'Tienes la meta en mente, pero aún faltan pilares esenciales como optimizar tu historial crediticio, acumular reservas o definir tu presupuesto real.';

  if (score >= 8) {
    tier = 'ready_to_explore';
    title = 'Estás listo para comenzar a explorar opciones con profesionales';
    badge = 'Fase Avanzada de Exploración';
    summary = 'Cuentas con las bases clave (ahorros, comprensión de tu crédito y presupuesto). Es el momento de comparar opciones con prestamistas y agentes certificados.';
  } else if (score >= 4) {
    tier = 'in_progress';
    title = 'Estás avanzando, pero todavía tienes tareas pendientes';
    badge = 'Fase de Fortalecimiento';
    summary = 'Vas por buen camino y tienes varios puntos a favor, pero necesitas consolidar ahorros adicionales o afinar números antes de comprometerte con una oferta.';
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
