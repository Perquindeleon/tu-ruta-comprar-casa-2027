import { AssistanceProgram } from '../types';

export const NATIONAL_PROGRAMS: AssistanceProgram[] = [
  {
    id: 'hud-main',
    name: 'Directorio Oficial de Programas de Asistencia HUD',
    agency: 'U.S. Department of Housing and Urban Development (HUD)',
    description: 'Directorio gubernamental centralizado con enlaces oficiales a agencias de vivienda, subvenciones y programas locales por estado y condado.',
    jurisdiction: 'Nacional',
    type: 'counseling',
    targetAudience: 'all',
    officialUrl: 'https://www.hud.gov/states',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'cfpb-owning-a-home',
    name: 'Guía y Herramientas para Comprar Casa (CFPB)',
    agency: 'Consumer Financial Protection Bureau (CFPB)',
    description: 'Recurso oficial educativo para comparar tasas de interés, entender el Loan Estimate y preparar el presupuesto hipotecario sin intereses comerciales.',
    jurisdiction: 'Nacional',
    type: 'counseling',
    targetAudience: 'all',
    officialUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'fannie-mae-yourhome',
    name: 'Fannie Mae HomeView & Programas Comunitarios',
    agency: 'Fannie Mae (Federal National Mortgage Association)',
    description: 'Educación oficial para compradores de primera vivienda y programas de préstamo convencional con tan solo 3% de pronto (HomeReady).',
    jurisdiction: 'Nacional',
    type: 'loan',
    targetAudience: 'all',
    officialUrl: 'https://yourhome.fanniemae.com/',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'freddie-mac-homebuyer',
    name: 'Freddie Mac Home Possible & Educación CreditSmart',
    agency: 'Freddie Mac (Federal Home Loan Mortgage Corp)',
    description: 'Soluciones hipotecarias con pronto flexible (desde 3%) para compradores con ingresos moderados y recursos de educación financiera gratuita.',
    jurisdiction: 'Nacional',
    type: 'loan',
    targetAudience: 'all',
    officialUrl: 'https://www.freddiemac.com/',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'fha-loans',
    name: 'Préstamos Respaldados por la FHA',
    agency: 'Federal Housing Administration (FHA / HUD)',
    description: 'Hipotecas con requisitos de crédito más flexibles y un pago inicial mínimo del 3.5% para compradores calificados.',
    jurisdiction: 'Nacional',
    type: 'loan',
    targetAudience: 'all',
    officialUrl: 'https://www.hud.gov/buying/loans',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'va-loans',
    name: 'Préstamos Hipotecarios VA para Veteranos y Militares',
    agency: 'U.S. Department of Veterans Affairs (VA)',
    description: 'Beneficio hipotecario exclusivo para veteranos, miembros del servicio activo y cónyuges sobrevivientes elegibles, frecuentemente sin pronto ni seguro hipotecario mensual.',
    jurisdiction: 'Nacional',
    type: 'loan',
    targetAudience: 'veteran',
    officialUrl: 'https://www.va.gov/housing-assistance/home-loans/',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'usda-loans',
    name: 'Préstamos Rurales de Vivienda USDA',
    agency: 'U.S. Department of Agriculture (USDA Rural Development)',
    description: 'Financiamiento del 100% (0% pronto) para propiedades elegibles ubicadas en zonas rurales y suburbanas designadas por el USDA para familias con ingresos elegibles.',
    jurisdiction: 'Nacional',
    type: 'loan',
    targetAudience: 'rural',
    officialUrl: 'https://www.rd.usda.gov/',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  },
  {
    id: 'hud-counselors',
    name: 'Agencias de Asesoría de Vivienda Aprobadas por HUD',
    agency: 'HUD Office of Housing Counseling',
    description: 'Asesores certificados y sin fines de lucro que brindan orientación confidencial sobre presupuesto, crédito y preparación para comprar vivienda.',
    jurisdiction: 'Nacional',
    type: 'counseling',
    targetAudience: 'all',
    officialUrl: 'https://www.hud.gov/counseling',
    lastVerified: 'Octubre 2024',
    status: 'verified'
  }
];

