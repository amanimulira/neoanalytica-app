"use client";
import { useState, useEffect } from "react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting));
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`sb ${visible ? "v" : ""}`}>
      <div className="ctr">
        <p>Ready to fix your data pipelines?</p>
        <a href="#book" className="bp">Book Free Consult &rarr;</a>
      </div>
    </div>
  );
}
