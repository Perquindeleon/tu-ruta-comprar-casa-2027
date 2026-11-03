import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONFIG } from '../data/config';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionLink?: {
    label: string;
    targetId: string;
  };
  externalLink?: {
    label: string;
    url: string;
  };
}

interface QuickTopic {
  id: string;
  label: string;
  labelEn: string;
  keywords: string[];
  replyEs: string;
  replyEn: string;
  targetId?: string;
  externalUrl?: string;
  externalLabel?: string;
}

const KNOWLEDGE_BASE: QuickTopic[] = [
  {
    id: 'fha_vs_conv',
    label: '🏦 FHA vs Convencional',
    labelEn: '🏦 FHA vs Conventional',
    keywords: ['fha', 'convencional', 'conventional', 'tipo de prestamo', 'prestamos', '3.5', 'diferencia'],
    replyEs: 'El préstamo FHA está asegurado por el gobierno y permite comprar con un 3.5% de pronto y crédito desde 580, pero incluye seguro hipotecario (MIP) obligatorio. El préstamo Convencional requiere crédito más alto (620+), pero permite eliminar el PMI al llegar al 20% de capital propio.',
    replyEn: 'An FHA loan is government-backed and allows as low as 3.5% down with credit from 580, but requires ongoing MIP mortgage insurance. Conventional loans require higher credit (620+), but you can eliminate PMI once you reach 20% equity.',
    targetId: 'calculadora',
  },
  {
    id: 'dti_income',
    label: '💡 Regla DTI e Ingreso',
    labelEn: '💡 DTI Rule & Income',
    keywords: ['dti', 'ingreso', 'ganar', 'sueldo', 'salario', 'cuanto debo ganar', 'regla 28', 'ratio', 'deudas'],
    replyEs: 'Los prestamistas usan la regla 28/36: tu pago de vivienda (PITI + HOA) no debería superar el 28% al 32% de tus ingresos brutos, y tus deudas totales sumadas no deben pasar del 36% al 43%. Puedes ver tu ingreso sugerido directamente en la tarjeta de resultados de nuestra calculadora.',
    replyEn: 'Lenders use the 28/36 rule: your housing payment (PITI + HOA) should not exceed 28% to 32% of gross monthly income, and total debts combined should stay below 36% to 43%. Check our calculator results card to see your suggested income.',
    targetId: 'calculadora',
  },
  {
    id: 'pmi_removal',
    label: '🛡️ ¿Qué es el PMI?',
    labelEn: '🛡️ What is PMI?',
    keywords: ['pmi', 'mip', 'seguro hipotecario', 'eliminar pmi', 'quitar pmi', '20%'],
    replyEs: 'El PMI (Private Mortgage Insurance) es un seguro que protege al prestamista, no a ti, y se añade cuando pones menos del 20% de pronto en un préstamo convencional. Se puede cancelar cuando pagas el préstamo hasta alcanzar el 80% del valor de la propiedad.',
    replyEn: 'PMI (Private Mortgage Insurance) protects the lender, not you, when you put down less than 20% on a conventional mortgage. It can be canceled once your loan balance reaches 80% of the home original value.',
    targetId: 'calculadora',
  },
  {
    id: 'itin_buying',
    label: '🆔 ¿Comprar con ITIN?',
    labelEn: '🆔 Buying with ITIN?',
    keywords: ['itin', 'sin seguro social', 'numero itin', 'estatus', 'tax id', 'impuestos'],
    replyEs: '¡Sí se puede! Existen préstamos hipotecarios con ITIN ofrecidos por bancos comunitarios y cooperativas de crédito (Credit Unions). Suelen requerir entre 10% y 20% de pronto y 2 años de declaraciones de impuestos al día.',
    replyEn: 'Yes, you can! ITIN mortgage loans are offered by community banks and credit unions. They typically require 10% to 20% down and 2 years of filed tax returns.',
    targetId: 'asistencia',
  },
  {
    id: 'inspection_appraisal',
    label: '🔍 Inspección vs Tasación',
    labelEn: '🔍 Inspection vs Appraisal',
    keywords: ['inspeccion', 'tasacion', 'appraisal', 'evaluacion', 'inspector', 'techo', 'plomeria'],
    replyEs: 'La inspección la contratas TÚ para proteger a tu familia (revisa techo, plomería, electricidad y estructura). La tasación (appraisal) la exige el BANCO para confirmar que la casa vale el precio pactado antes de soltar el dinero. Ambas son indispensables.',
    replyEn: 'You hire the home inspection to protect your family (evaluating roof, HVAC, plumbing, foundation). The bank orders the appraisal to confirm the property market value before issuing the loan. Both are essential.',
    targetId: 'checklist',
  },
  {
    id: 'dpa_assistance',
    label: '🎁 Programas de Ayuda (DPA)',
    labelEn: '🎁 Down Payment Assistance',
    keywords: ['ayuda', 'asistencia', 'dpa', 'grant', 'subsidio', 'dinero gratis', 'primer comprador', 'gobierno'],
    replyEs: 'Existen programas estatales de asistencia para el pronto (DPA) que ofrecen subvenciones o préstamos perdonables de $5,000 hasta $25,000 para primeros compradores. Visita el Módulo D de esta app y selecciona tu estado para ver los programas oficiales.',
    replyEn: 'State Housing Finance Agencies provide Down Payment Assistance (DPA) grants or forgivable second mortgages from $5,000 to $25,000 for eligible buyers. Check Module D in this app and select your state.',
    targetId: 'asistencia',
  },
  {
    id: 'strategy_2027',
    label: '🎯 ¿Por qué prepararse para 2027?',
    labelEn: '🎯 Why prepare for 2027?',
    keywords: ['2027', 'cuando comprar', 'meta', 'tiempo', 'estrategia', 'ahorrar', 'planes'],
    replyEs: 'El horizonte 2027 te da la mayor ventaja de todas: tiempo sin prisa. Te permite subir tu puntaje de crédito 50-80 puntos (lo que te ahorra $200-$400 al mes en intereses), acumular tu fondo de emergencia y comparar opciones con la cabeza fría.',
    replyEn: 'The 2027 timeline gives you the ultimate advantage: unhurried preparation. It lets you optimize credit score by 50-80 points (saving $200-$400/mo in interest), build reserves, and negotiate with total peace of mind.',
    targetId: 'diagnostico',
  },
];

