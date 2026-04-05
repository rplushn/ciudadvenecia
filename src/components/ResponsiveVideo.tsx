"use client";

import { useEffect, useRef, useState } from 'react';

interface ResponsiveVideoProps {
  src: string;
  poster?: string;
  className?: string;
  mobileBreakpoint?: number;
}

export default function ResponsiveVideo({
  src,
  poster,
  className = 'w-full h-full object-cover',
  mobileBreakpoint = 768,
}: ResponsiveVideoProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < mobileBreakpoint);
  }, [mobileBreakpoint]);

  // IntersectionObserver — only load video when in viewport
  useEffect(() => {
    if (isMobile || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div ref={containerRef} className={className}>
      {isMobile ? (
        // Mobile: static image, no video download
        poster ? (
          <img src={poster} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A]" />
        )
      ) : isVisible ? (
        // Desktop: lazy-loaded video
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // Desktop but not visible yet: placeholder
        poster ? (
          <img src={poster} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A]" />
        )
      )}
    </div>
  );
}
