"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";

interface FadeRevealSectionProps {
  children?: React.ReactNode;
}

export default function FadeRevealSection({ children }: FadeRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setProgress(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Phase calculations
  // 0-15%: Black overlay fully visible (coming from hero)
  // 15-35%: Black fades out, revealing beige + content starts appearing
  // 35-50%: Content fully visible
  // 50%+: Normal scroll
  
  const blackOpacity = progress < 0.1 ? 1 : progress < 0.3 ? 1 - ((progress - 0.1) / 0.2) : 0;
  const contentReady = progress > 0.15;

  // Stagger words of title
  const titleWords = "Un estilo de vida extraordinario".split(" ");
  const wordDelay = (i: number) => {
    const start = 0.15;
    const perWord = 0.04;
    return progress > start + (i * perWord);
  };

  // Subtitle reveal
  const subtitleVisible = progress > 0.35;

  // Gold line
  const lineVisible = progress > 0.28;

  // Diamond icon
  const diamondVisible = progress > 0.12;

  return (
    <div ref={containerRef} className="relative">

      {/* BLACK OVERLAY — Fades out revealing content */}
      <div
        className="absolute inset-0 bg-[#1A1A1A] z-30 pointer-events-none"
        style={{
          opacity: blackOpacity,
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* MAIN SECTION */}
      <section className="relative py-20 md:py-24 px-6 bg-[#F7F6F4] text-center overflow-hidden z-10">
        <div className="max-w-4xl mx-auto">

          {/* Diamond icon — spins in */}
          <div
            className="flex justify-center mb-8"
            style={{
              opacity: diamondVisible ? 1 : 0,
              transform: diamondVisible ? "rotate(0deg) scale(1)" : "rotate(-180deg) scale(0.3)",
              transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="relative">
              <div className="w-3 h-3 border border-[#C5A065]/60 rotate-45" />
              <div
                className="absolute inset-0 w-3 h-3 border border-[#C5A065]/30 rotate-45"
                style={{
                  transform: diamondVisible ? "rotate(45deg) scale(1.8)" : "rotate(0deg) scale(1)",
                  opacity: diamondVisible ? 0.4 : 0,
                  transition: "all 1.5s ease 0.3s",
                }}
              />
            </div>
          </div>

          {/* TITLE — Word by word reveal */}
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] mb-6 leading-tight">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.3em]"
                style={{
                  opacity: wordDelay(i) ? 1 : 0,
                  transform: wordDelay(i) ? "translateY(0px)" : "translateY(40px)",
                  filter: wordDelay(i) ? "blur(0px)" : "blur(6px)",
                  transition: "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* GOLD LINE — Grows from center */}
          <div className="flex justify-center mb-8">
            <div
              className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A065] to-transparent"
              style={{
                width: lineVisible ? "80px" : "0px",
                opacity: lineVisible ? 1 : 0,
                transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
            />
          </div>

          {/* DESCRIPTION — Fades in */}
          <p
            className="text-[#6B665F] font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
            style={{
              opacity: subtitleVisible ? 1 : 0,
              transform: subtitleVisible ? "translateY(0px)" : "translateY(25px)",
              transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}
          >
            Descubre Ciudad Venecia, donde la naturaleza y la arquitectura moderna
            convergen para crear el escenario perfecto para tu familia. Espacios
            diseñados para perdurar.
          </p>

          {/* Decorative bottom accent */}
          <div
            className="flex justify-center mt-10"
            style={{
              opacity: subtitleVisible ? 0.4 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#C5A065]/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A065]/30" />
              <div className="w-8 h-[1px] bg-[#C5A065]/40" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
