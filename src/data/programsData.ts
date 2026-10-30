import { AssistanceProgram } from '../types';

export const NATIONAL_PROGRAMS: AssistanceProgram[] = [
  {
    id: 'hud-main',
    name: 'Directorio Oficial de Programas de Asistencia HUD',
    nameEn: 'Official HUD Assistance Programs Directory',
    agency: 'U.S. Department of Housing and Urban Development (HUD)',
    description: 'Directorio gubernamental centralizado con enlaces oficiales a agencias de vivienda, subvenciones y programas locales por estado y condado.',
    descriptionEn: 'Centralized U.S. government directory with official links to housing agencies, grants, and local homebuyer programs by state and county.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'counseling',
    targetAudience: 'all',
    officialUrl: 'https://www.hud.gov/states',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'cfpb-owning-a-home',
    name: 'Guía y Herramientas para Comprar Casa (CFPB)',
    nameEn: 'Buying a House Guide & Tools (CFPB)',
    agency: 'Consumer Financial Protection Bureau (CFPB)',
    description: 'Recurso oficial educativo para comparar tasas de interés, entender el Loan Estimate y preparar el presupuesto hipotecario sin intereses comerciales.',
    descriptionEn: 'Official unbiased educational resource to compare interest rates, understand the Loan Estimate, and prepare your mortgage budget.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'counseling',
    targetAudience: 'all',
    officialUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'fannie-mae-yourhome',
    name: 'Fannie Mae HomeView & Programas Comunitarios',
    nameEn: 'Fannie Mae HomeView & Community Programs',
    agency: 'Fannie Mae (Federal National Mortgage Association)',
    description: 'Educación oficial para compradores de primera vivienda y programas de préstamo convencional con tan solo 3% de pronto (HomeReady).',
    descriptionEn: 'Official first-time homebuyer education and conventional loan programs with as little as 3% down payment (HomeReady).',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'loan',
    targetAudience: 'all',
    officialUrl: 'https://yourhome.fanniemae.com/',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'freddie-mac-homebuyer',
    name: 'Freddie Mac Home Possible & Educación CreditSmart',
    nameEn: 'Freddie Mac Home Possible & CreditSmart Education',
    agency: 'Freddie Mac (Federal Home Loan Mortgage Corp)',
    description: 'Soluciones hipotecarias con pronto flexible (desde 3%) para compradores con ingresos moderados y recursos de educación financiera gratuita.',
    descriptionEn: 'Mortgage solutions with flexible down payments (from 3%) for low-to-moderate income buyers plus free financial literacy courses.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'loan',
    targetAudience: 'all',
    officialUrl: 'https://www.freddiemac.com/',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'fha-loans',
    name: 'Préstamos Respaldados por la FHA',
    nameEn: 'FHA-Insured Home Loans',
    agency: 'Federal Housing Administration (FHA / HUD)',
    description: 'Hipotecas con requisitos de crédito más flexibles y un pago inicial mínimo del 3.5% para compradores calificados.',
    descriptionEn: 'Mortgages with flexible credit requirements and a minimum 3.5% down payment for qualified buyers.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'loan',
    targetAudience: 'all',
    officialUrl: 'https://www.hud.gov/buying/loans',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'va-loans',
    name: 'Préstamos Hipotecarios VA para Veteranos y Militares',
    nameEn: 'VA Home Loans for Veterans and Service Members',
    agency: 'U.S. Department of Veterans Affairs (VA)',
    description: 'Beneficio hipotecario exclusivo para veteranos, miembros del servicio activo y cónyuges sobrevivientes elegibles, frecuentemente sin pronto ni seguro hipotecario mensual.',
    descriptionEn: 'Exclusive mortgage benefit for veterans, active-duty service members, and eligible surviving spouses, often with 0% down payment and no monthly PMI.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'loan',
    targetAudience: 'veteran',
    officialUrl: 'https://www.va.gov/housing-assistance/home-loans/',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'usda-loans',
    name: 'Préstamos Rurales de Vivienda USDA',
    nameEn: 'USDA Rural Development Home Loans',
    agency: 'U.S. Department of Agriculture (USDA Rural Development)',
    description: 'Financiamiento del 100% (0% pronto) para propiedades elegibles ubicadas en zonas rurales y suburbanas designadas por el USDA para familias con ingresos elegibles.',
    descriptionEn: '100% financing (0% down payment) for eligible properties in USDA-designated rural and suburban areas for income-eligible households.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'loan',
    targetAudience: 'rural',
    officialUrl: 'https://www.rd.usda.gov/',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  },
  {
    id: 'hud-counselors',
    name: 'Agencias de Asesoría de Vivienda Aprobadas por HUD',
    nameEn: 'HUD-Approved Housing Counseling Agencies',
    agency: 'HUD Office of Housing Counseling',
    description: 'Asesores certificados y sin fines de lucro que brindan orientación confidencial sobre presupuesto, crédito y preparación para comprar vivienda.',
    descriptionEn: 'Certified non-profit counselors providing confidential guidance on budgeting, credit, and homebuying preparation.',
    jurisdiction: 'Nacional',
    jurisdictionEn: 'National',
    type: 'counseling',
    targetAudience: 'all',
    officialUrl: 'https://www.hud.gov/counseling',
    lastVerified: 'Octubre 2024',
    lastVerifiedEn: 'October 2024',
    status: 'verified'
  }
];

