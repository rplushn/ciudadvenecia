"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface GridRevealHeroProps {
  /** URL de la imagen de fondo */
  imageSrc: string;
  /** Columnas del grid (más = más detalle, más lento) */
  cols?: number;
  /** Filas del grid */
  rows?: number;
  /** Duración de cada tile (segundos) */
  tileDuration?: number;
  /** Delay entre tiles (segundos) */
  staggerDelay?: number;
  /** Dirección del reveal: "bottomRight" empieza abajo-derecha, "topLeft" empieza arriba-izquierda */
  direction?: "bottomRight" | "topLeft" | "center" | "random";
  /** Color de fondo antes del reveal */
  bgColor?: string;
  /** Contenido dentro del hero (título, botones, etc.) */
  children?: React.ReactNode;
  /** Clase CSS del contenedor */
  className?: string;
}

/**
 * GridRevealHero — Efecto de cuadrícula que revela la imagen tile por tile.
 * Inspirado en Terrasoles Residencial.
 * 
 * Uso:
 *   <GridRevealHero 
 *     imageSrc="/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.png"
 *     cols={8}
 *     rows={5}
 *     direction="bottomRight"
 *   >
 *     <h1>Tu título aquí</h1>
 *   </GridRevealHero>
 */
export default function GridRevealHero({
  imageSrc,
  cols = 8,
  rows = 5,
  tileDuration = 0.8,
  staggerDelay = 0.06,
  direction = "bottomRight",
  bgColor = "#1A1A1A",
  children,
  className = "",
}: GridRevealHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const totalTiles = cols * rows;

  // Preload image before starting animation
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      // Small delay so the page is settled
      setTimeout(() => setIsLoaded(true), 200);
    };
    // Fallback if image takes too long
    const timeout = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, [imageSrc]);

  // Calculate stagger delay for each tile based on direction
  const getDelay = (row: number, col: number): number => {
    switch (direction) {
      case "bottomRight": {
        // Starts from bottom-right corner, reveals toward top-left
        const maxDist = (rows - 1) + (cols - 1);
        const dist = (rows - 1 - row) + (cols - 1 - col);
        return (maxDist - dist) * staggerDelay;
      }
      case "topLeft": {
        // Starts from top-left corner
        const dist = row + col;
        return dist * staggerDelay;
      }
      case "center": {
        // Starts from center, radiates outward
        const centerRow = (rows - 1) / 2;
        const centerCol = (cols - 1) / 2;
        const dist = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
        return dist * staggerDelay;
      }
      case "random": {
        // Random delays for a scattered feel
        return Math.random() * (totalTiles * staggerDelay * 0.5);
      }
      default:
        return 0;
    }
  };

  return (
    <section className={`relative h-screen w-full overflow-hidden ${className}`} id="start">
      {/* Background color shown before reveal */}
      <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />

      {/* Grid of tiles - each tile shows a portion of the background image */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const delay = getDelay(row, col);

          return (
            <motion.div
              key={index}
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={
                isLoaded
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.2 }
              }
              transition={{
                duration: tileDuration,
                delay: delay,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              {/* 
                Each tile shows the SAME background image, but positioned
                so that all tiles together form the complete image.
                This is the trick — each tile is a "window" into the full image.
              */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Dark overlay on top of revealed image */}
      <motion.div
        className="absolute inset-0 bg-[#1A1A1A]/30 pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: .5, delay: totalTiles * staggerDelay * 0.1 }}
      />

      {/* Content (title, buttons, etc.) — fades in AFTER grid reveal */}
      <motion.div
        className="relative z-20 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 1,
          delay: totalTiles * staggerDelay * 0.20,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}