"use client";

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Differentiator {
  number: string;
  headline: string;
  description: string;
}

const items: Differentiator[] = [
  {
    number: '01',
    headline: 'Financiamiento sin banco',
    description: 'Aprobación inmediata, sin fiador, sin trámites bancarios. Directo con nosotros.',
  },
  {
    number: '02',
    headline: 'Plusvalía desde el día uno',
    description: 'Tu terreno se valoriza desde el momento de la compra. Inversión inteligente.',
  },
  {
    number: '03',
    headline: 'Amenidades completas',
    description: 'Piscinas, canchas, parques, seguridad, pavimento y agua potable incluidos.',
  },
  {
    number: '04',
    headline: '11 años de respaldo',
    description: 'Más de 1,200 familias confían en INMAER. Solidez comprobada.',
  },
];

function DifferentiatorBlock({ item, index }: { item: Differentiator; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Top gold line that expands on hover */}
      <div className="h-px bg-white/10 mb-10 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-[#C5A065] w-0 group-hover:w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>

      {/* Number */}
      <span className="font-serif-display text-6xl md:text-7xl lg:text-8xl text-[#C5A065]/15 leading-none block mb-4 transition-colors duration-700 group-hover:text-[#C5A065]/30">
        {item.number}
      </span>

      {/* Headline */}
      <h3 className="font-serif-display text-2xl md:text-3xl text-white mb-3 leading-tight transition-colors duration-500 group-hover:text-[#C5A065]">
        {item.headline}
      </h3>

      {/* Description */}
      <p className="text-white/35 text-sm font-light leading-relaxed max-w-xs transition-colors duration-500 group-hover:text-white/55">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function WhyCiudadVenecia() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }}
      />

      {/* Large decorative text behind */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.02 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
      >
        <span className="font-serif-display text-[20vw] text-white leading-none">
          INMAER
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 md:mb-28 items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block"
            >
              Por qué elegirnos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]"
            >
              Lo que nos hace{' '}
              <span className="italic text-[#C5A065]">diferentes</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/30 text-sm font-light leading-relaxed max-w-md lg:ml-auto"
          >
            No somos otra inmobiliaria. Somos la única en Honduras con financiamiento
            propio, amenidades entregadas y una trayectoria que habla por sí sola.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {items.map((item, i) => (
            <DifferentiatorBlock key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
