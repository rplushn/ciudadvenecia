"use client";

import { useState } from 'react';
import BlurText from './BlurText';

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Temporary Background Image (replace with your image) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')",
          filter: isVideoLoaded ? 'opacity(0)' : 'opacity(1)',
          transition: 'opacity 1s ease-in-out'
        }}
      />

      {/* Video Background (using Clip 1.mp4 from public folder) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/Clip 1.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-accent uppercase tracking-widest text-xs md:text-sm font-bold mb-4 block">
          SOMOS EL PROYECTO LÍDER DE LA ZONA ORIENTAL
        </span>
        <BlurText
          text="CIUDAD VENECIA"
          delay={150}
          animateBy="letters"
          direction="top"
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-white uppercase tracking-tighter mb-4 drop-shadow-2xl justify-center"
        />
        <p className="text-lg md:text-2xl text-white/90 max-w-2xl mb-8 font-light">
          Un desarrollo inmobiliario <span className="text-accent font-semibold">by INMAER</span>,
          con urbanización completa, seguridad y opciones de financiamiento para avanzar a tu ritmo.
        </p>
        <button className="bg-primary hover:bg-accent text-white font-semibold px-8 py-4 uppercase tracking-wider transition-all duration-200 hover:-translate-y-1">
          Conocer más
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
