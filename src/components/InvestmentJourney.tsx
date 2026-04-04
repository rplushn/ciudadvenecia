"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: '01',
    title: 'Elige tu proyecto',
    desc: 'Explora nuestros desarrollos en 6 ubicaciones estratégicas de Honduras.',
  },
  {
    num: '02',
    title: 'Conoce tu terreno',
    desc: 'Agenda una visita guiada para que camines, sientas y visualices tu futuro hogar.',
  },
  {
    num: '03',
    title: 'Plan a tu medida',
    desc: 'Financiamiento directo, sin bancos, sin burocracia. Cuotas que se adaptan a ti.',
  },
  {
    num: '04',
    title: 'Bienvenido a casa',
    desc: 'Recibe tu terreno con infraestructura completa y comienza a construir tus sueños.',
  },
];

const benefits = [
  { icon: '◆', label: 'Calles pavimentadas', size: 'normal' },
  { icon: '◆', label: 'Agua potable 24h', size: 'normal' },
  { icon: '◆', label: 'Electrificación completa', size: 'normal' },
  { icon: '◆', label: 'Seguridad privada 24/7', size: 'normal' },
  { icon: '◆', label: 'Piscinas y casa club', size: 'normal' },
  { icon: '◆', label: 'Canchas deportivas', size: 'normal' },
  { icon: '◆', label: 'App de residentes', size: 'normal' },
  { icon: '◆', label: 'Plusvalía comprobada', size: 'normal' },
];

export default function InvestmentJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const benefitsTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Steps stagger reveal with line drawing
      stepsRef.current.forEach((step, i) => {
        if (!step) return;

        // Step card slides in
        gsap.fromTo(step,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0, rotateY: i % 2 === 0 ? 8 : -8 },
          {
            x: 0, opacity: 1, rotateY: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Number counter effect
        const numEl = step.querySelector('.step-num');
        if (numEl) {
          gsap.fromTo(numEl,
            { scale: 3, opacity: 0 },
            {
              scale: 1, opacity: 1,
              duration: 0.7,
              delay: 0.2,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

      // Connecting lines draw
      linesRef.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Benefits title
      if (benefitsTitleRef.current) {
        gsap.fromTo(benefitsTitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: benefitsTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Benefits cards stagger
      const validBenefits = benefitsRef.current.filter(Boolean);
      if (validBenefits.length > 0) {
        gsap.fromTo(validBenefits,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: validBenefits[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* ============ PROCESS SECTION (Dark) ============ */}
      <section className="relative bg-[#111111] py-28 px-6 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating gold accent circles */}
        <div className="absolute top-20 right-[15%] w-[300px] h-[300px] rounded-full bg-[#C5A065]/5 blur-3xl" />
        <div className="absolute bottom-32 left-[10%] w-[200px] h-[200px] rounded-full bg-[#C5A065]/3 blur-3xl" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          {/* Header */}
          <div ref={headerRef} className="mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#C5A065]" />
              <span className="text-[#C5A065] text-[10px] uppercase tracking-[0.5em] font-medium">Cómo funciona</span>
            </div>
            <h2 className="font-serif-display text-5xl md:text-7xl text-white font-light leading-[0.95]">
              Tu camino hacia<br />
              <span className="italic text-[#C5A065]">el hogar ideal</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="relative">
            {steps.map((step, i) => (
              <div key={i}>
                {/* Step card */}
                <div
                  ref={(el) => { stepsRef.current[i] = el; }}
                  className={`flex items-start gap-8 md:gap-12 ${i % 2 === 0 ? '' : 'md:flex-row-reverse md:text-right'}`}
                  style={{ perspective: '800px' }}
                >
                  {/* Number */}
                  <div className="shrink-0">
                    <span className="step-num font-serif-display text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#C5A065] to-[#8B7355] leading-none block">
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`pt-4 md:pt-8 max-w-md ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                    <h3 className="text-white text-xl md:text-2xl font-light tracking-wide mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-6">
                    <div
                      ref={(el) => { linesRef.current[i] = el; }}
                      className="w-[1px] h-16 bg-gradient-to-b from-[#C5A065]/60 to-transparent origin-top"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFITS SECTION (Light) ============ */}
      <section className="relative bg-[#F3F0EB] py-28 px-6 overflow-hidden">
        {/* Decorative large text background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-serif-display text-[20vw] text-[#1A1A1A]/[0.02] leading-none whitespace-nowrap">
            INCLUIDO
          </span>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          {/* Header */}
          <div ref={benefitsTitleRef} className="text-center mb-20">
            <span className="text-[#C5A065] text-[10px] uppercase tracking-[0.5em] font-medium block mb-6">
              Lo que incluye tu inversión
            </span>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A1A1A] font-light">
              Todo pensado.<br />
              <span className="italic text-[#C5A065]">Todo incluido.</span>
            </h2>
          </div>

          {/* Benefits Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {benefits.map((b, i) => (
              <div
                key={i}
                ref={(el) => { benefitsRef.current[i] = el; }}
                className="group relative bg-white p-6 md:p-8 border border-[#E5E0D8] hover:border-[#C5A065] transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-default"
              >
                {/* Hover gold top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A065] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <span className="text-[#C5A065] text-lg block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {b.icon}
                </span>
                <span className="text-[#1A1A1A] text-xs md:text-sm font-medium tracking-wide leading-tight block">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom CTA line */}
          <div className="mt-16 text-center">
            <div className="w-12 h-[1px] bg-[#C5A065] mx-auto mb-6" />
            <p className="text-[#1A1A1A]/40 text-xs uppercase tracking-[0.4em]">
              Infraestructura completa desde el día uno
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
