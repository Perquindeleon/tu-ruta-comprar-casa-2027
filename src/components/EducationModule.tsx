import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle, 
  FileText,
  BookmarkCheck
} from 'lucide-react';
import { EDUCATIONAL_ARTICLES } from '../data/educationData';
import { EducationalArticle } from '../types';

export const EducationModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(EDUCATIONAL_ARTICLES[0].id);

  const categories = ['Todas', ...Array.from(new Set(EDUCATIONAL_ARTICLES.map((a) => a.category)))];

  const filteredArticles = EDUCATIONAL_ARTICLES.filter((article) => {
    if (selectedCategory !== 'Todas' && article.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(term);
      const matchSub = article.subtitle.toLowerCase().includes(term);
      const matchSummary = article.summary.toLowerCase().includes(term);
      const matchExpl = article.explanation.toLowerCase().includes(term);
      return matchTitle || matchSub || matchSummary || matchExpl;
    }
    return true;
  });

  const toggleArticle = (id: string) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  return (
    <section id="biblioteca" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Módulo E: Biblioteca Educativa</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          Conceptos Clave Explicados en Español Sencillo
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl mx-auto text-base">
          Educación financiera sin tecnicismos bancarios para que negocies con seguridad. Todo lo que necesitas saber antes de solicitar un préstamo hipotecario.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Buscar por tema (ej. PMI, FHA, impuestos, costos de cierre, contrato...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#2B7A55]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#102C46] text-[#C7E7A4]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards List */}
      <div className="space-y-4">
        {filteredArticles.map((art) => {
          const isExpanded = expandedArticleId === art.id;

          return (
            <div
              key={art.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded 
                  ? 'border-[#2B7A55] shadow-md ring-1 ring-[#2B7A55]/30' 
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Card Header Accordion Trigger */}
              <div
                onClick={() => toggleArticle(art.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-slate-400">Actualizado: {art.lastUpdated}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#102C46]">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600">
                    {art.summary}
                  </p>
                </div>

                <div className="shrink-0 p-2 rounded-lg bg-slate-50 text-slate-500">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#2B7A55]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 text-sm text-slate-700 bg-slate-50/50">
                  
                  {/* 1. Explicación */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C46] mb-1.5 flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#2B7A55]" />
                      <span>1. Explicación en Español Sencillo</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                      {art.explanation}
                    </p>
                  </div>

                  {/* 2. Por qué importa */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C46] mb-1.5 flex items-center space-x-1.5">
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#D5AD57]" />
                      <span>2. ¿Por qué le importa a tu bolsillo?</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                      {art.whyItMatters}
                    </p>
                  </div>

                  {/* 3. Preguntas para el comprador */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C46] mb-1.5 flex items-center space-x-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                      <span>3. Preguntas que debes hacerte a ti y a tu profesional:</span>
                    </h4>
                    <ul className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
                      {art.questionsToAsk.map((q, qIdx) => (
                        <li key={qIdx} className="flex items-start space-x-2">
                          <span className="text-[#2B7A55] font-bold">?</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 4. Acciones recomendadas */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C46] mb-1.5 flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2B7A55]" />
                      <span>4. Acciones recomendadas:</span>
                    </h4>
                    <ul className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
                      {art.recommendedActions.map((action, aIdx) => (
                        <li key={aIdx} className="flex items-start space-x-2">
                          <span className="text-[#D5AD57] font-bold">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. Enlace oficial */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500">
                      Fuente de información oficial verificada:
                    </span>
                    <a
                      href={art.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2B7A55] hover:underline"
                    >
                      <span>{art.officialSourceLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h4 className="font-bold text-[#102C46]">No se encontraron temas con tu búsqueda</h4>
          <p className="text-xs text-slate-500 mt-1">
            Intenta con palabras más generales como "préstamo", "seguro" o "inspección".
          </p>
        </div>
      )}
    </section>
  );
};
