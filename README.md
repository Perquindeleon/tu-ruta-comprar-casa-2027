# Tu Ruta para Comprar Casa en 2027
## Proyecto Oficial: Perquin de León
> *"No compres solamente porque el banco te apruebe. Compra porque los números tienen sentido para ti."*

Una aplicación web educativa, interactiva, rápida y sin recopilación de datos personales, diseñada específicamente para ayudar a la comunidad hispanohablante en Estados Unidos a prepararse financieramente para adquirir una vivienda en 2027.

---

## 🎯 1. Características Principales

1. **Módulo A — Diagnóstico del Comprador:**
   - 9 preguntas intuitivas sobre plazo de compra, estado de crédito, ahorros, deudas y presupuesto.
   - Evaluación en 3 categorías de madurez sin generar puntajes de crédito ficticios ni prometer preaprobaciones.
   - Hallazgos detallados y recomendaciones de acción concretas.

2. **Módulo B — Calculadora del Costo Real:**
   - Cálculo exacto de cuota mensual con fórmula amortizada estándar:
     $$M = P \times \frac{r(1+r)^n}{(1+r)^n - 1}$$
   - Soporte para tasa del 0%, valores vacíos o entradas numéricas atípicas.
   - Desglose mensual transparente: Capital e Intereses, Impuestos de propiedad (Property Taxes), Seguro de vivienda (Homeowners Insurance), Seguro hipotecario privado (PMI/MIP), HOA y seguros especiales.
   - Desglose de **Efectivo Inicial Necesario (Cash to Close)**: Pronto, Costos de cierre (2% a 5% de referencia o monto fijo), Inspección técnica, Tasación (Appraisal), Mudanza, Reparaciones iniciales y Fondo de reserva para emergencias.
   - **Simulador de Sensibilidad de Tasas:** Comparación simultánea de 3 escenarios de tasas con diferencias mensuales, anuales y a lo largo de la vida del préstamo.

3. **Módulo C — Checklist Interactivo:**
   - 37 tareas divididas en 4 etapas:
     - Etapa 1: Antes de Buscar Casa.
     - Etapa 2: Antes de Hacer una Oferta.
     - Etapa 3: Después de Aceptar una Oferta.
     - Etapa 4: Antes del Cierre.
   - Barra de progreso porcentual, botón de impresión amigable (`window.print()`) y reinicio de casillas.
   - Traspaso íntegro del estado del checklist al documento PDF.

4. **Módulo D — Buscador de Programas de Asistencia:**
   - Filtros por Estado (50 estados y Washington D.C.) y tipo de comprador (primerizo vs todos).
   - Enlaces oficiales verificados a HUD, CFPB, Fannie Mae, Freddie Mac, VA, USDA y agencias estatales de financiamiento de vivienda (HFAs como CalHFA, TDHCA, Florida Housing, SONYMA, etc.).
   - Advertencias éticas: no inventa subvenciones ni promete calificaciones automáticas.

5. **Módulo E — Biblioteca Educativa:**
   - 18 artículos explicados en español sencillo sobre conceptos hipotecarios clave.
   - Estructura uniforme: Explicación, Por qué importa, Preguntas para el profesional, Acciones recomendadas y Enlace a fuente gubernamental oficial.
   - Buscador por palabras clave y filtros por categorías.

