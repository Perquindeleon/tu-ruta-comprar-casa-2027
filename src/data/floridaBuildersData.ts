export interface BuilderIncentive {
  id: string;
  name: string;
  promoName: string;
  rate: string;
  rateNumeric: number;
  rateType: 'fixed' | 'buydown' | 'arm';
  structureTag: string;
  structureDesc: string;
  isBalloon: boolean;
  balloonText: string;
  closingCredits: string;
  closingNumeric: number;
  closingDetails: string;
  firstTimePerk: string;
  counties: string[];
  keyAreas: string;
  lender: string;
  contractDeadline: string;
  closingDeadline: string;
  expirationDate: string; // ISO format "YYYY-MM-DD"
  link: string;
  badge: string;
}

export const FLORIDA_BUILDERS_DATA: BuilderIncentive[] = [
  {
    id: "lennar",
    name: "Lennar",
    promoName: "Black Friday Sale & First-Time Buyer Orlando",
    rate: "4.750%",
    rateNumeric: 4.75,
    rateType: "arm",
    structureTag: "ARM 5/1 (Fija 5 Años)",
    structureDesc: "Tasa fija promocional del 4.750% (7.837% APR) durante los primeros 5 años. A partir del año 6, se ajusta anualmente según el índice SOFR con topes máximos.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Amortizado a 30 años (la cuota se ajusta en año 6, no vence el saldo).",
    closingCredits: "Hasta $20,000",
    closingNumeric: 20000,
    closingDetails: "Hasta $5,000 en Flex Credit directo más cobertura de gastos de cierre de hasta $20,000 con Lennar Mortgage",
    firstTimePerk: "Paquete Everything's Included® (refrigerador, lavadora, secadora, persianas y domótica sin costo extra)",
    counties: ["Orange", "Osceola", "Lake", "Seminole", "Polk"],
    keyAreas: "Orlando, Kissimmee, Clermont, St. Cloud, Davenport",
    lender: "Lennar Mortgage, LLC",
    contractDeadline: "Contratos firmados del 4 al 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: Antes del 31 de Diciembre de 2026 (o fecha estipulada en contrato)",
    expirationDate: "2026-11-30",
    link: "https://www.lennar.com/new-homes/florida/orlando/promo/olhlen_offer",
    badge: "Tasa 4.75% (Fija 5 Años)"
  },
  {
    id: "taylor-morrison",
    name: "Taylor Morrison",
    promoName: "Make Moves Orlando (Noviembre 2026)",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "Tasa fija garantizada del 5.50% por la totalidad de los 30 años (360 meses). Tu cuota de principal e interés jamás cambiará.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Préstamo convencional/FHA estándar a 30 años.",
    closingCredits: "Hasta $25,000",
    closingNumeric: 25000,
    closingDetails: "Hasta $25,000 en créditos flexibles aplicables a gastos de cierre o compra de puntos con Taylor Morrison Home Funding",
    firstTimePerk: "Asistencia en depósito inicial y crédito adicional para personalizar acabados en su Design Studio",
    counties: ["Orange", "Lake", "Seminole"],
    keyAreas: "Horizon West, Winter Garden, Clermont, Oviedo",
    lender: "Taylor Morrison Home Funding",
    contractDeadline: "Contratos firmados del 28 de Octubre al 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: 28 al 31 de Diciembre de 2026 (QMI) o 30 de Junio de 2027 (To-Be-Built)",
    expirationDate: "2026-11-30",
    link: "https://www.taylormorrison.com/make-moves/orlando",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "dr-horton",
    name: "D.R. Horton",
    promoName: "Orlando Metro Quick Move-In Red Tag Event",
    rate: "5.250%",
    rateNumeric: 5.25,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "Tasa fija permanente del 5.25% - 5.50% a 30 años con DHI Mortgage (FHA, VA y Convencional). El pago nunca se incrementa.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Préstamo totalmente amortizado a 30 años.",
    closingCredits: "Hasta $20,000",
    closingNumeric: 20000,
    closingDetails: "Hasta $20,000 en Flex Cash para gastos de cierre o reducción permanente de tasa",
    firstTimePerk: "El mayor inventario de entrada en Osceola y Polk; depósito mínimo FHA del 3.5% financiable",
    counties: ["Osceola", "Orange", "Polk", "Lake"],
    keyAreas: "Kissimmee, St. Cloud, Davenport, Haines City, Deltona",
    lender: "DHI Mortgage",
    contractDeadline: "Contratos firmados durante Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: Debe cerrar dentro de 30 a 45 días (antes del 31 de Diciembre de 2026)",
    expirationDate: "2026-11-30",
    link: "https://www.drhorton.com/",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "pulte",
    name: "Pulte Homes / Del Webb",
    promoName: "Orlando Year-End Savings Campaign",
    rate: "5.250%",
    rateNumeric: 5.25,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "Tasa fija del 5.25% a 30 años en inventario QMI con Pulte Mortgage. Cuota mensual protegida sin ajustes futuros.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Préstamo convencional/FHA a 30 años.",
    closingCredits: "Hasta $25,000",
    closingNumeric: 25000,
    closingDetails: "Hasta $25,000 en créditos de cierre al financiar con Pulte Mortgage",
    firstTimePerk: "Paquete de cocina gourmet actualizado incluido y garantía de calidad de 10 años",
    counties: ["Orange", "Lake", "Osceola"],
    keyAreas: "Horizon West, Lake Nona, Clermont, St. Cloud",
    lender: "Pulte Mortgage",
    contractDeadline: "Contratos válidos hasta el 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: En o antes del 31 de Diciembre de 2026",
    expirationDate: "2026-11-30",
    link: "https://www.pulte.com/",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "mi-homes",
    name: "M/I Homes",
    promoName: "2/1 Buydown Program & Year-End Lock",
    rate: "3.250%",
    rateNumeric: 3.25,
    rateType: "buydown",
    structureTag: "Buydown Temporal (2/1 Escalonado)",
    structureDesc: "Tasa temporalmente reducida: Año 1 al 3.25%, Año 2 al 4.25%, y Año 3 al 30 se fija en 5.25%. En el año 3 tu cuota sube a la tasa base y queda fija.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: No hay pago global; la cuota simplemente sube a su nivel normal en el año 3.",
    closingCredits: "Hasta $18,000",
    closingNumeric: 18000,
    closingDetails: "Hasta $18,000 en aportes directos a gastos de cierre con M/I Financial",
    firstTimePerk: "Estándares Whole Home Building con garantía estructural transferible de 10 años",
    counties: ["Orange", "Seminole", "Lake", "Osceola"],
    keyAreas: "Sanford, Apopka, St. Cloud, Minneola",
    lender: "M/I Financial, LLC",
    contractDeadline: "Contratos de Noviembre 2026",
    closingDeadline: "Fecha límite de cierre: Estricta antes del 31 de Diciembre de 2026",
    expirationDate: "2026-11-30",
    link: "https://www.mihomes.com/new-homes/florida/orlando-metro/incentives",
    badge: "Buydown 2/1 (3.25% Año 1)"
  },
  {
    id: "meritage",
    name: "Meritage Homes",
    promoName: "Fall Into Savings - Orlando Metro 2026",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "Tasa fija del 5.50% - 5.75% por los 30 años del préstamo con MTH Mortgage en casas listas para entrega.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Estructura fija a 360 meses.",
    closingCredits: "Hasta $22,000",
    closingNumeric: 22000,
    closingDetails: "Hasta $22,000 en créditos combinables para gastos de cierre y buydowns",
    firstTimePerk: "Casas con certificación de ultra-eficiencia energética (ahorro estimado de $1,800/año en luz) y electrodomésticos",
    counties: ["Orange", "Lake", "Polk", "Osceola"],
    keyAreas: "Clermont, Davenport, Winter Garden, Kissimmee",
    lender: "MTH Mortgage",
    contractDeadline: "Contratos firmados antes del 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: Antes del 31 de Diciembre de 2026 en inventario QMI",
    expirationDate: "2026-11-30",
    link: "https://www.meritagehomes.com/promotion/9966548",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "richmond-american",
    name: "Richmond American",
    promoName: "Flex Funds Orlando Campaign 2026",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "Tasa fija a 30 años financiada a través de HomeAmerican Mortgage Corporation mediante compra de puntos de descuento.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Préstamo regular calificado a 30 años.",
    closingCredits: "Hasta $20,000",
    closingNumeric: 20000,
    closingDetails: "Hasta $20,000 en 'Flex Funds' utilizables libremente para gastos de cierre o reducir tasa",
    firstTimePerk: "Asesoramiento individual en The Home Gallery para personalizar cocina y acabados sin costo de consulta",
    counties: ["Lake", "Osceola", "Orange"],
    keyAreas: "Clermont, Groveland, St. Cloud",
    lender: "HomeAmerican Mortgage Corporation",
    contractDeadline: "Contratos de Noviembre 2026",
    closingDeadline: "Fecha límite de cierre: Antes del 31 de Diciembre de 2026",
    expirationDate: "2026-11-30",
    link: "https://www.richmondamerican.com/campaigns/1811/",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "mattamy",
    name: "Mattamy Homes",
    promoName: "Central Florida Advantage Event",
    rate: "5.250%",
    rateNumeric: 5.25,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "5.25% - 5.50% Tasa fija permanente por los 30 años del préstamo con Mattamy Home Funding.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Amortización estándar a 30 años.",
    closingCredits: "Hasta $25,000",
    closingNumeric: 25000,
    closingDetails: "Hasta $25,000 en créditos de cierre aplicados el día del cierre",
    firstTimePerk: "Comunidades estilo resort con clubes y piscinas familiares en corredores de alta plusvalía",
    counties: ["Orange", "Osceola"],
    keyAreas: "Lake Nona, Horizons West, St. Cloud",
    lender: "Mattamy Home Funding",
    contractDeadline: "Contratos firmados antes del 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: Antes del 31 de Diciembre de 2026",
    expirationDate: "2026-11-30",
    link: "https://movewithmomentum.com/data/orlando-builder-incentive-tracker",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "kb-home",
    name: "KB Home",
    promoName: "Orlando Built for You Incentive",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateType: "fixed",
    structureTag: "Tasa Fija 30 Años (Inmutable)",
    structureDesc: "Tasa fija a 30 años garantizada con KBHS Home Loans. Sin cambios en la cuota mensual durante toda la vigencia.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Amortización completa a 30 años.",
    closingCredits: "Hasta $18,000",
    closingNumeric: 18000,
    closingDetails: "Hasta $18,000 en asistencia directa para costos de cierre y título",
    firstTimePerk: "Modelo 'Built to Order' que permite controlar el presupuesto desde la firma",
    counties: ["Orange", "Osceola", "Lake", "Polk"],
    keyAreas: "Orlando, Kissimmee, St. Cloud, Davenport",
    lender: "KBHS Home Loans",
    contractDeadline: "Contratos activos en Noviembre 2026",
    closingDeadline: "Fecha límite de cierre: Fin de año 2026 en inventario seleccionado",
    expirationDate: "2026-11-30",
    link: "https://www.kbhome.com/new-homes-florida/orlando",
    badge: "Tasa Fija 30 Años"
  },
  {
    id: "dream-finders",
    name: "Dream Finders Homes",
    promoName: "Black Friday & Fall Deals Orlando",
    rate: "3.490%",
    rateNumeric: 3.49,
    rateType: "buydown",
    structureTag: "Buydown Temporal (2/1) o Fija 5.25%",
    structureDesc: "Oferta dual: Opción 1 de Buydown 2/1 iniciando al 3.49% en año 1, 4.49% año 2 y fija en 5.49% en año 3; u Opción 2 con Tasa Fija al 5.25% por los 30 años.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Ninguna de las dos opciones tiene saldo global final.",
    closingCredits: "Hasta $18,000",
    closingNumeric: 18000,
    closingDetails: "$10,000 a $18,000 en cobertura de gastos de cierre con JET HomeLoans",
    firstTimePerk: "Modelos adosados (townhomes) y unifamiliares con precios de entrada muy competitivos",
    counties: ["Orange", "Lake", "Seminole", "Osceola"],
    keyAreas: "Clermont, Apopka, Kissimmee, Orlando",
    lender: "JET HomeLoans",
    contractDeadline: "Contratos de Black Friday válidos hasta el 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: Antes del 31 de Diciembre de 2026",
    expirationDate: "2026-11-30",
    link: "https://dreamfindershomes.com/orlando/sales-event-listing/",
    badge: "Buydown 2/1 o Fija"
  },
  {
    id: "highland",
    name: "Highland Homes",
    promoName: "All Closing Costs Paid & Low Rates",
    rate: "3.990%",
    rateNumeric: 3.99,
    rateType: "buydown",
    structureTag: "Tasa Escalonada / Buydown Especial",
    structureDesc: "Tasas promocionales escalonadas desde 3.99% en programas especiales con prestamistas aliados o 5.50% fija a 30 años.",
    isBalloon: false,
    balloonText: "Sin Pago Balloon: Préstamos asegurados por FHA o USDA totalmente amortizados.",
    closingCredits: "100% Cubiertos (Hasta $15,000)",
    closingNumeric: 15000,
    closingDetails: "Gastos de cierre pagados al 100% al utilizar prestamista preferido",
    firstTimePerk: "Especialistas en financiamiento de bajo o $0 de enganche con préstamos USDA / FHA en Polk y Lake",
    counties: ["Polk", "Lake"],
    keyAreas: "Davenport, Haines City, Winter Haven, Lakeland",
    lender: "Highland Preferred Lending Partners",
    contractDeadline: "Contratos hasta el 30 de Noviembre de 2026",
    closingDeadline: "Fecha límite de cierre: Antes del 31 de Diciembre de 2026",
    expirationDate: "2026-11-30",
    link: "https://www.highlandhomes.org/promotions",
    badge: "Gastos 100% Pagados"
  }
];

/**
 * Checks whether an offer is active and has not reached its expiration date.
 * If expirationDate is omitted or today <= expirationDate (end of day local time), returns true.
 */
export function isOfferActive(offer: BuilderIncentive, referenceDate: Date = new Date()): boolean {
  if (!offer.expirationDate) return true;
  const parts = offer.expirationDate.split('-').map(Number);
  if (parts.length !== 3) return true;
  const [year, month, day] = parts;
  const expiry = new Date(year, month - 1, day, 23, 59, 59, 999);
  return expiry.getTime() >= referenceDate.getTime();
}

/**
 * Calculates remaining days until expiration.
 */
export function getDaysRemaining(offer: BuilderIncentive, referenceDate: Date = new Date()): number {
  if (!offer.expirationDate) return 0;
  const parts = offer.expirationDate.split('-').map(Number);
  if (parts.length !== 3) return 0;
  const [year, month, day] = parts;
  const expiry = new Date(year, month - 1, day, 23, 59, 59, 999);
  const diffTime = expiry.getTime() - referenceDate.getTime();
  if (diffTime <= 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
