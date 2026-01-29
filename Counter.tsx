
import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
}

export const Counter: React.FC<CounterProps> = ({ target, duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for a smoother finish (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <span className="font-extrabold text-6xl md:text-8xl text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        {count}<span className="text-zinc-500 ml-1">+</span>
      </span>
      <div className="mt-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <p className="text-zinc-400 font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs">
          Happy Customers in Lebanon
        </p>
      </div>
    </div>
  );
};
