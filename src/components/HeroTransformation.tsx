"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurText from "./BlurText"; // Reutilizamos tu componente de texto

export default function HeroTransformation() {
  const [isRevealed, setIsRevealed] = useState(false);

  // Auto-reveal effect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary">
      
      {/* CAPA 1: EL PLANO (FONDO) */}
      {/* Usamos una imagen de plano arquitectónico (blueprint) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop')" }} 
      >
         {/* Overlay azul blueprint */}
         <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply" />
      </div>

      {/* CAPA 2: LA REALIDAD (RENDER) - MÁSCARA ANIMADA */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        animate={{ clipPath: isRevealed ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-e32c21216f53?q=80&w=2074&auto=format&fit=crop')" }}
      >
        {/* Overlay sutil para legibilidad */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* BARRA DE ESCANEO (Efecto decorativo) */}
      <motion.div
        initial={{ left: "0%" }}
        animate={{ left: isRevealed ? "100%" : "0%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-1 bg-accent/50 z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
      />

      {/* CONTENIDO DE TEXTO (Encima de todo) */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="overflow-hidden">
             <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="text-accent uppercase tracking-[0.3em] font-bold mb-4"
             >
               Del Papel a la Realidad
             </motion.p>
        </div>
        
        <BlurText
          text="CIUDAD VENECIA"
          delay={150}
          animateBy="letters"
          direction="top"
          className="font-display text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl justify-center"
        />

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 3 }}
           className="mt-8"
        >
          <button className="bg-white text-primary px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300">
            Conocer Proyecto
          </button>
        </motion.div>
      </div>
    </section>
  );
}
