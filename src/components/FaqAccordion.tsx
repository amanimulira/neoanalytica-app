"use client";
import { useState } from "react";

const PLUS = <svg className="ic" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14m-7-7h14"/></svg>;

const faqs = [
  { q: "What if my project doesn\u2019t fit a package?", a: "Most fit with minor adjustments. For unique needs, we do custom scoping \u2014 still fixed price." },
  { q: "Which cloud platforms?", a: "AWS, GCP, and Azure. Templates are cloud-agnostic at the logic layer, optimized per platform." },
  { q: "What happens after the project?", a: "30 days post-launch support, full documentation, and training. Optional retainers available." },
  { q: "How is this different from freelancers?", a: "We use battle-tested templates from 50+ projects. Faster, fewer bugs, a team not a single point of failure." },
  { q: "Startups or enterprise?", a: "Both. Our productized model makes enterprise-grade data engineering accessible to Series A+ startups." },
  { q: "What\u2019s the investment range?", a: "\u00a38,000 to \u00a335,000. Every penny scoped upfront \u2014 no surprises." },
];

export default function FaqAccordion() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="fqg">
      {faqs.map((f, i) => {
        const isOpen = openItems.has(i);
        return (
          <div
            key={f.q}
            className={`fq-item ${isOpen ? "open" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="fq-summary">{f.q} {PLUS}</div>
            <div className="fq-answer">
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
