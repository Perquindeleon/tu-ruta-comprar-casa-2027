import { Language } from '../types';

export const APP_CONFIG = {
  appName: 'Tu Ruta para Comprar Casa en 2027',
  brandName: 'Perquin de León',
  slogan: 'No compres solamente porque el banco te apruebe. Compra porque los números tienen sentido para ti.',
  subSlogan: 'Aprende a ser financieramente libre.',
  targetYear: 2027,
  lastUpdated: 'Octubre 2024 / Proyección 2027',
  ratesLastChecked: 'Octubre 2024',
  pmmsUrl: 'https://www.freddiemac.com/pmms',
  social: {
    facebook: 'https://www.facebook.com/perquindeleon',
    tiktok: 'https://www.tiktok.com/@perquindeleon',
  },
  disclaimer: `Esta aplicación web es una herramienta puramente informativa y educativa desarrollada por Perquin de León. No constituye asesoramiento financiero, hipotecario, inmobiliario, fiscal ni legal. Las tasas, costos de cierre y cálculos son estimaciones ilustrativas y no representan ofertas de préstamo ni garantías de aprobación hipotecaria. Cada comprador debe consultar con prestamistas licenciados por el NMLS, asesores certificados por HUD y agentes inmobiliarios autorizados en su jurisdicción.`,
  emailPrivacyNotice: `El envío por correo electrónico transmite tu plan generado en formato PDF a través de la plataforma de entrega segura Resend. Ningún dato financiero personal se guarda en bases de datos ni servidores permanentes. Tu correo se utiliza exclusivamente para entregarte el documento solicitado salvo que otorgues tu consentimiento voluntario e independiente para recibir boletines informativos.`
};

export const APP_CONFIG_EN = {
  appName: 'Your Roadmap to Buying a Home in 2027',
  brandName: 'Perquin de León',
  slogan: "Don't buy just because the bank approves you. Buy because the numbers make sense for you.",
  subSlogan: 'Learn to be financially free.',
  targetYear: 2027,
  lastUpdated: 'October 2024 / 2027 Projection',
  ratesLastChecked: 'October 2024',
  pmmsUrl: 'https://www.freddiemac.com/pmms',
  social: {
    facebook: 'https://www.facebook.com/perquindeleon',
    tiktok: 'https://www.tiktok.com/@perquindeleon',
  },
  disclaimer: `This web application is a purely informational and educational tool developed by Perquin de León. It does not constitute financial, mortgage, real estate, tax, or legal advice. Interest rates, closing costs, and calculations are illustrative estimates and do not represent loan offers or mortgage approval guarantees. Every homebuyer should consult with NMLS-licensed lenders, HUD-certified housing counselors, and licensed real estate agents in their jurisdiction.`,
  emailPrivacyNotice: `Email delivery transmits your generated PDF plan through the secure Resend delivery platform. No personal financial data is stored in databases or permanent servers. Your email is used exclusively to deliver the requested document unless you provide voluntary, independent consent to receive educational newsletters.`
};

export function getAppConfig(lang: Language = 'es') {
  return lang === 'en' ? APP_CONFIG_EN : APP_CONFIG;
}

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia (Washington D.C.)' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];
