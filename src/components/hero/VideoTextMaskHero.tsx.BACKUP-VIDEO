"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoTextMaskHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.vhero-brand', { opacity: 0, scale: 1.1, duration: 2, delay: 0.3 })
        .from('.vhero-tagline', { opacity: 0, y: 18, duration: 1 }, '-=1')
        .from('.vhero-sub', { opacity: 0, y: 12, duration: 0.8 }, '-=0.6')
        .from('.vhero-scroll', { opacity: 0, duration: 0.8 }, '-=0.4');

      // Parallax zoom on scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          scale: 1.2,
          opacity: 0,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: '#0a0a0a', zIndex: 10 }}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/Clip1.mp4" type="video/mp4" />
      </video>

      {/* Text overlay con mix-blend-mode: screen = VIDEO INSIDE TEXT */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ background: '#0a0a0a', mixBlendMode: 'screen', zIndex: 2 }}
      >
        <h1
          className="vhero-brand font-serif-display text-white text-center uppercase leading-[0.95]"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 13rem)',
            letterSpacing: '0.15em',
            fontWeight: 400,
          }}
        >
          Ciudad<br />Venecia
        </h1>
        <p
          className="vhero-tagline text-white mt-7"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(0.55rem, 0.9vw, 0.8rem)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            fontWeight: 300,
            opacity: 0.6,
          }}
        >
          Vivir Como Soñaste
        </p>
        <p
          className="vhero-sub text-white mt-2"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(0.45rem, 0.65vw, 0.6rem)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontWeight: 500,
            opacity: 0.35,
          }}
        >
          Desarrollos Residenciales · Honduras
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="vhero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 500,
          }}
        >
          Descubrí
        </span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="absolute left-0 w-full h-full"
            style={{
              background: 'rgba(255,255,255,0.5)',
              animation: 'heroScrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes heroScrollLine {
            0% { top: -100%; }
            50% { top: 0%; }
            100% { top: 100%; }
          }
        `}</style>
      </div>
    </section>
  );
}
