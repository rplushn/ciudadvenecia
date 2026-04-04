"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';

export default function BeforeAfterReveal() {
  const [position, setPosition] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(percent);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = true;
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragRef.current = true;
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      updatePosition(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };
    const handleEnd = () => {
      dragRef.current = false;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [updatePosition]);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/svg%3E")` }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 md:mb-20 items-end">
          <Reveal>
            <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
              De la visión a la realidad
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
              Transformamos{' '}
              <span className="italic text-[#C5A065]">terrenos</span>
              <br />en comunidades
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-md lg:ml-auto">
              Lo que ves a la izquierda es cómo empezó. Lo que ves a la derecha
              es cómo quedó. Desliza para ver la transformación.
            </p>
          </Reveal>
        </div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* AFTER image (full, bottom layer) — built-out project */}
            <div className="absolute inset-0">
              <img
                src="/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg"
                alt="Ciudad Venecia — Proyecto construido"
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* BEFORE image (clipped) — raw terrain */}
            <div
              className="absolute inset-0 z-10"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                src="/DRON-JUANJOSE/Guaimaca/Guaimaca.jpeg"
                alt="Terreno antes del desarrollo"
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              {/* Darker treatment for "before" */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />
              {/* Sepia-ish overlay */}
              <div className="absolute inset-0 bg-[#1A1A1A]/20 mix-blend-multiply" />
            </div>

            {/* Labels — editorial typography */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20"
            >
              <div className="backdrop-blur-md bg-black/40 px-5 py-3 border-l-2 border-[#C5A065]">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-0.5">Antes</p>
                <p className="text-white font-serif-display text-lg md:text-xl">El terreno</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-20"
            >
              <div className="backdrop-blur-md bg-black/40 px-5 py-3 border-r-2 border-[#C5A065]">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-0.5 text-right">Después</p>
                <p className="text-white font-serif-display text-lg md:text-xl text-right">La comunidad</p>
              </div>
            </motion.div>

            {/* Divider line + Handle */}
            <div
              className="absolute top-0 bottom-0 z-30"
              style={{ left: `${position}%`, transition: isDragging ? 'none' : 'left 0.1s ease-out' }}
            >
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/90 -translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />

              {/* Handle */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className={`w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110' : 'scale-100'}`}>
                  {/* Gold ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#C5A065]" />
                  {/* Arrows */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C5A065]">
                    <path d="M8 12H16M8 12L11 9M8 12L11 15M16 12L13 9M16 12L13 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Pulsing ring hint — disappears after interaction */}
                {!hasInteracted && (
                  <div className="absolute inset-0 rounded-full border border-[#C5A065]/50 animate-ping" />
                )}
              </div>
            </div>

            {/* Hint overlay — fades out */}
            {!hasInteracted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-black/60 backdrop-blur-sm px-6 py-3 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="animate-[wiggle_2s_ease-in-out_infinite]">
                    <path d="M8 12H16M8 12L11 9M8 12L11 15M16 12L13 9M16 12L13 15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white text-xs uppercase tracking-[0.2em]">Desliza para comparar</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Year markers */}
        <div className="flex justify-between mt-6 max-w-[200px] mx-auto">
          <Reveal delay={0.5}>
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">2015</span>
          </Reveal>
          <Reveal delay={0.6}>
            <span className="text-[#C5A065] text-[10px] uppercase tracking-[0.3em]">2026</span>
          </Reveal>
        </div>
      </div>

      {/* CSS for wiggle animation */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
}
