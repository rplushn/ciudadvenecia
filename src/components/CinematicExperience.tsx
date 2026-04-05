"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResponsiveVideo from '@/components/ResponsiveVideo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Moment {
  icon: React.ReactNode;
  text: string;
}

const moments: Moment[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#C5A065]">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    text: 'Amanecer junto a la piscina',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#C5A065]">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: 'Tus hijos jugando seguros',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#C5A065]">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    text: 'Plusvalía que crece cada año',
  },
];

function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.3 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-center group"
    >
      {/* Icon container */}
      <div className="mx-auto w-20 h-20 rounded-full border border-[#C5A065]/20 flex items-center justify-center mb-6 group-hover:border-[#C5A065]/60 transition-colors duration-700 backdrop-blur-sm bg-white/5">
        {moment.icon}
      </div>

      {/* Decorative line */}
      <div className="w-px h-8 bg-gradient-to-b from-[#C5A065]/40 to-transparent mx-auto mb-6" />

      {/* Text */}
      <p className="font-serif-display text-xl md:text-2xl lg:text-3xl text-white italic leading-snug max-w-[220px] mx-auto">
        {moment.text}
      </p>
    </motion.div>
  );
}

export default function CinematicExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Parallax-like effect: video opacity shifts on scroll
  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;

    gsap.fromTo(overlayRef.current,
      { opacity: 0.5 },
      {
        opacity: 0.75,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    );

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <ResponsiveVideo
          src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_web.mp4"
          poster="/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_horizontal_web.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay — animated via GSAP */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/50" />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }}
      />

      {/* Gradient edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3F0EB] via-transparent to-[#F3F0EB] opacity-100 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #F3F0EB 0%, transparent 12%, transparent 88%, #F3F0EB 100%)' }}
      />

      {/* Content */}
      <div className="relative z-20 w-full px-6 py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto">
          {/* Section label */}
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.5em] block"
            >
              La experiencia de vivir aquí
            </motion.span>
          </div>

          {/* Moments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 mb-20">
            {moments.map((moment, i) => (
              <MomentCard key={i} moment={moment} index={i} />
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <a
              href="https://wa.me/50489494639?text=Hola%2C%20quiero%20vivir%20en%20Ciudad%20Venecia"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/30 text-white px-10 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-[#1A1A1A] transition-all duration-700 backdrop-blur-sm"
            >
              Quiero vivir así
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
