"use client";
import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  onAnimationComplete,
}: {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  // Default animations based on direction
  const fromStyle = direction === 'top'
    ? { filter: 'blur(10px)' as const, opacity: 0, transform: 'translate3d(0,-50px,0)' }
    : { filter: 'blur(10px)' as const, opacity: 0, transform: 'translate3d(0,50px,0)' };

  const toStyle = { filter: 'blur(0px)' as const, opacity: 1, transform: 'translate3d(0,0,0)' };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [springs] = useSprings(
    elements.length,
    (i) => ({
      from: fromStyle,
      to: inView
        ? async (next: (arg: typeof toStyle) => Promise<void>) => {
            await next(toStyle);
            animatedCount.current += 1;
            if (animatedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }
        : fromStyle,
      delay: i * delay,
      config: { mass: 5, tension: 2000, friction: 200 },
    }),
    [inView]
  );

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {springs.map((props, i) => (
        <animated.span
          key={i}
          style={props}
          className="inline-block transition-transform will-change-[transform,filter,opacity]"
        >
          {elements[i] === ' ' ? '\u00A0' : elements[i]}
          {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
}
