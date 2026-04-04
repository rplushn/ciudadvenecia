"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollBridge() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Text — visible from start, fades out smoothly as scroll progresses
  const textOpacity = useTransform(scrollYProgress, [0, 0.50, 0.78], [1, 0.9, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.50, 0.78], [0, -10, -80]);
  const textScale = useTransform(scrollYProgress, [0.50, 0.78], [1, 0.95]);

  // "soñar?" — slight entrance delay
  const sonarOpacity = useTransform(scrollYProgress, [0, 0.04, 0.50, 0.75], [0, 1, 0.9, 0]);
  const sonarY = useTransform(scrollYProgress, [0, 0.04], [30, 0]);
  const sonarScale = useTransform(scrollYProgress, [0, 0.04], [0.88, 1]);

  // Gold line — draws itself early, fades with text
  const lineScaleX = useTransform(scrollYProgress, [0.03, 0.12], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.03, 0.08, 0.50, 0.72], [0, 0.6, 0.5, 0]);

  // Background layers for smooth transition
  const darkBgOpacity = useTransform(scrollYProgress, [0.60, 0.90], [1, 0]);
  const warmBgOpacity = useTransform(scrollYProgress, [0.55, 0.75, 0.90, 1], [0, 0.8, 0.8, 0]);

  // Nebula drift
  const nebula1X = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const nebula1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const nebula2X = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const nebula2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Top accent line
  const accentWidth = useTransform(scrollYProgress, [0, 0.06, 0.90, 1], ["0%", "100%", "100%", "0%"]);

  // Deterministic starfield
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: ((i * 17 + 31) % 100),
    y: ((i * 23 + 47) % 100),
    size: (i % 7 === 0) ? 2.5 : (i % 4 === 0) ? 1.8 : (i % 2 === 0) ? 1.2 : 0.8,
    delay: (i * 0.37) % 5,
    duration: 2.5 + (i % 4),
  }));

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background — dark carbon that transitions to warm gray */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ opacity: darkBgOpacity, background: "#1A1A1A" }}
        />
        {/* Warm gray-brown layer — fades in then out to blend with PRECIOS */}
        <motion.div
          className="absolute inset-0 z-[9]"
          style={{
            opacity: warmBgOpacity,
            background: "linear-gradient(180deg, #3D3530 0%, #5C554F 50%, #6B665F 100%)",
          }}
        />

        {/* ========== ATMOSPHERE ========== */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{ opacity: darkBgOpacity }}
        >

          {/* Golden nebula 1 — top left */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(197,160,101,0.07) 0%, rgba(197,160,101,0.02) 40%, transparent 70%)",
              top: "10%",
              left: "15%",
              x: nebula1X,
              y: nebula1Y,
              filter: "blur(80px)",
            }}
          />

          {/* Golden nebula 2 — bottom right */}
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(197,160,101,0.05) 0%, rgba(197,160,101,0.015) 40%, transparent 70%)",
              bottom: "15%",
              right: "10%",
              x: nebula2X,
              y: nebula2Y,
              filter: "blur(60px)",
            }}
          />

          {/* Center glow behind text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(197,160,101,0.04) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Starfield */}
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.size > 2 ? '#C5A065' : '#ffffff',
                opacity: star.size > 2 ? 0.35 : star.size > 1.5 ? 0.2 : star.size > 1 ? 0.12 : 0.06,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}

          {/* ========== SHOOTING STARS (6) ========== */}

          {/* Star 1 — long gold streak, top-left to right */}
          <div className="absolute top-[18%] left-0 w-full h-[2px] rotate-[22deg] overflow-hidden">
            <div className="shooting-star-1 h-[1.5px] w-[140px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent 0%, #C5A065 30%, rgba(255,255,255,0.95) 80%, transparent 100%)",
                boxShadow: "0 0 12px rgba(197,160,101,0.7), 0 0 30px rgba(197,160,101,0.3)",
              }}
            />
          </div>

          {/* Star 2 — fast white, right to left */}
          <div className="absolute top-[42%] right-0 w-full h-[2px] -rotate-[18deg] overflow-hidden">
            <div className="shooting-star-2 h-[1px] w-[90px] rounded-full"
              style={{
                background: "linear-gradient(to left, transparent, rgba(255,255,255,0.85), rgba(197,160,101,0.4), transparent)",
                boxShadow: "0 0 8px rgba(255,255,255,0.5)",
              }}
            />
          </div>

          {/* Star 3 — slow long trail */}
          <div className="absolute top-[68%] left-0 w-full h-[2px] rotate-[12deg] overflow-hidden">
            <div className="shooting-star-3 h-[1px] w-[200px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, rgba(197,160,101,0.3), rgba(255,255,255,0.6), rgba(197,160,101,0.5), transparent)",
                boxShadow: "0 0 18px rgba(197,160,101,0.25)",
              }}
            />
          </div>

          {/* Star 4 — tiny quick */}
          <div className="absolute top-[28%] left-0 w-full h-[2px] rotate-[38deg] overflow-hidden">
            <div className="shooting-star-4 h-[1px] w-[55px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)",
                boxShadow: "0 0 4px rgba(255,255,255,0.4)",
              }}
            />
          </div>

          {/* Star 5 — gold dominant, mid */}
          <div className="absolute top-[55%] left-0 w-full h-[2px] rotate-[26deg] overflow-hidden">
            <div className="shooting-star-5 h-[1.5px] w-[110px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, #C5A065, #C5A065, rgba(255,255,255,0.7), transparent)",
                boxShadow: "0 0 20px rgba(197,160,101,0.5), 0 0 40px rgba(197,160,101,0.2)",
              }}
            />
          </div>

          {/* Star 6 — reverse diagonal */}
          <div className="absolute top-[12%] right-0 w-full h-[2px] -rotate-[32deg] overflow-hidden">
            <div className="shooting-star-6 h-[1px] w-[80px] rounded-full"
              style={{
                background: "linear-gradient(to left, transparent, rgba(255,255,255,0.5), #C5A065, transparent)",
                boxShadow: "0 0 10px rgba(197,160,101,0.4)",
              }}
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#C5A065]/12" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-[#C5A065]/12" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-[#C5A065]/12" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#C5A065]/12" />
        </motion.div>

        {/* Gold accent line at top */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A065] to-transparent z-30"
          style={{ width: accentWidth }}
        />

        {/* ========== THE PHRASE ========== */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
        >
          <div className="text-center">
            {/* "¿Cuánto cuesta" */}
            <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/90 leading-[1.05] mb-1">
              ¿Cuánto cuesta
            </h2>

            {/* "soñar?" */}
            <motion.div
              style={{ opacity: sonarOpacity, y: sonarY, scale: sonarScale }}
            >
              <span className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic text-[#C5A065] leading-[1.05]">
                soñar?
              </span>
            </motion.div>

            {/* Gold line */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A065] to-transparent mx-auto mt-10 origin-center"
              style={{ scaleX: lineScaleX, opacity: lineOpacity, width: "120px" }}
            />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.03, 0.8, 0.9], [0.5, 0.25, 0.25, 0]) }}
        >
          <span className="text-white/15 text-[7px] uppercase tracking-[0.5em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#C5A065]/0 to-[#C5A065]/25"
          />
        </motion.div>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: inherit; }
          50% { opacity: 0.02; }
        }
        @keyframes shootAcross {
          0% { transform: translateX(-250px); opacity: 0; }
          3% { opacity: 1; }
          28% { opacity: 1; }
          32% { transform: translateX(calc(100vw + 250px)); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes shootReverse {
          0% { transform: translateX(calc(100vw + 150px)); opacity: 0; }
          4% { opacity: 0.8; }
          22% { opacity: 0.8; }
          26% { transform: translateX(-250px); opacity: 0; }
          100% { opacity: 0; }
        }
        .shooting-star-1 { animation: shootAcross 7s ease-in-out 1s infinite; }
        .shooting-star-2 { animation: shootReverse 5s ease-in-out 4s infinite; }
        .shooting-star-3 { animation: shootAcross 9s ease-in-out 6s infinite; }
        .shooting-star-4 { animation: shootAcross 4s ease-in-out 9s infinite; }
        .shooting-star-5 { animation: shootAcross 6s ease-in-out 12s infinite; }
        .shooting-star-6 { animation: shootReverse 8s ease-in-out 3s infinite; }
      `}</style>
    </div>
  );
}
