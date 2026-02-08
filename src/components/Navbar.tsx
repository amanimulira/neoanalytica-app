"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200"
          : "bg-white/80 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-mono font-bold text-sm text-white">
            N
          </div>
          <span className="font-semibold text-lg tracking-tight text-dark">
            Neo Analytica
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {["Packages", "How It Works", "Results", "FAQ"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#book"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dim transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              Book Free Consult
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 pb-4">
          {["Packages", "How It Works", "Results", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="block py-3 text-sm text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#book"
            className="block mt-2 text-center px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Book Free Consult
          </a>
        </div>
      )}
    </nav>
  );
}