export const AssistantChatbot: React.FC<{ onNavigateToSection: (id: string) => void }> = ({
  onNavigateToSection,
}) => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on first open or language switch
  useEffect(() => {
    const greeting: ChatMessage = {
      id: 'greeting',
      sender: 'bot',
      text: isEn
        ? "Hello! I am your 2027 Virtual Assistant. I am here to help you understand mortgages, credit, overlooked costs, and the homebuying process in the US. What would you like to explore?"
        : "¡Hola! Soy tu Asistente Virtual 2027. Estoy aquí para aclarar tus dudas sobre préstamos, crédito, costos ocultos y el proceso de compra de vivienda en EE.UU. ¿Sobre qué tema te gustaría consultar?",
    };
    setMessages([greeting]);
  }, [isEn]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSelectTopic = (topic: QuickTopic) => {
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: isEn ? topic.labelEn : topic.label,
    };

    const botMsg: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'bot',
      text: isEn ? topic.replyEn : topic.replyEs,
      actionLink: topic.targetId ? {
        label: isEn ? 'Go to this section in the app' : 'Ir a esta sección en la herramienta',
        targetId: topic.targetId,
      } : undefined,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputText.trim().toLowerCase();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: inputText.trim(),
    };

    // Find best match in knowledge base
    const matched = KNOWLEDGE_BASE.find((topic) =>
      topic.keywords.some((kw) => query.includes(kw.toLowerCase()))
    );

    let botReplyText = '';
    let targetId: string | undefined;

    if (matched) {
      botReplyText = isEn ? matched.replyEn : matched.replyEs;
      targetId = matched.targetId;
    } else {
      botReplyText = isEn
        ? "That is a great question. Remember our philosophy: don't buy just because a bank approves you, buy because the numbers make sense for you. You can run custom simulations in our Calculator or check your state assistance programs in Module D."
        : "Esa es una excelente pregunta. Recuerda siempre nuestra filosofía: no compres solo porque el banco te apruebe, compra porque los números tienen sentido para ti. Puedes simular tus números exactos en la Calculadora o explorar los programas de tu estado en el Módulo D.";
      targetId = 'calculadora';
    }

    const botMsg: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'bot',
      text: botReplyText,
      actionLink: targetId ? {
        label: isEn ? 'Explore section in the app' : 'Ver sección en la herramienta',
        targetId,
      } : undefined,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputText('');
  };

  const handleResetChat = () => {
    const greeting: ChatMessage = {
      id: String(Date.now()),
      sender: 'bot',
      text: isEn
        ? "Chat restarted. How can I help you today?"
        : "Chat reiniciado. ¿En qué más puedo orientarte hoy?",
    };
    setMessages([greeting]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2.5 bg-[#102C46] hover:bg-[#163B5E] text-white px-4 py-3 rounded-full shadow-2xl border-2 border-[#C7E7A4] transition-all transform hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-[#C7E7A4]/50"
            aria-label={isEn ? 'Open Virtual Assistant' : 'Abrir Asistente Virtual'}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#2B7A55] flex items-center justify-center text-[#C7E7A4] font-bold text-xs">
                PL
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#102C46] rounded-full animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-[#C7E7A4] uppercase font-black block tracking-wider leading-none">
                {isEn ? 'Ask Perquin AI' : 'Asistente 2027'}
              </span>
              <span className="text-xs font-bold text-white block leading-tight">
                {isEn ? 'Got questions?' : '¿Tienes dudas?'}
              </span>
            </div>
            <MessageCircle className="w-5 h-5 text-[#C7E7A4] sm:hidden" />
          </button>
        ) : null}
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-[#102C46] text-white p-4 flex items-center justify-between border-b border-[#1C4368] shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2B7A55] to-[#102C46] border border-[#C7E7A4] flex items-center justify-center font-bold text-xs text-[#C7E7A4]">
                  PL
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#102C46] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5 leading-none">
                  <span>{isEn ? '2027 Virtual Assistant' : 'Asistente Virtual 2027'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C7E7A4]" />
                </h4>
                <span className="text-[10px] text-[#C7E7A4] font-medium block mt-1">
                  {APP_CONFIG.brandName} • {isEn ? 'Financial Education' : 'Educación Financiera'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isEn ? 'Restart conversation' : 'Reiniciar conversación'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isEn ? 'Close assistant' : 'Cerrar asistente'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick FAQ Pills (Horizontally scrollable) */}
          <div className="bg-slate-50 border-b border-slate-200/80 p-2.5 overflow-x-auto no-scrollbar flex items-center space-x-1.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-600 shrink-0 flex items-center space-x-1 mr-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#2B7A55]" />
              <span>{isEn ? 'Topics:' : 'Temas:'}</span>
            </span>
            {KNOWLEDGE_BASE.slice(0, 5).map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSelectTopic(topic)}
                className="shrink-0 bg-white hover:bg-[#F1F9EC] hover:border-[#2B7A55] border border-slate-300 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs transition-all"
              >
                {isEn ? topic.labelEn : topic.label}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-[#2B7A55] text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    
                    {/* Action link button */}
                    {msg.actionLink && (
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateToSection(msg.actionLink!.targetId);
                          setIsOpen(false);
                        }}
                        className="mt-2.5 inline-flex items-center space-x-1 text-[11px] font-bold text-[#2B7A55] hover:text-[#102C46] underline bg-[#F1F9EC] px-2.5 py-1 rounded-md transition-colors"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Educational Disclaimer Note */}
          <div className="bg-amber-50 border-t border-amber-100 px-3 py-1.5 text-[10px] text-amber-900 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-amber-700 shrink-0" />
              <span>{isEn ? 'Educational purposes only. No financial advice.' : 'Fines pedagógicos. No es asesoría financiera.'}</span>
            </span>
            <a
              href={APP_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2B7A55] font-bold hover:underline shrink-0 ml-2"
            >
              Facebook
            </a>
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isEn ? 'Ask a question (e.g. FHA, ITIN, DTI)...' : 'Escribe tu duda (ej. FHA, ITIN, PMI, DTI)...'}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#2B7A55] focus:border-[#2B7A55] outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#2B7A55] hover:bg-[#226344] disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl shadow-xs transition-colors shrink-0"
              aria-label={isEn ? 'Send message' : 'Enviar mensaje'}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
