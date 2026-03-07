"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CurtainHeroProps {
  children: React.ReactNode;
}

export default function CurtainHero({ children }: CurtainHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Las dos mitades se separan entre 0% y 50% del scroll del contenedor
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="/Clip2.mp4"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {/* Mitad izquierda */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full overflow-hidden z-30"
          style={{ x: leftX }}
        >
          <div className="w-[200%] h-full">
            {children}
          </div>
        </motion.div>

        {/* Mitad derecha */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-30"
          style={{ x: rightX }}
        >
          <div className="w-[200%] h-full -translate-x-1/2">
            {children}
          </div>
        </motion.div>

        {/* Línea central divisora (sutil, aparece al empezar scroll) */}
        <motion.div
          className="absolute top-0 left-1/2 w-[2px] h-full bg-transparent z-40 -translate-x-1/2"
          style={{ opacity }}
        />
      </div>
    </div>
  );
}
