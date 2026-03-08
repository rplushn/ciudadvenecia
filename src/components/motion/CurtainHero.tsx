"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CurtainHeroProps {
  children: React.ReactNode;
}

// ============================================
// #1 — PROGRESS RING (SVG circle that fills with scroll)
// ============================================
function ProgressRing({ progress }: { progress: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * circumference);
  const percent = Math.round(progress * 100);

  return (
    <div
      className="absolute bottom-8 right-8 z-[20] pointer-events-none"
      style={{
        opacity: progress > 0.02 && progress < 0.78 ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
          {/* Background circle */}
          <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          {/* Progress circle */}
          <circle
            cx="24" cy="24" r={radius} fill="none"
            stroke="#C5A065"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
          />
        </svg>
        {/* Percentage text */}
        <span
          className="absolute text-[9px] tabular-nums font-bold tracking-wider"
          style={{
            color: progress >= 0.98 ? "#C5A065" : "rgba(255,255,255,0.4)",
            transition: "color 0.3s ease",
          }}
        >
          {percent}
        </span>

        {/* Flash effect at 100% */}
        <div
          className="absolute inset-0 rounded-full border border-[#C5A065]"
          style={{
            opacity: progress >= 0.75 ? 0.6 : 0,
            transform: progress >= 0.75 ? "scale(1.4)" : "scale(1)",
            transition: "all 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ============================================
// #3 — AUDIO CONTROLLER
// ============================================
function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(() => setIsMuted(true));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
        audioRef.current.volume = 0.1;
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
      setHasInteracted(true);
    }
  }, [isMuted]);

  return (
    <div className="absolute bottom-8 left-8 z-[20]">
      <audio ref={audioRef} loop preload="none">
        <source src="/audio/ambient.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMute}
        className="group flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-[#C5A065]/40 transition-all duration-500 backdrop-blur-sm bg-black/10"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {/* Sound icon */}
        <div className="relative w-4 h-4">
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" className="group-hover:stroke-[#C5A065] transition-colors">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A065" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </div>
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white/50 transition-colors hidden md:block">
          {isMuted ? "Sonido" : "Mute"}
        </span>
      </button>
    </div>
  );
}

// ============================================
// #4 — TYPEWRITER CURSOR
// ============================================
function TypewriterCursor({ visible, complete }: { visible: boolean; complete: boolean }) {
  const [blinks, setBlinks] = useState(0);

  useEffect(() => {
    if (complete) {
      const interval = setInterval(() => {
        setBlinks(prev => {
          if (prev >= 6) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [complete]);

  if (!visible || (complete && blinks >= 6)) return null;

  return (
    <span
      className="inline-block w-[2px] h-[0.85em] bg-[#C5A065] ml-1 align-middle"
      style={{
        opacity: complete ? (blinks % 2 === 0 ? 1 : 0) : 1,
        transition: "opacity 0.1s",
        boxShadow: "0 0 8px rgba(197,160,101,0.5)",
      }}
    />
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function CurtainHero({ children }: CurtainHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ============================================
  // STATE — All driven by scroll
  // ============================================
  const [scrollPct, setScrollPct] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState(0); // 0-8
  const [phase, setPhase] = useState(0); // 0=curtain, 1=letters, 2=tagline, 3=fade

  // Listen to scroll and update state
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrollPct(v);

      // Phase logic
      if (v < 0.22) {
        setPhase(0);
        setVisibleLetters(0);
      } else if (v >= 0.22 && v < 0.50) {
        setPhase(1);
        // Each 3.5% of scroll reveals one letter (8 letters over 28% range)
        const letterProgress = (v - 0.22) / 0.28;
        const count = Math.min(Math.floor(letterProgress * 8) + 1, 8);
        setVisibleLetters(count);
      } else if (v >= 0.50 && v < 0.68) {
        setPhase(2);
        setVisibleLetters(8);
      } else {
        setPhase(3);
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // ============================================
  // CURTAIN (useTransform works for x)
  // ============================================
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  // ============================================
  // VIDEO PARALLAX
  // ============================================
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 0.85], [1.35, 1.15, 1.0]);
  const videoY = useTransform(scrollYProgress, [0, 0.85], ["0%", "-6%"]);

  // ============================================
  // #2 — LIGHT LEAK position (moves diagonally)
  // ============================================
  const lightLeakX = useTransform(scrollYProgress, [0.2, 0.6], ["-30%", "130%"]);
  const lightLeakOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 0.35, 0]);

  // ============================================
  // #2 — GRAIN parallax
  // ============================================
  const grainY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // ============================================
  // #5 — GOLD RESIDUE on curtain edges
  // ============================================
  const residueOpacity = scrollPct > 0.05 && scrollPct < 0.55 ? Math.min((scrollPct - 0.05) * 4, 1) * (scrollPct < 0.4 ? 1 : Math.max(0, (0.55 - scrollPct) / 0.15)) : 0;

  // Overlay calculations
  const overlayDark = phase === 1 || phase === 2 ? 0.65 : phase === 0 ? 0.25 : 0.1;
  const vignetteOpacity = phase === 3 ? 0.15 : phase === 0 ? 0.5 : 0.65;

  const letters = "DESCUBRE".split("");
  const allLettersVisible = visibleLetters >= 8;

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#F7F6F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1A1A]">

        {/* ============================================ */}
        {/* VIDEO LAYER */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ scale: videoScale, y: videoY }}
        >
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            src="/homepage/Clip5.mp4"
          />
        </motion.div>

        {/* ============================================ */}
        {/* #2 — FILM GRAIN TEXTURE (parallax layer) */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay"
          style={{ y: grainY, opacity: 0.06 }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </motion.div>

        {/* ============================================ */}
        {/* #2 — LIGHT LEAK (diagonal gold flare) */}
        {/* ============================================ */}
        <motion.div
          className="absolute top-0 z-[2] pointer-events-none"
          style={{
            x: lightLeakX,
            opacity: lightLeakOpacity,
            width: "40%",
            height: "100%",
            background: "linear-gradient(135deg, transparent 0%, rgba(197,160,101,0.12) 30%, rgba(197,160,101,0.25) 50%, rgba(197,160,101,0.12) 70%, transparent 100%)",
            filter: "blur(40px)",
          }}
        />

        {/* ============================================ */}
        {/* OVERLAYS */}
        {/* ============================================ */}

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background: "radial-gradient(ellipse at center, rgba(26,26,26,0.1) 0%, rgba(26,26,26,0.45) 55%, rgba(26,26,26,0.85) 100%)",
            transition: "opacity 1s ease",
          }}
        />

        {/* Phase-based darkness boost */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none bg-[#1A1A1A]"
          style={{
            opacity: overlayDark,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-[15%] z-[5] pointer-events-none bg-gradient-to-b from-[#1A1A1A]/50 to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] z-[5] pointer-events-none bg-gradient-to-t from-[#1A1A1A] to-transparent" />

        {/* ============================================ */}
        {/* PHASE 1: "DESCUBRE" — Scroll-controlled letters */}
        {/* ============================================ */}
        <div
          className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
          style={{
            opacity: phase === 1 ? 1 : phase === 2 ? 0 : 0,
            transform: phase === 2 ? "translateY(-70px)" : "translateY(0)",
            transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        >
          <div className="flex items-center">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="font-serif-display text-white text-5xl md:text-7xl lg:text-[120px] font-extralight"
                style={{
                  opacity: i < visibleLetters ? 1 : 0,
                  transform: i < visibleLetters
                    ? "translateY(0px) rotateX(0deg) scale(1)"
                    : "translateY(-120px) rotateX(50deg) scale(0.8)",
                  filter: i < visibleLetters ? "blur(0px)" : "blur(12px)",
                  transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  marginRight: "0.06em",
                  textShadow: "0 4px 50px rgba(0,0,0,0.5), 0 0 100px rgba(197,160,101,0.1)",
                }}
              >
                {letter}
              </span>
            ))}

            {/* #4 — Typewriter cursor */}
            <TypewriterCursor
              visible={phase === 1 && visibleLetters > 0}
              complete={allLettersVisible}
            />
          </div>
        </div>

        {/* ============================================ */}
        {/* PHASE 2: Tagline + Decorative Elements */}
        {/* ============================================ */}
        <div
          className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
          style={{
            opacity: phase === 2 ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        >
          <div className="text-center px-6">

            {/* Top vertical line */}
            <div
              className="w-[1px] mx-auto bg-gradient-to-b from-transparent to-[#C5A065]/80 mb-7"
              style={{
                height: phase === 2 ? "45px" : "0px",
                transition: "height 1s cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s",
              }}
            />

            {/* "CIUDAD VENECIA" label */}
            <p
              className="text-white/80 text-[9px] md:text-[11px] font-bold uppercase mb-5"
              style={{
                letterSpacing: "0.7em",
                opacity: phase === 2 ? 1 : 0,
                transform: phase === 2 ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.8s ease 0.4s",
              }}
            >
              Ciudad Venecia
            </p>

            {/* Gold horizontal lines + diamond */}
            <div className="flex items-center justify-center gap-3 mb-7">
              <div
                className="h-[1px] bg-gradient-to-r from-transparent to-[#C5A065]/90"
                style={{
                  width: phase === 2 ? "70px" : "0px",
                  transition: "width 1s ease 0.6s",
                }}
              />
              <div
                className="border border-[#C5A065]/70 rotate-45"
                style={{
                  width: phase === 2 ? "7px" : "0px",
                  height: phase === 2 ? "7px" : "0px",
                  opacity: phase === 2 ? 1 : 0,
                  transition: "all 0.5s ease 0.8s",
                }}
              />
              <div
                className="h-[1px] bg-gradient-to-l from-transparent to-[#C5A065]/90"
                style={{
                  width: phase === 2 ? "70px" : "0px",
                  transition: "width 1s ease 0.6s",
                }}
              />
            </div>

            {/* Main tagline */}
            <h3
              className="font-serif-display text-[#C5A065] text-2xl md:text-4xl lg:text-[52px] italic font-light leading-tight"
              style={{
                opacity: phase === 2 ? 1 : 0,
                transform: phase === 2 ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s ease 0.9s",
                textShadow: "0 2px 40px rgba(0,0,0,0.4), 0 0 60px rgba(197,160,101,0.3)",
              }}
            >
              Tu nuevo hogar te espera
            </h3>

            {/* Cities */}
            <p
              className="text-white/60 text-[9px] md:text-[11px] tracking-[0.5em] uppercase mt-6 font-light"
              style={{
                opacity: phase === 2 ? 1 : 0,
                transform: phase === 2 ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.8s ease 1.2s",
              }}
            >
              Danlí · Olancho · Talanga · Valle · Guaimaca
            </p>

            {/* Bottom line */}
            <div
              className="w-[1px] mx-auto bg-gradient-to-t from-transparent to-[#C5A065]/50 mt-7"
              style={{
                height: phase === 2 ? "25px" : "0px",
                transition: "height 0.8s ease 1.4s",
              }}
            />
          </div>
        </div>

        {/* ============================================ */}
        {/* SCROLL CUE — Phase 0 only */}
        {/* ============================================ */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[16] flex flex-col items-center gap-2 pointer-events-none"
          style={{
            opacity: phase === 0 && scrollPct < 0.08 ? 0.6 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <span className="text-white/30 text-[8px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-1.5 bg-[#C5A065]/60 rounded-full animate-bounce" />
          </div>
        </div>

        {/* ============================================ */}
        {/* #1 — PROGRESS RING */}
        {/* ============================================ */}
        <ProgressRing progress={scrollPct} />

        {/* ============================================ */}
        {/* #3 — AMBIENT AUDIO */}
        {/* ============================================ */}
        <AmbientAudio />

        {/* ============================================ */}
        {/* CURTAIN HALVES */}
        {/* ============================================ */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full overflow-hidden z-30"
          style={{ x: leftX }}
        >
          <div className="w-[200%] h-full">
            {children}
          </div>

          {/* #5 — Gold residue on right edge */}
          <div
            className="absolute top-0 right-0 w-[2px] h-full z-40"
            style={{
              opacity: residueOpacity,
              background: "linear-gradient(to bottom, transparent 10%, rgba(197,160,101,0.5) 30%, rgba(197,160,101,0.7) 50%, rgba(197,160,101,0.5) 70%, transparent 90%)",
              boxShadow: "0 0 12px rgba(197,160,101,0.3), 0 0 30px rgba(197,160,101,0.15)",
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-30"
          style={{ x: rightX }}
        >
          <div className="w-[200%] h-full -translate-x-1/2">
            {children}
          </div>

          {/* #5 — Gold residue on left edge */}
          <div
            className="absolute top-0 left-0 w-[2px] h-full z-40"
            style={{
              opacity: residueOpacity,
              background: "linear-gradient(to bottom, transparent 10%, rgba(197,160,101,0.5) 30%, rgba(197,160,101,0.7) 50%, rgba(197,160,101,0.5) 70%, transparent 90%)",
              boxShadow: "0 0 12px rgba(197,160,101,0.3), 0 0 30px rgba(197,160,101,0.15)",
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>

        {/* Center line — transparent */}
        <motion.div
          className="absolute top-0 left-1/2 w-[2px] h-full bg-transparent z-40 -translate-x-1/2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
        />

      </div>
    </div>
  );
}