import React, { useState, useMemo } from 'react';
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
  Globe
} from 'lucide-react';
import { FLORIDA_BUILDERS_DATA, BuilderIncentive } from '../data/floridaBuildersData';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONFIG } from '../data/config';

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
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedIncentive, setSelectedIncentive] = useState('all');
  const [sortBy, setSortBy] = useState<'rate-asc' | 'closing-desc' | 'name-asc'>('rate-asc');

  // Modal state
  const [modalBuilder, setModalBuilder] = useState<BuilderIncentive | null>(null);

  // Calculator state
  const [calcPrice, setCalcPrice] = useState<number>(420000);
  const [calcDownPct, setCalcDownPct] = useState<number>(5);
  const [calcMarketRate, setCalcMarketRate] = useState<number>(6.75);
  const [calcBuilderRate, setCalcBuilderRate] = useState<number>(4.99);
  const [calcClosingCredit, setCalcClosingCredit] = useState<number>(20000);

  // Filtered & sorted builders
  const filteredBuilders = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = FLORIDA_BUILDERS_DATA.filter((b) => {
      const matchText =
        b.name.toLowerCase().includes(q) ||
        b.keyAreas.toLowerCase().includes(q) ||
        b.promoName.toLowerCase().includes(q) ||
        b.lender.toLowerCase().includes(q);
      if (!matchText) return false;

      if (selectedCounty !== 'all' && !b.counties.includes(selectedCounty)) {
        return false;
      }

      if (selectedIncentive === 'rate-sub5' && b.rateNumeric >= 5.0) return false;
      if (selectedIncentive === 'closing-20k' && b.closingNumeric < 20000) return false;
      if (selectedIncentive === 'buydown21' && !b.rateDetails.includes('2/1')) return false;
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

    if (sortBy === 'rate-asc') {
      result.sort((a, b) => a.rateNumeric - b.rateNumeric);
    } else if (sortBy === 'closing-desc') {
      result.sort((a, b) => b.closingNumeric - a.closingNumeric);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCounty, selectedIncentive, sortBy]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCounty('all');
    setSelectedIncentive('all');
    setSortBy('rate-asc');
  };

  // Quick preset loader into calculator
  const handleLoadCalculatorPreset = (rate: number, credit: number) => {
    setCalcBuilderRate(rate);
    setCalcClosingCredit(credit);
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
  const builderPayment = calculateMonthlyPI(loanAmount, calcBuilderRate);
  const monthlySavings = Math.max(0, marketPayment - builderPayment);
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = monthlySavings * 60 + calcClosingCredit;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-[#102C46] via-[#163654] to-[#0B1E30] text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onBackToMain}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#C7E7A4] transition-colors flex items-center gap-1.5 text-xs font-bold"
              title={isEn ? 'Return to Home Roadmap' : 'Volver a Tu Ruta 2027'}
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
                  {isEn ? 'Central Florida • New Homes Incentives' : 'Florida Central • Incentivos Casas Nuevas'}
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isEn ? 'Active Offers Nov 2026' : 'Ofertas Activas Noviembre 2026'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isEn
                  ? 'Official comparison of builder rate buydowns, closing credits, and first-time buyer perks'
                  : 'Comparativa oficial de tasas reducidas, gastos de cierre y programas para primer comprador'}
              </p>
            </div>
          </div>

          {/* Quick Market Stats & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 hidden sm:block">
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">{isEn ? 'Market Rate' : 'Tasa Mercado'}</span>
              <span className="text-rose-400 font-bold text-xs sm:text-sm">~6.75%</span>
            </div>
            <div className="bg-[#2B7A55]/40 border border-[#2B7A55] rounded-lg px-2.5 py-1.5">
              <span className="text-emerald-300 block text-[9px] uppercase font-semibold">{isEn ? 'Builder Rates' : 'Tasa Constructora'}</span>
              <span className="text-emerald-300 font-bold text-xs sm:text-sm">{isEn ? 'From 3.25% - 4.75%' : 'Desde 3.25% - 4.75%'}</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 hidden md:block">
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">{isEn ? 'Max Closing Credit' : 'Crédito Cierre Máx'}</span>
              <span className="text-[#D5AD57] font-bold text-xs sm:text-sm">{isEn ? 'Up to $25k - $30k' : 'Hasta $25,000 - $30,000'}</span>
            </div>

            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang(isEn ? 'es' : 'en')}
              className="inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 border border-[#C7E7A4]/40 text-[#C7E7A4] px-2 py-1.5 rounded-lg text-xs font-bold"
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
              className={`py-3 transition flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold border-b-2 ${
                activeTab === 'builders'
                  ? 'text-[#C7E7A4] border-[#C7E7A4]'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{isEn ? 'Builders Directory (11)' : 'Directorio de Constructoras (11)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-3 transition flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold border-b-2 ${
                activeTab === 'calculator'
                  ? 'text-[#C7E7A4] border-[#C7E7A4]'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{isEn ? 'Mortgage Savings Calculator' : 'Calculadora de Ahorro Hipotecario'}</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`py-3 transition flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold border-b-2 ${
                activeTab === 'guide'
                  ? 'text-[#C7E7A4] border-[#C7E7A4]'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isEn ? 'Florida First-Time Buyer Guide' : 'Guía y Programas Primer Comprador'}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Search input */}
                <div>
                  <label htmlFor="fl-search-input" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Search Builder / Area' : 'Buscar Constructora / Zona'}
                  </label>
                  <div className="relative">
                    <input
                      id="fl-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isEn ? 'e.g. Lennar, Davenport, Lake Nona...' : 'Ej: Lennar, Davenport, Lake Nona...'}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-[#2B7A55] focus:outline-none bg-slate-50 focus:bg-white"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* County filter */}
                <div>
                  <label htmlFor="fl-filter-county" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'County / Area' : 'Condado / Área'}
                  </label>
                  <select
                    id="fl-filter-county"
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none font-medium"
                  >
                    <option value="all">{isEn ? 'All Counties (Orlando Metro)' : 'Todos los Condados (Orlando Metro)'}</option>
                    <option value="Orange">Orange (Orlando, Lake Nona, Winter Garden)</option>
                    <option value="Osceola">Osceola (Kissimmee, St. Cloud, Poinciana)</option>
                    <option value="Polk">Polk (Davenport, Haines City, Lakeland)</option>
                    <option value="Lake">Lake (Clermont, Groveland, Minneola)</option>
                    <option value="Seminole">Seminole (Sanford, Oviedo, Lake Mary)</option>
                  </select>
                </div>

                {/* Incentive type filter */}
                <div>
                  <label htmlFor="fl-filter-incentive" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Incentive Type' : 'Tipo de Incentivo'}
                  </label>
                  <select
                    id="fl-filter-incentive"
                    value={selectedIncentive}
                    onChange={(e) => setSelectedIncentive(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none font-medium"
                  >
                    <option value="all">{isEn ? 'All Incentives' : 'Todos los Incentivos'}</option>
                    <option value="rate-sub5">{isEn ? 'Rate Under 5.0%' : 'Tasa Menor a 5.0%'}</option>
                    <option value="closing-20k">{isEn ? 'Closing Credit $20,000+' : 'Gastos de Cierre $20,000+'}</option>
                    <option value="buydown21">{isEn ? '2/1 Buydown Program' : 'Programa 2/1 Buydown'}</option>
                    <option value="first-time">{isEn ? 'First-Time Buyer Special' : 'Especial Primer Comprador'}</option>
                  </select>
                </div>

                {/* Order by */}
                <div>
                  <label htmlFor="fl-sort-by" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isEn ? 'Sort By' : 'Ordenar Por'}
                  </label>
                  <select
                    id="fl-sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2B7A55] focus:outline-none font-medium"
                  >
                    <option value="rate-asc">{isEn ? 'Lowest Interest Rate' : 'Menor Tasa de Interés'}</option>
                    <option value="closing-desc">{isEn ? 'Highest Closing Credit' : 'Mayor Crédito Gastos Cierre'}</option>
                    <option value="name-asc">{isEn ? 'Builder Name (A-Z)' : 'Nombre Constructora (A-Z)'}</option>
                  </select>
                </div>

              </div>

              {/* Active count and reset */}
              <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div>
                  {isEn ? (
                    <>Showing <span className="font-extrabold text-[#2B7A55]">{filteredBuilders.length}</span> of {FLORIDA_BUILDERS_DATA.length} active confirmed offers for Central Florida.</>
                  ) : (
                    <>Mostrando <span className="font-extrabold text-[#2B7A55]">{filteredBuilders.length}</span> de {FLORIDA_BUILDERS_DATA.length} ofertas activas y confirmadas para Florida Central.</>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[#2B7A55] hover:text-[#102C46] font-bold underline transition"
                >
                  {isEn ? 'Reset Filters' : 'Restablecer Filtros'}
                </button>
              </div>
            </div>

            {/* Quick Alert Notice */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{isEn ? 'Essential Builder Rule:' : 'Regla indispensable de los constructores:'}</span>{' '}
                {isEn
                  ? 'To qualify for these promotional rates and closing credits, you must use the builder affiliated in-house lender (e.g., Lennar Mortgage, DHI Mortgage, Pulte Mortgage). The best offers apply to Quick Move-In (QMI) inventory closing before December 31, 2026.'
                  : 'Para recibir estas tasas y créditos de cierre, es obligatorio utilizar la entidad financiera hipotecaria afiliada de la constructora (ej. Lennar Mortgage, DHI Mortgage, Pulte Mortgage). Las mejores ofertas aplican a casas de entrega rápida (Quick Move-In) que cierren antes de fin de año 2026.'}
              </div>
            </div>

            {/* Builders Cards Grid */}
            {filteredBuilders.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-700">{isEn ? 'No offers match your current filters.' : 'No se encontraron ofertas con los filtros actuales.'}</p>
                <p className="text-xs text-slate-400 mt-1">{isEn ? 'Try resetting filters to view all 11 builders.' : 'Prueba restablecer los filtros para ver todas las 11 constructoras activas.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilders.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5 space-y-4">
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F1F9EC] text-[#2B7A55] border border-[#C7E7A4]">
                            {b.badge}
                          </span>
                          <h3 className="text-lg font-extrabold text-[#102C46] mt-1">{b.name}</h3>
                          <p className="text-xs text-slate-500 font-medium">{b.promoName}</p>
                        </div>
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-bold shrink-0">
                          {b.counties.slice(0, 2).join(', ')}{b.counties.length > 2 ? ` +${b.counties.length - 2}` : ''}
                        </span>
                      </div>

                      {/* Main Incentive Highlights */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] uppercase text-slate-400 font-bold block">{isEn ? 'Promo Rate' : 'Tasa Promocional'}</span>
                          <span className="text-lg font-extrabold text-[#2B7A55]">{b.rate}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{isEn ? 'vs ~6.75% market' : 'vs ~6.75% mercado'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-slate-400 font-bold block">{isEn ? 'Closing Costs' : 'Gastos de Cierre'}</span>
                          <span className="text-base font-extrabold text-[#102C46]">{b.closingCredits}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{isEn ? 'with lender' : 'con prestamista'}</span>
                        </div>
                      </div>

                      {/* First-Time Buyer & Lender Notes */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">⭐</span>
                          <span className="text-slate-700"><strong>{isEn ? 'First-Time Perk:' : 'Primer Comprador:'}</strong> {b.firstTimePerk}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#2B7A55] mt-0.5">🏦</span>
                          <span className="text-slate-500"><strong>{isEn ? 'Lender:' : 'Prestamista:'}</strong> {b.lender}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setModalBuilder(b)}
                        className="text-xs text-slate-700 hover:text-[#2B7A55] font-bold transition flex items-center gap-1"
                      >
                        <span>{isEn ? 'View Terms →' : 'Ver Términos →'}</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleLoadCalculatorPreset(b.rateNumeric, b.closingNumeric)}
                          className="p-2 rounded-lg bg-[#F1F9EC] hover:bg-[#E2F3D6] text-[#2B7A55] transition border border-[#C7E7A4]"
                          title={isEn ? 'Calculate with this rate' : 'Calcular con esta tasa'}
                        >
                          <Calculator className="w-4 h-4" />
                        </button>
                        <a
                          href={b.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 bg-[#2B7A55] hover:bg-[#226344] text-white rounded-lg font-bold transition inline-flex items-center gap-1"
                        >
                          <span>{isEn ? 'Official Site' : 'Sitio Oficial'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: MORTGAGE CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#102C46] to-[#1C4368] p-6 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#C7E7A4]" />
                  <span>{isEn ? 'Savings Simulator: Open Market vs Builder Rate' : 'Simulador de Ahorro: Mercado Abierto vs. Tasa de Constructora'}</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {isEn
                    ? 'Calculate exactly how much you save every month and in upfront closing costs by taking advantage of Central Florida builder incentives.'
                    : 'Calcula con precisión cuánto dinero ahorras cada mes y cuánto ahorras en gastos de cierre al aprovechar los incentivos de Florida Central.'}
                </p>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Inputs Column (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* Home Price */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="sim-price" className="text-xs font-bold text-slate-700 uppercase">
                        {isEn ? 'New Home Purchase Price' : 'Precio de la Casa Nueva'}
                      </label>
                      <span className="text-sm font-extrabold text-[#2B7A55]">
                        ${calcPrice.toLocaleString('en-US')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={250000}
                      max={850000}
                      step={5000}
                      value={calcPrice}
                      onChange={(e) => setCalcPrice(parseFloat(e.target.value) || 0)}
                      className="w-full accent-[#2B7A55]"
                    />
                    <input
                      id="sim-price"
                      type="number"
                      step={5000}
                      value={calcPrice || ''}
                      onChange={(e) => setCalcPrice(parseFloat(e.target.value) || 0)}
                      className="w-full mt-2 text-sm border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">
                        {isEn ? 'Down Payment' : 'Enganche (Down Payment)'}
                      </label>
                      <span className="text-xs font-bold text-slate-700">
                        {calcDownPct}% (${Math.round(downPaymentAmount).toLocaleString('en-US')})
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[
                        { pct: 3.5, label: '3.5% (FHA)' },
                        { pct: 5, label: '5%' },
                        { pct: 10, label: '10%' },
                        { pct: 20, label: '20%' },
                      ].map((item) => (
                        <button
                          key={item.pct}
                          type="button"
                          onClick={() => setCalcDownPct(item.pct)}
                          className={`text-xs py-2 rounded-xl border font-bold transition ${
                            calcDownPct === item.pct
                              ? 'border-[#2B7A55] bg-[#F1F9EC] text-[#2B7A55] ring-1 ring-[#2B7A55]'
                              : 'border-slate-300 hover:border-[#2B7A55] text-slate-700 bg-slate-50'
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
                      <label htmlFor="sim-market-rate" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        {isEn ? 'Open Market Rate' : 'Tasa Mercado Abierto'}
                      </label>
                      <div className="relative">
                        <input
                          id="sim-market-rate"
                          type="number"
                          step={0.125}
                          value={calcMarketRate || ''}
                          onChange={(e) => setCalcMarketRate(parseFloat(e.target.value) || 0)}
                          className="w-full text-sm border border-rose-300 bg-rose-50/50 rounded-xl pl-3 pr-7 py-2.5 font-bold text-rose-700"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">%</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">{isEn ? 'Current national average' : 'Promedio nacional actual'}</span>
                    </div>
                    <div>
                      <label htmlFor="sim-builder-rate" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        {isEn ? 'Builder Promo Rate' : 'Tasa Constructora'}
                      </label>
                      <div className="relative">
                        <input
                          id="sim-builder-rate"
                          type="number"
                          step={0.125}
                          value={calcBuilderRate || ''}
                          onChange={(e) => setCalcBuilderRate(parseFloat(e.target.value) || 0)}
                          className="w-full text-sm border border-emerald-400 bg-emerald-50 rounded-xl pl-3 pr-7 py-2.5 font-bold text-emerald-800"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">%</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-medium block mt-1">{isEn ? 'Incentive with lender' : 'Incentivo con prestamista'}</span>
                    </div>
                  </div>

                  {/* Closing Credit from Builder */}
                  <div>
                    <label htmlFor="sim-closing-credit" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {isEn ? 'Builder Closing Costs Credit ($)' : 'Incentivo Gastos de Cierre Aportado por Constructora ($)'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm text-slate-400 font-bold">$</span>
                      <input
                        id="sim-closing-credit"
                        type="number"
                        step={1000}
                        value={calcClosingCredit || ''}
                        onChange={(e) => setCalcClosingCredit(parseFloat(e.target.value) || 0)}
                        className="w-full text-sm border border-slate-300 rounded-xl pl-8 pr-3 py-2.5 font-bold text-slate-800 bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">{isEn ? 'Average in Orlando: $15,000 to $25,000' : 'Promedio en Orlando: $15,000 a $25,000'}</span>
                  </div>

                </div>

                {/* Outputs & Comparison Column (7 cols) */}
                <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 flex flex-col justify-between space-y-6">
                  
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-3">
                      {isEn ? 'Monthly Principal & Interest (P&I) Comparison' : 'Comparativa Mensual de Principal & Interés (P&I)'}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Market Card */}
                      <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs">
                        <span className="text-[11px] text-rose-700 font-bold block uppercase">{isEn ? 'Traditional Bank' : 'Con Banco Tradicional'}</span>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                          ${Math.round(marketPayment).toLocaleString('en-US')}
                        </div>
                        <span className="text-xs text-slate-500">{isEn ? `per mo @ ${calcMarketRate}%` : `al mes @ ${calcMarketRate}%`}</span>
                      </div>

                      {/* Builder Card */}
                      <div className="bg-[#F1F9EC] p-4 rounded-xl border-2 border-[#2B7A55] shadow-2xs">
                        <span className="text-[11px] text-[#2B7A55] font-black block uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2B7A55]" />
                          <span>{isEn ? 'With Builder Rate' : 'Con Tasa Constructora'}</span>
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-[#2B7A55] mt-1">
                          ${Math.round(builderPayment).toLocaleString('en-US')}
                        </div>
                        <span className="text-xs text-[#2B7A55] font-medium">{isEn ? `per mo @ ${calcBuilderRate}%` : `al mes @ ${calcBuilderRate}%`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Savings Highlights */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{isEn ? 'Real Savings Breakdown' : 'Desglose del Ahorro Real'}</h4>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{isEn ? 'Monthly Payment Savings:' : 'Ahorro Mensual en Tu Cuota:'}</span>
                      <span className="text-sm sm:text-base font-extrabold text-[#2B7A55]">
                        +${Math.round(monthlySavings).toLocaleString('en-US')} {isEn ? '/ mo' : '/ mes'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{isEn ? 'Annual Savings (12 mos):' : 'Ahorro Anual (12 meses):'}</span>
                      <span className="text-sm sm:text-base font-extrabold text-[#2B7A55]">
                        +${Math.round(annualSavings).toLocaleString('en-US')} {isEn ? '/ yr' : '/ año'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{isEn ? 'Closing Cash Saved (Day 1):' : 'Ahorro en Gastos de Cierre (Día 1):'}</span>
                      <span className="text-sm sm:text-base font-extrabold text-[#102C46]">
                        +${Math.round(calcClosingCredit).toLocaleString('en-US')} {isEn ? 'cash kept' : 'en mano'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900 block">{isEn ? '5-Year Total Accumulated Savings:' : 'Ahorro Total Acumulado a 5 Años:'}</span>
                        <span className="text-[10px] text-slate-400">{isEn ? '(Monthly savings + closing credits)' : '(Cuotas mensuales + gastos de cierre)'}</span>
                      </div>
                      <span className="text-lg sm:text-2xl font-black text-[#102C46]">
                        ${Math.round(fiveYearSavings).toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>

                  {/* Pre-fill presets from builders */}
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase block mb-2">
                      {isEn ? 'Quick-Load Builder Promo Rate:' : 'Cargar Tasa Promocional de Constructora:'}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {[
                        { label: 'Lennar (4.75% / $20k)', r: 4.75, c: 20000 },
                        { label: 'D.R. Horton (5.25% / $20k)', r: 5.25, c: 20000 },
                        { label: 'Pulte (5.25% / $25k)', r: 5.25, c: 25000 },
                        { label: 'Meritage (5.50% / $22k)', r: 5.50, c: 22000 },
                        { label: 'M/I Homes 2/1 (3.25%)', r: 3.25, c: 15000 },
                      ].map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCalcBuilderRate(p.r);
                            setCalcClosingCredit(p.c);
                          }}
                          className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg hover:border-[#2B7A55] hover:text-[#2B7A55] font-semibold transition shadow-2xs"
                        >
                          {p.label}
                        </button>
                      ))}
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
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#102C46]">
                  {isEn ? 'Strategic Guide for First-Time Homebuyers in Central Florida' : 'Guía Estratégica para el Primer Comprador en Florida Central'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {isEn
                    ? 'How to combine builder incentives, Florida state programs, and avoid costly mistakes when buying a new home.'
                    : 'Cómo combinar incentivos de constructora, programas estatales y evitar errores costosos al comprar casa nueva.'}
                </p>
              </div>

              {/* Cards: Florida State Programs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="border border-blue-200 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-blue-50/80 to-white relative shadow-2xs">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 text-white mb-3">
                    {isEn ? 'Florida Official Program' : 'Programa Oficial de Florida'}
                  </span>
                  <h3 className="text-lg font-bold text-blue-950">Florida Hometown Heroes Program</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {isEn
                      ? 'State initiative offering eligible Florida frontline workers and full-time employees up to 5% of the first mortgage loan amount (maximum $35,000) as a 0% interest, non-amortizing second mortgage deferred until sale or refinancing.'
                      : 'Iniciativa del estado que otorga a primeros compradores trabajadores en Florida hasta el 5% del monto del préstamo (máximo $35,000) como segundo préstamo hipotecario sin intereses ni pagos mensuales hasta que vendas o refinancies.'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{isEn ? 'Employment in FL + First-Time Buyer' : 'Empleo en FL + Primer Comprador'}</span>
                    <a
                      href="https://www.floridahousing.org/live-local-act/hometown-heroes-program"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>{isEn ? 'Official Website' : 'Ver Sitio Oficial'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="border border-emerald-200 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#F1F9EC] to-white relative shadow-2xs">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#2B7A55] text-white mb-3">
                    {isEn ? 'Florida Housing Finance Corp' : 'Florida Housing Finance Corp'}
                  </span>
                  <h3 className="text-lg font-bold text-emerald-950">First Time Homebuyer Program (DPA)</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {isEn
                      ? 'Offers 30-year fixed-rate mortgages with regulated competitive terms and Down Payment Assistance (DPA) of up to $10,000 in forgivable second mortgages for qualified buyers in Orange, Osceola, Polk, and Lake.'
                      : 'Ofrece hipotecas fijas a 30 años con tasas reguladas y programas de Asistencia para el Pago Inicial (Down Payment Assistance - DPA) de hasta $10,000 en segunda hipoteca perdonable para compradores calificados.'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Orange, Osceola, Polk, Lake</span>
                    <a
                      href="https://www.floridahousing.org/programs/homebuyer-overview-page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2B7A55] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>{isEn ? 'Check Eligibility' : 'Ver Requisitos'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Types of buydowns comparison table */}
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#102C46] mb-3">
                  {isEn ? 'Key Differences Between Builder Mortgage Incentives' : 'Diferencias Clave entre Tipos de Incentivos Hipotecarios'}
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="min-w-full text-xs text-left">
                    <thead className="bg-[#102C46] text-white uppercase font-bold text-[11px]">
                      <tr>
                        <th className="px-4 py-3">{isEn ? 'Incentive Type' : 'Tipo de Incentivo'}</th>
                        <th className="px-4 py-3">{isEn ? 'How It Works' : '¿Cómo Funciona?'}</th>
                        <th className="px-4 py-3">{isEn ? 'Main Advantage' : 'Ventaja Principal'}</th>
                        <th className="px-4 py-3">{isEn ? 'Critical Consideration' : 'Punto Crítico a Revisar'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="px-4 py-3 font-bold text-slate-900">{isEn ? 'Permanent Buydown (30 Years)' : 'Buydown Permanente (30 años)'}</td>
                        <td className="px-4 py-3">{isEn ? 'The builder pays discount points at closing to fix the rate (e.g. 4.99% or 5.25%) for the full 30-year term.' : 'La constructora paga puntos de descuento al cierre para fijar la tasa (ej. 4.99% o 5.25%) por los 30 años.'}</td>
                        <td className="px-4 py-3 text-[#2B7A55] font-bold">{isEn ? 'Maximum safety: payments never increase.' : 'Seguridad total: el pago nunca sube.'}</td>
                        <td className="px-4 py-3">{isEn ? 'Requires using the builder lender.' : 'Requiere el uso estricto del prestamista del constructor.'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-slate-900">{isEn ? 'Temporary Buydown (2/1 or 3/2/1)' : 'Buydown Temporal (2/1 o 3/2/1)'}</td>
                        <td className="px-4 py-3">{isEn ? 'Rate is discounted by 2% in year 1 (e.g. 3.25%), 1% in year 2 (4.25%), returning to the note rate in year 3.' : 'Tasa reducida en 2% el primer año (ej. 3.25%), en 1% el segundo (4.25%) y vuelve a la tasa fija acordada en año 3.'}</td>
                        <td className="px-4 py-3 text-blue-700 font-bold">{isEn ? 'Ultra-low payments in initial move-in years.' : 'Pagos ultra-bajos en los primeros años de mudanza.'}</td>
                        <td className="px-4 py-3 text-rose-600 font-bold">{isEn ? 'You must qualify with the full rate, not the promo rate.' : 'Debes calificar financieramente con la tasa completa, no con la reducida.'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-slate-900">{isEn ? 'Direct Closing Credit' : 'Crédito Directo a Gastos de Cierre'}</td>
                        <td className="px-4 py-3">{isEn ? 'Builder funds that reduce cash needed to close (title, prepaids, escrow deposits).' : 'Fondos que reducen el dinero en efectivo que debes llevar a la mesa de cierre (título, seguro, depósitos de custodia).'}</td>
                        <td className="px-4 py-3 text-[#2B7A55] font-bold">{isEn ? 'Preserves liquidity in your bank account.' : 'Conservas liquidez en tu cuenta bancaria.'}</td>
                        <td className="px-4 py-3">{isEn ? 'Does not lower monthly payments unless used for points.' : 'No reduce el pago mensual a largo plazo (a menos que se use para comprar puntos).'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-slate-900">{isEn ? 'Promotional ARM (5/1 or 7/6)' : 'ARM Promocional (5/1 o 7/6)'}</td>
                        <td className="px-4 py-3">{isEn ? 'Fixed rate for initial 5 or 7 years (e.g. 4.75%) then adjusts annually based on SOFR.' : 'Tasa fija inicial por 5 o 7 años (ej. 4.75%) y luego se ajusta anualmente según el índice SOFR.'}</td>
                        <td className="px-4 py-3 text-amber-700 font-bold">{isEn ? 'Very low entry rate.' : 'Tasa de entrada muy competitiva.'}</td>
                        <td className="px-4 py-3 text-rose-600 font-bold">{isEn ? 'Risk of rate increase after the fixed term.' : 'Riesgo de subida de tasa al culminar el periodo fijo si no refinancias.'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4 Steps Checklist */}
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#102C46] mb-3">
                  {isEn ? '4 Steps to Maximize Builder Incentives When Negotiating' : 'Paso a Paso para Maximizar tus Incentivos al Negociar'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#102C46] text-[#C7E7A4] flex items-center justify-center font-bold text-xs">1</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{isEn ? 'Double Pre-Approval' : 'Pre-calificación Doble'}</h4>
                    <p className="text-xs text-slate-600">{isEn ? 'Get a pre-approval from an independent lender first to establish a real baseline before negotiating builder offers.' : 'Obtén una carta de un banco independiente para tener una base de comparación real frente a la oferta del constructor.'}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#102C46] text-[#C7E7A4] flex items-center justify-center font-bold text-xs">2</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{isEn ? 'Prioritize QMI Homes' : 'Prioriza Casas QMI'}</h4>
                    <p className="text-xs text-slate-600">{isEn ? 'Quick Move-In homes carry carrying costs for the builder; they feature up to double the incentives of to-be-built homes.' : 'Las casas de entrega inmediata acumulan el costo de mantenimiento para el constructor; tienen hasta el doble de incentivos que construir desde cero.'}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#102C46] text-[#C7E7A4] flex items-center justify-center font-bold text-xs">3</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{isEn ? 'Hire Independent Inspector' : 'Pide Inspección Privada'}</h4>
                    <p className="text-xs text-slate-600">{isEn ? 'Even with new construction, hire an independent home inspector prior to final walkthrough to safeguard builder warranties.' : 'Aunque la casa sea nueva, contrata un inspector independiente antes del walkthrough final para asegurar garantías.'}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#102C46] text-[#C7E7A4] flex items-center justify-center font-bold text-xs">4</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{isEn ? 'Negotiate Extra Credits' : 'Negocia Extras en Cierre'}</h4>
                    <p className="text-xs text-slate-600">{isEn ? 'If builder credits exceed allowable loan closing costs, request excess credits be applied toward price reduction or appliances.' : 'Si el crédito de cierre sobrepasa los gastos permitidos por el préstamo, solicita que lo apliquen a reducción de precio o electrodomésticos.'}</p>
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
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-1">
                  {modalBuilder.counties.join(', ')}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {modalBuilder.name} — {modalBuilder.promoName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalBuilder(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isEn ? 'Promo Interest Rate' : 'Tasa de Interés Promocional'}</span>
                  <span className="text-[#2B7A55] font-black text-base">{modalBuilder.rate}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{modalBuilder.rateDetails}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isEn ? 'Closing Credit' : 'Crédito de Cierre'}</span>
                  <span className="text-[#102C46] font-black text-base">{modalBuilder.closingCredits}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{modalBuilder.closingDetails}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">{isEn ? 'Required Lender:' : 'Prestamista Requerido:'}</h4>
                <p className="text-slate-700 bg-amber-50 border border-amber-200 rounded-lg p-3 font-medium">
                  {modalBuilder.lender} ({isEn ? 'Mandatory to qualify for reduced rate and closing credits' : 'Requisito indispensable para calificar a la tasa reducida y créditos de cierre'}).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">{isEn ? 'First-Time Buyer Package:' : 'Paquete para Primer Comprador:'}</h4>
                <p className="text-slate-600">{modalBuilder.firstTimePerk}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">{isEn ? 'Key Areas & Communities:' : 'Zonas y Comunidades Destacadas:'}</h4>
                <p className="text-slate-600">{modalBuilder.keyAreas}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">{isEn ? 'Validity & Deadlines:' : 'Condición y Vigencia:'}</h4>
                <p className="text-slate-600">{modalBuilder.deadline}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const b = modalBuilder;
                  setModalBuilder(null);
                  handleLoadCalculatorPreset(b.rateNumeric, b.closingNumeric);
                }}
                className="px-4 py-2.5 bg-[#F1F9EC] hover:bg-[#E2F3D6] text-[#2B7A55] border border-[#C7E7A4] rounded-xl font-bold transition text-xs flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                <span>{isEn ? 'Load into Calculator' : 'Calcular en Simulador'}</span>
              </button>

              <a
                href={modalBuilder.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#2B7A55] hover:bg-[#226344] text-white rounded-xl font-bold transition text-xs flex items-center gap-1.5"
              >
                <span>{isEn ? 'View Official Website' : 'Ver Oferta Oficial'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
          <p className="font-semibold text-slate-700">
            {APP_CONFIG.brandName} • {isEn ? 'Central Florida New Construction Guide (Nov 2026)' : 'Guía de Construcción Nueva en Florida Central (Noviembre 2026)'}
          </p>
          <p className="max-w-3xl mx-auto">
            {isEn
              ? 'Educational compilation of builder offers in Central Florida (Orlando, Kissimmee, St. Cloud, Davenport, Clermont). Verified for November 2026. Rates and incentives are subject to borrower credit qualification and lender approval.'
              : 'Compilación informativa de ofertas e incentivos de constructoras en Florida Central (Orlando, Kissimmee, St. Cloud, Davenport, Clermont). Verificado para Noviembre 2026. Las tasas y disponibilidad están sujetas a calificación crediticia y aprobación con el prestamista afiliado de cada constructora.'}
          </p>
        </div>
      </footer>
    </div>
  );
};
