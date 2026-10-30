import { EducationalArticle, Language } from '../types';

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

export const EDUCATIONAL_ARTICLES_EN: EducationalArticle[] = [
  {
    id: 'credito-hipotecario',
    category: 'Financing & Credit',
    title: 'Mortgage Credit in the U.S.',
    subtitle: 'Your FICO score and how it directly impacts your monthly payment.',
    summary: 'Your credit score is more than just a number: it determines the interest rate banks offer you and how much you pay every month for 30 years.',
    explanation: 'Mortgage lenders use specialized FICO score versions (typically FICO 2, 4, and 5) from the three bureaus: Equifax, Experian, and TransUnion. If you apply with a co-borrower, lenders usually use the lower of the two middle scores.',
    whyItMatters: 'A difference of just 40 points in your credit score can mean an interest rate 0.5% to 1% lower. On a $350,000 loan, a 0.75% rate difference can save you $50,000 to $60,000+ in interest over the life of the loan.',
    questionsToAsk: [
      'Which exact middle FICO score is the lender using to qualify me?',
      'Are there disputed accounts or errors on my report that I should fix before submitting a formal application?',
      'How many points would my score increase if I pay down a specific credit card?'
    ],
    recommendedActions: [
      'Get your free official credit reports at AnnualCreditReport.com.',
      'Keep utilization on every credit card below 30% (ideally under 10%).',
      'Do not close old accounts or apply for new credit cards within 12 months before buying.'
    ],
    officialSourceLabel: 'CFPB - Credit Reports and Scores',
    officialSourceUrl: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'pronto-down-payment',
    category: 'Savings & Budget',
    title: 'The Down Payment',
    subtitle: '20% myths vs. real options starting at 3% or 3.5%.',
    summary: 'You do not need 20% cash to buy a home in the U.S., although a larger down payment lowers your monthly bill and eliminates PMI.',
    explanation: 'The down payment is the portion of the purchase price you pay out-of-pocket at closing. While 20% avoids Private Mortgage Insurance (PMI), conventional loans start at 3% down, FHA loans require 3.5%, and VA or USDA loans offer 0% down payment options.',
    whyItMatters: 'Waiting years to save 20% can price you out of a rising market. However, putting too little down can push your monthly payment higher than your household budget can comfortably sustain.',
    questionsToAsk: [
      'What is the minimum down payment percentage required for the loan type that fits me best?',
      'Where will the funds come from (personal savings, family gift funds, or a DPA program)?',
      'How much will remain in my emergency fund after paying the down payment?'
    ],
    recommendedActions: [
      'Keep your homebuying savings in a dedicated high-yield savings account (HYSA) separate from daily spending.',
      'If receiving family gift funds, prepare a formal gift letter and clean bank statements.',
      'Test 3.5%, 5%, and 10% down in the calculator to compare how your monthly payment changes.'
    ],
    officialSourceLabel: 'CFPB - Down Payment Options',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'costos-de-cierre',
    category: 'True Costs',
    title: 'Closing Costs',
    subtitle: 'The 2% to 5% expense many buyers forget to budget for.',
    summary: 'In addition to your down payment, you will need 2% to 5% of the home price for legal fees, taxes, insurance, and lender charges.',
    explanation: 'Closing costs cover lender fees (origination, underwriting), third-party services (appraisal, credit report, title search, title insurance), and prepaid escrow reserves (property taxes and annual homeowners insurance).',
    whyItMatters: 'If you buy a $350,000 home with 5% down ($17,500), you may need an extra $7,000 to $14,000 just for closing costs. Failing to budget for them can derail your purchase at the closing table.',
    questionsToAsk: [
      'What percentage of closing costs are direct lender charges vs. government taxes and escrow prepaids?',
      'Can we negotiate seller concessions to cover part or all of these closing costs?',
      'Which services can I shop for independently (Section C of the Loan Estimate)?'
    ],
    recommendedActions: [
      'Review Page 2 of the Loan Estimate your lender must provide within 3 business days of application.',
      'Shop around and compare Title Insurance company fees in your area.',
      'Ask your agent whether sellers in your local market are currently offering closing cost credits.'
    ],
    officialSourceLabel: 'CFPB - Closing Costs Breakdown',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'prestamos-fha',
    category: 'Mortgage Types',
    title: 'FHA-Insured Loans',
    subtitle: 'Accessible financing for buyers with credit scores starting at 580.',
    summary: 'Insured by the Federal Housing Administration, allowing a 3.5% down payment and more flexible debt-to-income ratios.',
    explanation: 'FHA loans help buyers with moderate credit scores or limited savings qualify for a home. In exchange, they require an Upfront Mortgage Insurance Premium (UFMIP of 1.75%) and a monthly Mortgage Insurance Premium (MIP) that typically lasts for the life of the loan if you put less than 10% down.',
    whyItMatters: 'It is one of the most popular entry paths for first-time buyers, but lifetime MIP can make it more expensive long-term than a conventional loan unless you refinance later.',
    questionsToAsk: [
      'What is the maximum FHA loan limit in my specific county?',
      'How much total MIP will I pay over the first 5 years?',
      'When and how can I refinance into a conventional loan to remove mortgage insurance?'
    ],
    recommendedActions: [
      'Check the FHA loan limits for your county on HUD.gov.',
      'Ensure the property meets FHA minimum health and safety standards.',
      'Compare the FHA quote side-by-side with a Conventional HomeReady or Home Possible loan.'
    ],
    officialSourceLabel: 'HUD - FHA Loan Requirements',
    officialSourceUrl: 'https://www.hud.gov/buying/loans',
    lastUpdated: 'October 2024'
  },
  {
    id: 'prestamos-va',
    category: 'Mortgage Types',
    title: 'VA Home Loans',
    subtitle: 'The premier 0% down benefit for veterans and service members.',
    summary: 'Guaranteed by the Department of Veterans Affairs, offering 100% financing with no monthly mortgage insurance.',
    explanation: 'Available to active-duty service members, honorably discharged veterans, and eligible surviving spouses. VA loans require no down payment and no monthly PMI, though a one-time VA Funding Fee usually applies (which can be financed into the loan or waived for service-connected disabilities).',
    whyItMatters: 'It is one of the most powerful and cost-effective mortgage programs in the United States, featuring competitive interest rates and buyer-friendly terms.',
    questionsToAsk: [
      'Do I already have my Certificate of Eligibility (COE) in hand?',
      'Do I qualify for a VA Funding Fee exemption due to service-connected disability?',
      'Does my loan officer have extensive experience closing VA loans?'
    ],
    recommendedActions: [
      'Download your COE through VA.gov.',
      'Work with a lender experienced in VA underwriting and appraisal standards.',
      'Make sure the property satisfies VA Minimum Property Requirements (MPRs).'
    ],
    officialSourceLabel: 'U.S. Department of Veterans Affairs - VA Home Loans',
    officialSourceUrl: 'https://www.va.gov/housing-assistance/home-loans/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'prestamos-usda',
    category: 'Mortgage Types',
    title: 'USDA Rural Development Loans',
    subtitle: '100% financing in eligible suburban and rural communities.',
    summary: 'U.S. Department of Agriculture program allowing 0% down payment purchases in designated areas outside major metro cores.',
    explanation: 'USDA Section 502 loans finance 100% of the purchase price. To qualify, the home must be located in an eligible rural or suburban area (many towns 25–40 minutes outside cities qualify) and total household income must not exceed the county limit.',
    whyItMatters: 'Allows qualified buyers to purchase with zero down payment and significantly lower annual guarantee fees than FHA mortgage insurance.',
    questionsToAsk: [
      'Is the exact property address inside the official USDA geographic eligibility map?',
      'Does the combined income of all adult household members meet the county cap?',
      'Is the lender approved to process USDA Guaranteed or Direct loans?'
    ],
    recommendedActions: [
      'Look up the property address on the official USDA property eligibility map.',
      'Calculate total household income according to USDA guidelines.',
      'Verify that the property is move-in ready.'
    ],
    officialSourceLabel: 'USDA Rural Development - Single Family Housing',
    officialSourceUrl: 'https://www.rd.usda.gov/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'prestamos-convencionales',
    category: 'Mortgage Types',
    title: 'Conforming Conventional Loans',
    subtitle: 'The go-to option for buyers with strong credit and stable income.',
    summary: 'Mortgages not directly backed by a government agency that follow Fannie Mae and Freddie Mac guidelines.',
    explanation: 'Conventional loans typically require a minimum 620 credit score (720+ for best pricing). They allow down payments as low as 3% for qualified first-time buyers (HomeReady or Home Possible). Private Mortgage Insurance (PMI) automatically cancels once your loan balance reaches 78% of the original value.',
    whyItMatters: 'Unlike FHA loans, PMI on a conventional loan is temporary. Once you reach 20% equity, you can remove PMI and permanently lower your monthly payment.',
    questionsToAsk: [
      'Do I meet the credit and income requirements for 3% or 5% down conventional programs?',
      'What PMI options are available (monthly, single-premium, or lender-paid)?',
      'What is the Conforming Loan Limit in my county?'
    ],
    recommendedActions: [
      'Build your credit score above 740 to unlock top-tier conventional interest rates.',
      'Request quotes at both 3% and 5% down to compare PMI pricing.',
      'Set a reminder to request PMI cancellation once you reach 20% equity.'
    ],
    officialSourceLabel: 'Fannie Mae - Homebuyer Resources',
    officialSourceUrl: 'https://yourhome.fanniemae.com/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'seguro-hipotecario-pmi',
    category: 'True Costs',
    title: 'Private Mortgage Insurance (PMI)',
    subtitle: 'What it is, whom it protects, and how to eliminate it.',
    summary: 'Insurance that protects the lender—not you—against default when your down payment is less than 20%.',
    explanation: 'PMI typically costs between 0.3% and 1.5% of the loan amount annually, split into 12 monthly installments. Under the Homeowners Protection Act (HPA), you have the right to request PMI cancellation once your loan balance reaches 80% of the original home value, and lenders must terminate it automatically at 78%.',
    whyItMatters: 'Paying $150 to $250 per month for insurance that does not cover you builds zero equity. Understanding how and when to cancel it helps you plan your financial exit.',
    questionsToAsk: [
      'How much exact dollar amount will I pay per month for PMI on this loan quote?',
      'What are my lender’s rules and timelines to reappraise the home and drop PMI early?',
      'Does it make more sense to put more money down upfront or pay PMI temporarily?'
    ],
    recommendedActions: [
      'Track your home’s market value and remaining principal balance.',
      'Once you hit 20% equity through payments or home appreciation, request PMI removal in writing.',
      'Include PMI in the calculator to see its full impact on your monthly budget.'
    ],
    officialSourceLabel: 'CFPB - What is Private Mortgage Insurance?',
    officialSourceUrl: 'https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'impuestos-de-propiedad',
    category: 'Ongoing Expenses',
    title: 'Property Taxes',
    subtitle: 'The local government tax that can increase your monthly payment every year.',
    summary: 'County and municipal governments fund schools and public services through taxes based on your home’s assessed value.',
    explanation: 'Property tax rates vary widely across states and counties (from under 0.6% in states like Hawaii or Colorado to over 2% in states like Texas or New Jersey). When you buy a home, the county will reassess the property at the new purchase price, which often raises the tax bill substantially above what the previous owner paid.',
    whyItMatters: 'Many buyers rely on the seller’s old tax bill (which may have been capped by long-term homestead exemptions). After closing, tax reassessment can increase your monthly escrow payment by hundreds of dollars.',
    questionsToAsk: [
      'What is the actual millage rate and effective tax percentage in this county?',
      'When and how often does the county assessor reassess property values?',
      'Do I qualify for a Homestead Exemption on my primary residence?'
    ],
    recommendedActions: [
      'Check the local County Property Appraiser website to inspect the property tax history.',
      'Never rely solely on the historical tax figure listed on real estate portals.',
      'File for your Homestead Exemption immediately after moving in if offered in your state.'
    ],
    officialSourceLabel: 'CFPB - Property Taxes and Escrow',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'seguro-de-vivienda',
    category: 'Ongoing Expenses',
    title: 'Homeowners Insurance',
    subtitle: 'Protecting your equity and satisfying lender requirements.',
    summary: 'Mandatory hazard insurance policy covering structural damage, personal belongings, and personal liability.',
    explanation: 'Before closing, your lender will require proof of a paid first-year homeowners insurance policy. A standard HO-3 policy covers fire, wind, theft, and liability, but explicitly excludes floods and earthquakes, which require separate policies.',
    whyItMatters: 'In areas prone to hurricanes, wildfires, or severe storms, insurance premiums have risen sharply and can impact your debt-to-income ratio and mortgage qualification.',
    questionsToAsk: [
      'Is the property located in a FEMA Special Flood Hazard Area?',
      'What is the deductible for hurricane, hail, or windstorm damage?',
      'Does the current roof qualify for wind mitigation insurance discounts?'
    ],
    recommendedActions: [
      'Get quotes from at least 3 insurance carriers during your inspection period.',
      'Check the official FEMA flood map (msc.fema.gov).',
      'Ask whether bundling home and auto insurance lowers your premium.'
    ],
    officialSourceLabel: 'NAIC - Consumers Guide to Home Insurance',
    officialSourceUrl: 'https://content.naic.org/consumer/homeowner-insurance.htm',
    lastUpdated: 'October 2024'
  },
  {
    id: 'asociaciones-hoa',
    category: 'True Costs',
    title: 'Homeowners Associations (HOA)',
    subtitle: 'Community rules, monthly dues, and special assessment risks.',
    summary: 'HOAs maintain common areas and enforce community standards, but impose mandatory monthly fees and strict legal rules.',
    explanation: 'If you buy a condo, townhouse, or home in a planned development, it likely belongs to an HOA. You must pay monthly or quarterly dues. The HOA has legal authority to levy fines, place liens on your property, or even foreclose for unpaid dues.',
    whyItMatters: 'A $300 or $500 monthly HOA fee reduces your borrowing power just like a car loan. Furthermore, an underfunded HOA can impose surprise "special assessments" of thousands of dollars for major repairs.',
    questionsToAsk: [
      'How well funded are the HOA’s financial reserves (Reserve Study)?',
      'Have there been—or are there planned—special assessments?',
      'What are the rules regarding rentals, pets, parking, and exterior changes?'
    ],
    recommendedActions: [
      'Always include an HOA document review contingency in your purchase offer.',
      'Read the last 2 years of HOA board meeting minutes to spot recurring structural or financial issues.',
      'Always include the full HOA fee in your monthly housing cost calculation.'
    ],
    officialSourceLabel: 'CFPB - Buying in an HOA Community',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'inspecciones-de-propiedad',
    category: 'Due Diligence',
    title: 'Independent Home Inspections',
    subtitle: 'Your strongest shield against buying a financial money pit.',
    summary: 'An independent inspector examines the structure, roof, plumbing, electrical panel, and HVAC before you close.',
    explanation: 'A home inspection is a thorough visual evaluation performed by a professional hired by you—never confuse it with the bank appraisal. The inspector identifies safety hazards, major wear and tear, construction defects, and needed repairs.',
    whyItMatters: 'Spending $400 to $600 on an inspection can uncover a failing $15,000 roof, an $8,000 HVAC issue, or foundation problems that allow you to renegotiate or walk away safely.',
    questionsToAsk: [
      'Does the inspector hold an active state license and Errors & Omissions insurance?',
      'Can I attend the inspection in person to walk through the findings?',
      'Are specialized inspections needed (termite/WDO, septic tank, sewer scope, mold, radon)?'
    ],
    recommendedActions: [
      'Never waive your inspection contingency unless you are a seasoned builder or investor.',
      'Attend the final hour of the inspection so the inspector can show you main shutoff valves and breaker panels.',
      'Use critical findings to request seller credits or price reductions.'
    ],
    officialSourceLabel: 'HUD - Ten Important Questions to Ask Your Home Inspector',
    officialSourceUrl: 'https://www.hud.gov/program_offices/housing/sfh/insp/inspfaq',
    lastUpdated: 'October 2024'
  },
  {
    id: 'tasaciones-appraisals',
    category: 'Due Diligence',
    title: 'The Home Appraisal',
    subtitle: 'How the lender confirms the property is worth the contract price.',
    summary: 'A licensed independent appraiser determines the fair market value of the home to protect the lender’s collateral.',
    explanation: 'The bank will only lend based on the lesser of the purchase price or the appraised value. If the appraisal comes in lower than the contract price (an appraisal gap), the buyer must pay the difference in cash, renegotiate the price with the seller, or cancel under an appraisal contingency.',
    whyItMatters: 'If you offer $320,000 but the house appraises at $300,000, the lender bases the loan on $300,000. Without an appraisal contingency, you would have to bring an extra $20,000 cash to closing.',
    questionsToAsk: [
      'Does my offer include an appraisal contingency protecting my earnest money deposit?',
      'Which comparable sales did the appraiser use to value the property?',
      'Can we submit a Reconsideration of Value (ROV) if the report contains factual errors?'
    ],
    recommendedActions: [
      'Keep the appraisal contingency in your contract to protect your earnest money.',
      'Verify that the appraiser recorded the correct bedroom/bathroom count and square footage.',
      'Negotiate a price reduction or split the difference with the seller if the appraisal comes in low.'
    ],
    officialSourceLabel: 'CFPB - Home Appraisal Guide',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'negociacion-vendedor',
    category: 'Buying Process',
    title: 'Smart Negotiation with the Seller',
    subtitle: 'Strategies to secure closing credits, repairs, and favorable terms.',
    summary: 'Buying a home is about more than price; contingencies, timelines, and seller concessions define a smart deal.',
    explanation: 'Negotiation does not end when your initial offer is accepted. After the home inspection and appraisal, you have a window to negotiate seller concessions toward closing costs, price reductions, or repairs completed by licensed contractors prior to closing.',
    whyItMatters: 'Securing $5,000 to $10,000 in seller credits directly reduces the cash you need to bring to closing, preserving your personal savings for emergencies.',
    questionsToAsk: [
      'How many days has the property been on the market and how motivated is the seller?',
      'Is it better to ask for a closing cost credit so I can hire my own trusted contractors?',
      'What is the maximum seller concession percentage allowed by my loan program?'
    ],
    recommendedActions: [
      'Prefer closing credits or price reductions over asking the seller to perform rushed repairs.',
      'Support repair requests with written estimates from licensed professionals.',
      'Work with a buyer’s agent who actively protects your financial bottom line.'
    ],
    officialSourceLabel: 'CFPB - Negotiating Loan and Purchase Terms',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'loan-estimate',
    category: 'Official Documents',
    title: 'The Loan Estimate',
    subtitle: 'The most important 3-page document when shopping for a mortgage.',
    summary: 'Federally standardized form that every lender must give you so you can compare loan offers apples-to-apples.',
    explanation: 'By CFPB regulation, lenders must issue a Loan Estimate within 3 business days of receiving your 6 key application pieces. It clearly spells out the interest rate, projected monthly payment, closing costs, and whether your rate is locked.',
    whyItMatters: 'Because every lender must use the exact same format, you can place three Loan Estimates side-by-side and immediately spot junk fees or inflated rates.',
    questionsToAsk: [
      'Is the interest rate officially locked, and when does the rate lock expire?',
      'Do Section A Origination Charges include discount points?',
      'What is the Annual Percentage Rate (APR) and why does it differ from the note rate?'
    ],
    recommendedActions: [
      'Request Loan Estimates from at least 3 lenders within the same week to compare fairly.',
      'Scrutinize Section A (Origination Charges), which represents the lender’s direct fees.',
      'Check Page 3 to compare the APR and Total Interest Percentage (TIP).'
    ],
    officialSourceLabel: 'CFPB - Interactive Loan Estimate Explorer',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'closing-disclosure',
    category: 'Official Documents',
    title: 'The Closing Disclosure',
    subtitle: 'The mandatory 3-day rule to verify every final dollar before signing.',
    summary: '5-page legal document containing the exact final numbers you will sign at the closing table.',
    explanation: 'Federal law requires your lender to deliver the Closing Disclosure at least 3 business days before closing. You must compare it carefully against your most recent Loan Estimate to ensure no unauthorized fees were added.',
    whyItMatters: 'This is your final legal window to pause and correct any discrepancies in interest rate, down payment, seller credits, or escrow calculations.',
    questionsToAsk: [
      'Why did any closing cost line item increase compared to the Loan Estimate?',
      'Does the final "Cash to Close" match the exact amount I have ready in my bank account?',
      'Are my earnest money deposit and agreed seller credits properly credited?'
    ],
    recommendedActions: [
      'Use the full 3-day review period to read every page without rushing.',
      'If any figure looks wrong, call your loan officer and settlement agent immediately before closing day.',
      'Keep a permanent digital and paper copy for your future tax records.'
    ],
    officialSourceLabel: 'CFPB - Closing Disclosure Explorer',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'casas-nuevas-constructores',
    category: 'Housing Options',
    title: 'New Construction & Builder Incentives',
    subtitle: 'Attractive rate buydowns and credits that require independent review.',
    summary: 'Builders often offer rate buydowns or closing credits, but you still need independent representation and inspections.',
    explanation: 'Homebuilders frequently attract buyers by offering interest rate buydowns or $10,000–$20,000 toward closing costs if you use their affiliated lender. While these incentives can be valuable, base prices and design upgrades can add up quickly.',
    whyItMatters: 'The sales representative in the model home legally represents the builder, not you. You need your own buyer’s agent and your own independent home inspector to verify construction quality.',
    questionsToAsk: [
      'What is included in the base price vs. lot premiums and design center upgrades?',
      'What structural and mechanical warranties are included (e.g., 1-2-10 year warranty)?',
      'Can I hire an independent inspector for pre-drywall and final walkthrough inspections?'
    ],
    recommendedActions: [
      'Bring your own buyer’s agent on your very first visit to the builder’s model center.',
      'Hire an independent inspector at pre-drywall stage and before final closing.',
      'Compare the builder’s lender quote against an outside lender to verify that the incentive is truly a net savings.'
    ],
    officialSourceLabel: 'FTC - Consumer Advice on Home Buying',
    officialSourceUrl: 'https://consumer.ftc.gov/',
    lastUpdated: 'October 2024'
  },
  {
    id: 'errores-comunes-compradores',
    category: 'Preventive Education',
    title: 'The 10 Most Costly Homebuyer Mistakes',
    subtitle: 'What you must never do while in the middle of buying a house.',
    summary: 'Learn from common pitfalls to protect your savings, your peace of mind, and your final mortgage approval.',
    explanation: 'Many buyers lose their dream home or suffer financial stress due to avoidable mistakes like financing furniture or a car before closing, switching jobs mid-process, skipping the home inspection, or draining every dollar of savings with zero emergency reserves.',
    whyItMatters: 'Buying a home is likely the largest financial commitment of your life. Avoiding these traps ensures a smooth closing and sustainable homeownership.',
    questionsToAsk: [
      'Will I still have 3 to 6 months of living expenses saved after paying the down payment and closing costs?',
      'Have I checked with my loan officer before making any unusual bank transfers?',
      'Am I buying this home because the numbers make sense for my budget, or out of emotion?'
    ],
    recommendedActions: [
      'Do not finance furniture, cars, or open new credit cards until after closing and keys are in hand.',
      'Avoid undocumented cash deposits into your bank accounts during underwriting.',
      'Follow Perquin de León’s guiding principle: "Don’t buy just because the bank approves you. Buy because the numbers make sense for you."'
    ],
    officialSourceLabel: 'CFPB - Homebuyer Checklist & Resources',
    officialSourceUrl: 'https://www.consumerfinance.gov/owning-a-home/',
    lastUpdated: 'October 2024'
  }
];

export function getEducationalArticles(lang: Language = 'es'): EducationalArticle[] {
  return lang === 'en' ? EDUCATIONAL_ARTICLES_EN : EDUCATIONAL_ARTICLES;
}
