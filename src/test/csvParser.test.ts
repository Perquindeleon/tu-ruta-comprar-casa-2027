import { describe, it, expect } from 'vitest';
import { parseCSVToRows, parseGoogleSheetBuildersCSV } from '../utils/csvParser';

describe('CSV Parser Utility', () => {
  it('correctly parses quoted CSV fields with commas and line breaks', () => {
    const sampleCSV = `id,name,closingCredits,counties\nlennar,"Lennar Homes","Hasta $20,000","Orange, Osceola, Lake"\npulte,"Pulte","Hasta $25,000","Orange, Seminole"`;
    const rows = parseCSVToRows(sampleCSV);
    expect(rows.length).toBe(3);
    expect(rows[0]).toEqual(['id', 'name', 'closingCredits', 'counties']);
    expect(rows[1][1]).toBe('Lennar Homes');
    expect(rows[1][2]).toBe('Hasta $20,000');
    expect(rows[1][3]).toBe('Orange, Osceola, Lake');
  });

  it('transforms Google Sheet CSV rows into valid BuilderIncentive objects', () => {
    const sheetCSV = `id,name,promoName,rate,rateNumeric,rateType,structureTag,structureDesc,closingCredits,closingNumeric,counties,keyAreas,lender,contractDeadline,closingDeadline,expirationDate,link,firstTimePerk
lennar,Lennar,Fall Promo,4.750%,4.75,Fija / ARM,ARM 5/1,Tasa fija 5 años,"Hasta $20,000","$20,000","Orange, Osceola","Orlando, Kissimmee",Lennar Mortgage,2026-11-30,2026-12-31,2026-11-30,https://lennar.com,Electrodomésticos incluidos`;

    const builders = parseGoogleSheetBuildersCSV(sheetCSV);
    expect(builders.length).toBe(1);
    const b = builders[0];
    expect(b.id).toBe('lennar');
    expect(b.name).toBe('Lennar');
    expect(b.rateNumeric).toBe(4.75);
    expect(b.rateType).toBe('arm');
    expect(b.closingNumeric).toBe(20000);
    expect(b.counties).toEqual(['Orange', 'Osceola']);
    expect(b.expirationDate).toBe('2026-11-30');
    expect(b.isBalloon).toBe(false);
  });
});
