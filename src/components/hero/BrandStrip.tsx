"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { name: 'Danlí', active: true },
  { name: 'Olancho', active: true },
  { name: 'Talanga', active: true },
  { name: 'San Lorenzo', active: true },
  { name: 'Guaimaca', active: false },
  { name: 'Tegucigalpa', active: false },
];

export default function BrandStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bstrip-statement', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 45, duration: 1, ease: 'power3.out',
      });
      gsap.from('.bstrip-badge', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power3.out',
      });
      gsap.from('.bstrip-dot', {
        scrollTrigger: { trigger: '.bstrip-cities', start: 'top 80%' },
        opacity: 0, y: 15, stagger: 0.07, duration: 0.5, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="text-center relative"
      style={{ background: '#0a0a0a', color: '#F3F0EB', padding: '6rem 4vw' }}
    >
      {/* Top line accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: '50px',
          background: 'linear-gradient(to bottom, transparent, rgba(197,160,101,0.2))',
        }}
      />

      <p
        className="bstrip-statement font-serif-display italic"
        style={{
          fontSize: 'clamp(1.3rem, 2.6vw, 2.4rem)',
          fontWeight: 300,
          lineHeight: 1.55,
          maxWidth: '680px',
          margin: '0 auto 2.5rem',
          opacity: 0.85,
        }}
      >
        Creamos comunidades residenciales donde la naturaleza,
        la infraestructura y el bienestar familiar se encuentran.
      </p>

      <p
        className="bstrip-badge"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          opacity: 0.35,
          marginBottom: '2.5rem',
          fontWeight: 500,
        }}
      >
        Una creación de{' '}
        <strong style={{ color: '#C5A065', opacity: 1, fontWeight: 700 }}>INMAER</strong>{' '}
        Real Estate · +10 años de experiencia
      </p>

      <div className="bstrip-cities flex justify-center gap-10 flex-wrap">
        {cities.map((city) => (
          <div key={city.name} className="bstrip-dot flex flex-col items-center gap-2 cursor-default group">
            <div
              className="w-[5px] h-[5px] rounded-full transition-all"
              style={{
                background: city.active ? '#C5A065' : 'rgba(255,255,255,0.15)',
                boxShadow: city.active ? '0 0 8px rgba(197,160,101,0.4)' : 'none',
              }}
            />
            <span
              className="transition-opacity group-hover:opacity-80"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 500,
                opacity: city.active ? 0.75 : 0.3,
                color: city.active ? '#C5A065' : 'inherit',
              }}
            >
              {city.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
