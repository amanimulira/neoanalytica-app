"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function ParallaxElement({ children, speed = 0.2, className = "" }: { children?: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translateY(${-(window.scrollY * speed)}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
