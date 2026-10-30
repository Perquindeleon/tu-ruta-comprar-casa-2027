export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  // RFC 5322 standard compliant basic regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export function validatePdfPayload(data: {
  email?: string;
  pdfBase64?: string;
  honeypot?: string;
  maxSizeBytes?: number;
}): { valid: boolean; error?: string } {
  // Honeypot check for bots
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { valid: false, error: 'Solicitud rechazada por filtro de seguridad.' };
  }

  // Email validation
  if (!data.email || !isValidEmail(data.email)) {
    return { valid: false, error: 'Por favor ingresa una dirección de correo electrónico válida.' };
  }

  // PDF payload validation
  if (!data.pdfBase64 || typeof data.pdfBase64 !== 'string') {
    return { valid: false, error: 'El archivo PDF no fue proporcionado.' };
  }

  // Size limit check (default 5MB)
  const maxBytes = data.maxSizeBytes || 5 * 1024 * 1024;
  // Rough estimate of decoded base64 size: length * 3/4
  const estimatedSize = Math.ceil((data.pdfBase64.length * 3) / 4);
  if (estimatedSize > maxBytes) {
    return { valid: false, error: `El archivo PDF excede el tamaño máximo permitido de 5 MB (tamaño aproximado: ${(estimatedSize / (1024 * 1024)).toFixed(2)} MB).` };
  }

  // Validate magic bytes for PDF: in base64, %PDF starts with JVBERi
  const cleanBase64 = data.pdfBase64.replace(/^data:application\/pdf;base64,/, '').trim();
  if (!cleanBase64.startsWith('JVBERi')) {
    return { valid: false, error: 'El archivo adjunto no tiene un encabezado de formato PDF válido.' };
  }

  return { valid: true };
}