export const STATE_HFA_PROGRAMS: Record<string, AssistanceProgram[]> = {
  CA: [
    {
      id: 'calhfa-myhome',
      name: 'California Housing Finance Agency (CalHFA)',
      agency: 'CalHFA - Estado de California',
      description: 'Programas de primera hipoteca y préstamos diferidos subordinados de asistencia para el pronto y gastos de cierre (MyHome Assistance).',
      jurisdiction: 'California',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.calhfa.ca.gov/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  TX: [
    {
      id: 'tdhca-my-first-texas-home',
      name: 'Texas Department of Housing & Community Affairs (TDHCA)',
      agency: 'TDHCA - Estado de Texas',
      description: 'Programas "My First Texas Home" y "Texas Bootstrap Loan Program" con asistencia de hasta un 5% para pronto y costos de cierre.',
      jurisdiction: 'Texas',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.tdhca.state.tx.us/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    },
    {
      id: 'tsahc-texas',
      name: 'Texas State Affordable Housing Corporation (TSAHC)',
      agency: 'TSAHC',
      description: 'Subvenciones no reembolsables de asistencia para pronto y certificados de crédito hipotecario (MCC) para compradores texanos.',
      jurisdiction: 'Texas',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.tsahc.org/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  FL: [
    {
      id: 'florida-housing-finance',
      name: 'Florida Housing Finance Corporation (Florida Housing)',
      agency: 'Florida Housing',
      description: 'Asistencia para el pronto con préstamos de segundo grado con 0% de interés y programas Hometown Heroes para trabajadores esenciales.',
      jurisdiction: 'Florida',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.floridahousing.org/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  NY: [
    {
      id: 'sonyma-new-york',
      name: 'State of New York Mortgage Agency (SONYMA)',
      agency: 'SONYMA - Estado de New York',
      description: 'Hipotecas con tasas fijas por debajo del mercado y préstamos de asistencia para el pronto (DPAL) con condonación a plazos.',
      jurisdiction: 'New York',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://hcr.ny.gov/sonyma',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  IL: [
    {
      id: 'ihda-illinois',
      name: 'Illinois Housing Development Authority (IHDA)',
      agency: 'IHDA - Estado de Illinois',
      description: 'Programas "IHDAccess Forgivable" y "IHDAccess Deferred" con asistencia de hasta $10,000 para pronto y gastos de cierre.',
      jurisdiction: 'Illinois',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.ihda.org/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  GA: [
    {
      id: 'georgia-dream',
      name: 'Georgia Dream Homeownership Program',
      agency: 'Georgia Department of Community Affairs (DCA)',
      description: 'Préstamos hipotecarios asequibles y hasta $10,000 o $12,500 en asistencia para pronto para compradores elegibles.',
      jurisdiction: 'Georgia',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.dca.ga.gov/safe-affordable-housing/homeownership/georgia-dream',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  NC: [
    {
      id: 'nchfa-north-carolina',
      name: 'North Carolina Housing Finance Agency (NCHFA)',
      agency: 'NCHFA - Carolina del Norte',
      description: 'Programas NC Home Advantage Mortgage y asistencia para el pronto de hasta $15,000 con condonación progresiva.',
      jurisdiction: 'North Carolina',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.nchfa.com/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  NJ: [
    {
      id: 'njhmfa-new-jersey',
      name: 'New Jersey Housing and Mortgage Finance Agency (NJHMFA)',
      agency: 'NJHMFA - Nueva Jersey',
      description: 'Subvenciones condonables de hasta $15,000 para compradores de primera vivienda para pronto y costos de cierre.',
      jurisdiction: 'New Jersey',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.nj.gov/dca/hmfa/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  PA: [
    {
      id: 'phfa-pennsylvania',
      name: 'Pennsylvania Housing Finance Agency (PHFA)',
      agency: 'PHFA - Pensilvania',
      description: 'Préstamos Keystone Home Loan, asistencia Keystone Advantage y programas de asistencia para el pronto con o sin interés.',
      jurisdiction: 'Pennsylvania',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.phfa.org/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ],
  AZ: [
    {
      id: 'azhousing-home-plus',
      name: 'Arizona HOME+PLUS Down Payment Assistance',
      agency: 'Arizona Industrial Development Authority',
      description: 'Asistencia para el pronto de hasta un 5% del monto del préstamo combinable con hipotecas convencionales y FHA.',
      jurisdiction: 'Arizona',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://housing.az.gov/',
      lastVerified: 'Octubre 2024',
      status: 'verified'
    }
  ]
};

export function getProgramsForState(stateCode?: string): AssistanceProgram[] {
  const result = [...NATIONAL_PROGRAMS];
  if (stateCode && STATE_HFA_PROGRAMS[stateCode]) {
    result.unshift(...STATE_HFA_PROGRAMS[stateCode]);
  }
  return result;
}
