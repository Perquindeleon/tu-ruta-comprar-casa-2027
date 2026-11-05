import { BuilderIncentive } from '../data/floridaBuildersData';

/**
 * RFC 4180 compliant CSV parser that correctly handles
 * multi-line fields, escaped quotes, and commas inside quotes.
 */
export function parseCSVToRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip carriage return + newline
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((cell) => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Parses published Google Sheets CSV text into strongly-typed BuilderIncentive objects.
 */
export function parseGoogleSheetBuildersCSV(csvText: string): BuilderIncentive[] {
  const table = parseCSVToRows(csvText);
  if (table.length < 2) return [];

  const rawHeaders = table[0].map((h) => h.trim().toLowerCase());
  const headerMap: Record<string, number> = {};
  rawHeaders.forEach((h, idx) => {
    headerMap[h] = idx;
  });

  const getCol = (row: string[], colName: string): string => {
    const idx = headerMap[colName.toLowerCase()];
    return idx !== undefined && row[idx] !== undefined ? row[idx] : '';
  };

  const builders: BuilderIncentive[] = [];

  for (let r = 1; r < table.length; r++) {
    const row = table[r];
    const id = getCol(row, 'id') || `builder-${r}`;
    const name = getCol(row, 'name');
    if (!name) continue;

    const promoName = getCol(row, 'promoName') || 'Promoción Especial';
    const rate = getCol(row, 'rate') || '5.500%';
    
    // Parse numeric rate safely
    const rawRateNum = getCol(row, 'rateNumeric');
    let rateNumeric = parseFloat(rawRateNum.replace(/[^\d.]/g, ''));
    if (isNaN(rateNumeric) || rateNumeric <= 0) {
      const match = rate.match(/(\d+\.?\d*)/);
      rateNumeric = match ? parseFloat(match[1]) : 5.5;
    }

    // Determine rate type
    const rawRateType = getCol(row, 'rateType').toLowerCase();
    let rateType: 'fixed' | 'buydown' | 'arm' = 'fixed';
    if (rawRateType.includes('buydown') || rawRateType.includes('2/1')) {
      rateType = 'buydown';
    } else if (rawRateType.includes('arm') || rawRateType.includes('variable')) {
      rateType = 'arm';
    }

    const structureTag = getCol(row, 'structureTag') || (rateType === 'buydown' ? 'Buydown 2/1' : rateType === 'arm' ? 'ARM 5/1' : 'Tasa Fija 30 Años');
    const structureDesc = getCol(row, 'structureDesc') || 'Préstamo hipotecario totalmente amortizado a 30 años.';

    const closingCredits = getCol(row, 'closingCredits') || 'Hasta $20,000';
    const rawClosingNum = getCol(row, 'closingNumeric');
    let closingNumeric = parseFloat(rawClosingNum.replace(/[^\d.]/g, ''));
    if (isNaN(closingNumeric) || closingNumeric <= 0) {
      const match = closingCredits.match(/(\d[\d,]*)/);
      closingNumeric = match ? parseFloat(match[1].replace(/,/g, '')) : 20000;
    }

    const rawCounties = getCol(row, 'counties');
    const counties = rawCounties
      ? rawCounties.split(',').map((c) => c.trim()).filter(Boolean)
      : ['Orange', 'Osceola', 'Lake', 'Polk'];

    const keyAreas = getCol(row, 'keyAreas') || 'Florida';
    const lender = getCol(row, 'lender') || 'Prestamista Preferido';
    const contractDeadline = getCol(row, 'contractDeadline') || 'Hasta fin de mes';
    const closingDeadline = getCol(row, 'closingDeadline') || 'Cierre antes de fin de año';
    const expirationDate = getCol(row, 'expirationDate') || '2026-11-30';
    const link = getCol(row, 'link') || '#';
    const firstTimePerk = getCol(row, 'firstTimePerk') || 'Beneficios para primeros compradores.';

    builders.push({
      id,
      name,
      promoName,
      rate,
      rateNumeric,
      rateType,
      structureTag,
      structureDesc,
      isBalloon: false,
      balloonText: 'Sin Pago Balloon: Amortizado a 30 años (la cuota no vence de golpe).',
      closingCredits,
      closingNumeric,
      closingDetails: closingCredits,
      firstTimePerk,
      counties,
      keyAreas,
      lender,
      contractDeadline,
      closingDeadline,
      expirationDate,
      link,
      badge: structureTag
    });
  }

  return builders;
}
