"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface InnerHeroProps {
  backgroundImage: string;
  label?: string;
  titleLine1: string;
  titleLine2?: string;
  subtitle?: string;
  breadcrumb: string;
}

export default function InnerHero({
  backgroundImage,
  label,
  titleLine1,
  titleLine2,
  subtitle,
  breadcrumb,
}: InnerHeroProps) {
  return (
    <section className="relative h-[75vh] min-h-[550px] overflow-hidden flex items-center justify-center bg-black">

      {/* ============================================ */}
      {/* 1. IMAGEN — revelada con clip-path circular  */}
      {/* ============================================ */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        transition={{ delay: 1.2, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Ken Burns lento */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </motion.div>

      {/* ============================================ */}
      {/* 2. CONTENIDO CENTRAL                         */}
      {/* ============================================ */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">

        {/* 2a. TÍTULO LÍNEA 1 — aparece antes del reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1]"
        >
          {titleLine1}
        </motion.h1>

        {/* 2b. TÍTULO LÍNEA 2 — 0.3s después, itálica dorada */}
        {titleLine2 && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif-display italic text-5xl md:text-7xl lg:text-8xl text-[#C5A065] leading-[1.1] mt-2"
          >
            {titleLine2}
          </motion.h1>
        )}

        {/* 2d. SUBTÍTULO — blur-in después del reveal */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="mt-8 text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* 2e. LÍNEA DORADA ACCENT */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.5, duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-6 h-[2px] w-20 bg-[#C5A065] origin-center"
        />
      </div>

      {/* ============================================ */}
      {/* 2c. LABEL DORADO — posicionado arriba        */}
      {/* ============================================ */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="absolute z-10 flex items-center justify-center gap-4"
          style={{ top: "18%", left: "50%", transform: "translateX(-50%)" }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.0, duration: 0.5 }}
            className="h-[1px] w-12 bg-[#C5A065]/50 origin-right"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A065] whitespace-nowrap">
            {label}
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.0, duration: 0.5 }}
            className="h-[1px] w-12 bg-[#C5A065]/50 origin-left"
          />
        </motion.div>
      )}

      {/* ============================================ */}
      {/* 3. BREADCRUMB — arriba izquierda             */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.6 }}
        className="absolute top-28 left-8 md:left-16 z-10"
      >
        <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40">
          <a href="/" className="hover:text-[#C5A065] transition-colors duration-300">
            Inicio
          </a>
          <span className="text-[#C5A065]/60">/</span>
          <span className="text-white/70">{breadcrumb}</span>
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* 4. SCROLL INDICATOR                          */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/30"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ============================================ */}
      {/* 5. BORDE INFERIOR DORADO                     */}
      {/* ============================================ */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 3.0, duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/30 to-transparent origin-center"
      />

    </section>
  );
}
