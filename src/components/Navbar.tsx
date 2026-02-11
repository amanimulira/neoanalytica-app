"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#packages", label: "Packages" },
    { href: "#process", label: "Process" },
    { href: "#results", label: "Results" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className={`nav ${scrolled ? "s" : ""}`}>
      <div className="ctr nav-i">
        <a href="#" className="logo">
          <div className="logo-m">N</div>
          <span className="logo-t">Neo Analytica</span>
        </a>
        <div className="nl">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          <a href="#book" className="nc">Book Free Consult</a>
        </div>
        <button className="mt" onClick={() => setMobileOpen(!mobileOpen)}>&#9776;</button>
        <div className={`mm ${mobileOpen ? "op" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <a href="#book" className="nc" onClick={() => setMobileOpen(false)}>Book Free Consult</a>
        </div>
      </div>
    </nav>
  );
}
