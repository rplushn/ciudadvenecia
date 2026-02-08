"use client";

import { useEffect, useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

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

      {/* Video Background (uncomment when you have the drone video) */}
      {/*
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/videos/drone-video.mp4" type="video/mp4" />
      </video>
      */}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
        <RevealOnScroll delay={0}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight mb-6 drop-shadow-2xl">
            Ciudad Venecia
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mb-8 font-light drop-shadow-md">
            El desarrollo residencial que transforma tu estilo de vida
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <button className="bg-primary hover:bg-accent text-white font-semibold px-8 py-4 uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
            Conocer más
          </button>
        </RevealOnScroll>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-80">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
