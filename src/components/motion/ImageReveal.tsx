"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  /** Dirección de la "cortina": left, right, up, down */
  direction?: "left" | "right" | "up" | "down";
  /** Duración de la animación (segundos) */
  duration?: number;
  /** Delay antes de empezar (segundos) */
  delay?: number;
  /** Color de la cortina que se desliza */
  overlayColor?: string;
}

/**
 * ImageReveal — Imagen que se descubre con efecto de cortina premium.
 * 
 * Uso:
 *   <ImageReveal 
 *     src="/homepage/casa_fachada.jpg.jpeg" 
 *     alt="Casa" 
 *     className="w-full h-[500px]"
 *     direction="left"
 *   />
 */
export default function ImageReveal({
  src,
  alt,
  className = "",
  direction = "left",
  duration = 1.2,
  delay = 0,
  overlayColor = "#C5A065",
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  // Clip-path values based on direction
  const getClipPath = () => {
    switch (direction) {
      case "left":
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0% 0 0)",
        };
      case "right":
        return {
          hidden: "inset(0 0 0 100%)",
          visible: "inset(0 0 0 0%)",
        };
      case "up":
        return {
          hidden: "inset(0 0 100% 0)",
          visible: "inset(0 0 0% 0)",
        };
      case "down":
        return {
          hidden: "inset(100% 0 0 0)",
          visible: "inset(0% 0 0 0)",
        };
    }
  };

  // Overlay slide direction
  const getOverlayAnimation = () => {
    switch (direction) {
      case "left":
        return { initial: { x: "-100%" }, animate: { x: "100%" } };
      case "right":
        return { initial: { x: "100%" }, animate: { x: "-100%" } };
      case "up":
        return { initial: { y: "100%" }, animate: { y: "-100%" } };
      case "down":
        return { initial: { y: "-100%" }, animate: { y: "100%" } };
    }
  };

  const clipPath = getClipPath();
  const overlay = getOverlayAnimation();

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Imagen con clip-path */}
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: clipPath.hidden }}
        animate={isInView ? { clipPath: clipPath.visible } : { clipPath: clipPath.hidden }}
        transition={{
          duration: duration,
          delay: delay + 0.3,
          ease: [0.25, 0.8, 0.25, 1],
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.3 }}
          animate={isInView ? { scale: 1 } : { scale: 1.3 }}
          transition={{
            duration: duration + 0.5,
            delay: delay + 0.3,
            ease: [0.25, 0.8, 0.25, 1],
          }}
        />
      </motion.div>

      {/* Cortina de color que se desliza */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
        initial={overlay.initial}
        animate={isInView ? overlay.animate : overlay.initial}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.8, 0.25, 1],
        }}
      />
    </div>
  );
}