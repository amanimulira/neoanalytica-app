"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.current.style.background = `radial-gradient(circle 500px at ${x}px ${y}px, rgba(5,150,105,0.07), transparent 80%)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, transition: "background .3s ease" }}
    />
  );
}