export const STATE_HFA_PROGRAMS: Record<string, AssistanceProgram[]> = {
  CA: [
    {
      id: 'calhfa-myhome',
      name: 'California Housing Finance Agency (CalHFA)',
      nameEn: 'California Housing Finance Agency (CalHFA)',
      agency: 'CalHFA - California',
      description: 'Programas de primera hipoteca y préstamos diferidos subordinados de asistencia para el pronto y gastos de cierre (MyHome Assistance).',
      descriptionEn: 'First mortgage programs and deferred subordinate loans for down payment and closing cost assistance (MyHome Assistance).',
      jurisdiction: 'California',
      jurisdictionEn: 'California',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.calhfa.ca.gov/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  TX: [
    {
      id: 'tdhca-my-first-texas-home',
      name: 'Texas Department of Housing & Community Affairs (TDHCA)',
      nameEn: 'Texas Department of Housing & Community Affairs (TDHCA)',
      agency: 'TDHCA - Texas',
      description: 'Programas "My First Texas Home" y "Texas Bootstrap Loan Program" con asistencia de hasta un 5% para pronto y costos de cierre.',
      descriptionEn: '"My First Texas Home" and "Texas Bootstrap Loan Program" offering up to 5% assistance for down payment and closing costs.',
      jurisdiction: 'Texas',
      jurisdictionEn: 'Texas',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.tdhca.state.tx.us/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    },
    {
      id: 'tsahc-texas',
      name: 'Texas State Affordable Housing Corporation (TSAHC)',
      nameEn: 'Texas State Affordable Housing Corporation (TSAHC)',
      agency: 'TSAHC',
      description: 'Subvenciones no reembolsables de asistencia para pronto y certificados de crédito hipotecario (MCC) para compradores texanos.',
      descriptionEn: 'Non-repayable down payment assistance grants and Mortgage Credit Certificates (MCC) for Texas homebuyers.',
      jurisdiction: 'Texas',
      jurisdictionEn: 'Texas',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.tsahc.org/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  FL: [
    {
      id: 'florida-housing-finance',
      name: 'Florida Housing Finance Corporation (Florida Housing)',
      nameEn: 'Florida Housing Finance Corporation (Florida Housing)',
      agency: 'Florida Housing',
      description: 'Asistencia para el pronto con préstamos de segundo grado con 0% de interés y programas Hometown Heroes para trabajadores esenciales.',
      descriptionEn: 'Down payment assistance with 0% interest second mortgages and Hometown Heroes programs for community workers.',
      jurisdiction: 'Florida',
      jurisdictionEn: 'Florida',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.floridahousing.org/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  NY: [
    {
      id: 'sonyma-new-york',
      name: 'State of New York Mortgage Agency (SONYMA)',
      nameEn: 'State of New York Mortgage Agency (SONYMA)',
      agency: 'SONYMA - New York',
      description: 'Hipotecas con tasas fijas por debajo del mercado y préstamos de asistencia para el pronto (DPAL) con condonación a plazos.',
      descriptionEn: 'Below-market fixed-rate mortgages and forgivable Down Payment Assistance Loans (DPAL).',
      jurisdiction: 'New York',
      jurisdictionEn: 'New York',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://hcr.ny.gov/sonyma',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  IL: [
    {
      id: 'ihda-illinois',
      name: 'Illinois Housing Development Authority (IHDA)',
      nameEn: 'Illinois Housing Development Authority (IHDA)',
      agency: 'IHDA - Illinois',
      description: 'Programas "IHDAccess Forgivable" y "IHDAccess Deferred" con asistencia de hasta $10,000 para pronto y gastos de cierre.',
      descriptionEn: '"IHDAccess Forgivable" and "IHDAccess Deferred" programs offering up to $10,000 for down payment and closing costs.',
      jurisdiction: 'Illinois',
      jurisdictionEn: 'Illinois',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.ihda.org/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  GA: [
    {
      id: 'georgia-dream',
      name: 'Georgia Dream Homeownership Program',
      nameEn: 'Georgia Dream Homeownership Program',
      agency: 'Georgia Department of Community Affairs (DCA)',
      description: 'Préstamos hipotecarios asequibles y hasta $10,000 o $12,500 en asistencia para pronto para compradores elegibles.',
      descriptionEn: 'Affordable mortgage loans and up to $10,000 or $12,500 in down payment assistance for eligible buyers.',
      jurisdiction: 'Georgia',
      jurisdictionEn: 'Georgia',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.dca.ga.gov/safe-affordable-housing/homeownership/georgia-dream',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  NC: [
    {
      id: 'nchfa-north-carolina',
      name: 'North Carolina Housing Finance Agency (NCHFA)',
      nameEn: 'North Carolina Housing Finance Agency (NCHFA)',
      agency: 'NCHFA - North Carolina',
      description: 'Programas NC Home Advantage Mortgage y asistencia para el pronto de hasta $15,000 con condonación progresiva.',
      descriptionEn: 'NC Home Advantage Mortgage programs and forgivable down payment assistance up to $15,000.',
      jurisdiction: 'North Carolina',
      jurisdictionEn: 'North Carolina',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.nchfa.com/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  NJ: [
    {
      id: 'njhmfa-new-jersey',
      name: 'New Jersey Housing and Mortgage Finance Agency (NJHMFA)',
      nameEn: 'New Jersey Housing and Mortgage Finance Agency (NJHMFA)',
      agency: 'NJHMFA - New Jersey',
      description: 'Subvenciones condonables de hasta $15,000 para compradores de primera vivienda para pronto y costos de cierre.',
      descriptionEn: 'Forgivable grants up to $15,000 for first-time homebuyers toward down payment and closing costs.',
      jurisdiction: 'New Jersey',
      jurisdictionEn: 'New Jersey',
      type: 'dpa',
      targetAudience: 'first_time',
      officialUrl: 'https://www.nj.gov/dca/hmfa/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  PA: [
    {
      id: 'phfa-pennsylvania',
      name: 'Pennsylvania Housing Finance Agency (PHFA)',
      nameEn: 'Pennsylvania Housing Finance Agency (PHFA)',
      agency: 'PHFA - Pennsylvania',
      description: 'Préstamos Keystone Home Loan, asistencia Keystone Advantage y programas de asistencia para el pronto con o sin interés.',
      descriptionEn: 'Keystone Home Loan, Keystone Advantage Assistance, and interest-free or low-interest down payment programs.',
      jurisdiction: 'Pennsylvania',
      jurisdictionEn: 'Pennsylvania',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://www.phfa.org/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
      status: 'verified'
    }
  ],
  AZ: [
    {
      id: 'azhousing-home-plus',
      name: 'Arizona HOME+PLUS Down Payment Assistance',
      nameEn: 'Arizona HOME+PLUS Down Payment Assistance',
      agency: 'Arizona Industrial Development Authority',
      description: 'Asistencia para el pronto de hasta un 5% del monto del préstamo combinable con hipotecas convencionales y FHA.',
      descriptionEn: 'Down payment assistance up to 5% of the loan amount, combinable with conventional and FHA mortgages.',
      jurisdiction: 'Arizona',
      jurisdictionEn: 'Arizona',
      type: 'dpa',
      targetAudience: 'all',
      officialUrl: 'https://housing.az.gov/',
      lastVerified: 'Octubre 2024',
      lastVerifiedEn: 'October 2024',
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
