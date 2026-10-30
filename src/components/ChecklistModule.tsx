import React from 'react';
import { 
  CheckSquare, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  Download
} from 'lucide-react';
import { CHECKLIST_STAGES, TOTAL_CHECKLIST_COUNT } from '../data/checklistData';
import { useLanguage } from '../context/LanguageContext';

interface ChecklistModuleProps {
  completedIds: string[];
  onToggleItem: (id: string) => void;
  onResetChecklist: () => void;
  onOpenPdf: () => void;
}

export const ChecklistModule: React.FC<ChecklistModuleProps> = ({
  completedIds,
  onToggleItem,
  onResetChecklist,
  onOpenPdf,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / TOTAL_CHECKLIST_COUNT) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="checklist" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-[#F1F9EC] border border-[#C7E7A4] text-[#2B7A55] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <CheckSquare className="w-4 h-4" />
          <span>{isEn ? 'Module C: Interactive Checklist' : 'Módulo C: Lista de Control Interactivo'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C46] tracking-tight">
          {isEn ? 'Your Homebuying Preparation Checklist' : 'Tu lista de preparación para comprar casa'}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
          {isEn
            ? 'Follow this step-by-step guide organized across 4 crucial stages. Check off tasks as you complete them—your progress will automatically be included in your PDF Plan.'
            : 'Sigue esta guía paso a paso organizada en 4 etapas cruciales. Marca las tareas a medida que las completes; tu progreso se incluirá automáticamente en tu Plan en PDF.'}
        </p>

        {/* Action Controls & Progress summary */}
        <div className="mt-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">
                {isEn ? 'Overall Progress' : 'Progreso General'}
              </span>
              <span className="text-2xl font-extrabold text-[#102C46]">
                {completedCount} {isEn ? 'of' : 'de'} {TOTAL_CHECKLIST_COUNT}{' '}
                <span className="text-sm font-medium text-slate-500">
                  {isEn ? `tasks completed (${progressPercent}%)` : `tareas completadas (${progressPercent}%)`}
                </span>
              </span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end no-print">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-3 py-2 border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
                title={isEn ? 'Print this checklist' : 'Imprimir esta lista'}
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>{isEn ? 'Print' : 'Imprimir'}</span>
              </button>

              <button
                type="button"
                onClick={onResetChecklist}
                className="inline-flex items-center space-x-1.5 px-3 py-2 border border-slate-200 text-slate-700 bg-slate-50 hover:bg-red-50 hover:text-red-700 rounded-lg text-xs font-semibold transition-colors"
                title={isEn ? 'Reset checkboxes' : 'Reiniciar casillas'}
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>{isEn ? 'Reset' : 'Reiniciar'}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2B7A55] to-[#C7E7A4] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Stages Accordion/Stack */}
      <div className="space-y-8">
        {CHECKLIST_STAGES.map((stage, sIdx) => {
          const stageCompletedCount = stage.items.filter((item) => completedIds.includes(item.id)).length;
          const stagePercent = Math.round((stageCompletedCount / stage.items.length) * 100);

          return (
            <div
              key={stage.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Stage Header */}
              <div className="bg-[#102C46] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-[#2B7A55] text-white text-xs font-bold flex items-center justify-center">
                      {sIdx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      {isEn ? stage.titleEn : stage.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 pl-8">
                    {isEn ? stage.subtitleEn : stage.subtitle}
                  </p>
                </div>

                <div className="text-left sm:text-right pl-8 sm:pl-0">
                  <span className="text-xs font-semibold text-[#C7E7A4] block">
                    {isEn
                      ? `${stageCompletedCount} of ${stage.items.length} completed (${stagePercent}%)`
                      : `${stageCompletedCount} de ${stage.items.length} completadas (${stagePercent}%)`}
                  </span>
                </div>
              </div>

              {/* Task Items Grid/List */}
              <div className="p-4 sm:p-6 divide-y divide-slate-100">
                {stage.items.map((item) => {
                  const isChecked = completedIds.includes(item.id);
                  const itemText = isEn && item.textEn ? item.textEn : item.text;

                  return (
                    <div
                      key={item.id}
                      onClick={() => onToggleItem(item.id)}
                      className={`flex items-start space-x-3.5 py-3.5 px-3 rounded-xl cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-[#F1F9EC]/50 text-slate-800' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Controlled via parent div onClick
                        className="mt-1 h-5 w-5 rounded border-slate-300 text-[#2B7A55] focus:ring-[#2B7A55] cursor-pointer shrink-0"
                      />
                      <div className="flex-1 text-sm select-none">
                        <span className={isChecked ? 'line-through text-slate-400' : 'font-medium text-slate-800'}>
                          {itemText}
                        </span>
                      </div>
                      {isChecked && (
                        <CheckCircle2 className="w-4 h-4 text-[#2B7A55] shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="mt-10 bg-slate-100 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left no-print">
        <div>
          <h4 className="font-bold text-[#102C46] text-sm sm:text-base">
            {isEn
              ? 'Want to include this checklist in your PDF document?'
              : '¿Quieres incluir este checklist en tu documento PDF?'}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            {isEn
              ? 'Checked tasks will be listed as "Completed" and the rest as "Pending" in your personalized plan.'
              : 'Las tareas que hayas marcado se clasificarán como "Completadas" y el resto como "Pendientes" en tu plan.'}
          </p>
        </div>

        <button
          onClick={onOpenPdf}
          className="inline-flex items-center space-x-2 bg-[#2B7A55] hover:bg-[#36986A] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow transition-all shrink-0"
        >
          <Download className="w-4 h-4 text-[#C7E7A4]" />
          <span>{isEn ? 'Generate My Plan with this Checklist' : 'Generar mi Plan con este Checklist'}</span>
        </button>
      </div>
    </section>
  );
};
