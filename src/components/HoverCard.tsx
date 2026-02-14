"use client";
import { useRef, ReactNode } from "react";

export default function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia("(hover: none)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform .4s cubic-bezier(.16,1,.3,1)", transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
