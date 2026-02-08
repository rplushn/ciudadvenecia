"use client";

import { motion } from 'framer-motion';

export default function PromoSection() {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      
      {/* 1. Cinematic Background with Parallax feel (Fixed attachment) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053')",
        }}
      />

      {/* 2. Modern Gradient Overlay (Not just flat green) */}
      {/* Goes from dark at bottom to transparent, with a touch of brand green */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-black/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-success/20 mix-blend-overlay" /> {/* Subtle brand tint */}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Huge Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-6 drop-shadow-lg">
              CONSTRUYENDO <br />
              <span className="text-accent">TU FUTURO</span>
            </h2>
            <p className="text-lg text-gray-200 font-light max-w-lg leading-relaxed drop-shadow-md border-l-2 border-accent pl-6">
              Ubicado estratégicamente en Tegucigalpa, Ciudad Venecia ofrece
              un entorno seguro, moderno y accesible para tu familia.
            </p>
          </motion.div>

          {/* Right: Glassmorphism Stats Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Stat Card 1 */}
            <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/10 border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 rounded-none shadow-2xl">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">300+</div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Lotes Disponibles</div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/10 border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 rounded-none shadow-2xl sm:translate-y-8">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Seguridad Total</div>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div variants={itemVariants} className="sm:col-span-2 backdrop-blur-md bg-accent/90 border border-accent p-8 hover:bg-accent transition-all duration-300 rounded-none shadow-2xl flex items-center justify-between group cursor-pointer mt-4">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">100%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/80 font-bold">Financiamiento</div>
              </div>
              <svg className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
