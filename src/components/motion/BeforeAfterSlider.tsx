'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!isDragging) {
      setPosition(v * 100);
    }
  });

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percent);
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragRef.current = true;
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      dragRef.current = true;
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragRef.current) return;
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    dragRef.current = false;
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragRef.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    const tm = (e: TouchEvent) => {
      if (dragRef.current) {
        e.preventDefault();
        handleTouchMove(e);
      }
    };
    window.addEventListener('touchmove', tm, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={scrollContainerRef} style={{ height: '250vh' }}>
      <div className="sticky top-[15vh]">
    <div
      ref={containerRef}
      className="relative aspect-video rounded-lg overflow-hidden max-w-5xl mx-auto select-none"
    >
      {/* After image (full, bottom layer) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Before image (clipped by position) */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 bg-black/60 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 bg-black/60 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
        {afterLabel}
      </div>

      {/* Divider line and handle */}
      <div
        className="absolute top-0 bottom-0 z-30 w-0 flex items-center justify-center"
        style={{ left: `${position}%` }}
      >
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2 shadow-md" />

        {/* Handle */}
        <div
          className="relative w-12 h-12 rounded-full bg-white border-2 border-[#C5A065] shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center -translate-x-1/2"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="text-[#C5A065] shrink-0"
          >
            <path d="M14 8l-4 6 4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 8l4 6-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
