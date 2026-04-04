"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import Navbar from '@/components/Navbar';
import AdvisorCTA from '@/components/AdvisorCTA';
import WhyCiudadVenecia from '@/components/WhyCiudadVenecia';
import AvailabilityPulse from '@/components/AvailabilityPulse';
import CinematicExperience from '@/components/CinematicExperience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Floating Label Input ─── */
function FloatingInput({ name, label, type = 'text' }: { name: string; label: string; type?: string }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const active = focused || hasValue;

  return (
    <div className="relative group">
      <label
        className={`absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
          active
            ? 'top-0 text-[9px] text-[#C5A065] uppercase tracking-[0.3em] font-bold'
            : 'top-8 text-sm text-white/40'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full bg-transparent border-b border-white/15 pt-6 pb-3 text-white text-sm focus:outline-none transition-colors duration-500"
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
      />
      {/* Animated gold underline */}
      <div className={`absolute bottom-0 left-1/2 h-[1.5px] bg-[#C5A065] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
      }`} />
    </div>
  );
}

function FloatingTextarea({ name, label }: { name: string; label: string }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const active = focused || hasValue;

  return (
    <div className="relative group">
      <label
        className={`absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
          active
            ? 'top-0 text-[9px] text-[#C5A065] uppercase tracking-[0.3em] font-bold'
            : 'top-8 text-sm text-white/40'
        }`}
      >
        {label}
      </label>
      <textarea
        name={name}
        rows={3}
        className="w-full bg-transparent border-b border-white/15 pt-6 pb-3 text-white text-sm focus:outline-none transition-colors duration-500 resize-none"
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
      />
      <div className={`absolute bottom-0 left-1/2 h-[1.5px] bg-[#C5A065] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        focused ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
      }`} />
    </div>
  );
}

/* ─── Animated Channel Card ─── */
function ChannelCard({ title, info, sub, href, index, icon }: { title: string; info: string; sub: string; href: string; index: number; icon: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const borderRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!borderRef.current) return;
    const el = borderRef.current;
    const parent = el.closest('.group');
    if (!parent) return;

    const enter = () => {
      gsap.to(el, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' });
    };
    const leave = () => {
      gsap.to(el, { strokeDashoffset: 1400, duration: 0.6, ease: 'power2.in' });
    };

    parent.addEventListener('mouseenter', enter);
    parent.addEventListener('mouseleave', leave);
    return () => {
      parent.removeEventListener('mouseenter', enter);
      parent.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block p-10 md:p-12 bg-white overflow-hidden cursor-pointer"
    >
      {/* Animated gold border on hover */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <rect
          ref={borderRef}
          x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="0" ry="0"
          fill="none" stroke="#C5A065" strokeWidth="2"
          strokeDasharray="1400"
          strokeDashoffset="1400"
        />
      </svg>

      {/* Icon */}
      <div className="text-[#C5A065] mb-6 transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-serif-display text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#1A3A52] transition-colors duration-500">
        {title}
      </h3>

      {/* Info - oversized serif */}
      <p className="font-serif-display text-xl md:text-2xl text-[#1A3A52] font-medium mb-2 transition-colors duration-500 group-hover:text-[#C5A065]">
        {info}
      </p>

      {/* Sub */}
      <p className="text-[10px] text-[#6B665F]/60 uppercase tracking-[0.25em]">{sub}</p>

      {/* Hover glow */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-[#C5A065]/0 rounded-full blur-3xl transition-all duration-700 group-hover:bg-[#C5A065]/10" />
    </motion.a>
  );
}

/* ─── FAQ Item with GSAP ─── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !lineRef.current) return;
    if (open) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.6, ease: 'power3.out' });
      gsap.to(lineRef.current, { scaleY: 1, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut' });
      gsap.to(lineRef.current, { scaleY: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [open]);

  return (
    <Reveal delay={index * 0.08}>
      <div className="relative group">
        {/* Gold vertical line */}
        <div
          ref={lineRef}
          className="absolute left-0 top-0 w-[2px] h-full bg-[#C5A065] origin-top"
          style={{ transform: 'scaleY(0)' }}
        />

        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center text-left py-6 pl-6 pr-2 hover:text-[#C5A065] transition-colors duration-300"
        >
          <span className="font-serif-display text-xl md:text-2xl text-[#2C2C2C] group-hover:text-[#C5A065] transition-colors">
            {question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#C5A065] text-2xl font-light flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center"
          >
            +
          </motion.span>
        </button>

        <div
          ref={contentRef}
          className="overflow-hidden pl-6"
          style={{ height: 0, opacity: 0 }}
        >
          <p className="text-[#6B665F] text-sm font-light leading-relaxed pb-6 max-w-2xl">
            {answer}
          </p>
        </div>

        {/* Bottom divider */}
        <div className="h-px bg-[#E8E4DF] ml-6" />
      </div>
    </Reveal>
  );
}


export default function Contacto() {
  // ─── Hero Parallax ───
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const asesoraY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // ─── Form ───
  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = (data.get('nombre') as string || '').trim();
    const telefono = (data.get('telefono') as string || '').trim();
    const proyecto = (data.get('proyecto') as string || '').trim();
    const mensaje = (data.get('mensaje') as string || '').trim();
    const parts = ['Hola, me comunico desde la web de Ciudad Venecia.'];
    if (nombre) parts.push(`*Nombre:* ${nombre}`);
    if (telefono) parts.push(`*Teléfono:* ${telefono}`);
    if (proyecto && proyecto !== '') parts.push(`*Proyecto de interés:* ${proyecto}`);
    if (mensaje) parts.push(`*Mensaje:* ${mensaje}`);
    window.open(`https://wa.me/50489494639?text=${encodeURIComponent(parts.join('\n'))}`, '_blank');
  }

  // ─── Fonts ───
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // ─── Map section entry ───
  const mapCardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapCardRef.current) return;
    gsap.fromTo(mapCardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: mapCardRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  const faqs = [
    { q: "¿Cómo puedo agendar una visita?", a: "Puedes agendar directamente por WhatsApp o llamando a nuestras oficinas. Coordinamos visitas guiadas todos los fines de semana a cualquiera de nuestros proyectos activos." },
    { q: "¿Ofrecen financiamiento directo?", a: "Sí, contamos con planes de financiamiento propio con aprobación inmediata y requisitos mínimos. Sin trámites bancarios, sin fiador, y con cuotas que se adaptan a tu presupuesto." },
    { q: "¿Dónde están ubicadas las oficinas?", a: "Nuestra sede principal está en Danlí, El Paraíso: Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut. También coordinamos atención en cada uno de nuestros proyectos." },
    { q: "¿Puedo visitar los proyectos antes de comprar?", a: "Por supuesto. Organizamos recorridos guiados personalizados. Solo agenda tu cita por WhatsApp y te acompañamos en un recorrido completo por el proyecto que te interese." },
    { q: "¿Qué incluye mi lote?", a: "Todos nuestros lotes incluyen acceso a amenidades del proyecto: áreas sociales, canchas deportivas, piscinas, parques infantiles, seguridad perimetral, agua potable, electrificación y calles pavimentadas." },
  ];

  return (
    <div className="bg-[#F3F0EB] text-[#2C2C2C] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      <Navbar activeRoute="/contacto" />

      {/* ═══════════════════════════════════════════════════════════
          1. HERO — Asesora Floating + Staggered Text + Gold Circle
         ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#F3F0EB]">
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-30"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0 min-h-screen py-32">

            {/* LEFT — Text */}
            <motion.div style={{ y: textY }} className="relative z-20 order-2 lg:order-1">
              {/* Eyebrow */}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block"
              >
                Atención Personalizada
              </motion.span>

              {/* Headline — staggered */}
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#1A1A1A] leading-[0.95] font-light"
                >
                  Hablemos
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#1A1A1A] leading-[0.95] font-light"
                >
                  de tu{' '}
                  <span className="italic text-[#C5A065]">futuro</span>
                </motion.h1>
              </div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-[#6B665F] text-base md:text-lg font-light leading-relaxed max-w-md mt-8 mb-10"
              >
                Estamos listos para asesorarte en cada paso de tu inversión.
                Tu terreno ideal está a una conversación de distancia.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="https://wa.me/50489494639?text=Hola%2C%20quiero%20información%20sobre%20los%20proyectos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-[#1A1A1A] text-white px-8 py-5 text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#C5A065] transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Escribir por WhatsApp
                </a>
                <a
                  href="#form"
                  className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A]/20 text-[#1A1A1A] px-8 py-5 text-xs uppercase tracking-[0.25em] hover:border-[#C5A065] hover:text-[#C5A065] transition-all duration-500"
                >
                  Enviar mensaje
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT — Asesora + Decorative Elements */}
            <div className="relative order-1 lg:order-2 flex items-end justify-center lg:justify-end">
              {/* Rotating gold circle */}
              <motion.div
                style={{ rotate: circleRotate }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[480px] md:h-[480px] lg:w-[550px] lg:h-[550px]"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#C5A065" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="200" cy="200" r="195" fill="none" stroke="#C5A065" strokeWidth="0.3" opacity="0.15"
                    strokeDasharray="8 12" />
                  {Array.from({ length: 36 }).map((_, i) => (
                    <line key={i}
                      x1="200" y1="15" x2="200" y2={i % 3 === 0 ? "30" : "22"}
                      transform={`rotate(${i * 10} 200 200)`}
                      stroke="#C5A065" strokeWidth={i % 3 === 0 ? "1" : "0.5"}
                      opacity={i % 3 === 0 ? "0.4" : "0.2"}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Solid bg circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full bg-white/60 backdrop-blur-sm" />

              {/* Asesora image with parallax */}
              <motion.div style={{ y: asesoraY }} className="relative z-10">
                <motion.img
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  src="/amenidades/asesora_cv.png"
                  alt="Asesora Ciudad Venecia"
                  className="h-[400px] md:h-[520px] lg:h-[600px] object-contain object-bottom drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-24 lg:bottom-32 right-0 lg:-right-4 bg-[#1A3A52] text-white px-6 py-4 shadow-xl z-20"
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1">Respuesta en</p>
                <p className="font-serif-display text-3xl leading-none">24h</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#6B665F]/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#C5A065] to-transparent"
          />
        </motion.div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          1B. WHY CIUDAD VENECIA — Editorial Differentiators
         ═══════════════════════════════════════════════════════════ */}
      <WhyCiudadVenecia />


      {/* ═══════════════════════════════════════════════════════════
          2. CANALES DIRECTOS — Animated Gold Border Cards
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white relative">
        <div className="max-w-[1200px] mx-auto mb-16">
          <Reveal>
            <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
              Canales Directos
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl text-[#1A1A1A]">
              Escríbenos o llámanos
            </h2>
          </Reveal>
        </div>

        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
          <ChannelCard
            index={0}
            title="WhatsApp Ventas"
            info="+504 9549-8925"
            sub="Respuesta inmediata"
            href="https://wa.me/50495498925"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            }
          />
          <ChannelCard
            index={1}
            title="Oficina Central"
            info="(504) 2763-3699"
            sub="Lunes a Viernes · 8 AM — 5 PM"
            href="tel:+50427633699"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            }
          />
          <ChannelCard
            index={2}
            title="Correo Electrónico"
            info="info@inmaerhn.com"
            sub="Respuesta en 24 horas"
            href="mailto:info@inmaerhn.com"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            }
          />
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          2B. AVAILABILITY PULSE — Interactive Honduras Map
         ═══════════════════════════════════════════════════════════ */}
      <AvailabilityPulse />


      {/* ═══════════════════════════════════════════════════════════
          4. UBICACIÓN — Full-bleed Map + Animated Card
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[600px] w-full bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.0664695972836!2d-86.5830!3d14.0330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDAxJzU4LjgiTiA4NsKwMzQnNTguOCJX!5e0!3m2!1sen!2shn!4v1620000000000!5m2!1sen!2shn"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) contrast(85%) brightness(95%)' }}
          allowFullScreen={true}
          loading="lazy"
          className="absolute inset-0"
        />

        {/* Animated overlay card */}
        <div ref={mapCardRef} className="absolute top-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-10">
          <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 shadow-2xl max-w-sm border-t-2 border-[#C5A065]">
            <span className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.3em] mb-3 block">
              Sede Principal
            </span>
            <h3 className="font-serif-display text-2xl text-[#1A1A1A] mb-4">
              Oficinas INMAER
            </h3>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-[#6B665F] leading-relaxed">
                Col. El Zarzal, Edificio INMAER<br />
                Contiguo a Pizza Hut, Danlí, El Paraíso
              </p>
              <p className="text-xs text-[#6B665F]/60 uppercase tracking-wider">
                Lunes a Viernes · 8:00 AM — 5:00 PM
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=14.033,-86.583"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A3A52] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-colors duration-500"
            >
              Abrir en Google Maps
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          4B. CINEMATIC EXPERIENCE — Video Ambient Strip
         ═══════════════════════════════════════════════════════════ */}
      <CinematicExperience />


      {/* ═══════════════════════════════════════════════════════════
          5. FAQ — Smooth GSAP + Gold Vertical Lines
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#F3F0EB]">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-16">
            <Reveal>
              <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                Preguntas Frecuentes
              </span>
              <h2 className="font-serif-display text-4xl md:text-5xl text-[#1A1A1A]">
                Resolvemos tus dudas
              </h2>
            </Reveal>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>

          {/* CTA below FAQ */}
          <Reveal delay={0.2}>
            <div className="mt-14 text-center">
              <p className="text-[#6B665F] text-sm mb-4">¿No encontraste lo que buscabas?</p>
              <a
                href="https://wa.me/50489494639?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20los%20proyectos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C5A065] text-xs font-bold uppercase tracking-[0.25em] hover:text-[#1A3A52] transition-colors duration-300 border-b border-[#C5A065]/30 hover:border-[#1A3A52] pb-1"
              >
                Pregúntanos por WhatsApp
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          FORMULARIO — Dark Navy + Floating Labels + Side Image
         ═══════════════════════════════════════════════════════════ */}
      <section id="form" className="relative bg-[#1A3A52] overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-5 min-h-[700px]">

          {/* LEFT — Image Strip (2/5) */}
          <div className="hidden lg:block lg:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg"
                alt="Ciudad Venecia"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A3A52]" />
              <div className="absolute inset-0 bg-[#1A3A52]/30" />
            </div>
            <div className="absolute bottom-12 left-8 right-8 z-10">
              <Reveal>
                <p className="font-serif-display text-white text-3xl leading-tight italic opacity-80">
                  &ldquo;Tu inversión más inteligente comienza con una conversación&rdquo;
                </p>
              </Reveal>
            </div>
          </div>

          {/* RIGHT — Form (3/5) */}
          <div className="lg:col-span-3 px-8 md:px-16 lg:px-20 py-20 lg:py-24">
            <Reveal>
              <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                Mensajería
              </span>
              <h2 className="font-serif-display text-4xl md:text-5xl text-white mb-4">
                Envíanos un mensaje
              </h2>
              <p className="text-white/40 text-sm font-light mb-14 max-w-md">
                Completa el formulario y recibirás respuesta directa por WhatsApp
                de un asesor especializado.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={handleContactSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <FloatingInput name="nombre" label="Tu nombre" />
                  <FloatingInput name="telefono" label="Teléfono / WhatsApp" type="tel" />
                </div>

                <div className="relative">
                  <label className="block text-[9px] text-[#C5A065] uppercase tracking-[0.3em] font-bold mb-3">
                    Proyecto de interés
                  </label>
                  <select
                    name="proyecto"
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C5A065' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
                  >
                    <option value="" className="bg-[#1A3A52]">Seleccionar proyecto...</option>
                    <option value="Ciudad Venecia Danlí" className="bg-[#1A3A52]">Ciudad Venecia Danlí</option>
                    <option value="Ciudad Venecia Olancho" className="bg-[#1A3A52]">Ciudad Venecia Olancho</option>
                    <option value="Ciudad Venecia Talanga" className="bg-[#1A3A52]">Ciudad Venecia Talanga</option>
                    <option value="Ciudad Venecia Valle" className="bg-[#1A3A52]">Ciudad Venecia Valle</option>
                    <option value="Residencial Versalles" className="bg-[#1A3A52]">Residencial Versalles</option>
                    <option value="Otro" className="bg-[#1A3A52]">Otro / No estoy seguro</option>
                  </select>
                </div>

                <FloatingTextarea name="mensaje" label="¿Qué tienes en mente?" />

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative bg-[#C5A065] text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,160,101,0.3)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Enviar por WhatsApp
                    </span>
                    <div className="absolute inset-0 bg-[#B08D50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </button>
                </div>

                <p className="text-white/20 text-[10px] italic mt-4">
                  *Tu mensaje será enviado directamente a nuestro equipo comercial vía WhatsApp.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          ADVISOR CTA — Facilidades de Pago (Component)
         ═══════════════════════════════════════════════════════════ */}
      <AdvisorCTA variant="family" />


      {/* ═══════════════════════════════════════════════════════════
          7. FOOTER — Corporate (Clone from Homepage)
         ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-[#1A3A52] text-white pt-24 pb-12 border-t border-[#C5A065]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/3 -translate-y-1/3">
          <svg height="800" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(40, 40)">
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5" />
              ))}
            </g>
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="text-white mb-6">
                <svg height="40" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="block">
                  <g transform="translate(40, 40)">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5" />
                    ))}
                  </g>
                  <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                  <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                </svg>
              </div>
              <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs">Desarrollos inmobiliarios pensados para la eternidad. Un proyecto respaldado por la solidez y visión de INMAER.</p>
            </div>

            <div>
              <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Proyectos</h4>
              <ul className="space-y-4">
                <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Danlí</Link></li>
                <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Olancho</Link></li>
                <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Valle</Link></li>
                <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Residencial Versalles</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Oficina Corporativa</h4>
              <p className="text-sm font-medium mb-1">Col. El Zarzal, Edificio INMAER</p>
              <p className="text-white/60 text-xs mb-6">Danlí, El Paraíso, Honduras</p>
              <p className="text-white/60 text-[10px] uppercase tracking-wider mb-1">Llámanos</p>
              <p className="text-lg font-serif-display text-white">(504) 9890-4449</p>
            </div>

            <div>
              <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Mantente Informado</h4>
              <p className="text-white/60 text-xs mb-6">Recibe actualizaciones sobre nuevos lanzamientos y precios especiales.</p>
              <div className="flex border-b border-white/20 pb-2">
                <input type="email" placeholder="Tu correo electrónico" className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder:text-white/30"/>
                <button className="text-[#C5A065] text-xs font-bold uppercase hover:text-white transition-colors">Suscribir</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">© 2026 INMAER Real Estate. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <Link href="/" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Privacidad</Link>
              <Link href="/" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
