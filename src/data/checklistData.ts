import { ChecklistItem } from '../types';

export interface ChecklistStage {
  id: 'etapa1' | 'etapa2' | 'etapa3' | 'etapa4';
  title: string;
  subtitle: string;
  items: ChecklistItem[];
}

export const CHECKLIST_STAGES: ChecklistStage[] = [
  {
    id: 'etapa1',
    title: 'Etapa 1: Antes de Buscar Casa',
    subtitle: 'Fundamentos financieros, crédito y capacidad de ahorro previa.',
    items: [
      { id: 'e1-1', category: 'etapa1', text: 'Revisar los reportes de crédito en AnnualCreditReport.com.' },
      { id: 'e1-2', category: 'etapa1', text: 'Corregir posibles errores e inconsistencias en los reportes crediticios.' },
      { id: 'e1-3', category: 'etapa1', text: 'Revisar las deudas existentes y reducir la relación deuda-ingreso (DTI).' },
      { id: 'e1-4', category: 'etapa1', text: 'Calcular el presupuesto mensual máximo y pago cómodo de vivienda.' },
      { id: 'e1-5', category: 'etapa1', text: 'Determinar cuánto dinero puedo ahorrar sistemáticamente cada mes.' },
      { id: 'e1-6', category: 'etapa1', text: 'Separar el dinero para el pronto (down payment) en una cuenta segura.' },
      { id: 'e1-7', category: 'etapa1', text: 'Preparar fondos para los costos de cierre (2% al 5% estimado).' },
      { id: 'e1-8', category: 'etapa1', text: 'Reservar dinero intocable para emergencias y gastos posteriores al cierre.' },
      { id: 'e1-9', category: 'etapa1', text: 'Investigar programas de asistencia para compradores y DPA aplicables.' },
      { id: 'e1-10', category: 'etapa1', text: 'Comparar opciones de préstamos (Convencional, FHA, VA, USDA).' },
      { id: 'e1-11', category: 'etapa1', text: 'Consultar al menos 3 diferentes prestamistas hipotecarios.' },
    ]
  },
  {
    id: 'etapa2',
    title: 'Etapa 2: Antes de Hacer una Oferta',
    subtitle: 'Evaluación del inmueble, costos ocultos, entorno y condiciones del contrato.',
    items: [
      { id: 'e2-1', category: 'etapa2', text: 'Investigar el vecindario en diferentes horarios y días de la semana.' },
      { id: 'e2-2', category: 'etapa2', text: 'Revisar ventas comparables recientes en la misma zona.' },
      { id: 'e2-3', category: 'etapa2', text: 'Investigar los impuestos de propiedad reales del condado y su tendencia.' },
      { id: 'e2-4', category: 'etapa2', text: 'Solicitar cotizaciones preliminares de seguro de vivienda para la propiedad.' },
      { id: 'e2-5', category: 'etapa2', text: 'Revisar costos mensuales, cuotas extraordinarias y reglas estrictas de la HOA.' },
      { id: 'e2-6', category: 'etapa2', text: 'Investigar la antigüedad y condiciones aparentes del techo.' },
      { id: 'e2-7', category: 'etapa2', text: 'Revisar la edad, mantenimiento y tipo de sistema HVAC (aire y calefacción).' },
      { id: 'e2-8', category: 'etapa2', text: 'Evaluar problemas de drenaje, humedad o riesgo en mapas de inundación (FEMA).' },
      { id: 'e2-9', category: 'etapa2', text: 'Comprender a fondo cada cláusula del contrato de compraventa.' },
      { id: 'e2-10', category: 'etapa2', text: 'Revisar las contingencias obligatorias (inspección, tasación, financiamiento).' },
    ]
  },
  {
    id: 'etapa3',
    title: 'Etapa 3: Después de Aceptar una Oferta',
    subtitle: 'Debida diligencia, inspección técnica, tasación y verificación documental.',
    items: [
      { id: 'e3-1', category: 'etapa3', text: 'Contratar a un inspector de viviendas profesional e independiente.' },
      { id: 'e3-2', category: 'etapa3', text: 'Asistir personalmente a la inspección para hacer preguntas directas.' },
      { id: 'e3-3', category: 'etapa3', text: 'Revisar detalladamente el informe completo de inspección.' },
      { id: 'e3-4', category: 'etapa3', text: 'Evaluar reparaciones estructurales o de seguridad que sean críticas.' },
      { id: 'e3-5', category: 'etapa3', text: 'Revisar el informe de tasación (appraisal) para confirmar el valor acordado.' },
      { id: 'e3-6', category: 'etapa3', text: 'Comparar el Loan Estimate inicial con las condiciones aprobadas.' },
      { id: 'e3-7', category: 'etapa3', text: 'Negociar reparaciones o créditos con el vendedor cuando corresponda.' },
      { id: 'e3-8', category: 'etapa3', text: 'Confirmar el cumplimiento de todas las condiciones impuestas por el banco.' },
      { id: 'e3-9', category: 'etapa3', text: 'Revisar los estatutos, reservas financieras y actas de la HOA.' },
    ]
  },
  {
    id: 'etapa4',
    title: 'Etapa 4: Antes del Cierre',
    subtitle: 'Revisión final de números, transferencias seguras e inspección de entrega.',
    items: [
      { id: 'e4-1', category: 'etapa4', text: 'Revisar minuciosamente el Closing Disclosure al menos 3 días antes del cierre.' },
      { id: 'e4-2', category: 'etapa4', text: 'Comparar detalladamente las cifras del Closing Disclosure con el Loan Estimate.' },
      { id: 'e4-3', category: 'etapa4', text: 'Confirmar el monto exacto de efectivo necesario para cerrar (Cash to Close).' },
      { id: 'e4-4', category: 'etapa4', text: 'Verificar que todos los créditos acordados con el vendedor estén acreditados.' },
      { id: 'e4-5', category: 'etapa4', text: 'Realizar el recorrido final de la vivienda (Final Walk-Through) horas antes.' },
      { id: 'e4-6', category: 'etapa4', text: 'Confirmar las instrucciones de transferencia por teléfono con la compañía de títulos (prevención de fraude).' },
      { id: 'e4-7', category: 'etapa4', text: 'Evitar contraer nuevas deudas, compras grandes o cambiar de trabajo antes de cerrar.' },
      { id: 'e4-8', category: 'etapa4', text: 'Confirmar que todos los nombres y documentos finales estén libres de errores.' },
    ]
  }
];

export const TOTAL_CHECKLIST_COUNT = CHECKLIST_STAGES.reduce(
  (acc, stage) => acc + stage.items.length, 
  0
);
