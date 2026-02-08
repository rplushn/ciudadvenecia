"use client";

import { motion } from 'framer-motion';

export default function PromoSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A1A12]"> {/* Deep Forest Green Background */}
      
      {/* 1. Video/Texture Background (Subtle Motion) */}
      {/* Using a high-quality nature video as texture, very darkened */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover grayscale"
        >
          {/* Using a placeholder nature video url, replace with local optimized video if needed */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-leaves-of-a-tree-moving-in-the-wind-1162-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Grainy Texture Overlay for "Film" look */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* Elegant Small Header */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-accent text-xs md:text-sm uppercase tracking-[0.3em] mb-6 font-bold"
        >
          Exclusividad & Naturaleza
        </motion.span>

        {/* Main Title - Refined Size, Serif/Display Mix */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-display text-4xl md:text-5xl text-white font-medium mb-12 leading-tight"
        >
          Donde el diseño moderno <br />
          abraza el <span className="italic text-white/80 font-serif">entorno natural</span>.
        </motion.h2>

        {/* Minimalist Stats Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        {/* Sophisticated Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {[
            { num: "300+", label: "Lotes Premium" },
            { num: "24/7", label: "Seguridad Privada" },
            { num: "100%", label: "Financiamiento Propio" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.2), duration: 0.8 }}
              className="flex flex-col items-center group"
            >
              <span className="text-3xl md:text-4xl font-display text-white mb-2 group-hover:text-accent transition-colors duration-500">
                {item.num}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
