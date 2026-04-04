"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const sectionPin = sectionPinRef.current;
    if (!pinWrap || !sectionPin) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll pin
      const pinWrapWidth = pinWrap.scrollWidth;
      const horizontalScrollLength = pinWrapWidth - window.innerWidth;

      gsap.to(pinWrap, {
        scrollTrigger: {
          scrub: true,
          trigger: sectionPin,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          invalidateOnRefresh: true,
        },
        x: -horizontalScrollLength,
        ease: "none",
      });

      // Parallax on intro text (like Locomotive data-scroll-speed)
      // Title: speed 1 (slower parallax)
      if (titleRef.current && introRef.current) {
        gsap.to(titleRef.current, {
          scrollTrigger: {
            trigger: introRef.current,
            scrub: 0.5,
            start: "top bottom",
            end: "bottom top",
          },
          y: -50,
          ease: "none",
        });
      }
      // Subtitle: speed 2 + delay (faster parallax, like original)
      if (subtitleRef.current && introRef.current) {
        gsap.to(subtitleRef.current, {
          scrollTrigger: {
            trigger: introRef.current,
            scrub: 1.2,
            start: "top bottom",
            end: "bottom top",
          },
          y: -120,
          ease: "none",
        });
      }
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* === SECTION 1: INTRO (beige) === */}
      <section ref={introRef} className="relative bg-[#F3F0EB] h-[90vh] overflow-hidden">
        {/* Title — absolute top-left */}
        <div ref={titleRef} className="absolute top-[10vw] left-[10vw] z-10">
          <span className="text-[#C5A065] text-[9px] md:text-[12px] uppercase tracking-[0.4em] font-medium block mb-6">
            Ciudad Venecia Olancho
          </span>
          <h2 className="font-serif-display text-[#1A1A1A] text-[2.6rem] sm:text-[3.25rem] md:text-[3.9rem] lg:text-[5.2rem] leading-[0.95] font-light">
            <span className="block">Un estándar</span>
            <span className="block italic text-[#C5A065]">superior</span>
            <span className="block">de vida</span>
          </h2>
        </div>
        {/* Subtitle — absolute bottom-right */}
        <div ref={subtitleRef} className="absolute bottom-[10vw] right-[10vw] z-10 w-[220px] md:w-[280px]">
          <div className="w-12 h-[1px] bg-[#C5A065] mb-5" />
          <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">
            Cada detalle ha sido pensado para ofrecer una experiencia 
            residencial sin precedentes en armonía con la naturaleza.
          </p>
        </div>
      </section>

      {/* === SECTION 2: HORIZONTAL SCROLL (dark, pinned) === */}
      <div ref={sectionPinRef} className="bg-[#1A1A1A] h-screen overflow-hidden">
        <div 
          ref={pinWrapRef}
          className="flex items-center h-full gap-8 pl-8 md:pl-16 lg:pl-24"
          style={{ width: 'max-content' }}
        >
          <h3 className="font-serif-display text-white/80 text-xl sm:text-2xl md:text-3xl leading-relaxed font-light max-w-[500px] shrink-0 pr-8">
            Espacios diseñados para vivir, compartir y crecer — donde cada 
            rincón cuenta una historia de calidad y bienestar.
          </h3>

          <div className="shrink-0 h-[70vh] w-[60vw] md:w-[50vw] overflow-hidden rounded-sm">
            <img
              src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_A002_horizontal_web.jpg"
              alt="Ciudad Venecia Olancho - Fachadas"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="shrink-0 h-[70vh] w-[60vw] md:w-[50vw] overflow-hidden rounded-sm">
            <img
              src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina2_horizontal_web.jpg"
              alt="Ciudad Venecia Olancho - Piscina"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="shrink-0 h-[70vh] w-[60vw] md:w-[50vw] overflow-hidden rounded-sm mr-24">
            <img
              src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_horizontal_juegos_web.jpg"
              alt="Ciudad Venecia Olancho - Áreas recreativas"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* === SECTION 3: CLOSING (beige + vertical image) === */}
      <section className="relative bg-[#F3F0EB] min-h-screen flex items-center">
        <div className="w-full px-8 md:px-16 lg:px-24 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="h-[70vh] md:h-[80vh] overflow-hidden rounded-sm">
              <img
                src="/NUEVAS-JUANJOSE/verticales/cv_olancho_social_vertical_web.jpg"
                alt="Ciudad Venecia Olancho - Residencial"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[#C5A065] text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium block mb-8">
                Tu próximo hogar
              </span>
              <h2 className="font-serif-display text-[#1A1A1A] text-3xl sm:text-4xl md:text-5xl leading-[1] font-light mb-8">
                Donde cada día{' '}
                <em className="italic text-[#C5A065]">se siente</em>{' '}
                como vacaciones
              </h2>
              <div className="w-12 h-[1px] bg-[#C5A065] mb-6" />
              <p className="text-[#1A1A1A]/60 text-sm md:text-base leading-relaxed max-w-md mb-10">
                Lotes disponibles desde 250 m² en la zona más exclusiva 
                de Olancho. Infraestructura completa, financiamiento 
                directo y entrega inmediata.
              </p>
              <a
                href="https://wa.me/50489494639?text=Hola%2C%20me%20interesa%20Ciudad%20Venecia%20Olancho"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-[#C5A065] transition-colors duration-300"
              >
                Solicitar información
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M10 1L15 6M15 6L10 11M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
