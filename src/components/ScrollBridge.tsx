"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollBridge() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ============================================
  // PHASE 1: The Number (0% - 35%)
  // ============================================
  const numberOpacity = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.35], [0, 1, 1, 0]);
  const numberY = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.35], [60, 0, 0, -80]);
  const numberScale = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.35], [0.85, 1, 1, 1.05]);
  const numberBlur = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.35], [8, 0, 0, 8]);

  // "/ mes" label
  const mesOpacity = useTransform(scrollYProgress, [0.05, 0.12, 0.25, 0.33], [0, 1, 1, 0]);
  const mesY = useTransform(scrollYProgress, [0.05, 0.12], [20, 0]);

  // ============================================
  // PHASE 2: The Question (30% - 65%)
  // ============================================
  const questionOpacity = useTransform(scrollYProgress, [0.3, 0.38, 0.55, 0.65], [0, 1, 1, 0]);
  const questionY = useTransform(scrollYProgress, [0.3, 0.38, 0.55, 0.65], [50, 0, 0, -60]);
  const questionScale = useTransform(scrollYProgress, [0.3, 0.38], [0.95, 1]);

  // "Menos de lo que imaginas" — appears slightly after question
  const answerOpacity = useTransform(scrollYProgress, [0.4, 0.48, 0.55, 0.63], [0, 1, 1, 0]);
  const answerY = useTransform(scrollYProgress, [0.4, 0.48], [30, 0]);

  // Gold line that draws itself
  const lineScaleX = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.55, 0.63], [0, 1, 1, 0]);

  // ============================================
  // PHASE 3: The Reveal (60% - 100%)
  // ============================================
  const bgOpacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0]);
  
  // Subtle particles / atmospheric effect
  const grain1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const grain2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Gold accent line at top — visible throughout
  const accentWidth = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["0%", "100%", "100%", "0%"]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background — starts black, fades to transparent revealing Precios below */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            opacity: bgOpacity,
            background: "linear-gradient(180deg, #1A1A1A 0%, #1A1A1A 70%, rgba(26,26,26,0.95) 100%)",
          }}
        />

        {/* Atmospheric floating elements */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{ opacity: bgOpacity }}
        >
          {/* Subtle gold particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#C5A065]"
              style={{
                left: `${8 + (i * 7.5)}%`,
                top: `${20 + (i % 3) * 25}%`,
                opacity: 0.08 + (i % 4) * 0.04,
                y: i % 2 === 0 ? grain1Y : grain2Y,
              }}
            />
          ))}

          {/* Shooting star */}
          <motion.div
            className="absolute w-[120px] h-[1px]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(197,160,101,0.6), transparent)",
              top: "25%",
              left: "-10%",
              rotate: "35deg",
              y: grain1Y,
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                x: ["-100%", "1500%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 8,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(to right, transparent, rgba(197,160,101,0.8), rgba(255,255,255,0.9))",
                width: "60px",
                height: "1px",
                boxShadow: "0 0 8px rgba(197,160,101,0.4), 0 0 20px rgba(197,160,101,0.2)",
              }}
            />
          </motion.div>

          {/* Second shooting star — different angle and timing */}
          <motion.div
            className="absolute w-[80px] h-[1px]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
              top: "60%",
              right: "-5%",
              rotate: "25deg",
              y: grain2Y,
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                x: ["200%", "-1500%"],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 12,
                ease: "easeInOut",
                delay: 5,
              }}
              style={{
                background: "linear-gradient(to left, transparent, rgba(255,255,255,0.7), rgba(197,160,101,0.5))",
                width: "40px",
                height: "1px",
                boxShadow: "0 0 6px rgba(255,255,255,0.3)",
              }}
            />
          </motion.div>

          {/* Decorative corner accents */}
          <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-[#C5A065]/10" />
          <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-[#C5A065]/10" />
          <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-[#C5A065]/10" />
          <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-[#C5A065]/10" />
        </motion.div>

        {/* Gold accent line at very top */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A065] to-transparent z-30"
          style={{ width: accentWidth }}
        />

        {/* ============================================ */}
        {/* PHASE 1: THE NUMBER */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{
            opacity: numberOpacity,
            y: numberY,
            scale: numberScale,
          }}
        >
          {/* Subtle glow behind number */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#C5A065]/[0.03] blur-[100px]" />

          <motion.div className="relative text-center">
            {/* Small label above */}
            <motion.p
              className="text-[#C5A065]/60 text-[10px] font-bold uppercase tracking-[0.5em] mb-6"
              style={{ opacity: mesOpacity }}
            >
              TU PRÓXIMO PASO
            </motion.p>

            {/* THE BIG NUMBER */}
            <motion.div
              className="relative"
              
            >
              <span className="font-serif-display text-[120px] md:text-[180px] lg:text-[220px] text-white leading-none tracking-tight">
                Tu Terreno
              </span>

              {/* Decorative underline */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/40 to-transparent"
                style={{ width: "80%" }}
              />
            </motion.div>

            {/* "/mes" label */}
            <motion.p
              className="text-white/30 text-2xl md:text-3xl font-serif-display mt-4 italic"
              style={{ opacity: mesOpacity, y: mesY }}
            >
              tu legado
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ============================================ */}
        {/* PHASE 2: THE QUESTION */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
          style={{
            opacity: questionOpacity,
            y: questionY,
            scale: questionScale,
          }}
        >
          <div className="text-center max-w-4xl">
            {/* Main question */}
            <h2 className="font-serif-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              ¿Cuánto cuesta
              <br />
              <span className="italic text-white/40">tu sueño?</span>
            </h2>

            {/* Gold divider line */}
            <motion.div
              className="h-[1px] bg-[#C5A065] mx-auto mb-8 origin-center"
              style={{
                scaleX: lineScaleX,
                opacity: lineOpacity,
                width: "120px",
              }}
            />

            {/* Answer */}
            <motion.p
              className="text-[#C5A065] text-lg md:text-2xl font-serif-display tracking-wide"
              style={{ opacity: answerOpacity, y: answerY }}
            >
              Menos de lo que imaginas.
            </motion.p>

            {/* Supporting text */}
            <motion.p
              className="text-white/20 text-xs md:text-sm mt-10 max-w-md mx-auto leading-relaxed"
              style={{ opacity: answerOpacity }}
            >
              Financiamiento directo, sin complicaciones.
              <br />
              Calificación inmediata.
            </motion.p>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* PHASE 3: SCROLL CUE (bottom) */}
        {/* ============================================ */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.7, 0.8], [1, 0.6, 0.6, 0]),
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#C5A065]/0 to-[#C5A065]/40"
          />
        </motion.div>

      </div>
    </div>
  );
}