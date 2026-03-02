"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Intensidad del parallax: qué tanto se mueve la imagen (px) */
  offset?: number;
  /** Zoom adicional al hacer scroll */
  scaleRange?: [number, number];
  /** Contenido hijo (overlay text, badges, etc.) */
  children?: React.ReactNode;
}

/**
 * ParallaxImage — Imagen con efecto parallax al hacer scroll.
 * La imagen se mueve ligeramente al scrollear, creando profundidad.
 * 
 * Uso simple:
 *   <ParallaxImage 
 *     src="/homepage/casa_fachada.jpg.jpeg" 
 *     alt="Casa" 
 *     className="h-[500px]"
 *   />
 * 
 * Uso con overlay (ej: cards de proyectos):
 *   <ParallaxImage src="/img.jpg" alt="Proyecto" className="aspect-[4/3]">
 *     <div className="absolute bottom-6 left-6 z-20">
 *       <h4 className="text-white font-bold">Ciudad Venecia Danlí</h4>
 *     </div>
 *   </ParallaxImage>
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  offset = 50,
  scaleRange = [1.1, 1],
  children,
}: ParallaxImageProps) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // La imagen se mueve de -offset a +offset al scrollear
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
        style={{ y, scale }}
      />
      {/* Overlay content (children) */}
      {children}
    </div>
  );
}