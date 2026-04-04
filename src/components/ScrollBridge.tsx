"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

export default function ScrollBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Trigger counter animation when section enters view
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.02 && !hasAnimated) {
      setHasAnimated(true);
      const target = 1200;
      const duration = 2500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  });

  // ============================================
  // PHASE: Social proof (5% - 80%)
  // ============================================
  const answerOpacity = useTransform(scrollYProgress, [0.03, 0.10, 0.70, 0.80], [0, 1, 1, 0]);
  const answerY = useTransform(scrollYProgress, [0.03, 0.10, 0.70, 0.80], [50, 0, -20, -60]);
  const answerScale = useTransform(scrollYProgress, [0.03, 0.10], [0.9, 1]);

  // Gold line draws
  const lineScaleX = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.70, 0.78], [0, 1, 1, 0]);

  // Supporting text
  const supportOpacity = useTransform(scrollYProgress, [0.12, 0.20, 0.70, 0.78], [0, 1, 1, 0]);
  const supportY = useTransform(scrollYProgress, [0.12, 0.20], [20, 0]);

  // ============================================
  // PHASE 3: Fade out (65% - 100%)
  // ============================================
  const bgOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  // Nebula glow movement
  const nebula1X = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const nebula1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const nebula2X = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const nebula2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Top accent
  const accentWidth = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], ["0%", "100%", "100%", "0%"]);

  // Generate starfield positions deterministically
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: ((i * 17 + 31) % 100),
    y: ((i * 23 + 47) % 100),
    size: (i % 5 === 0) ? 2 : (i % 3 === 0) ? 1.5 : 1,
    delay: (i * 0.3) % 4,
    duration: 2 + (i % 3),
  }));

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* BG — fades to reveal Precios */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ opacity: bgOpacity, background: "#0a0a0a" }}
        />

        {/* Family photo background — subtle */}
        <motion.div
          className="absolute inset-0 z-[11]"
          style={{ opacity: bgOpacity }}
        >
          <img 
            src="/amenidades/familia_homepage.jpg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-[0.50]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/25 to-[#0a0a0a]/10" />
        </motion.div>

        {/* ============================================ */}
        {/* STARFIELD + ATMOSPHERE */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{ opacity: bgOpacity }}
        >
          {/* Golden nebula glow 1 */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(197,160,101,0.08) 0%, transparent 70%)",
              top: "15%",
              left: "20%",
              x: nebula1X,
              y: nebula1Y,
              filter: "blur(80px)",
            }}
          />

          {/* Golden nebula glow 2 */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(197,160,101,0.06) 0%, transparent 70%)",
              bottom: "20%",
              right: "15%",
              x: nebula2X,
              y: nebula2Y,
              filter: "blur(60px)",
            }}
          />

          {/* Starfield */}
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.size > 1.5 ? 0.4 : star.size > 1 ? 0.2 : 0.1,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {/* ============================================ */}
          {/* SHOOTING STARS — 6 total, varied */}
          {/* ============================================ */}

          {/* Star 1 — long, gold, top-left */}
          <div className="absolute top-[20%] left-0 w-full h-[1px] rotate-[25deg] overflow-hidden">
            <div
              className="h-[1.5px] w-[120px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, #C5A065, rgba(255,255,255,0.9), transparent)",
                boxShadow: "0 0 12px rgba(197,160,101,0.6), 0 0 30px rgba(197,160,101,0.3)",
                animation: "shootingStar1 6s ease-in-out infinite",
              }}
            />
          </div>

          {/* Star 2 — fast, white, right side */}
          <div className="absolute top-[45%] right-0 w-full h-[1px] -rotate-[20deg] overflow-hidden">
            <div
              className="h-[1px] w-[80px] rounded-full"
              style={{
                background: "linear-gradient(to left, transparent, rgba(255,255,255,0.8), rgba(197,160,101,0.5), transparent)",
                boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                animation: "shootingStar2 4s ease-in-out 2s infinite",
              }}
            />
          </div>

          {/* Star 3 — slow, long trail */}
          <div className="absolute top-[70%] left-0 w-full h-[1px] rotate-[15deg] overflow-hidden">
            <div
              className="h-[1px] w-[180px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, rgba(197,160,101,0.4), rgba(255,255,255,0.7), transparent)",
                boxShadow: "0 0 15px rgba(197,160,101,0.3)",
                animation: "shootingStar3 8s ease-in-out 4s infinite",
              }}
            />
          </div>

          {/* Star 4 — tiny, quick */}
          <div className="absolute top-[30%] left-0 w-full h-[1px] rotate-[35deg] overflow-hidden">
            <div
              className="h-[1px] w-[50px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)",
                animation: "shootingStar4 3.5s ease-in-out 7s infinite",
              }}
            />
          </div>

          {/* Star 5 — medium, gold dominant */}
          <div className="absolute top-[55%] left-0 w-full h-[1px] rotate-[28deg] overflow-hidden">
            <div
              className="h-[1.5px] w-[100px] rounded-full"
              style={{
                background: "linear-gradient(to right, transparent, #C5A065, #C5A065, transparent)",
                boxShadow: "0 0 20px rgba(197,160,101,0.5)",
                animation: "shootingStar5 5s ease-in-out 10s infinite",
              }}
            />
          </div>

          {/* Star 6 — diagonal cross */}
          <div className="absolute top-[15%] right-0 w-full h-[1px] -rotate-[30deg] overflow-hidden">
            <div
              className="h-[1px] w-[90px] rounded-full"
              style={{
                background: "linear-gradient(to left, transparent, rgba(255,255,255,0.6), rgba(197,160,101,0.8), transparent)",
                boxShadow: "0 0 10px rgba(197,160,101,0.4)",
                animation: "shootingStar6 7s ease-in-out 3s infinite",
              }}
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#C5A065]/15" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-[#C5A065]/15" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-[#C5A065]/15" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#C5A065]/15" />
        </motion.div>

        {/* Gold accent line at top */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A065] to-transparent z-30"
          style={{ width: accentWidth }}
        />


        {/* ============================================ */}
        {/* PHASE 2: THE ANSWER */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
          style={{
            opacity: answerOpacity,
            y: answerY,
            scale: answerScale,
          }}
        >
          <div className="text-center max-w-4xl">
            {/* The Big Number */}
            <div className="mb-4">
              <span className="font-serif-display text-[100px] sm:text-[130px] md:text-[160px] lg:text-[200px] text-white leading-none tracking-tight">
                +{count.toLocaleString()}
              </span>
            </div>

            {/* Label */}
            <h3 className="font-serif-display text-3xl md:text-5xl text-white/80 mb-4 font-light">
              familias ya viven{' '}
              <span className="italic text-[#C5A065]">su sueño</span>
            </h3>

            {/* Gold line */}
            <motion.div
              className="h-[1px] bg-[#C5A065] mx-auto mb-8 origin-center"
              style={{ scaleX: lineScaleX, opacity: lineOpacity, width: "100px" }}
            />

            {/* The hook */}
            <motion.div style={{ opacity: supportOpacity, y: supportY }}>
              <p className="font-serif-display text-xl md:text-2xl text-[#C5A065] italic">
                La tuya puede ser la siguiente.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.7, 0.8], [0.6, 0.3, 0.3, 0]),
          }}
        >
          <span className="text-white/20 text-[8px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#C5A065]/0 to-[#C5A065]/30"
          />
        </motion.div>

      </div>

      {/* CSS Keyframes for shooting stars */}
      <style jsx>{`
        @keyframes shootingStar1 {
          0%, 100% { transform: translateX(-200px); opacity: 0; }
          5% { opacity: 1; }
          30% { opacity: 1; }
          35% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
          36%, 100% { opacity: 0; }
        }
        @keyframes shootingStar2 {
          0%, 100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
          5% { opacity: 0.8; }
          25% { opacity: 0.8; }
          30% { transform: translateX(-200px); opacity: 0; }
          31%, 100% { opacity: 0; }
        }
        @keyframes shootingStar3 {
          0%, 100% { transform: translateX(-300px); opacity: 0; }
          3% { opacity: 0.6; }
          20% { opacity: 0.6; }
          25% { transform: translateX(calc(100vw + 300px)); opacity: 0; }
          26%, 100% { opacity: 0; }
        }
        @keyframes shootingStar4 {
          0%, 100% { transform: translateX(-100px); opacity: 0; }
          8% { opacity: 0.9; }
          35% { opacity: 0.9; }
          40% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
          41%, 100% { opacity: 0; }
        }
        @keyframes shootingStar5 {
          0%, 100% { transform: translateX(-200px); opacity: 0; }
          4% { opacity: 0.7; }
          22% { opacity: 0.7; }
          28% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
          29%, 100% { opacity: 0; }
        }
        @keyframes shootingStar6 {
          0%, 100% { transform: translateX(calc(100vw + 150px)); opacity: 0; }
          5% { opacity: 0.5; }
          18% { opacity: 0.5; }
          22% { transform: translateX(-200px); opacity: 0; }
          23%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
