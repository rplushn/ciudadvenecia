"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

/* ─── Project data for rich cards ─── */
const PROJECT_DATA: Record<string, { name: string; image: string; location: string; status: string; amenities: string[] }> = {
  danli: { name: 'Ciudad Venecia Danlí', image: '/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/SENDERO_PREFERIDO.jpg', location: 'Danlí, El Paraíso', status: 'Consolidado', amenities: ['Piscina', 'Canchas', 'Kioscos', 'Senderos', 'Seguridad 24/7'] },
  olancho: { name: 'Ciudad Venecia Olancho', image: '/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_horizontal_web.jpg', location: 'Valle de Lepaguare', status: 'Premium', amenities: ['Piscina olímpica', 'Casa club', 'Canchas', 'Juegos acuáticos', 'Seguridad 24/7'] },
  versalles: { name: 'Residencial Versalles', image: '/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg', location: 'Danlí, El Paraíso', status: 'Últimos lotes', amenities: ['Piscina', 'Club social', 'Juegos infantiles', 'Zona BBQ'] },
  talanga: { name: 'Ciudad Venecia Talanga', image: '/amenidades/CV_TALANGA_PROVISIONAL.jpg.jpeg', location: 'Talanga, Francisco Morazán', status: 'Pre-venta 2026', amenities: ['Piscinas', 'Parques', 'Canchas', 'Calles pavimentadas'] },
  guaimaca: { name: 'Ciudad Venecia Guaimaca', image: '/DRON-JUANJOSE/Guaimaca/Guaimaca.jpeg', location: 'Guaimaca, Francisco Morazán', status: 'Próximamente', amenities: [] },
  'san-lorenzo': { name: 'Ciudad Venecia San Lorenzo', image: '/amenidades/san_lorenzo.jpeg', location: 'Valle', status: 'Activo', amenities: ['Piscinas', 'Áreas sociales', 'Seguridad'] },
  tegucigalpa: { name: 'Ciudad Venecia Tegucigalpa', image: '/homepage/portal_ai-ciudad_venecia.jpeg', location: 'Francisco Morazán', status: 'Próximamente', amenities: [] },
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  project?: string | null;
  cta?: string | null;
  timestamp: Date;
}

/* ─── Typing indicator ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#C5A065]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ projectId }: { projectId: string }) {
  const project = PROJECT_DATA[projectId];
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 rounded-lg overflow-hidden border border-[#C5A065]/20 bg-white"
    >
      <div className="h-28 relative overflow-hidden">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-white text-xs font-bold">{project.name}</p>
          <p className="text-white/70 text-[10px]">{project.location}</p>
        </div>
        <div className="absolute top-2 right-2 bg-[#C5A065] text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
          {project.status}
        </div>
      </div>
      {project.amenities.length > 0 && (
        <div className="px-3 py-2 flex flex-wrap gap-1">
          {project.amenities.slice(0, 4).map((a, i) => (
            <span key={i} className="text-[9px] text-[#6B665F] bg-[#F3F0EB] px-2 py-0.5 rounded-full">{a}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── WhatsApp CTA ─── */
function WhatsAppCTA({ context }: { context?: string }) {
  const msg = context
    ? `Hola, estuve hablando con Sofía en la web y me interesa ${context}`
    : 'Hola, me comunico desde la web de Ciudad Venecia';

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      href={`https://wa.me/50489494639?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg hover:bg-[#1EBE5A] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Hablar con un asesor
    </motion.a>
  );
}

/* ─── Main Chat Widget ─── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Initial greeting when first opened
  const sendGreeting = useCallback(async () => {
    if (hasGreeted) return;
    setHasGreeted(true);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hola' }],
          page: pathname,
        }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages([{
          id: Date.now().toString(),
          role: 'assistant',
          content: data.message,
          project: data.project,
          cta: data.cta,
          timestamp: new Date(),
        }]);
      }
    } catch {
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: '¡Hola! Soy Sofía, tu asesora virtual de Ciudad Venecia. ¿En qué puedo ayudarte?',
        project: null,
        cta: null,
        timestamp: new Date(),
      }]);
    }
    setIsLoading(false);
  }, [hasGreeted, pathname]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasGreeted) sendGreeting();
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          page: pathname,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || 'Disculpá, tuve un problema. ¿Podés intentar de nuevo?',
          project: data.project,
          cta: data.cta,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Disculpá, tuve un problema de conexión. ¿Podés intentar de nuevo?',
          project: null,
          cta: null,
          timestamp: new Date(),
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Last mentioned project for WhatsApp context
  const lastProject = [...messages].reverse().find((m) => m.project)?.project;
  const projectName = lastProject ? PROJECT_DATA[lastProject]?.name : undefined;

  return (
    <>
      {/* ─── Floating Button ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#1A3A52] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-[#C5A065] transition-all duration-500 group"
            aria-label="Abrir chat con Sofía"
          >
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-[#C5A065]/30 animate-ping" />
            {/* Chat icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-3rem))] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#C5A065]/10"
          >
            {/* Header */}
            <div className="bg-[#1A3A52] px-5 py-4 flex items-center gap-3 shrink-0">
              {/* Sofia avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A065]/40">
                  <img src="/amenidades/asesora_cv.webp" alt="Sofía" className="w-full h-full object-cover object-top" />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#1A3A52]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-bold tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Sofía
                </h3>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">
                  Asesora Virtual · En línea
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Cerrar chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF8]" data-lenis-prevent style={{ overscrollBehavior: 'contain' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-1'}`}>
                    {/* Bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`px-3.5 py-2 text-[11px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1A3A52] text-white rounded-2xl rounded-br-md'
                          : 'bg-white text-[#2C2C2C] rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                      }`}
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {msg.content}
                    </motion.div>

                    {/* Project card */}
                    {msg.project && <ProjectCard projectId={msg.project} />}

                    {/* WhatsApp CTA */}
                    {msg.cta === 'whatsapp' && <WhatsAppCTA context={projectName} />}

                    {/* Timestamp */}
                    <p className={`text-[9px] text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribí tu mensaje..."
                  className="flex-1 text-[11px] text-[#2C2C2C] bg-[#F3F0EB] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C5A065]/30 placeholder:text-gray-400"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-[#C5A065] text-white flex items-center justify-center hover:bg-[#B08D50] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>

              {/* Powered by */}
              <p className="text-center text-[8px] text-gray-300 mt-2 uppercase tracking-widest">
                Ciudad Venecia · Asesor Virtual 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
