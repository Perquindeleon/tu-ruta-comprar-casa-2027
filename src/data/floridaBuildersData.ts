export interface BuilderIncentive {
  id: string;
  name: string;
  promoName: string;
  rate: string;
  rateNumeric: number;
  rateDetails: string;
  closingCredits: string;
  closingNumeric: number;
  closingDetails: string;
  firstTimePerk: string;
  counties: string[];
  keyAreas: string;
  lender: string;
  deadline: string;
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
    rateDetails: "4.750% FHA 5/1 ARM (7.837% APR) inicial por 5 años o 5.25% fija a 30 años",
    closingCredits: "Hasta $20,000",
    closingNumeric: 20000,
    closingDetails: "Hasta $5,000 en Flex Credit directo más cobertura de costos de cierre de hasta $20,000 con Lennar Mortgage",
    firstTimePerk: "Programa Everything's Included® (refrigerador, lavadora, secadora, persianas y domótica sin costo extra)",
    counties: ["Orange", "Osceola", "Lake", "Seminole", "Polk"],
    keyAreas: "Orlando, Kissimmee, Clermont, St. Cloud, Davenport",
    lender: "Lennar Mortgage, LLC",
    deadline: "Contratos de Noviembre 2026 en inventario selecto con cierre antes de fin de año",
    link: "https://www.lennar.com/new-homes/florida/orlando/promo/olhlen_offer",
    badge: "Tasa Más Baja (4.75%)"
  },
  {
    id: "taylor-morrison",
    name: "Taylor Morrison",
    promoName: "Make Moves Orlando - Active Nov 2026",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateDetails: "Tasas promocionales de 5.50% - 5.75% fijas a 30 años en inventario QMI",
    closingCredits: "Hasta $25,000",
    closingNumeric: 25000,
    closingDetails: "Hasta $25,000 en créditos flexibles aplicables a gastos de cierre o compras de puntos hipotecarios",
    firstTimePerk: "Asistencia en depósito inicial y crédito adicional para personalizar acabados en su Design Studio",
    counties: ["Orange", "Lake", "Seminole"],
    keyAreas: "Horizon West, Winter Garden, Clermont, Oviedo",
    lender: "Taylor Morrison Home Funding",
    deadline: "Contratos firmados durante Noviembre 2026 cerrando en o antes del 31/12/2026",
    link: "https://www.taylormorrison.com/make-moves/orlando",
    badge: "Crédito Alto ($25k)"
  },
  {
    id: "dr-horton",
    name: "D.R. Horton",
    promoName: "Orlando Metro Quick Move-In Red Tag Event",
    rate: "5.250%",
    rateNumeric: 5.25,
    rateDetails: "5.25% - 5.50% Fija a 30 años con DHI Mortgage (préstamos FHA, VA y Convencionales)",
    closingCredits: "Hasta $20,000",
    closingNumeric: 20000,
    closingDetails: "Hasta $20,000 en Flex Cash para gastos de cierre o reducción permanente de tasa",
    firstTimePerk: "El mayor inventario de entrada en Osceola y Polk; depósito mínimo FHA del 3.5% financiable",
    counties: ["Osceola", "Orange", "Polk", "Lake"],
    keyAreas: "Kissimmee, St. Cloud, Davenport, Haines City, Deltona",
    lender: "DHI Mortgage",
    deadline: "Válido en viviendas de cierre rápido durante Noviembre 2026",
    link: "https://www.drhorton.com/",
    badge: "Mayor Inventario"
  },
  {
    id: "pulte",
    name: "Pulte Homes / Del Webb",
    promoName: "Orlando Year-End Savings Campaign",
    rate: "5.250%",
    rateNumeric: 5.25,
    rateDetails: "5.25% - 5.50% Fija a 30 años en casas de inventario seleccionadas",
    closingCredits: "Hasta $25,000",
    closingNumeric: 25000,
    closingDetails: "Hasta $25,000 en créditos de cierre al financiar con Pulte Mortgage",
    firstTimePerk: "Paquete de cocina actualizado incluido y garantía de calidad de construcción de 10 años",
    counties: ["Orange", "Lake", "Osceola"],
    keyAreas: "Horizon West, Lake Nona, Clermont, St. Cloud",
    lender: "Pulte Mortgage",
    deadline: "Viviendas que cierren antes del 31 de Diciembre de 2026",
    link: "https://www.pulte.com/",
    badge: "Crédito Alto ($25k)"
  },
  {
    id: "mi-homes",
    name: "M/I Homes",
    promoName: "2/1 Buydown Program & Year-End Lock",
    rate: "3.250%",
    rateNumeric: 3.25,
    rateDetails: "2/1 Buydown: 3.25% año 1, 4.25% año 2, 5.25% año 3+ (o 6.25% fija a largo plazo)",
    closingCredits: "Hasta $18,000",
    closingNumeric: 18000,
    closingDetails: "Hasta $18,000 en aportes directos a gastos de cierre con M/I Financial",
    firstTimePerk: "Estándares Whole Home Building con garantía estructural transferible de 10 años",
    counties: ["Orange", "Seminole", "Lake", "Osceola"],
    keyAreas: "Sanford, Apopka, St. Cloud, Minneola",
    lender: "M/I Financial, LLC",
    deadline: "Casas seleccionadas con cierre antes del 31 de Diciembre de 2026",
    link: "https://www.mihomes.com/new-homes/florida/orlando-metro/incentives",
    badge: "Tasa Inicial 3.25% (2/1)"
  },
  {
    id: "meritage",
    name: "Meritage Homes",
    promoName: "Fall Into Savings - Orlando Metro 2026",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateDetails: "5.50% - 5.75% Fija a 30 años en casas de entrega inmediata",
    closingCredits: "Hasta $22,000",
    closingNumeric: 22000,
    closingDetails: "Hasta $22,000 en créditos combinables para gastos de cierre y buydowns",
    firstTimePerk: "Casas con certificación de ultra-eficiencia energética (ahorro estimado de hasta $1,800/año en electricidad) y electrodomésticos",
    counties: ["Orange", "Lake", "Polk", "Osceola"],
    keyAreas: "Clermont, Davenport, Winter Garden, Kissimmee",
    lender: "MTH Mortgage",
    deadline: "Ofertas activas para compras de Noviembre 2026",
    link: "https://www.meritagehomes.com/promotion/9966548",
    badge: "Ahorro Energético"
  },
  {
    id: "richmond-american",
    name: "Richmond American",
    promoName: "Flex Funds Orlando Campaign 2026",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateDetails: "Opciones de compra de puntos hipotecarios para fijar tasa en el rango de 5.5%",
    closingCredits: "Hasta $20,000",
    closingNumeric: 20000,
    closingDetails: "Hasta $20,000 en 'Flex Funds' utilizables libremente para gastos de cierre o reducir tasa",
    firstTimePerk: "Asesoramiento individual en The Home Gallery para personalizar cocina y pisos sin costo de consulta",
    counties: ["Lake", "Osceola", "Orange"],
    keyAreas: "Clermont, Groveland, St. Cloud",
    lender: "HomeAmerican Mortgage Corporation",
    deadline: "Casas listas con cierre programado antes de fin de año 2026",
    link: "https://www.richmondamerican.com/campaigns/1811/",
    badge: "Flex Funds"
  },
  {
    id: "mattamy",
    name: "Mattamy Homes",
    promoName: "Central Florida Advantage Event",
    rate: "5.250%",
    rateNumeric: 5.25,
    rateDetails: "5.25% - 5.50% Tasa fija a 30 años a través de prestamista preferido",
    closingCredits: "Hasta $25,000",
    closingNumeric: 25000,
    closingDetails: "Hasta $25,000 en créditos de cierre aplicados el día del cierre",
    firstTimePerk: "Comunidades estilo resort con clubes y piscinas familiares en corredores de alta plusvalía",
    counties: ["Orange", "Osceola"],
    keyAreas: "Lake Nona, Horizons West, St. Cloud",
    lender: "Mattamy Home Funding",
    deadline: "Contratos de cierre oportuno en Q4 2026",
    link: "https://movewithmomentum.com/data/orlando-builder-incentive-tracker",
    badge: "Alta Plusvalía"
  },
  {
    id: "kb-home",
    name: "KB Home",
    promoName: "Orlando Built for You Incentive",
    rate: "5.500%",
    rateNumeric: 5.50,
    rateDetails: "5.50% - 5.75% Fija a 30 años en viviendas seleccionadas",
    closingCredits: "Hasta $18,000",
    closingNumeric: 18000,
    closingDetails: "Hasta $18,000 en asistencia directa para costos de cierre y título",
    firstTimePerk: "Modelo 'Built to Order' que permite controlar el presupuesto desde la firma",
    counties: ["Orange", "Osceola", "Lake", "Polk"],
    keyAreas: "Orlando, Kissimmee, St. Cloud, Davenport",
    lender: "KBHS Home Loans",
    deadline: "Inventario seleccionado de Noviembre 2026",
    link: "https://www.kbhome.com/new-homes-florida/orlando",
    badge: "Personalización"
  },
  {
    id: "dream-finders",
    name: "Dream Finders Homes",
    promoName: "Black Friday & Fall Deals Orlando",
    rate: "3.490%",
    rateNumeric: 3.49,
    rateDetails: "Buydowns temporales desde 3.49% o tasas fijas preferenciales a 5.25%",
    closingCredits: "Hasta $18,000",
    closingNumeric: 18000,
    closingDetails: "$10,000 a $18,000 en cobertura de gastos de cierre con JET HomeLoans",
    firstTimePerk: "Modelos adosados (townhomes) y unifamiliares con precios de entrada muy competitivos",
    counties: ["Orange", "Lake", "Seminole", "Osceola"],
    keyAreas: "Clermont, Apopka, Kissimmee, Orlando",
    lender: "JET HomeLoans",
    deadline: "Ofertas activas de Noviembre 2026 para cierre rápido",
    link: "https://dreamfindershomes.com/orlando/sales-event-listing/",
    badge: "Townhomes & Single Family"
  },
  {
    id: "highland",
    name: "Highland Homes",
    promoName: "All Closing Costs Paid & Low Rates",
    rate: "3.990%",
    rateNumeric: 3.99,
    rateDetails: "Tasas promocionales escalonadas desde 3.99% en programas especiales",
    closingCredits: "100% Cubiertos (Hasta $15,000)",
    closingNumeric: 15000,
    closingDetails: "Gastos de cierre pagados al 100% al utilizar prestamista preferido",
    firstTimePerk: "Especialistas en financiamiento de bajo o $0 de enganche con préstamos USDA / FHA en Polk y Lake",
    counties: ["Polk", "Lake"],
    keyAreas: "Davenport, Haines City, Winter Haven, Lakeland",
    lender: "Highland Preferred Lending Partners",
    deadline: "Válido en comunidades activas durante Noviembre 2026",
    link: "https://www.highlandhomes.org/promotions",
    badge: "Gastos 100% Pagados"
  }
];
