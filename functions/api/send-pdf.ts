interface Env {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}

interface SendPdfPayload {
  email?: string;
  confirmEmail?: string;
  pdfBase64?: string;
  filename?: string;
  honeypot?: string;
  marketingConsent?: boolean;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Security headers
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body: SendPdfPayload = await request.json();

    // 1. Honeypot check (anti-bot)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Solicitud rechazada por filtros de seguridad.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 2. Validate email
    const email = body.email?.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'La dirección de correo electrónico proporcionada no es válida.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Validate PDF payload
    const pdfBase64 = body.pdfBase64?.trim();
    if (!pdfBase64) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No se recibió el archivo PDF para adjuntar.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Clean data URI prefix if present
    const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '').trim();

    // Check PDF magic header (JVBERi represents '%PDF' in base64)
    if (!cleanBase64.startsWith('JVBERi')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El contenido adjunto no corresponde a un archivo PDF válido.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Check size limit: 5 MB (approx 6.7 MB in base64)
    const estimatedSizeBytes = Math.ceil((cleanBase64.length * 3) / 4);
    const maxSizeBytes = 5 * 1024 * 1024;
    if (estimatedSizeBytes > maxSizeBytes) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El archivo excede el límite máximo permitido de 5 MB.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Verify Resend Configuration
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          configured: false,
          message:
            'El servicio de envío por correo no tiene una clave API configurada en el servidor (RESEND_API_KEY). Sin embargo, tu plan ha sido generado correctamente y puedes descargarlo directamente a tu dispositivo con el botón de descarga.',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const fromAddress = env.EMAIL_FROM || 'Perquin de León <onboarding@resend.dev>';
    const filename = body.filename || 'Mi_Plan_Comprar_Casa_2027_Perquin_de_Leon.pdf';

    // 5. Send via Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [email],
        subject: 'Tu Plan Personalizado para Comprar Casa en 2027 — Perquin de León',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
            <div style="background-color: #102C46; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">PERQUIN DE LEÓN</h1>
              <p style="color: #C7E7A4; margin: 6px 0 0 0; font-size: 14px;">Tu Ruta para Comprar Casa en 2027</p>
            </div>
            <div style="padding: 28px; background-color: #ffffff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; font-weight: bold; color: #102C46;">¡Hola!</p>
              <p>Adjunto encontrarás tu documento personalizado en formato PDF con tu plan de preparación, el desglose de costos y tu lista de pasos recomendados.</p>
              <blockquote style="margin: 20px 0; padding: 12px 18px; background-color: #f1f9ec; border-left: 4px solid #2B7A55; color: #102C46; font-style: italic;">
                "No compres solamente porque el banco te apruebe. Compra porque los números tienen sentido para ti."
              </blockquote>
              <p style="font-size: 14px; color: #475569;">
                Recuerda que este documento es una guía educativa para acompañarte en tu preparación hacia el año 2027. Consérvalo para contrastar las cifras cuando consultes con prestamistas, agentes inmobiliarios e inspectores certificados.
              </p>
              <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                <p style="margin: 4px 0;"><strong>Perquin de León</strong> — Aprende a ser financieramente libre.</p>
                <p style="margin: 4px 0;">
                  <a href="https://www.facebook.com/perquindeleon" style="color: #2B7A55; text-decoration: none;">Facebook</a> | 
                  <a href="https://www.tiktok.com/@perquindeleon" style="color: #2B7A55; text-decoration: none;">TikTok</a>
                </p>
              </div>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: filename,
            content: cleanBase64,
          },
        ],
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({
          success: false,
          error: (errorData as { message?: string }).message || 'Error en el servidor de correo al procesar el envío.',
        }),
        { status: resendResponse.status, headers: corsHeaders }
      );
    }

    const resendResult = await resendResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        configured: true,
        id: (resendResult as { id?: string }).id,
        message: '¡Tu plan personalizado ha sido enviado con éxito a tu correo electrónico!',
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Ocurrió un error inesperado al procesar la solicitud.',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
