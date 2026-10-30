import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  CalculatorInputs, 
  CalculatorOutputs, 
  DiagnosticAnswers, 
  DiagnosticResult, 
  Language, 
  RateComparisonScenario 
} from '../types';
import { CHECKLIST_STAGES } from '../data/checklistData';
import { getAppConfig, US_STATES } from '../data/config';
import { formatCurrency, formatPercent } from './calculator';

export interface GeneratePdfOptions {
  includeFinancials?: boolean;
  lang?: Language;
}

export function generatePlanPdf(
  diagnosticAnswers: DiagnosticAnswers,
  diagnosticResult: DiagnosticResult,
  calculatorInputs: CalculatorInputs,
  calculatorOutputs: CalculatorOutputs,
  rateScenarios: RateComparisonScenario[],
  completedChecklistIds: string[],
  options: GeneratePdfOptions = { includeFinancials: true, lang: 'es' }
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter' // 612 x 792 pt
  });

  const isEn = options.lang === 'en';
  const appConfig = getAppConfig(isEn ? 'en' : 'es');
  const includeFin = options.includeFinancials !== false;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);

  // Brand colors in RGB
  const navyColor: [number, number, number] = [16, 44, 70];       // #102C46
  const greenColor: [number, number, number] = [43, 122, 85];     // #2B7A55
  const lightGreenColor: [number, number, number] = [199, 231, 164]; // #C7E7A4
  const goldColor: [number, number, number] = [213, 173, 87];     // #D5AD57
  const slateDark: [number, number, number] = [30, 41, 59];
  const slateMuted: [number, number, number] = [100, 116, 139];

  let currentY = margin;

  const checkAddPage = (requiredSpace: number) => {
    if (currentY + requiredSpace > pageHeight - margin - 30) {
      doc.addPage();
      currentY = margin;
      drawHeaderBanner();
    }
  };

  const drawHeaderBanner = () => {
    doc.setFillColor(navyColor[0], navyColor[1], navyColor[2]);
    doc.rect(margin, currentY, contentWidth, 38, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(
      isEn
        ? 'PERQUIN DE LEÓN  |  YOUR ROADMAP TO BUYING A HOME IN 2027'
        : 'PERQUIN DE LEÓN  |  TU RUTA PARA COMPRAR CASA EN 2027',
      margin + 12,
      currentY + 23
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(lightGreenColor[0], lightGreenColor[1], lightGreenColor[2]);
    doc.text(
      isEn ? 'Independent Financial Education' : 'Educación Financiera Independiente',
      pageWidth - margin - 12,
      currentY + 23,
      { align: 'right' }
    );

    currentY += 50;
  };

  // --- PAGE 1: COVER & HEADER ---
  drawHeaderBanner();

  // Main Title
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(
    isEn ? 'My Personalized Homebuying Plan' : 'Mi Plan Personalizado para Comprar Casa',
    margin,
    currentY
  );
  currentY += 22;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.text(`"${appConfig.slogan}"`, margin, currentY);
  currentY += 24;

  // Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 54, 4, 4, 'FD');

  const now = new Date();
  const dateFormatted = isEn
    ? `${now.toLocaleString('en-US', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()}`
    : `${now.getDate()} de ${now.toLocaleString('es-ES', { month: 'long' })} de ${now.getFullYear()}`;

  const stateName = US_STATES.find(s => s.code === diagnosticAnswers.state)?.name || diagnosticAnswers.state || (isEn ? 'Not specified' : 'No especificado');
  const timeframeLabel = diagnosticAnswers.timeframe ? (isEn ? {
    '3_months': 'Next 3 months',
    '6_months': 'In 6 months',
    '12_months': 'In 12 months',
    '2027_or_later': 'In 2027 or later',
    'exploring': 'Exploring options'
  } : {
    '3_months': 'Próximos 3 meses',
    '6_months': 'En 6 meses',
    '12_months': 'En 12 meses',
    '2027_or_later': 'En 2027 o después',
    'exploring': 'Explorando opciones'
  })[diagnosticAnswers.timeframe] : (isEn ? 'Not specified' : 'No indicado');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(isEn ? 'Issue Date:' : 'Fecha de emisión:', margin + 14, currentY + 20);
  doc.text(isEn ? 'Target Timeline:' : 'Plazo objetivo:', margin + 14, currentY + 38);

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(dateFormatted, margin + 105, currentY + 20);
  doc.text(timeframeLabel, margin + 105, currentY + 38);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(isEn ? 'Jurisdiction:' : 'Jurisdicción:', margin + 310, currentY + 20);
  doc.text(isEn ? 'Report Mode:' : 'Modalidad de informe:', margin + 310, currentY + 38);

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(stateName, margin + 385, currentY + 20);
  doc.text(
    includeFin
      ? (isEn ? 'Full with calculations' : 'Completo con cálculos')
      : (isEn ? 'Educational (Figures hidden)' : 'Educativo (Cifras reservadas)'),
    margin + 415,
    currentY + 38
  );

  currentY += 70;

  // --- SECTION 1: DIAGNÓSTICO DEL COMPRADOR ---
  doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.rect(margin, currentY, 4, 18, 'F');

  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isEn ? '1. Homebuyer Readiness Assessment' : '1. Diagnóstico de Preparación del Comprador',
    margin + 12,
    currentY + 14
  );
  currentY += 28;

  // Outcome Badge & Tier
  doc.setFillColor(241, 249, 236);
  doc.setDrawColor(lightGreenColor[0], lightGreenColor[1], lightGreenColor[2]);
  doc.roundedRect(margin, currentY, contentWidth, 58, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.text(diagnosticResult.badge.toUpperCase(), margin + 14, currentY + 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text(diagnosticResult.title, margin + 14, currentY + 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(diagnosticResult.summary, margin + 14, currentY + 48, { maxWidth: contentWidth - 28 });

  currentY += 72;

  // Key reasons & recommendations in autoTable
  const diagTableBody = [
    [
      isEn ? 'Assessment Findings:' : 'Hallazgos de tu diagnóstico:',
      diagnosticResult.reasons.length > 0 
        ? diagnosticResult.reasons.map(r => `• ${r}`).join('\n')
        : (isEn ? '• Complete the questionnaire for a deeper analysis.' : '• Se requiere completar el cuestionario para un análisis más profundo.')
    ],
    [
      isEn ? 'Key Recommendations:' : 'Recomendaciones clave:',
      diagnosticResult.recommendations.map(r => `• ${r}`).join('\n')
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    headStyles: { fillColor: navyColor, textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: slateDark, fontSize: 8.5, cellPadding: 6 },
    columnStyles: {
      0: { cellWidth: 140, fontStyle: 'bold', fillColor: [248, 250, 252] },
      1: { cellWidth: contentWidth - 140 }
    },
    body: diagTableBody
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  // --- SECTION 2: CALCULADORA DE COSTO REAL ---
  checkAddPage(220);

  doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.rect(margin, currentY, 4, 18, 'F');

  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isEn ? '2. True Home Cost Analysis' : '2. Análisis del Costo Real de la Vivienda',
    margin + 12,
    currentY + 14
  );
  currentY += 26;

  if (includeFin) {
    const calcRows = isEn ? [
      ['Estimated Purchase Price', formatCurrency(calculatorInputs.purchasePrice), 'Annual Interest Rate', `${calculatorInputs.annualInterestRate.toFixed(2)}% (Fixed)`],
      ['Down Payment', `${formatCurrency(calculatorOutputs.downPaymentAmount)} (${formatPercent(calculatorOutputs.downPaymentPercentActual)})`, 'Loan Term', `${calculatorInputs.loanTermYears} years (${calculatorInputs.loanTermYears * 12} mos)`],
      ['Financed Loan Amount', formatCurrency(calculatorOutputs.loanAmount), 'Monthly Principal & Interest (P&I)', formatCurrency(calculatorOutputs.monthlyPrincipalAndInterest)],
      ['Monthly Property Taxes', formatCurrency(calculatorOutputs.monthlyPropertyTax), 'Monthly Homeowners Insurance', formatCurrency(calculatorOutputs.monthlyHomeInsurance)],
      ['Mortgage Insurance (PMI/MIP)', formatCurrency(calculatorOutputs.monthlyPMI), 'Monthly HOA Fee', formatCurrency(calculatorOutputs.monthlyHOA)],
      ['Flood Insurance / Other', formatCurrency(calculatorOutputs.monthlyFloodInsurance + calculatorOutputs.monthlyOtherExpenses), 'Estimated Total Monthly Payment', formatCurrency(calculatorOutputs.monthlyTotalPayment)],
    ] : [
      ['Precio de compra estimado', formatCurrency(calculatorInputs.purchasePrice), 'Tasa anual utilizada', `${calculatorInputs.annualInterestRate.toFixed(2)}% (Fija)`],
      ['Pronto (Down Payment)', `${formatCurrency(calculatorOutputs.downPaymentAmount)} (${formatPercent(calculatorOutputs.downPaymentPercentActual)})`, 'Plazo de la hipoteca', `${calculatorInputs.loanTermYears} años (${calculatorInputs.loanTermYears * 12} meses)`],
      ['Monto financiado (Préstamo)', formatCurrency(calculatorOutputs.loanAmount), 'Capital e Interés mensual (P&I)', formatCurrency(calculatorOutputs.monthlyPrincipalAndInterest)],
      ['Impuestos de propiedad mensuales', formatCurrency(calculatorOutputs.monthlyPropertyTax), 'Seguro de vivienda mensual', formatCurrency(calculatorOutputs.monthlyHomeInsurance)],
      ['Seguro hipotecario (PMI/MIP)', formatCurrency(calculatorOutputs.monthlyPMI), 'Cuota mensual de HOA', formatCurrency(calculatorOutputs.monthlyHOA)],
      ['Seguro de inundación / Otros', formatCurrency(calculatorOutputs.monthlyFloodInsurance + calculatorOutputs.monthlyOtherExpenses), 'Pago Mensual Total Estimado (PITI+)', formatCurrency(calculatorOutputs.monthlyTotalPayment)],
    ];

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'striped',
      head: [isEn
        ? ['Mortgage Item', 'Estimated Amount', 'Loan Detail', 'Value']
        : ['Concepto Hipotecario', 'Monto Estimado', 'Detalle del Préstamo', 'Valor']
      ],
      headStyles: { fillColor: navyColor, textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
      bodyStyles: { textColor: slateDark, fontSize: 8.5, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 160 },
        1: { cellWidth: 100, fontStyle: 'bold' },
        2: { cellWidth: 160 },
        3: { cellWidth: contentWidth - 420, fontStyle: 'bold', textColor: greenColor }
      },
      body: calcRows
    });

    currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 18;

    // Upfront Cash breakdown table
    checkAddPage(140);

    const upfrontRows = isEn ? [
      ['Down Payment', formatCurrency(calculatorOutputs.downPaymentAmount), 'Upfront equity contribution'],
      ['Estimated Closing Costs', formatCurrency(calculatorOutputs.estimatedClosingCosts), 'Origination, title, appraisal, escrow prepaids (2-5% ref.)'],
      ['Independent Home Inspection', formatCurrency(calculatorInputs.inspectionCost), 'Structural & safety evaluation hired by you'],
      ['Bank Appraisal', formatCurrency(calculatorInputs.appraisalCost), 'Required by lender to confirm market value'],
      ['Moving & Initial Repairs', formatCurrency(calculatorInputs.movingCost + calculatorInputs.initialRepairsCost), 'Relocation and immediate move-in improvements'],
      ['Emergency Reserve Fund', formatCurrency(calculatorInputs.emergencyReserveCost), 'Post-purchase peace-of-mind cushion (untouchable)'],
      ['TOTAL INITIAL CASH NEEDED', formatCurrency(calculatorOutputs.totalCashNeeded), 'Recommended total savings to close without financial stress']
    ] : [
      ['Pronto (Down Payment)', formatCurrency(calculatorOutputs.downPaymentAmount), 'Efectivo para el patrimonio inicial'],
      ['Costos de Cierre Estimados', formatCurrency(calculatorOutputs.estimatedClosingCosts), 'Originación, títulos, tasación bancaria, depósito en escrow (2-5% ref.)'],
      ['Inspección técnica independiente', formatCurrency(calculatorInputs.inspectionCost), 'Evaluación de seguridad y estructura contratada por ti'],
      ['Tasación bancaria (Appraisal)', formatCurrency(calculatorInputs.appraisalCost), 'Requerida por el prestamista'],
      ['Mudanza y reparaciones iniciales', formatCurrency(calculatorInputs.movingCost + calculatorInputs.initialRepairsCost), 'Traslado y arreglos inmediatos antes de habitar'],
      ['Fondo de reserva para emergencias', formatCurrency(calculatorInputs.emergencyReserveCost), 'Colchón de tranquilidad post-compra (intocable)'],
      ['TOTAL EFECTIVO INICIAL NECESARIO', formatCurrency(calculatorOutputs.totalCashNeeded), 'Ahorro total recomendado para cerrar sin estrés financiero']
    ];

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [isEn
        ? ['Upfront Cash Item', 'Estimated Amount', 'Purpose & Consideration']
        : ['Concepto de Desembolso Inicial', 'Monto Estimado', 'Propósito y Consideración']
      ],
      headStyles: { fillColor: [43, 122, 85], textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
      bodyStyles: { textColor: slateDark, fontSize: 8, cellPadding: 4.5 },
      columnStyles: {
        0: { cellWidth: 180, fontStyle: 'bold' },
        1: { cellWidth: 90, fontStyle: 'bold' },
        2: { cellWidth: contentWidth - 270 }
      },
      didParseCell: (data) => {
        if (data.row.index === upfrontRows.length - 1) {
          data.cell.styles.fillColor = [241, 249, 236];
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [16, 44, 70];
        }
      },
      body: upfrontRows
    });

    currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;
  } else {
    // Redacted message
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, currentY, contentWidth, 45, 4, 4, 'FD');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(
      isEn
        ? 'Privacy Note: Personal numerical financial figures have been excluded at the user’s request for this version of the document. Use the online calculator for interactive simulations.'
        : 'Nota de Privacidad: Las cifras financieras numéricas han sido reservadas a petición del usuario para esta versión del documento. Utiliza la calculadora en línea para consultar las simulaciones interactivas.',
      margin + 14,
      currentY + 24,
      { maxWidth: contentWidth - 28 }
    );
    currentY += 60;
  }

  // --- SECTION 3: COMPARACIÓN DE TASAS ---
  if (includeFin && rateScenarios.length > 0) {
    checkAddPage(150);

    doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
    doc.rect(margin, currentY, 4, 18, 'F');

    doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(
      isEn ? '3. Interest Rate Sensitivity Comparison' : '3. Sensibilidad y Comparación de Tasas de Interés',
      margin + 12,
      currentY + 14
    );
    currentY += 24;

    const rateRows = rateScenarios.map((sc, idx) => [
      isEn ? `Scenario ${idx + 1} (${sc.rate.toFixed(2)}%)` : sc.name,
      formatCurrency(sc.monthlyPayment),
      sc.monthlyDifferenceVsBase === 0 ? 'Base' : `+${formatCurrency(sc.monthlyDifferenceVsBase)} / ${isEn ? 'mo' : 'mes'}`,
      sc.annualDifferenceVsBase === 0 ? 'Base' : `+${formatCurrency(sc.annualDifferenceVsBase)} / ${isEn ? 'yr' : 'año'}`,
      sc.lifetimeDifferenceVsBase === 0 ? 'Base' : `+${formatCurrency(sc.lifetimeDifferenceVsBase)} (${isEn ? 'Full term' : 'Plazo total'})`,
      formatCurrency(sc.totalInterestPaid)
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [isEn
        ? ['Rate Scenario', 'Monthly P&I', 'Monthly Diff.', 'Annual Diff.', 'Term Diff.', 'Total Interest Paid']
        : ['Escenario de Tasa', 'Pago Mensual P&I', 'Dif. Mensual', 'Dif. Anual', 'Dif. Durante el Plazo', 'Interés Total Pagado']
      ],
      headStyles: { fillColor: navyColor, textColor: 255, fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { textColor: slateDark, fontSize: 8, cellPadding: 4.5 },
      body: rateRows
    });

    currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(
      isEn
        ? '* Illustrative simulations for educational purposes. Check the official weekly Freddie Mac PMMS benchmark (freddiemac.com/pmms).'
        : '* Valores simulados con fines pedagógicos. Consulta el indicador semanal oficial Freddie Mac PMMS (freddiemac.com/pmms).',
      margin,
      currentY
    );
    currentY += 24;
  }

  // --- SECTION 4: CHECKLIST STATUS ---
  checkAddPage(200);

  doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.rect(margin, currentY, 4, 18, 'F');

  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isEn ? '4. Homebuyer Preparation Checklist Status' : '4. Estado de tu Checklist de Preparación',
    margin + 12,
    currentY + 14
  );
  currentY += 24;

  const checklistRows: string[][] = [];
  const completedLabel = isEn ? '[X] COMPLETED' : '[X] COMPLETADA';
  const pendingLabel = isEn ? '[  ] PENDING' : '[  ] PENDIENTE';

  CHECKLIST_STAGES.forEach(stage => {
    const stageShort = (isEn ? stage.titleEn : stage.title).split(':')[0];
    stage.items.forEach(item => {
      const isDone = completedChecklistIds.includes(item.id);
      checklistRows.push([
        isDone ? completedLabel : pendingLabel,
        stageShort,
        isEn && item.textEn ? item.textEn : item.text
      ]);
    });
  });

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    head: [isEn
      ? ['Status', 'Stage', 'Preparation Task']
      : ['Estado', 'Etapa', 'Tarea de Preparación']
    ],
    headStyles: { fillColor: navyColor, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { textColor: slateDark, fontSize: 7.5, cellPadding: 3.5 },
    columnStyles: {
      0: { cellWidth: 95, fontStyle: 'bold' },
      1: { cellWidth: 70 },
      2: { cellWidth: contentWidth - 165 }
    },
    didParseCell: (data) => {
      if (data.column.index === 0) {
        if (data.cell.raw === completedLabel) {
          data.cell.styles.textColor = [43, 122, 85];
        } else {
          data.cell.styles.textColor = [160, 100, 20];
        }
      }
    },
    body: checklistRows
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  // --- SECTION 5: PREGUNTAS CLAVE PARA PROFESIONALES ---
  checkAddPage(220);

  doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.rect(margin, currentY, 4, 18, 'F');

  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isEn ? '5. Essential Questions for Your Professional Team' : '5. Preguntas Imprescindibles para tu Equipo Profesional',
    margin + 12,
    currentY + 14
  );
  currentY += 24;

  const proQuestions = isEn ? [
    [
      'Mortgage Lender',
      '1. What is the true Annual Percentage Rate (APR) and what origination charges apply?\n2. Is the interest rate formally locked, and for how many days without extension fees?\n3. Which loan programs (Conventional, FHA, DPA assistance) best fit my monthly budget?'
    ],
    [
      'Real Estate Agent (Realtor)',
      '1. What were the actual closed sale prices (not list prices) of comparable homes in the last 90 days?\n2. In this neighborhood, is it realistic to negotiate seller credits toward closing costs?\n3. Which contingencies will protect my deposit if the appraisal comes in low or the inspection reveals major defects?'
    ],
    [
      'Independent Home Inspector',
      '1. How many years of remaining useful life do the roof and HVAC system have?\n2. Do you see signs of moisture intrusion, past leaks, or foundation issues?\n3. If you were buying this home for your own family, which repairs would you require before closing?'
    ]
  ] : [
    [
      'Prestamista Hipotecario (Lender)',
      '1. ¿Cuál es la Tasa Anual Efectiva (APR) real y qué cargos de originación aplican?\n2. ¿La tasa está bloqueada formalmente y por cuántos días sin costo adicional?\n3. ¿Qué opciones de préstamos (Convencional, FHA, Asistencia DPA) se adaptan mejor a mi presupuesto mensual?'
    ],
    [
      'Agente Inmobiliario (Realtor)',
      '1. ¿Cuáles han sido los precios reales de venta (no listados) de casas comparables en los últimos 90 días?\n2. ¿En este vecindario es factible negociar créditos del vendedor para gastos de cierre?\n3. ¿Cuáles son las contingencias que me mantendrán protegido si la tasación sale baja o la inspección revela problemas graves?'
    ],
    [
      'Inspector Técnico de Vivienda',
      '1. ¿Cuántos años de vida útil estimada le quedan al techo y al sistema HVAC?\n2. ¿Observa signos de intrusión de humedad, filtraciones pasadas o problemas de cimientos?\n3. Si usted fuera a comprar esta casa para su familia, ¿qué reparación exigiría solucionar antes de firmar?'
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    head: [isEn
      ? ['Specialist', 'Questions You Should Ask']
      : ['Especialista', 'Preguntas que Debes Hacer']
    ],
    headStyles: { fillColor: [16, 44, 70], textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { textColor: slateDark, fontSize: 8, cellPadding: 6 },
    columnStyles: {
      0: { cellWidth: 140, fontStyle: 'bold', fillColor: [248, 250, 252] },
      1: { cellWidth: contentWidth - 140 }
    },
    body: proQuestions
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  // --- SECTION 6: ENLACES OFICIALES Y AVISO LEGAL ---
  checkAddPage(180);

  doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
  doc.rect(margin, currentY, 4, 18, 'F');

  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(
    isEn ? '6. Official Resources & Legal Disclaimers' : '6. Enlaces Oficiales y Advertencias Legales',
    margin + 12,
    currentY + 14
  );
  currentY += 24;

  const linksData = isEn ? [
    ['HUD (Housing & Counseling)', 'https://www.hud.gov/states', 'Directory of state housing programs and HUD-approved counselors.'],
    ['CFPB (Owning a Home)', 'https://www.consumerfinance.gov/owning-a-home/', 'Official educational tools and Loan Estimate guides.'],
    ['Fannie Mae (HomeView)', 'https://yourhome.fanniemae.com/', 'Free homebuyer courses and 3% down payment programs.'],
    ['Freddie Mac (PMMS)', 'https://www.freddiemac.com/pmms', 'Official weekly benchmark for U.S. mortgage interest rates.'],
    ['VA Home Loans', 'https://www.va.gov/housing-assistance/home-loans/', 'Official mortgage benefits for veterans and military service members.'],
    ['USDA Rural Development', 'https://www.rd.usda.gov/', '100% financing in eligible rural and suburban communities.']
  ] : [
    ['HUD (Vivienda y Asesoría)', 'https://www.hud.gov/states', 'Directorio de programas y asesores aprobados en EE.UU.'],
    ['CFPB (Guía para Comprar Casa)', 'https://www.consumerfinance.gov/owning-a-home/', 'Herramientas educativas oficiales y análisis de Loan Estimate.'],
    ['Fannie Mae (HomeView)', 'https://yourhome.fanniemae.com/', 'Cursos gratuitos y programas de pronto al 3%.'],
    ['Freddie Mac (PMMS)', 'https://www.freddiemac.com/pmms', 'Indicador oficial semanal del promedio de tasas hipotecarias.'],
    ['VA Home Loans', 'https://www.va.gov/housing-assistance/home-loans/', 'Beneficios hipotecarios oficiales para militares y veteranos.'],
    ['USDA Rural Development', 'https://www.rd.usda.gov/', 'Financiamiento del 100% en áreas rurales y suburbanas elegibles.']
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    head: [isEn
      ? ['Official Agency', 'Official Website Link', 'Resource Description']
      : ['Organismo Oficial', 'Enlace Web Oficial', 'Descripción del Recurso']
    ],
    headStyles: { fillColor: navyColor, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { textColor: slateDark, fontSize: 7.5, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 120, fontStyle: 'bold' },
      1: { cellWidth: 180, textColor: [43, 122, 85] },
      2: { cellWidth: contentWidth - 300 }
    },
    body: linksData
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 16;

  // Legal Disclaimer Box
  doc.setFillColor(254, 252, 232); // light yellow/gold
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.roundedRect(margin, currentY, contentWidth, 54, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text(isEn ? 'IMPORTANT NOTICE AND LIMITATIONS:' : 'AVISO IMPORTANTE Y LIMITACIONES:', margin + 12, currentY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(
    isEn
      ? `${appConfig.disclaimer} Document generated automatically for strictly educational purposes. Perquin de León does not act as a mortgage lender or broker.`
      : `${appConfig.disclaimer} Documento generado automáticamente para fines exclusivamente educativos. Perquin de León no actúa como prestamista ni intermediario hipotecario.`,
    margin + 12,
    currentY + 26,
    { maxWidth: contentWidth - 24 }
  );

  // --- FOOTER AND PAGE NUMBERING FOR ALL PAGES ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Bottom rule
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 32, pageWidth - margin, pageHeight - 32);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(
      `Perquin de León  |  ${appConfig.appName}  |  fb: perquindeleon  |  tt: @perquindeleon`,
      margin,
      pageHeight - 20
    );

    doc.text(
      isEn ? `Page ${i} of ${totalPages}` : `Página ${i} de ${totalPages}`,
      pageWidth - margin,
      pageHeight - 20,
      { align: 'right' }
    );
  }

  return doc;
}
