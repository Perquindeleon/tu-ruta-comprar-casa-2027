import { describe, it, expect } from 'vitest';
import { isValidEmail, validatePdfPayload } from '../utils/validation';

describe('Validation and Security Safeguards', () => {
  it('validates legitimate email addresses', () => {
    expect(isValidEmail('usuario@gmail.com')).toBe(true);
    expect(isValidEmail('comprador.2027@outlook.com')).toBe(true);
    expect(isValidEmail('perquin@dominio.com.do')).toBe(true);
  });

  it('rejects invalid email formats', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('correo-invalido')).toBe(false);
    expect(isValidEmail('usuario@')).toBe(false);
    expect(isValidEmail('@dominio.com')).toBe(false);
    expect(isValidEmail('usuario@dominio')).toBe(false);
  });

  it('rejects payloads with filled honeypot fields (bot protection)', () => {
    const payload = {
      email: 'persona@gmail.com',
      pdfBase64: 'JVBERi0xLjQKJcfs...',
      honeypot: 'spam_bot_data',
    };

    const res = validatePdfPayload(payload);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('filtro de seguridad');
  });

  it('rejects non-PDF files masquerading as PDF', () => {
    const fakePdfPayload = {
      email: 'persona@gmail.com',
      pdfBase64: 'SGVsbG8gV29ybGQ=', // "Hello World" in base64, doesn't start with JVBERi
    };

    const res = validatePdfPayload(fakePdfPayload);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('encabezado de formato PDF');
  });

  it('accepts valid PDF payloads with proper magic header', () => {
    const validPayload = {
      email: 'persona@gmail.com',
      pdfBase64: 'JVBERi0xLjQKJcfs...',
    };

    const res = validatePdfPayload(validPayload);
    expect(res.valid).toBe(true);
  });

  it('rejects payloads exceeding the size limit', () => {
    // Generate a simulated base64 string that exceeds 5MB
    // 5MB is roughly 5 * 1024 * 1024 = 5242880 bytes. In base64, length * 3/4 > max
    const giantBase64 = 'JVBERi' + 'A'.repeat(7 * 1024 * 1024);
    const oversizedPayload = {
      email: 'persona@gmail.com',
      pdfBase64: giantBase64,
    };

    const res = validatePdfPayload(oversizedPayload);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('excede el tamaño máximo permitido');
  });
});
