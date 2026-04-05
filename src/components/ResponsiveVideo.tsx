"use client";

import { useRef, useState, useEffect } from 'react';

interface ResponsiveVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function ResponsiveVideo({
  src,
  poster,
  className = 'w-full h-full object-cover',
}: ResponsiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  // Lazy load: only load video when scrolled into view (desktop only)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      {/* MOBILE: Always show static image, never load video */}
      <div className="block md:hidden w-full h-full">
        {poster ? (
          <img src={poster} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A]" />
        )}
      </div>

      {/* DESKTOP: Lazy-loaded video */}
      <div className="hidden md:block w-full h-full">
        {loadVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : poster ? (
          <img src={poster} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A]" />
        )}
      </div>
    </div>
  );
}
