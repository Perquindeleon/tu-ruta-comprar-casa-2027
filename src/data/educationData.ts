import { EducationalArticle } from '../types';

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'credito-hipotecario',
    category: 'Financiamiento y Crédito',
    title: 'Crédito Hipotecario en EE. UU.',
    subtitle: 'El puntaje FICO y cómo influye directamente en tu cuota mensual.',
    summary: 'Tu puntaje de crédito no es solo un número: determina qué tasa de interés te ofrecerá el banco y cuánto pagarás mes a mes durante 30 años.',
    explanation: 'Los prestamistas hipotecarios utilizan versiones especializadas del puntaje FICO (típicamente FICO 2, 4 y 5) calculadas por las tres agencias: Equifax, Experian y TransUnion. Si aplicas en pareja, usualmente consideran el puntaje intermedio del solicitante con la puntuación más baja.',
    whyItMatters: 'Una diferencia de solo 40 puntos en tu puntaje crediticio puede significar una tasa de interés entre 0.5% y 1% más baja. En un préstamo de $350,000, una diferencia de 0.75% puede representar más de $50,000 a $60,000 en intereses ahorrados a lo largo del préstamo.',
    questionsToAsk: [
      '¿Qué puntaje intermedio exacto está utilizando el prestamista para calificarme?',
      '¿Hay cuentas en disputa o errores en mi informe que deba corregir antes de emitir la solicitud formal?',
      '¿Cuántos puntos subiría mi puntaje si saldo una tarjeta específica?'
    ],
    recommendedActions: [
      'Obtén tus reportes oficiales gratuitos en AnnualCreditReport.com.',
      'Mantén la utilización de cada tarjeta de crédito por debajo del 30% (óptimo por debajo del 10%).',
      'No cierres cuentas antiguas ni solicites tarjetas nuevas en los 12 meses previos a comprar.'
    ],
    officialSourceLabel: 'CFPB - Cómo influye el crédito en tu hipoteca',
    officialSourceUrl: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'pronto-down-payment',
    category: 'Ahorro y Presupuesto',
    title: 'El Pronto (Down Payment)',
    subtitle: 'Mitos del 20% y opciones reales desde el 3% o 3.5%.',
    summary: 'No necesitas tener el 20% en efectivo para comprar casa en EE. UU., aunque un pronto mayor reduce tu pago mensual y elimina el PMI.',
    explanation: 'El pronto es la porción del precio de compra que pagas de tu propio bolsillo al momento de cerrar la transacción. Aunque el 20% es ideal para evitar seguros hipotecarios privados (PMI), existen préstamos convencionales desde el 3%, préstamos FHA con el 3.5% y opciones VA o USDA con el 0% de pronto.',
    whyItMatters: 'Esperar años para acumular el 20% puede dejarte fuera de un mercado donde los precios continúan subiendo. Sin embargo, poner muy poco pronto puede elevar tu cuota mensual por encima de lo que tu presupuesto familiar resiste.',
    questionsToAsk: [
      '¿Cuál es el porcentaje mínimo requerido para el tipo de préstamo que me conviene?',
      '¿De dónde provendrán los fondos (ahorros propios, donación familiar de regalo o programa DPA)?',
      '¿Cuánto me quedará en mi fondo de emergencias después de entregar el pronto?'
    ],
    recommendedActions: [
      'Separa tus ahorros de compra en una cuenta de alto rendimiento (HYSA) para no mezclarlos con gastos corrientes.',
      'Si recibes ayuda de familiares (gift funds), documenta la carta de regalo formal con extractos bancarios limpios.',
      'Verifica en la calculadora cómo varía tu pago mensual entre un 3.5%, 5% y 10% de pronto.'
    ],
    officialSourceLabel: 'CFPB - Opciones para el pago inicial',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'costos-de-cierre',
    category: 'Costos Reales',
    title: 'Costos de Cierre (Closing Costs)',
    subtitle: 'El gasto entre el 2% y 5% que muchos compradores olvidan presupuestar.',
    summary: 'Además del pronto, necesitarás entre un 2% y un 5% del valor de la propiedad para honorarios legales, impuestos, seguros y cargos del prestamista.',
    explanation: 'Los costos de cierre cubren honorarios del prestamista (originación, suscripción), servicios de terceros (tasación, informe de crédito, búsqueda de títulos, seguro de título) y depósitos anticipados en custodia (escrow para impuestos futuros y póliza de seguro anual).',
    whyItMatters: 'Si compras una casa de $350,000 con un 5% de pronto ($17,500), podrías necesitar entre $7,000 y $14,000 adicionales solo para costos de cierre. Si no los presupuestas, la transacción puede cancelarse en la mesa de cierre.',
    questionsToAsk: [
      '¿Qué porcentaje de los costos de cierre son cargos directos del prestamista frente a impuestos gubernamentales y escrow?',
      '¿Existe posibilidad de negociar créditos del vendedor (seller concessions) para cubrir parte de estos costos?',
      '¿Qué cargos puedo cotizar y comparar libremente (sección C del Loan Estimate)?'
    ],
    recommendedActions: [
      'Exige y analiza la página 2 del Loan Estimate que tu prestamista debe entregarte dentro de los 3 días hábiles tras tu solicitud.',
      'Compara tarifas de compañías de títulos de propiedad (Title Insurance) en tu área.',
      'Pregunta a tu agente si en tu mercado actual los vendedores están aceptando aportar créditos de cierre.'
    ],
    officialSourceLabel: 'CFPB - Desglose de costos de cierre',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'prestamos-fha',
    category: 'Tipos de Hipoteca',
    title: 'Préstamos Respaldados por la FHA',
    subtitle: 'Financiamiento accesible para compradores con puntajes desde 580.',
    summary: 'Asegurados por la Administración Federal de la Vivienda, permiten un pronto desde 3.5% y toleran relaciones de deuda más altas.',
    explanation: 'Los préstamos FHA están diseñados para facilitar el acceso a la vivienda a personas con historial crediticio moderado o ahorros limitados. A cambio de esta flexibilidad, exigen una prima de seguro hipotecario inicial (UFMIP de 1.75%) y una prima mensual (MIP) que generalmente permanece durante toda la vida del préstamo si pones menos del 10% de pronto.',
    whyItMatters: 'Es una de las vías más populares para el primer hogar, pero el seguro MIP vitalicio puede hacer que a largo plazo sea más costoso que un préstamo convencional si no refinancias posteriormente.',
    questionsToAsk: [
      '¿Cuál es el límite máximo de préstamo FHA en mi condado específico?',
      '¿Cuánto pagaré en total por el seguro MIP durante los primeros 5 años?',
      '¿Cuándo y cómo podré refinanciar a un préstamo convencional para eliminar el seguro?'
    ],
    recommendedActions: [
      'Verifica los límites de préstamo FHA para tu condado en el portal de HUD.',
      'Asegúrate de que la vivienda cumpla con los estándares mínimos de habitabilidad de la FHA.',
      'Compara la oferta FHA con un préstamo convencional HomeReady o Home Possible.'
    ],
    officialSourceLabel: 'HUD - Requisitos de préstamos FHA',
    officialSourceUrl: 'https://www.hud.gov/buying/loans',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'prestamos-va',
    category: 'Tipos de Hipoteca',
    title: 'Préstamos Hipotecarios VA',
    subtitle: 'El beneficio estelar con 0% de pronto para veteranos y militares.',
    summary: 'Garantizados por el Departamento de Asuntos de los Veteranos, ofrecen financiamiento al 100% sin seguro hipotecario mensual.',
    explanation: 'Disponible para miembros de las Fuerzas Armadas en servicio activo, veteranos con baja honorable y ciertos cónyuges sobrevivientes. No requieren pronto ni seguro hipotecario mensual (PMI), aunque comúnmente aplican una tarifa de financiamiento (VA Funding Fee) que puede financiarse en el préstamo o eximirse para veteranos con discapacidad por servicio.',
    whyItMatters: 'Representa uno de los programas hipotecarios más ventajosos y económicos en Estados Unidos, con tasas de interés competitivas y condiciones de pago superiores.',
    questionsToAsk: [
      '¿Tengo ya en mano mi Certificado de Elegibilidad (COE)?',
      '¿Califico para la exención del VA Funding Fee por discapacidad de servicio?',
      '¿El tasador asignado por el VA tiene experiencia en la zona donde deseo comprar?'
    ],
    recommendedActions: [
      'Descarga tu COE a través del portal eBenefits o VA.gov.',
      'Elige un oficial de préstamos con amplia experiencia comprobable en cierres de préstamos VA.',
      'Asegúrate de que la propiedad cumpla con los Requisitos Mínimos de Propiedad (MPRs) del VA.'
    ],
    officialSourceLabel: 'U.S. Department of Veterans Affairs - VA Home Loans',
    officialSourceUrl: 'https://www.va.gov/housing-assistance/home-loans/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'prestamos-usda',
    category: 'Tipos de Hipoteca',
    title: 'Préstamos Rurales USDA',
    subtitle: 'Financiamiento al 100% en comunidades suburbanas y rurales elegibles.',
    summary: 'Programa del Departamento de Agricultura que permite comprar sin pago inicial en zonas designadas fuera de grandes metrópolis.',
    explanation: 'Los préstamos de la Sección 502 de Desarrollo Rural del USDA financian el 100% del precio de compra. Para calificar, la vivienda debe ubicarse en un área rural o semi-suburbana elegible (muchas áreas a 25-40 minutos de ciudades califican) y el ingreso del hogar no debe exceder el límite establecido para ese condado.',
    whyItMatters: 'Permite comprar sin desembolsar pronto y con tarifas de garantía anuales considerablemente más bajas que el seguro hipotecario de la FHA.',
    questionsToAsk: [
      '¿La dirección exacta de la casa se encuentra dentro del mapa de elegibilidad geográfica del USDA?',
      '¿El ingreso total combinado de todas las personas que vivirán en la casa cumple con el tope del programa?',
      '¿El prestamista está aprobado por el USDA para procesar préstamos directos o garantizados?'
    ],
    recommendedActions: [
      'Consulta el mapa de elegibilidad de propiedades oficial del USDA ingresando la dirección exacta.',
      'Calcula el ingreso total de tu hogar según las reglas de conteo del USDA.',
      'Asegúrate de que la propiedad esté en condiciones habitables de inmediato.'
    ],
    officialSourceLabel: 'USDA Rural Development - Single Family Housing',
    officialSourceUrl: 'https://www.rd.usda.gov/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'prestamos-convencionales',
    category: 'Tipos de Hipoteca',
    title: 'Préstamos Convencionales Conformes',
    subtitle: 'La opción predilecta para compradores con buen crédito y estabilidad.',
    summary: 'Hipotecas no aseguradas directamente por el gobierno que siguen los lineamientos de Fannie Mae y Freddie Mac.',
    explanation: 'Los préstamos convencionales requieren generalmente un puntaje crediticio mínimo de 620 (idealmente 720+ para mejores tasas). Permiten pagos iniciales desde el 3% para compradores primerizos calificados (programas HomeReady o Home Possible). El seguro hipotecario privado (PMI) se cancela automáticamente al alcanzar el 78% de equidad.',
    whyItMatters: 'A diferencia de los préstamos FHA, el seguro PMI no es permanente. En cuanto pagas el saldo hasta el 80% o la casa sube de valor, puedes solicitar su eliminación, reduciendo drásticamente tu cuota.',
    questionsToAsk: [
      '¿Cumplo con los requisitos de crédito e ingresos para acceder a un pronto del 3% o 5%?',
      '¿Qué opciones de PMI tengo (mensual tradicional, prima única o cubierto por el prestamista)?',
      '¿Cuál es el límite de préstamo conforme (Conforming Loan Limit) en mi área?'
    ],
    recommendedActions: [
      'Optimiza tu crédito por encima de 740 para obtener las tasas más bajas.',
      'Solicita cotizaciones tanto con 3% como con 5% de pronto para comparar el costo del PMI.',
      'Programa recordatorios para solicitar la cancelación del PMI cuando alcances el 20% de plusvalía.'
    ],
    officialSourceLabel: 'Fannie Mae - Recursos para compradores',
    officialSourceUrl: 'https://yourhome.fanniemae.com/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'seguro-hipotecario-pmi',
    category: 'Costos Reales',
    title: 'Seguro Hipotecario Privado (PMI)',
    subtitle: 'Qué es, a quién protege y cómo eliminarlo de tu pago mensual.',
    summary: 'Es un seguro que protege al banco —no a ti— si dejas de pagar, cuando tu pronto es inferior al 20%.',
    explanation: 'El PMI suele costar entre un 0.3% y un 1.5% del monto del préstamo cada año, dividido en 12 pagos mensuales añadidos a tu cuota. Bajo la Ley de Protección a los Propietarios (HPA), tienes derecho a pedir la cancelación del PMI cuando el saldo alcance el 80% del valor original de la vivienda, y el prestamista debe cancelarlo obligatoriamente al 78%.',
    whyItMatters: 'Pagar $150 a $250 al mes por un seguro que no te indemniza es dinero que no construye equidad. Comprender cómo y cuándo cancelarlo te ayuda a planificar tu salida financiera.',
    questionsToAsk: [
      '¿Cuánto dinero exacto pagaré al mes por el PMI en esta cotización?',
      '¿Cuáles son las condiciones y plazos de mi prestamista para solicitar la revaluación de la vivienda y eliminar el PMI?',
      '¿Me conviene pagar más pronto de entrada o aceptar el PMI temporalmente?'
    ],
    recommendedActions: [
      'Lleva un seguimiento del valor de mercado de tu propiedad y del balance de tu deuda.',
      'Cuando alcances el 20% de equidad o realices mejoras sustanciales, solicita por escrito la cancelación del PMI con un nuevo avalúo.',
      'Calcula el PMI en la calculadora para ver su impacto en el presupuesto mensual.'
    ],
    officialSourceLabel: 'CFPB - Qué es el PMI y cómo funciona',
    officialSourceUrl: 'https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'impuestos-de-propiedad',
    category: 'Gastos Continuos',
    title: 'Impuestos de Propiedad (Property Taxes)',
    subtitle: 'El gasto municipal que puede aumentar tu pago cada año.',
    summary: 'Los gobiernos de condado y ciudad financian escuelas y servicios con impuestos basados en el valor tasado de la vivienda.',
    explanation: 'Los impuestos de propiedad varían enormemente entre estados y condados (desde menos del 0.6% en estados como Hawái o Colorado hasta más del 2% en estados como Texas o Nueva Jersey). Al comprar, el condado reevaluará la propiedad basada en el nuevo precio de venta, lo cual puede elevar la factura impositiva por encima de lo que pagaba el dueño anterior.',
    whyItMatters: 'Muchos compradores se basan en los impuestos que pagaba el vendedor anterior (quien quizás gozaba de exenciones por antigüedad o límites de incremento). Tras la venta, la reevaluación puede incrementar el pago mensual en cientos de dólares.',
    questionsToAsk: [
      '¿Cuál es la tasa de millaje (millage rate) y el porcentaje impositivo real del condado?',
      '¿Cuándo y con qué frecuencia el tasador del condado reevalúa el valor catastral?',
      '¿Califico para exención de residencia principal (Homestead Exemption) en mi estado?'
    ],
    recommendedActions: [
      'Visita la página web del tasador de impuestos de la propiedad del condado (County Property Appraiser) para ver el historial tributario.',
      'No confíes ciegamente en el número de impuestos publicado en portales inmobiliarios.',
      'Solicita la exención de Homestead inmediatamente después de mudarte si tu estado la ofrece.'
    ],
    officialSourceLabel: 'CFPB - Comprensión de impuestos y cuenta de custodia',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'seguro-de-vivienda',
    category: 'Gastos Continuos',
    title: 'Seguro de Vivienda (Homeowners Insurance)',
    subtitle: 'Protección para tu patrimonio y requisito ineludible del prestamista.',
    summary: 'Póliza obligatoria que cubre daños a la estructura, contenido y responsabilidad civil ante accidentes.',
    explanation: 'Antes de cerrar el préstamo, el prestamista exigirá comprobar que la vivienda cuenta con póliza de seguro pagada por el primer año. La póliza estándar (HO-3) cubre peligros como fuego, viento, robo y responsabilidad civil, pero excluye explícitamente inundaciones y terremotos, los cuales requieren pólizas separadas.',
    whyItMatters: 'En regiones propensas a huracanes, incendios o tormentas severas, las primas de seguro han aumentado sustancialmente y pueden comprometer tu capacidad de calificación crediticia si el costo mensual se dispara.',
    questionsToAsk: [
      '¿La propiedad está en una zona de riesgo especial de inundación según FEMA?',
      '¿Cuál es el deducible por huracán, granizo o tormenta de viento?',
      '¿El techo actual califica para descuentos por mitigación de viento?'
    ],
    recommendedActions: [
      'Cotiza con al menos 3 compañías de seguros antes de firmar el contrato de compra.',
      'Revisa el mapa de inundaciones oficial de FEMA (msc.fema.gov).',
      'Pregunta si agrupar tu seguro de vivienda con el seguro de auto te otorga descuentos.'
    ],
    officialSourceLabel: 'NAIC - Guía para el seguro de propietarios de vivienda',
    officialSourceUrl: 'https://content.naic.org/consumer/homeowner-insurance.htm',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'asociaciones-hoa',
    category: 'Costos Reales',
    title: 'Asociaciones de Propietarios (HOA)',
    subtitle: 'Reglas comunitarias, cuotas mensuales y riesgos de evaluaciones especiales.',
    summary: 'Las HOA administran áreas comunes y regulan la comunidad, pero imponen costos mensuales y restricciones legales estrictas.',
    explanation: 'Si compras un condominio, townhouse o una casa en una comunidad planificada, probablemente pertenecerá a una HOA. Pagarás una cuota mensual o trimestral obligatoria. La asociación tiene el poder legal de imponer multas e incluso colocar gravámenes (liens) o ejecutar la hipoteca si dejas de pagar.',
    whyItMatters: 'Una cuota de HOA de $300 o $500 al mes reduce tu capacidad de endeudamiento para el préstamo principal tanto como un crédito de auto o deuda personal grande. Además, una HOA mal administrada puede exigir "cuotas especiales" de miles de dólares por reparaciones imprevistas.',
    questionsToAsk: [
      '¿Cuáles son las reservas financieras actuales de la HOA (Reserve Study)?',
      '¿Ha habido o se prevén evaluaciones extraordinarias (special assessments)?',
      '¿Cuáles son las restricciones de alquiler, mascotas, estacionamiento o modificaciones exteriores?'
    ],
    recommendedActions: [
      'Incluye siempre una contingencia de revisión de documentos de la HOA en tu oferta de compra.',
      'Lee las actas de las reuniones de la junta de los últimos 2 años para detectar problemas entre vecinos o fallas en edificios.',
      'Suma siempre la cuota de la HOA a tu cálculo de pago mensual total.'
    ],
    officialSourceLabel: 'CFPB - Qué considerar al comprar en una comunidad con HOA',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'inspecciones-de-propiedad',
    category: 'Debida Diligencia',
    title: 'Inspecciones Técnicas de la Propiedad',
    subtitle: 'Tu mayor escudo para evitar comprar una pesadilla financiera.',
    summary: 'Un inspector independiente examina estructura, techo, plomería, electricidad y aire acondicionado antes del cierre.',
    explanation: 'La inspección de vivienda es una evaluación visual profunda realizada por un profesional contratado por ti. No debe confundirse con la tasación del banco. El inspector identifica problemas de seguridad, desgaste mayor, defectos constructivos y reparaciones inmediatas necesarias.',
    whyItMatters: 'Un gasto de $400 a $600 en una inspección puede descubrir un techo dañado de $15,000, un sistema de aire acondicionado defectuoso de $8,000 o problemas de fundación que justifiquen renegociar el precio o retirarte del contrato.',
    questionsToAsk: [
      '¿El inspector cuenta con licencia estatal activa y seguro de errores u omisiones?',
      '¿Puedo acompañar al inspector durante las 3 o 4 horas de la revisión?',
      '¿Se requieren inspecciones especializadas adicionales (termitas, fosa séptica, drenaje con cámara, moho)?'
    ],
    recommendedActions: [
      'Nunca renuncies a la contingencia de inspección a menos que seas un contratista o inversionista experimentado.',
      'Asiste personalmente al final de la inspección para que el especialista te muestre cómo funcionan los apagadores principales y válvulas de agua.',
      'Utiliza los hallazgos críticos para solicitar reparaciones o créditos al vendedor.'
    ],
    officialSourceLabel: 'HUD - Por qué debes contratar una inspección de vivienda',
    officialSourceUrl: 'https://www.hud.gov/program_offices/housing/sfh/insp/inspfaq',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'tasaciones-appraisals',
    category: 'Debida Diligencia',
    title: 'La Tasación (Appraisal)',
    subtitle: 'Cómo el banco confirma que la propiedad vale lo que ofreciste pagar.',
    summary: 'Un tasador independiente certificado calcula el valor de mercado actual de la casa para proteger el préstamo del banco.',
    explanation: 'El banco solo prestará dinero con base en el menor entre el precio de compra acordado o el valor tasado. Si el tasador determina que la casa vale menos que el precio del contrato (brecha de tasación o appraisal gap), el comprador debe cubrir la diferencia en efectivo, renegociar con el vendedor o retirarse usando la contingencia.',
    whyItMatters: 'Si ofreces $320,000 pero la casa se tasa en $300,000, el banco solo financiará sobre los $300,000. Tendrás que aportar $20,000 adicionales de tu bolsillo si no incluiste una contingencia de tasación.',
    questionsToAsk: [
      '¿Mi oferta incluye una contingencia de tasación que me proteja si el avalúo viene por debajo?',
      '¿Qué ventas comparables utilizó el tasador para emitir su veredicto?',
      '¿Existe derecho a apelar la tasación (Reconsideration of Value - ROV) si hubo errores de metraje?'
    ],
    recommendedActions: [
      'Mantén siempre la contingencia de tasación para no arriesgar tu depósito de garantía (earnest money).',
      'Revisa que el tasador haya registrado correctamente el número de habitaciones, baños y metros cuadrados habitables.',
      'Negocia con el vendedor reducir el precio si el avalúo resulta menor al pactado.'
    ],
    officialSourceLabel: 'CFPB - Guía sobre la tasación de la propiedad',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'negociacion-vendedor',
    category: 'Proceso de Compra',
    title: 'Negociación Inteligente con el Vendedor',
    subtitle: 'Estrategias para obtener créditos, reparaciones y mejores términos.',
    summary: 'Comprar casa no es solo ofrecer un precio; las contingencias, fechas y concesiones de cierre definen el éxito financiero.',
    explanation: 'La negociación no termina al ser aceptada la oferta inicial. Tras la inspección y la tasación, se abre una ventana para negociar créditos para costos de cierre (seller concessions), reducción del precio de venta o reparaciones efectuadas por profesionales con licencias antes de la entrega.',
    whyItMatters: 'Lograr $5,000 o $10,000 en créditos del vendedor significa que tendrás que aportar esa misma cantidad menos de tu propio efectivo en el día del cierre, conservando tu liquidez para emergencias.',
    questionsToAsk: [
      '¿Cuánto tiempo lleva la propiedad en el mercado y qué tan motivado está el vendedor?',
      '¿Prefiero que el vendedor repare algo o que me dé un crédito de dinero para contratar a mis propios técnicos de confianza?',
      '¿Cuál es el límite máximo de créditos del vendedor permitido por mi tipo de préstamo?'
    ],
    recommendedActions: [
      'Prefiere créditos monetarios o reducción de precio antes que pedirle al vendedor que haga reparaciones apresuradas.',
      'Presenta solicitudes respaldadas por presupuestos formales de contratistas con licencia.',
      'Trabaja en equipo con un agente inmobiliario que defienda firmemente tus intereses financieros.'
    ],
    officialSourceLabel: 'CFPB - Negociación y términos del préstamo',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'loan-estimate',
    category: 'Documentos Oficiales',
    title: 'El Loan Estimate (Estimado del Préstamo)',
    subtitle: 'El documento de 3 páginas más importante al solicitar una hipoteca.',
    summary: 'Documento estandarizado por ley federal que todos los prestamistas deben entregarte para que compares costos sin engaños.',
    explanation: 'Por regulación de la CFPB, cualquier prestamista debe emitir un Loan Estimate dentro de los 3 días hábiles posteriores a que entregues los 6 datos clave de tu solicitud. Detalla la tasa de interés, pago mensual proyectado, costos de cierre y si la tasa está bloqueada (rate lock).',
    whyItMatters: 'Al tener un formato idéntico obligatorio para todos los bancos, te permite colocar dos o tres Loan Estimates lado a lado y ver exactamente quién te cobra comisiones innecesarias o tasas ocultas.',
    questionsToAsk: [
      '¿La tasa mostrada está formalmente bloqueada y hasta qué fecha exacta?',
      '¿Los cargos de la Sección A (cargos del prestamista) incluyen puntos de descuento (points)?',
      '¿Cuál es la Tasa Anual Efectiva (APR) y por qué difiere de la tasa de interés nominal?'
    ],
    recommendedActions: [
      'Solicita Loan Estimates a 3 prestamistas diferentes en la misma semana para comparar manzanas con manzanas.',
      'Examina con lupa la Sección A (Origination Charges), pues esos son los cargos puros del prestamista.',
      'Revisa la página 3 para ver la comparación del APR y el porcentaje de interés total pagado (TIP).'
    ],
    officialSourceLabel: 'CFPB - Explorador interactivo del Loan Estimate',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'closing-disclosure',
    category: 'Documentos Oficiales',
    title: 'El Closing Disclosure (Declaración de Cierre)',
    subtitle: 'La regla obligatoria de 3 días para verificar cada centavo final.',
    summary: 'Documento legal de 5 páginas con las cifras exactas y definitivas que firmarás en el cierre de tu compraventa.',
    explanation: 'El prestamista está obligado por ley federal a entregarte el Closing Disclosure al menos 3 días hábiles antes de que firmes el cierre. Debes comparar minuciosamente este documento con tu Loan Estimate más reciente para confirmar que no aparezcan cargos nuevos no autorizados.',
    whyItMatters: 'Es tu última oportunidad legal para frenar la transacción y corregir errores en la tasa, monto de pronto, créditos de vendedor o cálculo de impuestos.',
    questionsToAsk: [
      '¿Por qué alguna cifra de los costos de cierre aumentó respecto al Loan Estimate?',
      '¿El monto de "Cash to Close" coincide al centavo con lo que tengo preparado en mi cuenta bancaria?',
      '¿Están acreditados los depósitos de arras (earnest money) que entregué al principio?'
    ],
    recommendedActions: [
      'Usa la regla de los 3 días completos para leer cada renglón sin apresurarte.',
      'Si una cifra no te cuadra, llama inmediatamente al oficial de préstamos antes del día de la firma.',
      'Guarda una copia digital y física permanente de este documento para tus declaraciones de impuestos.'
    ],
    officialSourceLabel: 'CFPB - Explorador del Closing Disclosure',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'casas-nuevas-constructores',
    category: 'Opciones de Vivienda',
    title: 'Casas Nuevas e Incentivos de Constructores',
    subtitle: 'Créditos atractivos pero con cláusulas y costos ocultos.',
    summary: 'Los constructores suelen ofrecer rebajas de tasa o créditos de cierre, pero exigen cautela y representación independiente.',
    explanation: 'Las compañías constructoras frecuentemente atraen compradores ofreciendo tasas de interés rebajadas (rate buydowns) o $10,000-$20,000 en costos de cierre si utilizas a su prestamista afiliado. Aunque pueden ser ofertas muy ventajosas, los precios base de las viviendas pueden estar inflados y las opciones de acabados suelen sumar costos considerables.',
    whyItMatters: 'El agente de ventas en la oficina modelo representa legalmente al constructor, no a ti. Necesitas a tu propio agente y a tu propio inspector independiente para vigilar las fases de construcción.',
    questionsToAsk: [
      '¿Qué incluye el precio base y cuáles son las cuotas adicionales por lote o mejoras (lot premium)?',
      '¿Cuáles son las garantías estructurales y de sistemas (garantía 1-2-10 años)?',
      '¿Puedo contratar inspecciones independientes en fase de pre-drywall (paredes abiertas) y final?'
    ],
    recommendedActions: [
      'Lleva a tu propio agente inmobiliario desde la primera visita al desarrollo nuevo.',
      'Contrata un inspector independiente en tres momentos: antes de verter concreto, antes del drywall y antes del cierre final.',
      'Compara la oferta del prestamista del constructor con prestamistas externos para asegurar que el descuento de tasa sea real.'
    ],
    officialSourceLabel: 'FTC - Consejos para comprar viviendas de obra nueva',
    officialSourceUrl: 'https://consumer.ftc.gov/',
    lastUpdated: 'Octubre 2024'
  },
  {
    id: 'errores-comunes-compradores',
    category: 'Educación Preventiva',
    title: 'Los 10 Errores Más Costosos de los Compradores',
    subtitle: 'Lo que nunca debes hacer durante el proceso de compra de casa.',
    summary: 'Aprende de las equivocaciones más frecuentes para proteger tus ahorros, tu paz mental y tu aprobación hipotecaria.',
    explanation: 'Muchos compradores pierden su casa soñada o sufren estrés financiero extremo por descuidos evitables como abrir nuevas tarjetas de crédito durante el proceso, cambiar de trabajo, no inspeccionar la vivienda o agotar hasta el último centavo de sus ahorros sin dejar reservas.',
    whyItMatters: 'Comprar una vivienda es probablemente el compromiso financiero más importante de tu vida. Evitar estos tropiezos te garantiza una transición segura y sin sorpresas desagradables.',
    questionsToAsk: [
      '¿Tengo al menos de 3 a 6 meses de gastos ahorrados tras pagar el pronto y costos de cierre?',
      '¿He consultado a mi prestamista antes de realizar cualquier movimiento atípico en mis cuentas bancarias?',
      '¿Compro la casa porque encaja en mi presupuesto o porque me dejé llevar por la emoción?'
    ],
    recommendedActions: [
      'No compres muebles a crédito, autos ni solicites préstamos hasta después de tener las llaves en mano.',
      'No hagas depósitos en efectivo no justificables en tu cuenta bancaria durante el trámite hipotecario.',
      'Sigue el lema de Perquin de León: "No compres solamente porque el banco te apruebe. Compra porque los números tienen sentido para ti."'
    ],
    officialSourceLabel: 'CFPB - Lista de verificación para el comprador',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'Octubre 2024'
  }
];
