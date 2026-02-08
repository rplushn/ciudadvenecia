'use client';
import { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400 | 500;
  width?: 'full' | 'auto';
}

export default function RevealOnScroll({ 
  children, 
  className = "", 
  delay = 0,
  width = 'auto' 
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solo activar cuando entra en pantalla
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Dejar de observar una vez que ya se animó
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.15, // Activar cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Offset para que no se active justo en el borde inferior
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Construir clases de animación
  const baseClasses = `transition-all duration-1000 ease-out ${width === 'full' ? 'w-full' : ''}`;
  const animationClasses = isVisible 
    ? `reveal-active delay-${delay}` 
    : 'reveal-hidden';

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${animationClasses} ${className}`}
    >
      {children}
    </div>
  );
}
