"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

interface Tile {
  image: string;
  title: string;
  subtitle: string;
}

const tiles: Tile[] = [
  {
    image: '/NUEVAS-JUANJOSE/cv_olancho_A003_web.jpg',
    title: 'Ciudad Venecia\nOlancho',
    subtitle: 'Nuestro proyecto premium'
  },
  {
    image: '/NUEVAS-JUANJOSE/cv_olancho_A001_horizontal_web.jpg',
    title: 'Diseño que\ninspira vida',
    subtitle: 'Arquitectura moderna'
  },
  {
    image: '/NUEVAS-JUANJOSE/cv_olancho_A002_horizontal_web.jpg',
    title: 'Plusvalía\ngarantizada',
    subtitle: 'Inversión inteligente'
  },
  {
    image: '/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/KIOSKO_PREFERIDO.jpg',
    title: 'Amenidades\nde primer nivel',
    subtitle: 'Espacios para disfrutar'
  },
  {
    image: '/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/SENDERO_PREFERIDO.jpg',
    title: 'Naturaleza\ny comunidad',
    subtitle: 'Vida al aire libre'
  },
];

export default function TileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentImgRef = useRef<HTMLImageElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);
  const titleCurrentRef = useRef<HTMLDivElement>(null);
  const titleNextRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const previewCurrentRef = useRef<HTMLImageElement>(null);
  const previewNextRef = useRef<HTMLImageElement>(null);
  const nextDetailsRef = useRef<HTMLDivElement>(null);
  const nextTitleCurrentRef = useRef<HTMLSpanElement>(null);
  const nextTitleNextRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const getNextIndex = useCallback((from?: number) => {
    const base = from !== undefined ? from : activeIndexRef.current;
    return (base + 1) % tiles.length;
  }, []);

  // Initialize images and text on mount
  useEffect(() => {
    const idx = activeIndexRef.current;
    const nextIdx = getNextIndex(idx);

    if (currentImgRef.current) currentImgRef.current.src = tiles[idx].image;
    if (nextImgRef.current) {
      nextImgRef.current.src = tiles[nextIdx].image;
      gsap.set(nextImgRef.current, { opacity: 0, scale: 1.15 });
    }
    if (previewCurrentRef.current) previewCurrentRef.current.src = tiles[nextIdx].image;
    if (previewNextRef.current) {
      previewNextRef.current.src = tiles[getNextIndex(nextIdx)].image;
      gsap.set(previewNextRef.current, { opacity: 0 });
    }
  }, [getNextIndex]);

  const handleNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const oldIdx = activeIndexRef.current;
    const newIdx = getNextIndex(oldIdx);
    const futureIdx = getNextIndex(newIdx);

    activeIndexRef.current = newIdx;
    setActiveIndex(newIdx);

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset for next transition
        if (currentImgRef.current) currentImgRef.current.src = tiles[newIdx].image;
        if (nextImgRef.current) {
          nextImgRef.current.src = tiles[futureIdx].image;
          gsap.set(nextImgRef.current, { opacity: 0, scale: 1.15 });
        }

        // Reset title
        if (titleContainerRef.current) gsap.set(titleContainerRef.current, { yPercent: 0 });
        if (titleCurrentRef.current) {
          titleCurrentRef.current.textContent = tiles[newIdx].title;
          gsap.set(titleCurrentRef.current, { opacity: 1 });
        }
        if (titleNextRef.current) titleNextRef.current.textContent = tiles[futureIdx].title;

        // Reset preview
        if (previewCurrentRef.current) {
          previewCurrentRef.current.src = tiles[futureIdx].image;
          gsap.set(previewCurrentRef.current, { opacity: 1 });
        }
        if (previewNextRef.current) {
          previewNextRef.current.src = tiles[getNextIndex(futureIdx)].image;
          gsap.set(previewNextRef.current, { opacity: 0 });
        }

        // Reset next button details
        if (nextDetailsRef.current) gsap.set(nextDetailsRef.current, { xPercent: 0 });
        if (nextTitleCurrentRef.current) {
          nextTitleCurrentRef.current.textContent = tiles[futureIdx].subtitle;
          gsap.set(nextTitleCurrentRef.current, { opacity: 1 });
        }
        if (nextTitleNextRef.current) {
          nextTitleNextRef.current.textContent = tiles[getNextIndex(futureIdx)].subtitle;
          gsap.set(nextTitleNextRef.current, { opacity: 0 });
        }

        isAnimating.current = false;
      }
    });

    // Title slide up + fade
    tl.to(titleContainerRef.current, { yPercent: -50, duration: 0.8, ease: 'power2.out' }, 0);
    tl.to(titleCurrentRef.current, { opacity: 0, duration: 0.5 }, 0);

    // Image crossfade
    tl.to(nextImgRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: 'sine.out' }, 0);

    // Next button slide out and back
    tl.to(nextDetailsRef.current, { xPercent: 80, duration: 0.6, ease: 'power1.out' }, 0);
    tl.to(previewCurrentRef.current, { opacity: 0, duration: 0.01 }, 0.55);
    tl.to(previewNextRef.current, { opacity: 1, duration: 0.6, ease: 'sine.out' }, 0.55);
    tl.to(nextDetailsRef.current, { xPercent: 0, duration: 0.5, ease: 'sine.out' }, 0.7);

    // Next button text swap
    tl.to(nextTitleCurrentRef.current, { opacity: 0, duration: 0.4 }, 0.7);
    tl.to(nextTitleNextRef.current, { opacity: 1, duration: 0.4 }, 0.7);

  }, [getNextIndex]);

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const nextIdx = getNextIndex(activeIndex);
  const futureIdx = getNextIndex(nextIdx);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#1A1A1A]">

      {/* === BACKGROUND TILES === */}
      <div className="absolute inset-0">
        {/* Current image */}
        <img
          ref={currentImgRef}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        />
        {/* Next image (hidden, fades in on transition) */}
        <img
          ref={nextImgRef}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        />
      </div>

      {/* === DARK OVERLAY === */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent" />

      {/* === TITLE === */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none z-10">
        <div ref={titleContainerRef} className="w-full">
          {/* Current title */}
          <div className="px-8 md:px-16 lg:px-24 mb-12">
            <div ref={titleCurrentRef} className="font-serif-display text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-light whitespace-pre-line">
              {tiles[activeIndex].title}
            </div>
          </div>
          {/* Next title (below, revealed on slide up) */}
          <div className="px-8 md:px-16 lg:px-24">
            <div ref={titleNextRef} className="font-serif-display text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-light whitespace-pre-line">
              {tiles[nextIdx].title}
            </div>
          </div>
        </div>
      </div>

      {/* === SUBTITLE BADGE === */}
      <div className="absolute bottom-32 md:bottom-24 left-8 md:left-16 lg:left-24 z-10">
        <span className="text-[#C5A065] text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium">
          {tiles[activeIndex].subtitle}
        </span>
      </div>

      {/* === SLIDE COUNTER === */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 z-10 flex items-center gap-3">
        <span className="text-white text-sm font-light tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <div className="w-12 h-[1px] bg-white/30 relative">
          <div 
            className="h-full bg-[#C5A065] transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / tiles.length) * 100}%` }}
          />
        </div>
        <span className="text-white/40 text-sm font-light tabular-nums">
          {String(tiles.length).padStart(2, '0')}
        </span>
      </div>

      {/* === NEXT BUTTON === */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 group cursor-pointer"
        aria-label="Siguiente proyecto"
      >
        <div ref={nextDetailsRef} className="flex items-stretch h-[200px] md:h-[260px]">
          {/* Info panel */}
          <div className="bg-white/95 backdrop-blur-sm w-[160px] md:w-[200px] flex flex-col justify-between p-5 md:p-6">
            <span className="text-[#1A1A1A]/40 text-[10px] uppercase tracking-[0.3em]">
              Siguiente
            </span>
            <div className="relative">
              <span 
                ref={nextTitleCurrentRef}
                className="text-[#1A1A1A] text-sm md:text-base font-serif-display leading-tight block"
              >
                {tiles[nextIdx].subtitle}
              </span>
              <span 
                ref={nextTitleNextRef}
                className="text-[#1A1A1A] text-sm md:text-base font-serif-display leading-tight absolute top-0 left-0 opacity-0"
              >
                {tiles[futureIdx].subtitle}
              </span>
            </div>
            {/* Arrow */}
            <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
              <div className="w-8 h-[1px] bg-[#C5A065]" />
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-[#C5A065]">
                <path d="M10 1L15 6M15 6L10 11M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* Preview image */}
          <div className="w-[100px] md:w-[130px] relative overflow-hidden">
            <img
              ref={previewCurrentRef}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img
              ref={previewNextRef}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </button>

      {/* === DOT INDICATORS === */}
      <div className="absolute right-8 md:right-[calc(200px+130px+2rem)] bottom-8 z-10 flex gap-2">
        {tiles.map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === activeIndex ? 'bg-[#C5A065] scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
