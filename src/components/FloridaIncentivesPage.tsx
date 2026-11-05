import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Calculator, 
  BookOpen, 
  Search, 
  ExternalLink, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Globe,
  Clock,
  Sparkles,
  Info,
  Calendar,
  Layers,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { 
  FLORIDA_BUILDERS_DATA, 
  BuilderIncentive, 
  isOfferActive, 
  getDaysRemaining 
} from '../data/floridaBuildersData';
import { parseGoogleSheetBuildersCSV } from '../utils/csvParser';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONFIG } from '../data/config';

export const GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKIAYEGhmhU_UycNE7Xmg9oyVHy12018Va_2CMveWOG7Ri7EijZwpB0ix1NYyXfu6Nahhr6u0SoFUj/pub?gid=0&single=true&output=csv';
export const GOOGLE_SHEET_EDIT_URL =
  'https://docs.google.com/spreadsheets/d/1cqCDUoOYLnTAVLutklTEGmb9NFqoGG-2Q9xgUqy9ENY/edit?gid=0#gid=0';

export const FLORIDA_REGIONS: Record<string, { labelEs: string; labelEn: string; counties: string[] }> = {
  central: {
    labelEs: 'Florida Central (Orlando, Kissimmee, Polk, Lake)',
    labelEn: 'Central Florida (Orlando, Kissimmee, Polk, Lake)',
    counties: ['Orange', 'Osceola', 'Polk', 'Lake', 'Seminole', 'Volusia', 'Brevard', 'Marion', 'Sumter', 'Flagler'],
  },
  tampa: {
    labelEs: 'Tampa Bay y Costa Oeste (Hillsborough, Pasco, Manatee)',
    labelEn: 'Tampa Bay & West Coast (Hillsborough, Pasco, Manatee)',
    counties: ['Hillsborough', 'Pinellas', 'Pasco', 'Manatee', 'Sarasota', 'Hernando', 'Citrus'],
  },
  south: {
    labelEs: 'Sur de Florida (Miami-Dade, Broward, Palm Beach, St. Lucie)',
    labelEn: 'South Florida (Miami-Dade, Broward, Palm Beach, St. Lucie)',
    counties: ['Miami-Dade', 'Broward', 'Palm Beach', 'Martin', 'St. Lucie', 'Indian River'],
  },
  southwest: {
    labelEs: 'Suroeste (Fort Myers, Cape Coral, Naples, Charlotte)',
    labelEn: 'Southwest Florida (Fort Myers, Cape Coral, Naples, Charlotte)',
    counties: ['Lee', 'Collier', 'Charlotte', 'Hendry', 'Glades'],
  },
  northeast: {
    labelEs: 'Noreste (Jacksonville, St. Johns, Clay)',
    labelEn: 'Northeast Florida (Jacksonville, St. Johns, Clay)',
    counties: ['Duval', 'St. Johns', 'Clay', 'Nassau', 'Baker', 'Putnam'],
  },
  northwest: {
    labelEs: 'Noroeste / Panhandle (Pensacola, Tallahassee, Panama City)',
    labelEn: 'Northwest / Panhandle (Pensacola, Tallahassee, Panama City)',
    counties: ['Escambia', 'Santa Rosa', 'Okaloosa', 'Walton', 'Bay', 'Leon', 'Wakulla'],
  },
};

interface FloridaIncentivesPageProps {
  onBackToMain: () => void;
}

