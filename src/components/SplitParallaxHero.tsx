"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SplitParallaxHeroProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
}

export default function SplitParallaxHero({ 
  imageSrc, 
  title = "PROYECTOS",
  subtitle = "DESARROLLOS RESIDENCIALES · HONDURAS"
}: SplitParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Top half moves up
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const topScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Bottom half moves down
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bottomScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Title parallax (moves up slower)
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Overlay darkens as you scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.7]);

  // Subtitle
  const subOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 0.5], ["0px", "40px"]);

  // Decorative line expands
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["80px", "200px"]);

  return (
    <div ref={containerRef} className="relative h-[160vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* === TOP HALF === */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ 
            y: topY,
            scale: topScale,
            clipPath: "inset(0 0 50% 0)"
          }}
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${imageSrc}')` }}
          />
          <motion.div 
            className="absolute inset-0 bg-[#1A1A1A]"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* === BOTTOM HALF === */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ 
            y: bottomY,
            scale: bottomScale,
            clipPath: "inset(50% 0 0 0)"
          }}
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${imageSrc}')` }}
          />
          <motion.div 
            className="absolute inset-0 bg-[#1A1A1A]"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* === CENTER TITLE (between the halves) === */}
        <motion.div 
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{ 
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
        >
          {/* Glow behind text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[200px] bg-[#C5A065]/10 blur-[100px] rounded-full" />
          </div>

          <motion.div
            className="relative"
            style={{ opacity: subOpacity, y: subY }}
          >
            <span className="text-[#C5A065] text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] block mb-6">
              Portafolio Inmobiliario
            </span>
          </motion.div>

          <h1 
            className="font-serif-display text-[clamp(3.5rem,12vw,13rem)] text-white leading-[0.85] tracking-[0.04em] text-center relative"
            style={{ 
              textShadow: '0 4px 60px rgba(0,0,0,0.5), 0 0 120px rgba(197,160,101,0.15)'
            }}
          >
            {title}
          </h1>

          <motion.div 
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A065] to-transparent mt-8"
            style={{ width: lineWidth, opacity: subOpacity }}
          />

          <motion.p 
            className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.4em] mt-6 relative"
            style={{ opacity: subOpacity, y: subY }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* === SPLIT LINE (horizontal gap between halves) === */}
        <div className="absolute top-1/2 left-0 right-0 z-[15] h-[2px] bg-gradient-to-r from-transparent via-[#C5A065]/40 to-transparent transform -translate-y-1/2" />

        {/* === SCROLL INDICATOR === */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
          style={{ opacity: subOpacity }}
        >
          <span className="text-white/40 text-[9px] uppercase tracking-[0.3em]">Descubrí</span>
          <motion.div 
            className="w-[1px] h-8 bg-gradient-to-b from-[#C5A065] to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </div>
  );
}