6. **Generador de Plan en PDF Personalizado:**
   - Documento multi-página en formato Carta (Letter) con la identidad visual corporativa (#102C46, #2B7A55, #C7E7A4, #D5AD57).
   - Generado 100% en el navegador con `jsPDF` y `jsPDF-AutoTable`.
   - Incluye portada, resumen diagnóstico, tabla de desglose mensual, tabla de efectivo necesario, comparación de tasas, checklist completado y pendiente, preguntas para el banco/agente/inspector, directorio de enlaces oficiales y avisos legales.
   - Descarga directa instantánea sin necesidad de registrarse ni ingresar correo.

7. **Envío Seguro por Correo Electrónico:**
   - Función de servidor en Cloudflare Pages Functions (`/api/send-pdf`).
   - Envío mediante la API REST de **Resend** con el PDF adjunto.
   - Filtro honeypot contra robots, validación estricta de formato de correo, verificación de encabezado PDF (`JVBERi`), límite de 5 MB y cero persistencia de datos financieros en servidores.

---

## 🛠️ 2. Arquitectura Tecnológica

- **Frontend:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS 3.4 con paleta personalizada de Perquin de León.
- **Iconografía:** Lucide React.
- **Generación de Documentos:** jsPDF 4.x + jsPDF-AutoTable 5.x.
- **Pruebas Unitarias:** Vitest con suite automatizada para cálculos y validaciones.
- **Backend Serverless:** Cloudflare Pages Functions (`functions/api/send-pdf.ts`).
- **Servicio de Correo:** Resend API.
- **Alojamiento:** Cloudflare Pages (Nivel gratuito).

---

## 📁 3. Estructura del Proyecto

```
Casa 2027 landing/
├── functions/                     # Cloudflare Pages Functions (Backend Edge)
│   └── api/
│       └── send-pdf.ts            # Endpoint seguro para envío con Resend
├── public/
│   └── logo.svg                   # Favicon oficial con la marca Perquin de León
├── src/
│   ├── components/                # Componentes modulares de interfaz
│   │   ├── Navbar.tsx             # Barra de navegación responsive
│   │   ├── Hero.tsx               # Portada, lema y mapa de 5 pasos
│   │   ├── DiagnosticModule.tsx   # Cuestionario y evaluación orientativa
│   │   ├── CalculatorModule.tsx   # Calculadora completa y simulador de tasas
│   │   ├── ChecklistModule.tsx    # Lista de verificación de 4 etapas
│   │   ├── AssistanceModule.tsx   # Buscador de programas oficiales y HFAs
│   │   ├── EducationModule.tsx    # Biblioteca con 18 temas hipotecarios
│   │   ├── PdfExportModule.tsx    # Generador y modal de envío por correo
│   │   ├── FaqSection.tsx         # Preguntas frecuentes con acordeón
│   │   ├── LegalModal.tsx         # Modales de Privacidad y Términos de uso
│   │   └── Footer.tsx             # Pie de página y enlaces sociales (FB / TikTok)
│   ├── data/                      # Archivos centrales de configuración y contenido
│   │   ├── config.ts              # Enlaces oficiales, lemas y 50 estados
│   │   ├── questions.ts           # Preguntas diagnósticas y rúbrica de puntaje
│   │   ├── checklistData.ts       # Tareas estructuradas por etapa
│   │   ├── programsData.ts        # Directorio de programas estatales y federales
│   │   ├── educationData.ts       # Contenido de la biblioteca educativa
│   │   └── faqData.ts             # Preguntas frecuentes
│   ├── test/                      # Suite de pruebas automatizadas
│   │   ├── calculator.test.ts     # Pruebas de amortización y casos límite
│   │   ├── diagnostic.test.ts     # Pruebas de categorización diagnóstica
│   │   └── validation.test.ts     # Pruebas de seguridad, correo y carga útil
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript centralizados
│   ├── utils/
│   │   ├── calculator.ts          # Motor matemático de cálculos hipotecarios
│   │   ├── pdfGenerator.ts        # Motor de maquetación y generación jsPDF
│   │   └── validation.ts          # Validaciones de seguridad y correo
│   ├── App.tsx                    # Orquestador principal y estado en memoria
│   ├── index.css                  # Directivas de Tailwind y estilos de impresión
│   └── main.tsx                   # Punto de entrada React
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore                     # Exclusión de credenciales y dependencias
├── package.json                   # Dependencias y scripts
├── tailwind.config.js             # Configuración de colores de marca
├── tsconfig.app.json              # Configuración TypeScript
└── wrangler.toml                  # Configuración para Cloudflare Pages
```

---

## 🚀 4. Guía de Instalación y Ejecución Local

### Prerrequisitos
- **Node.js**: Versión 18 o superior (recomendado Node 20 o 22 LTS).
- **npm**: Versión 9 o superior.

### Paso 1: Clonar o abrir el proyecto
Abre una terminal en la carpeta del proyecto:
```bash
cd "d:\Antigravity Projects\Casa 2027 landing"
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Ejecutar en entorno de desarrollo local
```bash
npm run dev
```
La consola te indicará la URL local (por defecto `http://localhost:5173`). Ábrela en tu navegador para interactuar con la aplicación.

### Paso 4: Ejecutar las pruebas unitarias
Para validar que todos los cálculos, casos límites y filtros de seguridad funcionen:
```bash
npm test
```

### Paso 5: Compilar para producción
Para generar los archivos estáticos listos para subir a la web:
```bash
npm run build
```
Los archivos optimizados y minificados se guardarán en la carpeta `dist/`.

---

## ☁️ 5. Despliegue en Cloudflare Pages

La aplicación está diseñada para desplegarse de forma gratuita en **Cloudflare Pages**, aprovechando sus funciones de servidor en el borde (Edge Functions).

### Paso 1: Subir el proyecto a GitHub
1. Crea un nuevo repositorio en tu cuenta de GitHub (puede ser público o privado).
2. Inicializa git y publica tu código:
   ```bash
   git init
   git add .
   git commit -m "feat: Tu Ruta para Comprar Casa en 2027 - Perquin de León"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

### Paso 2: Conectar en Cloudflare Pages
1. Inicia sesión en tu cuenta de [Cloudflare](https://dash.cloudflare.com/).
2. En el menú lateral, dirígete a **Workers & Pages** > **Create application** > pestaña **Pages**.
3. Selecciona **Connect to Git** y autoriza tu repositorio de GitHub.
4. En los ajustes de compilación (Build settings), configura lo siguiente:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (o dejar vacío)

### Paso 3: Configurar Variables de Entorno (Resend)
En el panel del proyecto en Cloudflare Pages:
1. Ve a **Settings** > **Environment variables**.
2. Añade las siguientes variables para los entornos de **Production** y **Preview**:
   - `RESEND_API_KEY`: Tu clave secreta obtenida en [resend.com/api-keys](https://resend.com/api-keys) (ejemplo: `re_123456789...`).
   - `EMAIL_FROM`: La dirección del remitente autorizada.
     - Para fase de pruebas: `"Perquin de León <onboarding@resend.dev>"`
     - Para producción: `"Perquin de León <contacto@tudominio.com>"` (tras verificar tu dominio en Resend).
3. Haz clic en **Save** y despliega nuevamente el proyecto.

*Nota:* Si no configuras `RESEND_API_KEY`, la aplicación seguirá funcionando al 100% para los usuarios, permitiéndoles descargar su PDF directamente sin errores, e informará amigablemente en caso de intentar el envío por correo.

---

## 🔒 6. Seguridad y Política de Cero Almacenamiento

- **Sin Bases de Datos:** No existe base de datos conectada ni almacenamiento permanente de datos financieros.
- **Sin Cuentas ni Contraseñas:** Ningún visitante necesita crear credenciales ni exponer contraseñas.
- **Memoria Efímera:** Todo valor introducido vive solo en el estado React de la pestaña del navegador. Al recargar o cerrar la pestaña, se borra.
- **Protección contra Bots:** Formulario de correo protegido con campo trampa (honeypot) invisible para usuarios legítimos.
- **Tamaño y Verificación de Firma:** El backend verifica que el archivo adjunto no supere 5 MB y posea la cabecera hexadecimal/base64 de un documento PDF genuino (`JVBERi`).

---

## 📄 7. Aviso Legal y Atribución

**Marca:** Perquin de León  
**Lema:** *"No compres solamente porque el banco te apruebe. Compra porque los números tienen sentido para ti."*  
**Canales oficiales:**
- Facebook: [facebook.com/perquindeleon](https://www.facebook.com/perquindeleon)
- TikTok: [@perquindeleon](https://www.tiktok.com/@perquindeleon)

*Aviso educativo:* Esta herramienta digital tiene propósitos estrictamente pedagógicos y de orientación financiera general. No constituye asesoría financiera, hipotecaria, contable ni jurídica. Las tasas e importes son estimaciones ilustrativas. Perquin de León no actúa como prestamista ni intermediario bancario.
