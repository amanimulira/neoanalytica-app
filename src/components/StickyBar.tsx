"use client";
import { useState, useEffect } from "react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-[999] bg-white/95 backdrop-blur-xl border-t border-gray-200 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-all duration-400 ${
        visible ? "bottom-0" : "-bottom-20"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">
          Ready to fix your data pipelines?{" "}
          <span className="text-gray-500 ml-2 text-xs hidden sm:inline">
            Free 30-min strategy call
          </span>
        </p>
        <a
          href="#book"
          className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-dim transition-all"
        >
          Book Free Consult →
        </a>
      </div>
    </div>
  );
}
