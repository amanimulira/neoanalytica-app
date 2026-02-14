"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ end, duration = 2000, className = "" }: { end: string; duration?: number; className?: string }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasAnimated]);

  const animate = () => {
    const suffix = end.match(/[^\d.]+$/)?.[0] || "";
    const numericValue = parseFloat(end.replace(/[^\d.]/g, ""));
    const isDecimal = end.includes(".");
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = numericValue * eased;

      setDisplay(
        isDecimal
          ? current.toFixed(1) + suffix
          : Math.floor(current) + suffix
      );

      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(end);
    };

    requestAnimationFrame(step);
  };

  return <div ref={ref} className={className}>{display}</div>;
}
