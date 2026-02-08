"use client";

import { motion } from 'framer-motion';

export default function HeroVideo() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1600596542815-e32c21216f53?q=80&w=2074&auto=format&fit=crop"
      >
        <source src="/HERO2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-semibold uppercase tracking-tighter mb-4 drop-shadow-2xl">
            <span className="text-white font-light">CIUDAD</span> <span className="text-[#C8CAD0] font-bold">VENECIA</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-3xl text-white/90 font-light tracking-wide mb-10"
        >
          Tu hogar en Tegucigalpa
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={scrollToNextSection}
          className="group relative px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
        >
          <span className="relative z-10">Conoce más</span>
        </motion.button>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20"
        onClick={scrollToNextSection}
      >
        <svg className="w-8 h-8 text-white/80 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
