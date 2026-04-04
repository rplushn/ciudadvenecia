"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicDivider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Parallax zoom on drone image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { scale: 1.0 },
          {
            scale: 1.3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // 2. Letterbox bars retract
      if (topBarRef.current) {
        gsap.fromTo(topBarRef.current,
          { scaleY: 1 },
          {
            scaleY: 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            }
          }
        );
      }
      if (bottomBarRef.current) {
        gsap.fromTo(bottomBarRef.current,
          { scaleY: 1 },
          {
            scaleY: 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            }
          }
        );
      }

      // 3. Words stagger reveal
      const validWords = wordsRef.current.filter(Boolean);
      if (validWords.length > 0) {
        gsap.fromTo(validWords,
          { y: 80, opacity: 0, rotateX: 40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              end: 'center center',
              scrub: false,
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // 4. Gold line draws across
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.inOut',
            duration: 1.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 30%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // 5. Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.8,
            delay: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 30%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = ['Descubre', 'donde', 'vive', 'tu', 'futuro'];

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* === DRONE VIDEO with parallax zoom === */}
      <div ref={imageRef} className="absolute inset-[-10%] will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/NUEVAS-JUANJOSE/cv_olancho_social_horizontal_web.mp4" type="video/mp4" />
        </video>
      </div>

      {/* === CINEMATIC OVERLAYS === */}
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />
      {/* Center darken for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* === LETTERBOX BARS === */}
      <div 
        ref={topBarRef}
        className="absolute top-0 left-0 right-0 h-[12vh] bg-[#0a0a0a] origin-top z-20"
      />
      <div 
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 right-0 h-[12vh] bg-[#0a0a0a] origin-bottom z-20"
      />

      {/* === FILM GRAIN OVERLAY === */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Words reveal */}
        <h2 
          className="font-serif-display text-white text-center leading-[1.1] mb-6"
          style={{ perspective: '600px' }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className={`inline-block mx-[0.3em] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light ${
                word === 'futuro' ? 'italic text-[#C5A065]' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Gold line */}
        <div 
          ref={lineRef}
          className="w-24 h-[1px] bg-[#C5A065] origin-left mb-6"
        />

        {/* Subtitle */}
        <div ref={subtitleRef} className="text-center">
          <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.5em]">
            Desarrollos residenciales · Honduras
          </p>
        </div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <div className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[8px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
