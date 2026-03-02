"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TextRevealProps {
  children: string;
  className?: string;
  /** Delay antes de empezar la animación (segundos) */
  delay?: number;
  /** Duración de cada palabra (segundos) */
  duration?: number;
  /** Delay entre cada palabra (segundos) */
  staggerDelay?: number;
  /** Tag HTML a usar */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * TextReveal — Revela texto palabra por palabra con efecto premium.
 * 
 * Uso:
 *   <TextReveal as="h2" className="font-serif-display text-5xl text-[#2C2C2C]">
 *     Terrenos residenciales dentro del nuevo Oriente
 *   </TextReveal>
 */
export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.04,
  as: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = children.split(" ");

  // Motion variants
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.25, 0.8, 0.25, 1], // cubic-bezier premium
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", justifyContent: "center" }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            variants={wordVariant}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}