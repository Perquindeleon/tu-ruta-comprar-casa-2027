import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { US_STATES } from '../data/config';
import { getProgramsForState, NATIONAL_PROGRAMS } from '../data/programsData';
import { AssistanceProgram } from '../types';

interface AssistanceModuleProps {
  selectedState?: string;
  onSelectState: (stateCode: string) => void;
}

export const AssistanceModule: React.FC<AssistanceModuleProps> = ({
  selectedState,
  onSelectState,
}) => {
  const [filterAudience, setFilterAudience] = useState<'all' | 'first_time'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const programs = getProgramsForState(selectedState);

  const filteredPrograms = programs.filter((p) => {
    // Filter by buyer type
    if (filterAudience === 'first_time' && p.targetAudience !== 'first_time' && p.targetAudience !== 'all') {
      return false;
    }

    // Filter by search query
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(term);
      const matchAgency = p.agency.toLowerCase().includes(term);
      const matchDesc = p.description.toLowerCase().includes(term);
      const matchJurisdiction = p.jurisdiction.toLowerCase().includes(term);
      return matchName || matchAgency || matchDesc || matchJurisdiction;
    }

    return true;
  });

  const selectedStateName = US_STATES.find(s => s.code === selectedState)?.name;

  return (
    <section id="asistencia" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Building2 className="w-4 h-4" />
          <span>Módulo D: Recursos y Subvenciones Oficiales</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          ¿Puedes recibir ayuda para comprar tu primera casa?
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl mx-auto text-base">
          Localiza programas de asistencia para el pronto (DPA), asesoría de vivienda aprobada por el gobierno federal y beneficios hipotecarios en tu estado y a nivel nacional.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* State selector */}
          <div className="md:col-span-5">
            <label htmlFor="assistance-state-select" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Estado de Búsqueda
            </label>
            <div className="relative">
              <select
                id="assistance-state-select"
                value={selectedState || ''}
                onChange={(e) => onSelectState(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
              >
                <option value="">Todos los Estados (Recursos Federales)</option>
                {US_STATES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* First time vs repeat buyer filter */}
          <div className="md:col-span-3">
            <label htmlFor="audience-filter-select" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Tipo de Comprador
            </label>
            <select
              id="audience-filter-select"
              value={filterAudience}
              onChange={(e) => setFilterAudience(e.target.value as 'all' | 'first_time')}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
            >
              <option value="all">Todos los Compradores</option>
              <option value="first_time">Primerizo (First-Time Buyer)</option>
            </select>
          </div>

          {/* Search keyword / county */}
          <div className="md:col-span-4">
            <label htmlFor="keyword-search-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Condado o Palabra Clave
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="keyword-search-input"
                type="text"
                placeholder="Ej. Condado, DPA, HUD, FHA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
              />
            </div>
          </div>
        </div>

        {selectedStateName && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Mostrando programas específicos para <strong>{selectedStateName}</strong> y recursos federales.</span>
            <button
              onClick={() => onSelectState('')}
              className="text-[#2B7A55] hover:underline font-semibold"
            >
              Ver todos los estados
            </button>
          </div>
        )}
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="space-y-3">
              {/* Badge & Agency */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#102C46] text-[#C7E7A4]">
                  {prog.jurisdiction}
                </span>
                <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2B7A55]" />
                  <span>Verificado: {prog.lastVerified}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#102C46] leading-snug">
                {prog.name}
              </h3>

              <div className="text-xs font-semibold text-[#2B7A55]">
                {prog.agency}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prog.description}
              </p>
            </div>

            {/* Card Action */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Fuente Gubernamental Oficial
              </span>

              <a
                href={prog.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2B7A55] hover:text-[#36986A] bg-[#F1F9EC] hover:bg-[#C7E7A4]/40 px-3 py-2 rounded-lg transition-colors"
              >
                <span>Portal Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h4 className="font-bold text-[#102C46]">No se encontraron programas con los filtros seleccionados</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Intenta limpiar el término de búsqueda o consultar el directorio centralizado de HUD para tu estado.
          </p>
          <a
            href="https://www.hud.gov/states"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 mt-4 px-4 py-2 bg-[#2B7A55] text-white rounded-lg text-xs font-bold"
          >
            <span>Ver Directorio Estatal de HUD</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Official Directory Fallback Banner */}
      <div className="mt-12 bg-gradient-to-r from-[#102C46] to-[#1C4368] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-white">
            ¿Buscas el programa de vivienda de tu condado específico?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            HUD mantiene una base de datos pública y actualizada con todas las agencias de financiación local de vivienda y asesores certificados en los 50 estados.
          </p>
        </div>

        <a
          href="https://www.hud.gov/states"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-[#C7E7A4] hover:bg-white text-[#102C46] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow transition-all shrink-0"
        >
          <span>Abrir Directorio HUD</span>
          <ExternalLink className="w-4 h-4 text-[#102C46]" />
        </a>
      </div>

      {/* Disclaimers & Ethics */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Importante sobre Asistencia Gubernamental:</strong> No inventamos montos de subvención ficticios ni afirmamos que califiques de forma automática. La elegibilidad para programas de asistencia para el pronto (DPA) depende de ingresos familiares, límites del condado, puntaje de crédito y disponibilidad de fondos presupuestarios de cada organismo. Contacta siempre a la agencia oficial o a un asesor aprobado por HUD.
        </p>
      </div>
    </section>
  );
};