export const FloridaIncentivesPage: React.FC<FloridaIncentivesPageProps> = ({ onBackToMain }) => {
  const { lang, setLang } = useLanguage();
  const isEn = lang === 'en';

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'builders' | 'calculator' | 'guide'>('builders');

  // Directory filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStructure, setSelectedStructure] = useState<'all' | 'fixed' | 'buydown' | 'arm'>('all');
  const [selectedIncentive, setSelectedIncentive] = useState('all');
  const [sortBy, setSortBy] = useState<'rate-asc' | 'closing-desc' | 'expiry-asc' | 'name-asc'>('rate-asc');
  
  // Auto-expiration filter state (by default, hide expired offers)
  const [hideExpired, setHideExpired] = useState<boolean>(true);

  // Modal state
  const [modalBuilder, setModalBuilder] = useState<BuilderIncentive | null>(null);

  // Live Google Sheet sync state
  const [buildersData, setBuildersData] = useState<BuilderIncentive[]>(FLORIDA_BUILDERS_DATA);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Extract all unique counties detected in dataset
  const detectedCounties = useMemo(() => {
    const set = new Set<string>();
    buildersData.forEach((b) => {
      b.counties.forEach((c) => {
        const trimmed = c.trim();
        if (trimmed) set.add(trimmed);
      });
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [buildersData]);

  // Calculator state
  const [calcMode, setCalcMode] = useState<'fixed' | 'buydown'>('fixed');
  const [calcPrice, setCalcPrice] = useState<number>(420000);
  const [calcDownPct, setCalcDownPct] = useState<number>(5);
  const [calcMarketRate, setCalcMarketRate] = useState<number>(6.75);
  const [calcBuilderRate, setCalcBuilderRate] = useState<number>(5.25);
  const [calcClosingCredit, setCalcClosingCredit] = useState<number>(20000);

  // Real-time calculation of active vs expired offers
  const today = useMemo(() => new Date(), []);

  // Fetch live CSV from Google Sheets on mount
  const fetchLiveSheetData = async () => {
    setIsLoadingLive(true);
    try {
      const response = await fetch(GOOGLE_SHEET_CSV_URL, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const csvText = await response.text();
      const parsed = parseGoogleSheetBuildersCSV(csvText);
      if (parsed && parsed.length > 0) {
        setBuildersData(parsed);
        setIsLiveConnected(true);
        setLastSyncTime(new Date());
      }
    } catch (err) {
      console.warn('Google Sheet live sync failed, continuing with built-in data:', err);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    fetchLiveSheetData();
  }, []);

  const currentMonthYear = useMemo(() => {
    const raw = today.toLocaleDateString(isEn ? 'en-US' : 'es-ES', { month: 'long', year: 'numeric' });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }, [today, isEn]);
  
  const totalOffersCount = buildersData.length;
  const activeOffersCount = useMemo(() => {
    return buildersData.filter((b) => isOfferActive(b, today)).length;
  }, [buildersData, today]);
  const expiredOffersCount = totalOffersCount - activeOffersCount;

  // Filtered & sorted builders
  const filteredBuilders = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = buildersData.filter((b) => {
      // 1. Expiration check
      const active = isOfferActive(b, today);
      if (hideExpired && !active) {
        return false;
      }

      // 2. Text search
      const matchText =
        b.name.toLowerCase().includes(q) ||
        b.keyAreas.toLowerCase().includes(q) ||
        b.promoName.toLowerCase().includes(q) ||
        b.structureTag.toLowerCase().includes(q) ||
        b.lender.toLowerCase().includes(q);
      if (!matchText) return false;

      // 3. Location filter (Region or specific county)
      if (selectedLocation !== 'all') {
        if (selectedLocation.startsWith('region:')) {
          const regionKey = selectedLocation.replace('region:', '');
          const region = FLORIDA_REGIONS[regionKey];
          if (region && region.counties.length > 0) {
            const matchesRegion = b.counties.some((c) =>
              region.counties.some((rc) => rc.toLowerCase() === c.toLowerCase().trim())
            );
            if (!matchesRegion) return false;
          }
        } else if (selectedLocation.startsWith('county:')) {
          const countyName = selectedLocation.replace('county:', '').toLowerCase();
          const matchesCounty = b.counties.some((c) => c.toLowerCase().trim() === countyName);
          if (!matchesCounty) return false;
        } else {
          const target = selectedLocation.toLowerCase().trim();
          const matches = b.counties.some((c) => c.toLowerCase().trim() === target);
          if (!matches) return false;
        }
      }

      // 4. Structure filter
      if (selectedStructure !== 'all' && b.rateType !== selectedStructure) {
        return false;
      }

      // 5. Incentive Type filter
      if (selectedIncentive === 'rate-sub5' && b.rateNumeric >= 5.0) return false;
      if (selectedIncentive === 'closing-20k' && b.closingNumeric < 20000) return false;
      if (
        selectedIncentive === 'first-time' &&
        !b.firstTimePerk.toLowerCase().includes('primer') &&
        !b.firstTimePerk.toLowerCase().includes('everything') &&
        !b.firstTimePerk.toLowerCase().includes('asistencia')
      ) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'rate-asc') {
      result.sort((a, b) => a.rateNumeric - b.rateNumeric);
    } else if (sortBy === 'closing-desc') {
      result.sort((a, b) => b.closingNumeric - a.closingNumeric);
    } else if (sortBy === 'expiry-asc') {
      result.sort((a, b) => getDaysRemaining(a, today) - getDaysRemaining(b, today));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [buildersData, searchQuery, selectedLocation, selectedStructure, selectedIncentive, sortBy, hideExpired, today]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedStructure('all');
    setSelectedIncentive('all');
    setSortBy('rate-asc');
    setHideExpired(true);
  };

  // Quick preset loader into calculator
  const handleLoadCalculatorPreset = (rate: number, credit: number, mode: 'fixed' | 'buydown' = 'fixed') => {
    setCalcBuilderRate(rate);
    setCalcClosingCredit(credit);
    setCalcMode(mode);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculator calculations
  const downPaymentAmount = (calcPrice * calcDownPct) / 100;
  const loanAmount = Math.max(0, calcPrice - downPaymentAmount);

  const calculateMonthlyPI = (loan: number, ratePct: number, years = 30) => {
    if (loan <= 0) return 0;
    const r = ratePct / 100 / 12;
    const n = years * 12;
    if (r === 0) return loan / n;
    return (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  };

  const marketPayment = calculateMonthlyPI(loanAmount, calcMarketRate);

  // Buydown stepped calculations
  const y1Rate = Math.max(0.5, calcBuilderRate - 2.0);
  const y2Rate = Math.max(0.5, calcBuilderRate - 1.0);
  const y3Rate = calcBuilderRate;

  const pY1 = calculateMonthlyPI(loanAmount, y1Rate);
  const pY2 = calculateMonthlyPI(loanAmount, y2Rate);
  const pY3 = calculateMonthlyPI(loanAmount, y3Rate);

  const activeBuilderPayment = calcMode === 'fixed'
    ? calculateMonthlyPI(loanAmount, calcBuilderRate)
    : pY1;

  const monthlySavingsYear1 = Math.max(0, marketPayment - activeBuilderPayment);
  const annualSavingsYear1 = monthlySavingsYear1 * 12;
  
  const fiveYearSavings = calcMode === 'fixed'
    ? (monthlySavingsYear1 * 60) + calcClosingCredit
    : ((marketPayment - pY1) * 12) + ((marketPayment - pY2) * 12) + ((marketPayment - pY3) * 36) + calcClosingCredit;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-[#102C46] via-[#163654] to-[#0B1E30] text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onBackToMain}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#C7E7A4] transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title={isEn ? 'Return to 2027 Roadmap' : 'Volver a Tu Ruta 2027'}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isEn ? 'Main Tool' : 'Tu Ruta 2027'}</span>
            </button>

            <div className="w-10 h-10 rounded-xl bg-[#2B7A55] border border-[#C7E7A4]/30 flex items-center justify-center text-white shadow-inner font-black text-lg">
              FL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-white">
                  {isEn ? 'Florida Statewide • New Homes Incentives' : 'Florida • Incentivos de Constructoras'}
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isEn ? `Active: ${currentMonthYear}` : `Vigentes: ${currentMonthYear}`}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isEn
                  ? 'Official statewide comparison: Orlando, Tampa, Miami, Jacksonville, Southwest FL & beyond. Expiration dates, rate structures and closing credits'
                  : 'Comparativa oficial en todo Florida: Orlando, Tampa, Miami, Jacksonville, Suroeste y más. Fechas de vencimiento, tipo de tasa y gastos de cierre'}
              </p>
            </div>
          </div>

          {/* Quick Market Stats & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 hidden sm:block">
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">{isEn ? 'Market Rate' : 'Tasa Mercado'}</span>
              <span className="text-rose-400 font-bold text-xs sm:text-sm">~6.75% Fija</span>
            </div>
            <div className="bg-[#2B7A55]/40 border border-[#2B7A55] rounded-lg px-2.5 py-1.5">
              <span className="text-emerald-300 block text-[9px] uppercase font-semibold">{isEn ? 'Builder Rates' : 'Tasa Constructora'}</span>
              <span className="text-emerald-300 font-bold text-xs sm:text-sm">3.25% - 5.50%</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 hidden md:block">
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">{isEn ? 'Max Closing Credit' : 'Crédito Cierre Máx'}</span>
              <span className="text-[#D5AD57] font-bold text-xs sm:text-sm">{isEn ? 'Up to $25,000' : 'Hasta $25,000'}</span>
            </div>

            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang(isEn ? 'es' : 'en')}
              className="inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 border border-[#C7E7A4]/40 text-[#C7E7A4] px-2 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isEn ? 'ES' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#0B1E30] border-t border-slate-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex space-x-6 overflow-x-auto text-sm">
            <button
              onClick={() => setActiveTab('builders')}
              className={`py-3 transition flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold border-b-2 cursor-pointer ${
                activeTab === 'builders'
                  ? 'text-[#C7E7A4] border-[#C7E7A4]'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{isEn ? `Builders Directory (${activeOffersCount})` : `Directorio de Constructoras (${activeOffersCount})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-3 transition flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold border-b-2 cursor-pointer ${
                activeTab === 'calculator'
                  ? 'text-[#C7E7A4] border-[#C7E7A4]'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{isEn ? 'Mortgage Savings Simulator' : 'Calculadora de Ahorro Hipotecario'}</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`py-3 transition flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold border-b-2 cursor-pointer ${
                activeTab === 'guide'
                  ? 'text-[#C7E7A4] border-[#C7E7A4]'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isEn ? 'First-Time Buyer Guide & Programs' : 'Guía y Programas Primer Comprador'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* VIEW 1: BUILDERS DIRECTORY & FILTERS */}
        {activeTab === 'builders' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                
                {/* Search input */}
                <div>
                  <label htmlFor="fl-search" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Search Builder / Area' : 'Buscar Constructora / Zona'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fl-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isEn ? 'Lennar, Davenport, Lake Nona...' : 'Lennar, Davenport, Lake Nona...'}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl pl-9 pr-3 py-2 focus:ring-2 focus:ring-[#2B7A55] focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Region / County filter */}
                <div>
                  <label htmlFor="fl-location" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Region / County' : 'Región / Condado'}
                  </label>
                  <select
                    id="fl-location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none cursor-pointer"
                  >
                    <option value="all">{isEn ? 'All Florida (Statewide)' : 'Todo Florida (Todo el Estado)'}</option>
                    <optgroup label={isEn ? 'Major Florida Regions' : 'Regiones Principales de Florida'}>
                      {Object.entries(FLORIDA_REGIONS).map(([key, reg]) => (
                        <option key={key} value={`region:${key}`}>
                          {isEn ? reg.labelEn : reg.labelEs}
                        </option>
                      ))}
                    </optgroup>
                    {detectedCounties.length > 0 && (
                      <optgroup label={isEn ? 'Specific Detected Counties' : 'Condados Detectados'}>
                        {detectedCounties.map((c) => (
                          <option key={c} value={`county:${c}`}>
                            {c}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>

                {/* Rate Structure filter */}
                <div>
                  <label htmlFor="fl-structure" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Rate Structure' : 'Estructura de Tasa'}
                  </label>
                  <select
                    id="fl-structure"
                    value={selectedStructure}
                    onChange={(e) => setSelectedStructure(e.target.value as any)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none cursor-pointer"
                  >
                    <option value="all">{isEn ? 'All Structures' : 'Todas las Estructuras'}</option>
                    <option value="fixed">{isEn ? '30-Year Fixed Only' : 'Solo Tasa Fija 30 Años'}</option>
                    <option value="buydown">{isEn ? 'Temporary Buydown (2/1)' : 'Solo Buydown Temporal (2/1)'}</option>
                    <option value="arm">{isEn ? 'Adjustable / ARM (5/1)' : 'Solo Variable / ARM (5/1)'}</option>
                  </select>
                </div>

                {/* Incentive filter */}
                <div>
                  <label htmlFor="fl-incentive" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Savings Filter' : 'Filtro de Ahorro'}
                  </label>
                  <select
                    id="fl-incentive"
                    value={selectedIncentive}
                    onChange={(e) => setSelectedIncentive(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none cursor-pointer"
                  >
                    <option value="all">{isEn ? 'All Benefit Levels' : 'Todos los Niveles'}</option>
                    <option value="rate-sub5">{isEn ? 'Rate Under 5.0%' : 'Tasa Menor a 5.0%'}</option>
                    <option value="closing-20k">{isEn ? 'Closing Credit $20k+' : 'Gastos Cierre $20,000+'}</option>
                    <option value="first-time">{isEn ? 'First-Time Buyer Perk' : 'Beneficio Primer Comprador'}</option>
                  </select>
                </div>

                {/* Sort by */}
                <div>
                  <label htmlFor="fl-sort" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Sort By' : 'Ordenar Por'}
                  </label>
                  <select
                    id="fl-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none cursor-pointer"
                  >
                    <option value="rate-asc">{isEn ? 'Lowest Initial Rate' : 'Menor Tasa de Entrada'}</option>
                    <option value="closing-desc">{isEn ? 'Highest Closing Credit' : 'Mayor Crédito Gastos Cierre'}</option>
                    <option value="expiry-asc">{isEn ? 'Expiring Soonest' : 'Vencimiento Más Próximo'}</option>
                    <option value="name-asc">{isEn ? 'Builder Name (A-Z)' : 'Nombre Constructora (A-Z)'}</option>
                  </select>
                </div>

              </div>

              {/* Status bar, live sheet badge & auto-expiration toggle */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex flex-wrap items-center gap-3">
                  <span>
                    {isEn ? (
                      <>
                        Showing <strong className="text-[#2B7A55] font-extrabold">{filteredBuilders.length}</strong> of {totalOffersCount} offers ({activeOffersCount} active).
                      </>
                    ) : (
                      <>
                        Mostrando <strong className="text-[#2B7A55] font-extrabold">{filteredBuilders.length}</strong> de {totalOffersCount} ofertas ({activeOffersCount} vigentes).
                      </>
                    )}
                  </span>

                  {/* Auto-hide expired toggle */}
                  <label className="inline-flex items-center space-x-1.5 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={hideExpired}
                      onChange={(e) => setHideExpired(e.target.checked)}
                      className="rounded text-[#2B7A55] focus:ring-[#2B7A55]"
                    />
                    <span>{isEn ? 'Hide expired offers automatically' : 'Ocultar ofertas vencidas automáticamente'}</span>
                  </label>

                  {/* Google Sheets Live Status Badge */}
                  {isLiveConnected && (
                    <span
                      className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      title={lastSyncTime ? `${isEn ? 'Last synced' : 'Última sinc'}: ${lastSyncTime.toLocaleTimeString()}` : ''}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Google Sheets Live</span>
                      <button
                        type="button"
                        onClick={fetchLiveSheetData}
                        disabled={isLoadingLive}
                        className="hover:text-emerald-950 p-0.5 ml-0.5 cursor-pointer"
                        title={isEn ? 'Refresh data from Google Sheets' : 'Recargar datos desde Google Sheets'}
                      >
                        <RefreshCw className={`w-3 h-3 ${isLoadingLive ? 'animate-spin' : ''}`} />
                      </button>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={GOOGLE_SHEET_EDIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1 font-semibold transition cursor-pointer text-[11px]"
                    title={isEn ? 'Open data spreadsheet in Google Sheets' : 'Abrir hoja de datos en Google Sheets'}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isEn ? 'Edit in Sheets' : 'Editar en Sheets'}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[#2B7A55] hover:text-[#102C46] font-bold transition underline cursor-pointer"
                  >
                    {isEn ? 'Reset All Filters' : 'Restablecer Filtros'}
                  </button>
                </div>
              </div>
            </div>

            {/* Crucial Clarification Banner on Rate Structure & Balloon Loans */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 sm:p-5 text-xs text-indigo-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold mt-0.5 shadow-xs">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-indigo-950">
                    {isEn
                      ? 'Crucial Clarification: Are there "Balloon" loans in these offers?'
                      : 'Aclaración Crucial: ¿Hay Préstamos "Balloon" en estas ofertas?'}
                  </h4>
                  <p className="text-indigo-900 text-xs mt-1 leading-relaxed">
                    {isEn ? (
                      <>
                        <strong>NO Balloon Loans:</strong> None of these builders offer mortgages with a "balloon" payment (where the remaining loan balance is suddenly due in 5 years). All loans are fully amortized over 30 years. However, there are two distinct structures: <strong>1) 30-Year Fixed</strong> (payment never changes) and <strong>2) ARM or 2/1 Buydown</strong> (payment steps up in year 2, 3, or 6). Each card explicitly specifies its structure and deadlines.
                      </>
                    ) : (
                      <>
                        <strong>NO son préstamos Balloon:</strong> Ninguna de estas constructoras ofrece hipotecas con pago "balloon" (donde venza todo el saldo total de golpe a los 5 años). Todos los préstamos están completamente amortizados a 30 años. Sin embargo, hay dos estructuras muy distintas: <strong>1) Fija a 30 Años</strong> (la cuota nunca cambia) y <strong>2) ARM o Buydown 2/1</strong> (la cuota sube en el año 2, 3 o 6). Cada tarjeta detalla explícitamente su estructura y fecha de vencimiento.
                      </>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shrink-0 transition text-xs whitespace-nowrap shadow-xs cursor-pointer"
              >
                {isEn ? 'View Structures Guide →' : 'Ver Tabla Explicativa →'}
              </button>
            </div>

            {/* Builders Cards Grid */}
            {filteredBuilders.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 p-8">
                <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-800 text-base">
                  {isEn ? 'No offers match your selected filters.' : 'No se encontraron ofertas con los filtros actuales.'}
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {isEn
                    ? 'Try resetting your filters or unchecking "Hide expired offers" to view the complete catalog.'
                    : 'Prueba restablecer los filtros o desactivar la casilla de ofertas vencidas para ver todas las 11 constructoras.'}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-[#2B7A55] text-white rounded-xl text-xs font-bold hover:bg-[#226344] transition"
                >
                  {isEn ? 'Reset Filters' : 'Restablecer Filtros'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilders.map((b) => {
                  const daysLeft = getDaysRemaining(b, today);
                  const active = isOfferActive(b, today);

                  // Color tag based on structure
                  let tagClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                  if (b.rateType === 'buydown') tagClass = 'bg-blue-100 text-blue-800 border-blue-200';
                  if (b.rateType === 'arm') tagClass = 'bg-amber-100 text-amber-900 border-amber-200';

                  return (
                    <div
                      key={b.id}
                      className={`bg-white rounded-2xl shadow-xs hover:shadow-md transition-all border flex flex-col justify-between overflow-hidden ${
                        !active ? 'opacity-70 bg-slate-50/80 border-slate-200' : 'border-slate-200'
                      }`}
                    >
                      <div className="p-5 space-y-4">
                        
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wide border ${tagClass}`}>
                              {b.structureTag}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 mt-1.5">{b.name}</h3>
                            <p className="text-xs text-slate-500 font-medium">{b.promoName}</p>
                          </div>
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium shrink-0">
                            {b.counties.slice(0, 2).join(', ')}{b.counties.length > 2 ? ` +${b.counties.length - 2}` : ''}
                          </span>
                        </div>

                        {/* Expiration Alert Box with Countdown */}
                        <div className={`rounded-xl p-3 text-[11px] space-y-1 border ${
                          !active
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : daysLeft <= 7
                            ? 'bg-rose-50 text-rose-950 border-rose-300'
                            : 'bg-rose-50/70 text-rose-950 border-rose-200/80'
                        }`}>
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>{isEn ? `Deadline: ${b.contractDeadline}` : `Vence: ${b.contractDeadline}`}</span>
                            </span>
                            {active ? (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                daysLeft <= 7 ? 'bg-rose-600 text-white animate-pulse' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isEn ? `${daysLeft} days left` : `Quedan ${daysLeft} días`}
                              </span>
                            ) : (
                              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {isEn ? 'Expired' : 'Vencida'}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 pl-5 text-[10px] leading-tight">{b.closingDeadline}</p>
                        </div>

                        {/* Main Incentive Highlights */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-[10px] uppercase text-slate-400 font-semibold block">
                              {isEn ? 'Promo Rate' : 'Tasa Promocional'}
                            </span>
                            <span className="text-lg font-extrabold text-emerald-700">{b.rate}</span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {isEn ? 'vs ~6.75% market' : 'vs ~6.75% mercado'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-400 font-semibold block">
                              {isEn ? 'Closing Credit' : 'Gastos de Cierre'}
                            </span>
                            <span className="text-base font-extrabold text-blue-700">{b.closingCredits}</span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {isEn ? 'with builder lender' : 'con prestamista'}
                            </span>
                          </div>
                        </div>

                        {/* Structure & Balloon Verification */}
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold shrink-0 mt-0.5">✔</span>
                            <span className="text-slate-700 text-[11px]">
                              <strong>{isEn ? 'Structure:' : 'Estructura:'}</strong> {b.structureDesc}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">🛡️</span>
                            <span className="text-emerald-800 text-[11px] font-semibold">{b.balloonText}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold shrink-0 mt-0.5">⭐</span>
                            <span className="text-slate-600 text-[11px]">
                              <strong>{isEn ? 'First-Time Perk:' : 'Primer Comprador:'}</strong> {b.firstTimePerk}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Card Actions */}
                      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setModalBuilder(b)}
                          className="text-xs text-slate-700 hover:text-blue-700 font-bold transition cursor-pointer"
                        >
                          {isEn ? 'View Terms →' : 'Ver Términos →'}
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleLoadCalculatorPreset(b.rateNumeric, b.closingNumeric, b.rateType === 'buydown' ? 'buydown' : 'fixed')}
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition cursor-pointer"
                            title={isEn ? 'Simulate with this rate' : 'Calcular con esta tasa'}
                          >
                            <Calculator className="w-4 h-4" />
                          </button>
                          <a
                            href={b.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition inline-flex items-center gap-1 shadow-2xs"
                          >
                            <span>{isEn ? 'Official Site' : 'Sitio Oficial'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: MORTGAGE SAVINGS SIMULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-[#102C46] p-6 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#C7E7A4]" />
                  <span>
                    {isEn
                      ? 'Mortgage Savings Simulator: Open Market vs. 30-Year Fixed vs. 2/1 Buydown'
                      : 'Simulador de Ahorro: Mercado Abierto vs. Tasa Fija vs. Buydown 2/1'}
                  </span>
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-3xl">
                  {isEn
                    ? 'Check exact monthly payments, scheduled payment steps in years 1, 2, and 3, and upfront closing cost savings.'
                    : 'Comprueba el pago mensual exacto, los cambios de cuota en el año 1, 2 y 3, y el ahorro total en gastos de cierre.'}
                </p>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Inputs Column (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* Structure Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {isEn ? 'Mortgage Structure to Simulate' : 'Estructura Hipotecaria a Simular'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcMode('fixed')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border-2 transition cursor-pointer text-center ${
                          calcMode === 'fixed'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs'
                            : 'border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-600'
                        }`}
                      >
                        {isEn ? '30-Year Fixed Rate' : 'Tasa Fija 30 Años'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcMode('buydown')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border-2 transition cursor-pointer text-center ${
                          calcMode === 'buydown'
                            ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-2xs'
                            : 'border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-600'
                        }`}
                      >
                        {isEn ? '2/1 Stepped Buydown' : 'Buydown 2/1 Escalonado'}
                      </button>
                    </div>
                  </div>

                  {/* Home Price */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="calc-price-fl" className="text-xs font-bold text-slate-700 uppercase">
                        {isEn ? 'New Home Purchase Price' : 'Precio de la Casa Nueva'}
                      </label>
                      <span className="text-sm font-extrabold text-blue-700">
                        ${new Intl.NumberFormat('en-US').format(calcPrice)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="200000"
                      max="800000"
                      step="5000"
                      value={calcPrice}
                      onChange={(e) => setCalcPrice(parseFloat(e.target.value) || 420000)}
                      className="w-full accent-[#2B7A55] cursor-pointer"
                    />
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-2 text-slate-400 font-bold text-sm">$</span>
                      <input
                        type="number"
                        id="calc-price-fl"
                        value={calcPrice}
                        onChange={(e) => setCalcPrice(parseFloat(e.target.value) || 0)}
                        className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-xl font-bold"
                      />
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">
                        {isEn ? 'Down Payment' : 'Enganche (Down Payment)'}
                      </label>
                      <span className="text-xs font-bold text-slate-700">
                        {calcDownPct}% (${new Intl.NumberFormat('en-US').format(Math.round(downPaymentAmount))})
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[
                        { pct: 3.5, label: '3.5% (FHA)' },
                        { pct: 5.0, label: '5%' },
                        { pct: 10.0, label: '10%' },
                        { pct: 20.0, label: '20%' },
                      ].map((item) => (
                        <button
                          key={item.pct}
                          type="button"
                          onClick={() => setCalcDownPct(item.pct)}
                          className={`text-xs py-1.5 rounded-lg border font-bold transition cursor-pointer text-center ${
                            calcDownPct === item.pct
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                              : 'border-slate-300 hover:border-blue-600 hover:text-blue-600 text-slate-600'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Market Rate vs Builder Rate */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        {isEn ? 'Open Market Rate' : 'Tasa Mercado Abierto'}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.125"
                          value={calcMarketRate}
                          onChange={(e) => setCalcMarketRate(parseFloat(e.target.value) || 0)}
                          className="w-full text-sm border border-rose-300 bg-rose-50/50 rounded-xl pl-3 pr-7 py-2 font-bold text-rose-700"
                        />
                        <span className="absolute right-3 top-2 text-xs text-slate-500 font-bold">%</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {isEn ? '30-yr fixed without builder buy-down' : 'Fija 30 años sin subsidio'}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        {calcMode === 'fixed'
                          ? (isEn ? 'Builder Fixed Rate' : 'Tasa Fija Constructora')
                          : (isEn ? 'Builder Base Rate (Yr 3+)' : 'Tasa Base Constructora')}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.125"
                          value={calcBuilderRate}
                          onChange={(e) => setCalcBuilderRate(parseFloat(e.target.value) || 0)}
                          className="w-full text-sm border border-emerald-400 bg-emerald-50 rounded-xl pl-3 pr-7 py-2 font-bold text-emerald-800"
                        />
                        <span className="absolute right-3 top-2 text-xs text-slate-500 font-bold">%</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
                        {calcMode === 'fixed'
                          ? (isEn ? 'Permanent 30-year rate' : 'Tasa fija acordada')
                          : (isEn ? 'Fixed rate from Year 3 to 30' : 'Tasa fija año 3 al 30')}
                      </span>
                    </div>
                  </div>

                  {/* Closing Credit */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {isEn ? 'Closing Cost Credit by Builder' : 'Crédito para Gastos de Cierre Aportado por Constructora'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-sm text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        step="1000"
                        value={calcClosingCredit}
                        onChange={(e) => setCalcClosingCredit(parseFloat(e.target.value) || 0)}
                        className="w-full text-sm border border-slate-300 rounded-xl pl-7 pr-3 py-2 font-bold text-slate-800"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {isEn ? 'Florida average: $15,000 to $25,000' : 'Promedio en Florida: $15,000 a $25,000'}
                    </span>
                  </div>

                  {/* Pre-fill presets from builders */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-600 uppercase block mb-2">
                      {isEn ? 'Load Builder Offer Preset:' : 'Cargar Oferta Específica de Constructora:'}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleLoadCalculatorPreset(4.75, 20000, 'fixed')}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        Lennar (4.75% / $20k)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadCalculatorPreset(5.25, 20000, 'fixed')}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        D.R. Horton (5.25% / $20k)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadCalculatorPreset(5.25, 25000, 'fixed')}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        Pulte (5.25% / $25k)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadCalculatorPreset(5.50, 22000, 'fixed')}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        Meritage (5.50% / $22k)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadCalculatorPreset(5.25, 18000, 'buydown')}
                        className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg hover:bg-blue-100 font-bold cursor-pointer"
                      >
                        M/I Homes 2/1 (3.25%)
                      </button>
                    </div>
                  </div>

                </div>

                {/* Outputs & Comparison Column (7 cols) */}
                <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-6">
                  
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-4">
                      {isEn ? 'Monthly Payment Comparison (P&I)' : 'Comparativa Mensual de Cuota (Principal & Interés)'}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Market Card */}
                      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-200 shadow-2xs">
                        <span className="text-xs text-rose-700 font-bold block uppercase">
                          {isEn ? 'With Traditional Bank' : 'Con Banco Tradicional'}
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                          ${new Intl.NumberFormat('en-US').format(Math.round(marketPayment))}
                        </div>
                        <span className="text-xs text-slate-500 mt-1 block">
                          {isEn ? `per month @ ${calcMarketRate.toFixed(2)}% Fixed 30y` : `al mes @ ${calcMarketRate.toFixed(2)}% Fijo 30 años`}
                        </span>
                      </div>

                      {/* Builder Card */}
                      <div className="bg-emerald-500/10 p-4 sm:p-5 rounded-2xl border-2 border-emerald-500 shadow-2xs">
                        <span className="text-xs text-emerald-800 font-black block uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{isEn ? 'With Builder' : 'Con Constructora'}</span>
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                          ${new Intl.NumberFormat('en-US').format(Math.round(activeBuilderPayment))}
                        </div>
                        <span className="text-xs text-emerald-700 font-medium mt-1 block">
                          {calcMode === 'fixed'
                            ? (isEn ? `per month @ ${calcBuilderRate.toFixed(2)}% Fixed 30y` : `al mes @ ${calcBuilderRate.toFixed(2)}% Fijo 30 años`)
                            : (isEn ? `in Year 1 (@ ${y1Rate.toFixed(2)}% with 2/1 Buydown)` : `en Año 1 (@ ${y1Rate.toFixed(2)}% con Buydown 2/1)`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buydown Schedule Box (when buydown mode active) */}
                  {calcMode === 'buydown' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs space-y-2.5">
                      <span className="font-extrabold text-blue-900 uppercase block text-[11px]">
                        {isEn ? 'Stepped Payment Projection (2/1 Buydown Program):' : 'Proyección de Cuota Escalonada (Programa 2/1 Buydown):'}
                      </span>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white p-2.5 rounded-lg border border-blue-200 shadow-2xs">
                          <span className="block text-slate-400 text-[10px] font-bold">{isEn ? 'Year 1 (-2%)' : 'Año 1 (-2%)'}</span>
                          <span className="font-extrabold text-emerald-700 text-sm">
                            ${new Intl.NumberFormat('en-US').format(Math.round(pY1))}
                          </span>
                          <span className="block text-[10px] text-slate-500">@ {y1Rate.toFixed(2)}%</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-blue-200 shadow-2xs">
                          <span className="block text-slate-400 text-[10px] font-bold">{isEn ? 'Year 2 (-1%)' : 'Año 2 (-1%)'}</span>
                          <span className="font-extrabold text-blue-700 text-sm">
                            ${new Intl.NumberFormat('en-US').format(Math.round(pY2))}
                          </span>
                          <span className="block text-[10px] text-slate-500">@ {y2Rate.toFixed(2)}%</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-blue-200 shadow-2xs">
                          <span className="block text-slate-400 text-[10px] font-bold">{isEn ? 'Years 3-30 (Fixed)' : 'Años 3 al 30 (Fija)'}</span>
                          <span className="font-extrabold text-slate-800 text-sm">
                            ${new Intl.NumberFormat('en-US').format(Math.round(pY3))}
                          </span>
                          <span className="block text-[10px] text-slate-500">@ {y3Rate.toFixed(2)}% Fijo</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-blue-900 leading-snug">
                        <strong>{isEn ? 'Key Point:' : 'Importante:'}</strong>{' '}
                        {isEn
                          ? 'In year 3, your payment steps up to the fixed base rate and remains constant for the remaining 28 years. No balloon payment, no variable risk.'
                          : 'En el año 3 tu cuota sube a la tasa fija base y se queda allí por los 28 años restantes. No es variable ni hay pago balloon.'}
                      </p>
                    </div>
                  )}

                  {/* Savings Highlights */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {isEn ? 'Real Savings Breakdown' : 'Desglose del Ahorro Real'}
                    </h4>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {isEn ? 'Monthly Payment Savings (Year 1):' : 'Ahorro Mensual en Cuota (Año 1):'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                        +${new Intl.NumberFormat('en-US').format(Math.round(monthlySavingsYear1))} / {isEn ? 'mo' : 'mes'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {isEn ? 'Annual Payment Savings (12 months):' : 'Ahorro Anual (12 meses):'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                        +${new Intl.NumberFormat('en-US').format(Math.round(annualSavingsYear1))} / {isEn ? 'yr' : 'año'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {isEn ? 'Upfront Closing Cost Savings (Day 1):' : 'Ahorro en Gastos de Cierre (Día 1):'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-blue-600">
                        +${new Intl.NumberFormat('en-US').format(calcClosingCredit)} {isEn ? 'in hand' : 'en mano'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-xs sm:text-sm font-black text-slate-900 block">
                          {isEn ? '5-Year Accumulated Savings:' : 'Ahorro Acumulado en 5 Años:'}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {isEn
                            ? '(Sum of lower monthly payments + closing cost credit)'
                            : '(Suma de pagos mensuales reducidos + gastos de cierre)'}
                        </span>
                      </div>
                      <span className="text-lg sm:text-2xl font-black text-indigo-700">
                        ${new Intl.NumberFormat('en-US').format(Math.round(fiveYearSavings))}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: FIRST-TIME BUYER GUIDE & RESOURCES */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isEn
                    ? 'Financial Guide: 30-Year Fixed vs. ARM vs. Buydown vs. Balloon Mortgages'
                    : 'Guía Financiera: Fija a 30 Años vs. Variable (ARM) vs. Buydown vs. Balloon'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                  {isEn
                    ? 'Learn how to identify exactly what type of mortgage each builder is offering so you never experience payment shock.'
                    : 'Aprende a identificar con exactitud qué tipo de hipoteca te está ofreciendo la constructora para no llevarte sorpresas en tu pago.'}
                </p>
              </div>

              {/* Four Loan Structures Detailed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Tasa Fija 30 Años */}
                <div className="border-2 border-emerald-500/40 rounded-2xl p-5 bg-emerald-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {isEn ? 'Maximum Peace of Mind' : 'Máxima Tranquilidad'}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {isEn ? '30 Years Immutable' : '30 Años Inmutable'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {isEn ? '1. 30-Year Fixed Rate Mortgage' : '1. Tasa Fija por la Vida del Préstamo (30-Year Fixed)'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'The builder permanently pays discount points to the lender to fix the rate (e.g. 5.25% or 5.50%) across all 360 months. Your principal and interest payment will never change, regardless of Fed rate hikes or inflation.'
                      : 'La constructora paga puntos de descuento al banco (permanent buydown) para fijar la tasa (ej. 5.25% o 5.50%) durante los 360 meses que dura el crédito. Tu cuota de principal e interés jamás cambiará, independientemente de la inflación.'}
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 text-xs text-slate-700">
                    <span className="font-bold text-emerald-800 block mb-1">
                      {isEn ? 'Who offers it in Florida?' : '¿Quién la ofrece en Florida?'}
                    </span>
                    D.R. Horton (5.25%), Pulte Homes (5.25%), Taylor Morrison (5.50%), Meritage (5.50%), KB Home (5.50%).
                  </div>
                </div>

                {/* 2. Buydown Temporal (2/1) */}
                <div className="border-2 border-blue-500/40 rounded-2xl p-5 bg-blue-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {isEn ? 'Maximum Upfront Savings' : 'Ahorro Inicial Máximo'}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      {isEn ? 'Stepped Years 1 & 2' : 'Escalonada Años 1 y 2'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {isEn ? '2. Temporary Buydown (2/1 Program)' : '2. Buydown Temporal (Programa 2/1 o 3/2/1)'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'The builder deposits funds into an escrow account to subsidize payments during the first two years: Year 1 is 2% below base (e.g. 3.25%), Year 2 is 1% below base (e.g. 4.25%), and from Year 3 onward it locks into the base rate (e.g. 5.25%) for the remaining 28 years.'
                      : 'La constructora deposita dinero en una cuenta de custodia para subsidiar tu cuota durante los primeros dos años: Año 1 está 2% por debajo (ej. 3.25%), Año 2 está 1% por debajo (ej. 4.25%), y a partir del Año 3 se fija en la tasa base (ej. 5.25%) por los 28 años restantes.'}
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-blue-200 text-xs text-slate-700">
                    <span className="font-bold text-blue-800 block mb-1">
                      {isEn ? 'Is there Balloon or Variable risk?' : '¿Tiene riesgo Balloon o Ajuste Variable?'}
                    </span>
                    {isEn
                      ? 'No. It is not an adjustable mortgage and there is never a balloon balance, but your monthly payment will increase in years 2 and 3.'
                      : 'No. No es variable después del año 2 y nunca hay pago balloon; pero tu cuota mensual subirá en los años 2 y 3.'}
                  </div>
                </div>

                {/* 3. Tasa Variable ARM */}
                <div className="border-2 border-amber-500/40 rounded-2xl p-5 bg-amber-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {isEn ? 'Ultra-Low Initial Rate' : 'Tasa Inicial Muy Baja'}
                    </span>
                    <span className="text-xs font-bold text-amber-700">
                      {isEn ? 'Fixed for 5 or 7 Years' : 'Fija 5 o 7 Años'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {isEn ? '3. Adjustable-Rate Mortgage (ARM, e.g. 5/1)' : '3. Hipoteca de Tasa Ajustable (ARM, ej. 5/1 o 7/6)'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'The rate remains low and fixed for the first 5 or 7 years (e.g. Lennar 4.75% for 5 years on FHA 5/1). Starting in year 6, it adjusts annually based on market benchmarks (SOFR) subject to regulatory caps.'
                      : 'La tasa se mantiene fija y muy baja durante los primeros 5 o 7 años (ej. Lennar 4.75% por 5 años en préstamos FHA 5/1). A partir del año 6, la tasa se ajusta una o dos veces al año según el índice SOFR con topes máximos (caps).'}
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs text-slate-700">
                    <span className="font-bold text-amber-800 block mb-1">
                      {isEn ? 'When does it make sense?' : '¿Cuándo conviene?'}
                    </span>
                    {isEn
                      ? 'Ideal if you plan to refinance once market rates drop or if you plan to sell within 5 years.'
                      : 'Ideal si planeas refinanciar cuando las tasas bajen o si planeas vender la propiedad antes de que se cumplan los 5 años.'}
                  </div>
                </div>

                {/* 4. Desmitificando el Préstamo Balloon */}
                <div className="border-2 border-slate-300 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800">
                      {isEn ? 'Risk Concept' : 'Concepto de Riesgo'}
                    </span>
                    <span className="text-xs font-bold text-rose-600">
                      {isEn ? 'Prohibited in these offers' : 'Prohibido en estas ofertas'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {isEn ? '4. What is a "Balloon" Loan and why is it NOT here?' : '4. ¿Qué es un Préstamo "Balloon" y por qué NO está aquí?'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isEn
                      ? 'A balloon mortgage is an old-style loan where you pay low payments for 5 years, but the entire remaining principal balance (hundreds of thousands of dollars) is suddenly due in one giant final payment. If you cannot refinance or pay cash, foreclosure ensues.'
                      : 'Un préstamo Balloon es una hipoteca donde pagas cuotas reducidas por 5 a 7 años, pero todo el saldo restante de la deuda (cientos de miles de dólares) vence de golpe en una sola cuota final. Si no tienes el efectivo o no puedes refinanciar, pierdes la propiedad.'}
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">
                      {isEn ? 'Federal Consumer Protection:' : 'Protección Legal Federal:'}
                    </span>
                    {isEn
                      ? 'CFPB Qualified Mortgage (QM) regulations prohibit balloon clauses in standard residential FHA, VA, and Fannie Mae mortgages offered by these builders. Zero balloon risk in this catalog.'
                      : 'La ley federal de Préstamos Calificados (QM / CFPB) prohíbe cláusulas balloon en hipotecas residenciales FHA, VA y Fannie Mae ofrecidas por estas constructoras. Ninguna oferta de esta lista tiene pago Balloon.'}
                  </div>
                </div>

              </div>

              {/* State programs */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {isEn
                    ? 'Stackable Florida State Programs for First-Time Buyers'
                    : 'Programas Estatales Acumulables para Primeros Compradores'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-900 text-sm">Florida Hometown Heroes</span>
                      <a
                        href="https://www.floridahousing.org/live-local-act/hometown-heroes-program"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 font-bold hover:underline text-xs inline-flex items-center gap-1"
                      >
                        <span>{isEn ? 'Official Portal' : 'Sitio Oficial'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isEn
                        ? 'Up to 5% of loan amount (up to $35,000) as a 0% interest, non-amortizing, deferred second mortgage for Florida workers buying their first primary residence.'
                        : 'Hasta el 5% del valor del préstamo (hasta $35,000) como segundo préstamo hipotecario al 0% de interés y sin pagos mensuales para trabajadores de Florida que compran su primera vivienda.'}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-900 text-sm">Florida Housing DPA Program</span>
                      <a
                        href="https://www.floridahousing.org/programs/homebuyer-overview-page"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline text-xs inline-flex items-center gap-1"
                      >
                        <span>{isEn ? 'Official Portal' : 'Sitio Oficial'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isEn
                        ? 'State-supervised 30-year fixed rate first mortgages paired with up to $10,000 in forgivable down payment assistance across Orange, Osceola, Lake, and Polk.'
                        : 'Hipotecas fijas supervisadas por el estado más hasta $10,000 en fondos perdonables para cubrir el pago inicial en Orange, Osceola, Lake y Polk.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Modal for Builder Details */}
      {modalBuilder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-1">
                  {modalBuilder.counties.join(', ')}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {modalBuilder.name} — {modalBuilder.promoName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalBuilder(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              
              {/* Rate & Closing Box */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    {isEn ? 'Initial Promo Rate' : 'Tasa de Entrada'}
                  </span>
                  <span className="text-emerald-700 font-black text-base">{modalBuilder.rate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    {isEn ? 'Closing Credit' : 'Crédito de Cierre'}
                  </span>
                  <span className="text-blue-700 font-black text-base">{modalBuilder.closingCredits}</span>
                </div>
              </div>

              {/* Structure & Balloon verification */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 space-y-1.5">
                <span className="text-amber-950 block text-[10px] uppercase font-black tracking-wider">
                  {isEn ? 'Mortgage Structure & Balloon Verification:' : 'Estructura Hipotecaria & Verificación Balloon:'}
                </span>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">{modalBuilder.structureTag}</div>
                <p className="text-xs text-slate-700">{modalBuilder.structureDesc}</p>
                <div className="pt-1.5 text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{modalBuilder.balloonText}</span>
                </div>
              </div>

              {/* Expiration & Closing deadline */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3.5 space-y-1">
                <span className="text-rose-950 block text-[10px] uppercase font-black tracking-wider">
                  {isEn ? 'Deadlines & Timing:' : 'Fechas Límite y Vencimiento:'}
                </span>
                <p className="text-xs text-rose-950 font-bold">{modalBuilder.contractDeadline}</p>
                <p className="text-xs text-slate-600">{modalBuilder.closingDeadline}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">
                  {isEn ? 'Required Lender:' : 'Prestamista Requerido:'}
                </h4>
                <p className="text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-xs">
                  {modalBuilder.lender} ({isEn ? 'Required to qualify for promotional rate and closing credits.' : 'Requisito indispensable para calificar a la tasa reducida y créditos de cierre.'})
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">
                  {isEn ? 'First-Time Buyer Package:' : 'Paquete para Primer Comprador:'}
                </h4>
                <p className="text-slate-600 text-xs">{modalBuilder.firstTimePerk}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">
                  {isEn ? 'Featured Areas & Communities:' : 'Zonas y Comunidades Destacadas:'}
                </h4>
                <p className="text-slate-600 text-xs">{modalBuilder.keyAreas}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalBuilder(null);
                  handleLoadCalculatorPreset(
                    modalBuilder.rateNumeric,
                    modalBuilder.closingNumeric,
                    modalBuilder.rateType === 'buydown' ? 'buydown' : 'fixed'
                  );
                }}
                className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{isEn ? 'Simulate in Calculator' : 'Calcular en Simulador'}</span>
              </button>

              <a
                href={modalBuilder.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <span>{isEn ? 'Visit Official Offer' : 'Ver Oferta en Web Oficial'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-1">
          <p className="font-medium">
            {isEn
              ? `Educational compilation of new construction builder incentives across Florida (Orlando, Tampa, Miami, Jacksonville, Southwest Florida & beyond). Verified for ${currentMonthYear}. All displayed mortgages are fully amortized 30-year loans with zero balloon clauses. Subject to credit qualification with affiliated builder lenders.`
              : `Compilación informativa de ofertas de constructoras en todo el estado de Florida (Orlando, Tampa, Miami, Jacksonville, Suroeste y más). Verificado para ${currentMonthYear}. Todas las hipotecas mostradas están completamente amortizadas a 30 años sin pagos Balloon. Sujeto a calificación crediticia y aprobación con el prestamista afiliado.`}
          </p>
          <p className="text-[11px] text-slate-400">
            {APP_CONFIG.brandName} • {isEn ? 'Independent Educational Tool' : 'Herramienta Educativa Independiente'}
          </p>
        </div>
      </footer>
    </div>
  );
};
export default FloridaIncentivesPage;
