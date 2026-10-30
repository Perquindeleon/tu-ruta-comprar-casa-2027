import { ChecklistItem } from '../types';

export interface ChecklistStage {
  id: 'etapa1' | 'etapa2' | 'etapa3' | 'etapa4';
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  items: ChecklistItem[];
}

export const CHECKLIST_STAGES: ChecklistStage[] = [
  {
    id: 'etapa1',
    title: 'Etapa 1: Antes de Buscar Casa',
    titleEn: 'Stage 1: Before House Hunting',
    subtitle: 'Fundamentos financieros, crédito y capacidad de ahorro previa.',
    subtitleEn: 'Financial foundations, credit readiness, and prior savings capacity.',
    items: [
      { id: 'e1-1', category: 'etapa1', text: 'Revisar los reportes de crédito en AnnualCreditReport.com.', textEn: 'Review your credit reports at AnnualCreditReport.com.' },
      { id: 'e1-2', category: 'etapa1', text: 'Corregir posibles errores e inconsistencias en los reportes crediticios.', textEn: 'Dispute and fix any errors or inconsistencies on your credit reports.' },
      { id: 'e1-3', category: 'etapa1', text: 'Revisar las deudas existentes y reducir la relación deuda-ingreso (DTI).', textEn: 'Review existing debts and lower your debt-to-income (DTI) ratio.' },
      { id: 'e1-4', category: 'etapa1', text: 'Calcular el presupuesto mensual máximo y pago cómodo de vivienda.', textEn: 'Calculate your maximum monthly budget and comfortable housing payment.' },
      { id: 'e1-5', category: 'etapa1', text: 'Determinar cuánto dinero puedo ahorrar sistemáticamente cada mes.', textEn: 'Determine how much money you can systematically save each month.' },
      { id: 'e1-6', category: 'etapa1', text: 'Separar el dinero para el pronto (down payment) en una cuenta segura.', textEn: 'Set aside your down payment funds in a dedicated, safe account.' },
      { id: 'e1-7', category: 'etapa1', text: 'Preparar fondos para los costos de cierre (2% al 5% estimado).', textEn: 'Prepare funds for closing costs (estimated 2% to 5%).' },
      { id: 'e1-8', category: 'etapa1', text: 'Reservar dinero intocable para emergencias y gastos posteriores al cierre.', textEn: 'Set aside an untouchable emergency fund for post-closing expenses.' },
      { id: 'e1-9', category: 'etapa1', text: 'Investigar programas de asistencia para compradores y DPA aplicables.', textEn: 'Research applicable homebuyer and down payment assistance (DPA) programs.' },
      { id: 'e1-10', category: 'etapa1', text: 'Comparar opciones de préstamos (Convencional, FHA, VA, USDA).', textEn: 'Compare loan options (Conventional, FHA, VA, USDA).' },
      { id: 'e1-11', category: 'etapa1', text: 'Consultar al menos 3 diferentes prestamistas hipotecarios.', textEn: 'Consult with at least 3 different mortgage lenders.' },
    ]
  },
  {
    id: 'etapa2',
    title: 'Etapa 2: Antes de Hacer una Oferta',
    titleEn: 'Stage 2: Before Making an Offer',
    subtitle: 'Evaluación del inmueble, costos ocultos, entorno y condiciones del contrato.',
    subtitleEn: 'Property evaluation, hidden costs, neighborhood, and contract terms.',
    items: [
      { id: 'e2-1', category: 'etapa2', text: 'Investigar el vecindario en diferentes horarios y días de la semana.', textEn: 'Visit and research the neighborhood at different times and days of the week.' },
      { id: 'e2-2', category: 'etapa2', text: 'Revisar ventas comparables recientes en la misma zona.', textEn: 'Review recent comparable home sales (comps) in the same area.' },
      { id: 'e2-3', category: 'etapa2', text: 'Investigar los impuestos de propiedad reales del condado y su tendencia.', textEn: 'Research actual county property taxes and reassessment rules.' },
      { id: 'e2-4', category: 'etapa2', text: 'Solicitar cotizaciones preliminares de seguro de vivienda para la propiedad.', textEn: 'Request preliminary homeowners insurance quotes for the property.' },
      { id: 'e2-5', category: 'etapa2', text: 'Revisar costos mensuales, cuotas extraordinarias y reglas estrictas de la HOA.', textEn: 'Review monthly HOA dues, special assessments, and community rules.' },
      { id: 'e2-6', category: 'etapa2', text: 'Investigar la antigüedad y condiciones aparentes del techo.', textEn: 'Verify the age and visible condition of the roof.' },
      { id: 'e2-7', category: 'etapa2', text: 'Revisar la edad, mantenimiento y tipo de sistema HVAC (aire y calefacción).', textEn: 'Check the age, maintenance, and type of HVAC system (heating & cooling).' },
      { id: 'e2-8', category: 'etapa2', text: 'Evaluar problemas de drenaje, humedad o riesgo en mapas de inundación (FEMA).', textEn: 'Evaluate drainage, moisture issues, or FEMA flood zone risk.' },
      { id: 'e2-9', category: 'etapa2', text: 'Comprender a fondo cada cláusula del contrato de compraventa.', textEn: 'Thoroughly understand every clause of the purchase agreement.' },
      { id: 'e2-10', category: 'etapa2', text: 'Revisar las contingencias obligatorias (inspección, tasación, financiamiento).', textEn: 'Verify protective contingencies (inspection, appraisal, financing).' },
    ]
  },
  {
    id: 'etapa3',
    title: 'Etapa 3: Después de Aceptar una Oferta',
    titleEn: 'Stage 3: After Your Offer is Accepted',
    subtitle: 'Debida diligencia, inspección técnica, tasación y verificación documental.',
    subtitleEn: 'Due diligence, independent inspection, appraisal, and document verification.',
    items: [
      { id: 'e3-1', category: 'etapa3', text: 'Contratar a un inspector de viviendas profesional e independiente.', textEn: 'Hire a licensed, independent professional home inspector.' },
      { id: 'e3-2', category: 'etapa3', text: 'Asistir personalmente a la inspección para hacer preguntas directas.', textEn: 'Attend the home inspection in person to ask direct questions.' },
      { id: 'e3-3', category: 'etapa3', text: 'Revisar detalladamente el informe completo de inspección.', textEn: 'Carefully review the full written inspection report.' },
      { id: 'e3-4', category: 'etapa3', text: 'Evaluar reparaciones estructurales o de seguridad que sean críticas.', textEn: 'Evaluate critical structural, safety, or mechanical repairs.' },
      { id: 'e3-5', category: 'etapa3', text: 'Revisar el informe de tasación (appraisal) para confirmar el valor acordado.', textEn: 'Review the bank appraisal report to confirm the property value.' },
      { id: 'e3-6', category: 'etapa3', text: 'Comparar el Loan Estimate inicial con las condiciones aprobadas.', textEn: 'Compare the official Loan Estimate with your approved loan terms.' },
      { id: 'e3-7', category: 'etapa3', text: 'Negociar reparaciones o créditos con el vendedor cuando corresponda.', textEn: 'Negotiate seller repairs or closing cost credits when appropriate.' },
      { id: 'e3-8', category: 'etapa3', text: 'Confirmar el cumplimiento de todas las condiciones impuestas por el banco.', textEn: 'Satisfy all underwriting conditions requested by your lender.' },
      { id: 'e3-9', category: 'etapa3', text: 'Revisar los estatutos, reservas financieras y actas de la HOA.', textEn: 'Review HOA bylaws, financial reserves, and meeting minutes.' },
    ]
  },
  {
    id: 'etapa4',
    title: 'Etapa 4: Antes del Cierre',
    titleEn: 'Stage 4: Before Closing',
    subtitle: 'Revisión final de números, transferencias seguras e inspección de entrega.',
    subtitleEn: 'Final number verification, wire fraud prevention, and final walk-through.',
    items: [
      { id: 'e4-1', category: 'etapa4', text: 'Revisar minuciosamente el Closing Disclosure al menos 3 días antes del cierre.', textEn: 'Carefully review the Closing Disclosure at least 3 business days before closing.' },
      { id: 'e4-2', category: 'etapa4', text: 'Comparar detalladamente las cifras del Closing Disclosure con el Loan Estimate.', textEn: 'Compare the Closing Disclosure figures line-by-line with your Loan Estimate.' },
      { id: 'e4-3', category: 'etapa4', text: 'Confirmar el monto exacto de efectivo necesario para cerrar (Cash to Close).', textEn: 'Confirm the exact Cash to Close amount required for closing day.' },
      { id: 'e4-4', category: 'etapa4', text: 'Verificar que todos los créditos acordados con el vendedor estén acreditados.', textEn: 'Verify that all agreed seller credits and earnest money are properly credited.' },
      { id: 'e4-5', category: 'etapa4', text: 'Realizar el recorrido final de la vivienda (Final Walk-Through) horas antes.', textEn: 'Perform the Final Walk-Through of the property prior to signing.' },
      { id: 'e4-6', category: 'etapa4', text: 'Confirmar las instrucciones de transferencia por teléfono con la compañía de títulos (prevención de fraude).', textEn: 'Verify wire transfer instructions by phone directly with the title company (fraud prevention).' },
      { id: 'e4-7', category: 'etapa4', text: 'Evitar contraer nuevas deudas, compras grandes o cambiar de trabajo antes de cerrar.', textEn: 'Avoid opening new credit, making big purchases, or changing jobs before closing.' },
      { id: 'e4-8', category: 'etapa4', text: 'Confirmar que todos los nombres y documentos finales estén libres de errores.', textEn: 'Confirm that all names and final closing documents are accurate.' },
    ]
  }
];

export const TOTAL_CHECKLIST_COUNT = CHECKLIST_STAGES.reduce(
  (acc, stage) => acc + stage.items.length, 
  0
);
