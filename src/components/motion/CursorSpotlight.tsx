"use client";

import { useState, useRef, useCallback } from "react";

interface CursorSpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  radius?: number;
  intensity?: number;
}

export default function CursorSpotlight({
  children,
  className = "",
  color = "rgba(255, 255, 255, 0.07)",
  radius = 350,
  intensity = 1,
}: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovering ? intensity : 0,
          background: `radial-gradient(${radius}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}