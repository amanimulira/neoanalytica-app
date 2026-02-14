"use client";
import { useState, useRef } from "react";

const logos: { name: string; category: string; svg: JSX.Element }[] = [
  {
    name: "AWS",
    category: "Cloud",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.8 30.2c-2.4 1.8-5.9 2.7-8.9 2.7-4.2 0-8-1.6-10.9-4.2-.2-.2 0-.5.3-.3 3.1 1.8 6.9 2.9 10.9 2.9 2.7 0 5.6-.6 8.3-1.7.4-.2.8.3.3.6z" fill="#FF9900"/>
        <path d="M23.9 28.9c-.3-.4-2.1-.2-2.9-.1-.2 0-.3-.2-.1-.3 1.4-1 3.8-.7 4-.4.3.4-.1 2.8-1.4 4-.2.2-.4.1-.3-.1.3-.7.9-2.4.7-3.1z" fill="#FF9900"/>
        <path d="M21.1 19.2v-1.5c0-.2.2-.4.4-.4h6.3c.2 0 .4.2.4.4v1.3c0 .2-.2.5-.6 1l-3.3 4.7c1.2 0 2.5.2 3.6.7.3.1.3.4.3.6v1.6c0 .2-.2.5-.5.3-2-1-4.6-1.1-6.8 0-.2.1-.5-.1-.5-.3v-1.5c0-.3 0-.7.3-1.1l3.8-5.4h-3.3c-.2 0-.4-.2-.4-.4h.1z" fill="currentColor"/>
        <path d="M8.6 27.8h-1.9c-.2 0-.3-.2-.4-.3V17.8c0-.2.2-.4.4-.4H9c.2 0 .3.2.4.3v1.3h0c.5-1.2 1.5-1.8 2.8-1.8 1.3 0 2.2.6 2.8 1.8.5-1.2 1.6-1.8 2.8-1.8.9 0 1.8.4 2.3 1.1.6.8.5 2 .5 3v6c0 .2-.2.4-.4.4h-1.9c-.2 0-.3-.2-.4-.4v-5c0-.4 0-1.4-.1-1.8-.1-.6-.6-.8-1.1-.8-.5 0-.9.3-1.1.8-.2.5-.2 1.3-.2 1.8v5c0 .2-.2.4-.4.4h-1.9c-.2 0-.3-.2-.4-.4v-5c0-1.1.2-2.6-1.2-2.6-1.4 0-1.3 1.5-1.3 2.6v5c0 .2-.2.4-.4.4z" fill="currentColor"/>
        <path d="M36.4 17.2c2.9 0 4.4 2.5 4.4 5.6 0 3-1.7 5.4-4.4 5.4-2.8 0-4.4-2.5-4.4-5.5 0-3.1 1.6-5.5 4.4-5.5zm0 2c-1.4 0-1.5 2-1.5 3.2 0 1.2 0 3.7 1.5 3.7s1.6-2 1.6-3.3c0-.8 0-1.8-.3-2.5-.3-.7-.8-1.1-1.3-1.1z" fill="currentColor"/>
        <path d="M44.3 27.8h-1.9c-.2 0-.3-.2-.4-.4V17.8c0-.2.2-.3.4-.3h1.8c.2 0 .3.1.4.3v1.5c.6-1.3 1.3-2 2.7-2 .9 0 1.8.3 2.4 1.2.5.8.5 2.1.5 3.1v5.9c0 .2-.2.3-.4.3h-1.9c-.2 0-.3-.1-.4-.3v-5.1c0-1.1.1-2.6-1.2-2.6-.5 0-.9.3-1.1.8-.3.6-.3 1.2-.3 1.8v5.1c0 .2-.2.4-.4.4h-.2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Google Cloud",
    category: "Cloud",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.1 18.3l2.1-2.1.1-1c-4-3.6-10-3.7-14.2-.3-1.1.9-2 2-2.7 3.2-.3.4 0 .4.3.2 1.4-.8 4.2-1.5 6.3-.6l1.7.3s.3-.4.5-.6c1.5-1.5 3.7-2 5.9-1.1z" fill="#EA4335"/>
        <path d="M54.5 21.2c-.7-2-2-3.7-3.7-4.9l-2.8 2.8c1.3.9 2.1 2.5 2.1 4.1v.5c1.4 0 2.6 1.2 2.6 2.6s-1.2 2.6-2.6 2.6H44l-.5.5v3.1l.5.5h6.1c2.9 0 5.3-2.3 5.4-5.2 0-2-.8-3.8-2.4-4.9l1.4.3z" fill="#4285F4"/>
        <path d="M37.9 33h6.1v-3.6h-6.1c-.4 0-.7-.1-1-.2l-.7.2-2.1 2.1-.2.7c1.1.5 2.5.8 4 .8z" fill="#34A853"/>
        <path d="M37.9 20.5c-2.9 0-5.4 2.1-5.7 5-.3 3 1.7 5.7 4.5 6.5l3-3c-1.6-.5-2.7-2.2-2.3-3.9.3-1.4 1.5-2.4 2.9-2.5h.2l3-3c-1.3-.8-3-1.2-4.6-1.1h-1z" fill="#FBBC05"/>
      </svg>
    ),
  },
  {
    name: "Azure",
    category: "Cloud",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.4 11h10.2L26.3 37.5c-.2.3-.5.5-.9.5H17l9.6-26.2c.2-.5.5-.8.8-.8z" fill="url(#az1)"/>
        <path d="M47.1 31.6H30.3c-.3 0-.4.3-.2.5l10.8 7.5c.3.2.6.3 1 .3h11.5l-6.3-8.3z" fill="#0078D4"/>
        <path d="M27.4 11c-.4 0-.7.3-.9.7L17 37.5c-.1.3.1.5.4.5h9.2c.3-.1.5-.2.6-.5l2.1-5.8L37.8 38c.2.1.5.2.7.2h11.4l-5-6.6-16.2.1L40 11H27.4z" fill="url(#az2)"/>
        <defs>
          <linearGradient id="az1" x1="31" y1="12" x2="22" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#114A8B"/><stop offset="1" stopColor="#0669BC"/>
          </linearGradient>
          <linearGradient id="az2" x1="34" y1="26" x2="30" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopOpacity=".3"/><stop offset=".1" stopOpacity=".2"/><stop offset=".3" stopOpacity=".1"/><stop offset=".6" stopOpacity=".05"/><stop offset="1" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Snowflake",
    category: "Warehouse",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 8l1.3 2.3c.3.5.2 1.1-.2 1.4l-.6.4v7.3l6.3-3.7v-4.4l-.7-.3c-.5-.3-.7-.9-.4-1.4L47 7l2.7.5-.5 2.7c-.1.6-.6.9-1.1.9h-.8v4.3l6.3-3.6 1.1-4.3-.6-.5c-.4-.4-.4-1 0-1.4l1.8-1.8 2 2-1.8 1.8c-.4.4-1 .4-1.4 0l-.4-.4-1.1 4.2 6.3 3.6V11c-.5.1-1.1-.2-1.3-.7l-.7-2.5 2.6-.8.8 2.6c.2.5-.1 1.1-.6 1.3l-.6.2v7.5l6.3-3.7-.5-4.4c-.5.1-1.1-.2-1.3-.7l-.8-2.5 2.6-.8.8 2.6c.2.5 0 1.1-.5 1.3l-.5.2.5 4.3 2-1.2c.4-.2.9-.1 1.2.2l2.3 1.3-1.4 2.3-2.3-1.3c-.4-.2-.5-.7-.4-1.1l.1-.5-2 1.2v7.3l4 .3.3-.7c.3-.5.9-.7 1.4-.4l2.3 1.3-1.3 2.3-2.3-1.3c-.5-.3-.6-.8-.4-1.3l.1-.3-3.9-.3-6.3 3.7 6.3 3.6 3.9-.3-.1-.3c-.2-.5 0-1.1.4-1.3l2.3-1.3 1.3 2.3-2.3 1.3c-.5.3-1.1.1-1.4-.4l-.3-.7-4 .3v7.3l2 1.2c.5-.3 1.1-.2 1.4.2v.1l1.4 2.3-2.4 1.2-1.2-2.3c-.3-.5-.2-1 .2-1.4l.2-.1-.5-4.4-6.3 3.7.8 4.3.5.2c.5.2.8.8.6 1.3l-.8 2.6-2.6-.8.8-2.5c.2-.5.7-.8 1.2-.7l.6.1-1-4.4-6.4 3.6v4.5h.8c.5 0 1 .3 1.1.9l.5 2.6-2.7.5-1.3-2.6c-.3-.5 0-1.1.4-1.4l.5-.2-1.1-4.3-6.3 3.7v7.3l.6.4c.4.3.5.9.2 1.4l-1.3 2.3L38 39l1.3-2.3c.3-.5.9-.6 1.3-.4l.4.3V29.3l-6.3-3.7L28.4 29v4.5l.7.1c.5.1.9.6.8 1.2l-.5 2.6-2.7-.5.5-2.7c.1-.5.6-.9 1.1-.9h.4v-4.3l-6.3 3.6-1 4.4.6.1c.5.1.9.5.8 1l-.5 2.8-2.7-.5.5-2.7c.1-.5.6-.9 1.1-.8l.5.1.8-4.3-6.3-3.7-.5 4.4.2.1c.5.3.6.9.3 1.4L15 35l-2.4-1.3 1.4-2.3c.3-.5.9-.7 1.4-.3l.1.1 2-1.2V22.7l-2 1.2c-.4.3-1 .3-1.4-.1L12.6 22l-2.3 1.3L9 21l2.3-1.3c.5-.3 1.1-.1 1.4.4l.3.7 4-.3V13.1l-2-1.2-.2.1c-.5.3-1 .2-1.4-.2L12 9.4l2.4-1.4 1.3 2.3c.3.5.2 1.1-.3 1.4l-.1.1.5 4.4 6.3 3.6v-4.3h-.4c-.6 0-1-.3-1.2-.8l-.5-2.7 2.7-.5.5 2.7c.1.6-.3 1.1-.8 1.2l-.7.1v4.5l6.3-3.7v-7.3l-.4-.3c-.4-.3-.6-.9-.3-1.4L28 5.7 30.5 7l-1.3 2.3c-.3.5-.8.6-1.3.5l-.6-.2v4.3l6.3-3.6v-4.4c-.5 0-1-.4-1.1-.9L32 2.3l2.7-.5.5 2.7c.1.5-.3 1.1-.8 1.2h-.4v7.6l6.3 3.7V9.7l-.6-.4c-.4-.3-.5-.9-.2-1.4z" fill="#29B5E8" fillRule="evenodd" clipRule="evenodd" transform="scale(0.55) translate(32,16)"/>
      </svg>
    ),
  },
  {
    name: "Databricks",
    category: "Warehouse",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 14l18-8 18 8-18 8-18-8z" fill="#FF3621" opacity="0.9"/>
        <path d="M22 24l18 8 18-8-18-8-18 8z" fill="#FF3621" opacity="0.7"/>
        <path d="M40 32l-18-8v8l18 8 18-8v-8l-18 8z" fill="#FF3621"/>
        <path d="M22 16v8l18 8 18-8v-8l-18 8-18-8z" fill="#FF3621" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "dbt",
    category: "Transform",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.6 11.4c5.8 2 10 7.2 10 13.4v.2l-10.4-6v12.8l-4.4-2.5V14.5c0-1.3.6-2.5 1.6-3.3 1-.6 2.2-.3 3.2.2z" fill="#FF694A"/>
        <path d="M37.4 36.6c-5.8-2-10-7.2-10-13.4v-.2l10.4 6V16.2l4.4 2.5v14.8c0 1.3-.6 2.5-1.6 3.3-1 .6-2.2.3-3.2-.2z" fill="#FF694A"/>
      </svg>
    ),
  },
  {
    name: "Kafka",
    category: "Streaming",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="40" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="48" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="48" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="48" cy="35" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="32" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="32" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="32" cy="35" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="42.5" y1="18.5" x2="46" y2="16" stroke="currentColor" strokeWidth="1"/>
        <line x1="42.5" y1="21.5" x2="46" y2="24" stroke="currentColor" strokeWidth="1"/>
        <line x1="37.5" y1="18.5" x2="34" y2="16" stroke="currentColor" strokeWidth="1"/>
        <line x1="37.5" y1="21.5" x2="34" y2="24" stroke="currentColor" strokeWidth="1"/>
        <line x1="40" y1="23.5" x2="40" y2="26.5" stroke="currentColor" strokeWidth="1"/>
        <line x1="42.5" y1="31.5" x2="46" y2="34" stroke="currentColor" strokeWidth="1"/>
        <line x1="37.5" y1="31.5" x2="34" y2="34" stroke="currentColor" strokeWidth="1"/>
        <line x1="42.5" y1="28.5" x2="46" y2="26" stroke="currentColor" strokeWidth="1"/>
        <line x1="37.5" y1="28.5" x2="34" y2="26" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: "Airflow",
    category: "Orchestration",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 10c-.5 0-1 .5-1 1v8.6c-2.3-1.5-4.8-2.5-7.5-3-3.5-.6-6.3-.2-7.5.2-.4.1-.5.6-.2.8 2.8 2.5 6.5 4 10.4 4.4H40v2h-5.8c-3.9.4-7.6 1.9-10.4 4.4-.3.2-.2.7.2.8 1.2.4 4 .8 7.5.2 2.7-.5 5.2-1.5 7.5-3V35c0 .5.5 1 1 1s1-.5 1-1v-8.6c2.3 1.5 4.8 2.5 7.5 3 3.5.6 6.3.2 7.5-.2.4-.1.5-.6.2-.8-2.8-2.5-6.5-4-10.4-4.4H40v-2h5.8c3.9-.4 7.6-1.9 10.4-4.4.3-.2.2-.7-.2-.8-1.2-.4-4-.8-7.5-.2-2.7.5-5.2 1.5-7.5 3V11c0-.5-.5-1-1-1z" fill="#017CEE"/>
      </svg>
    ),
  },
  {
    name: "Terraform",
    category: "Infrastructure",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 11v9.5l8.2 4.7V15.7L30 11z" fill="#5C4EE5" opacity="0.6"/>
        <path d="M39.2 15.7v9.5L47.5 21V11.4l-8.3 4.3z" fill="#5C4EE5"/>
        <path d="M47.5 22v9.6l8.3-4.7V17.3L47.5 22z" fill="#5C4EE5" opacity="0.6"/>
        <path d="M39.2 26.3v9.5l8.3-4.7v-9.5l-8.3 4.7z" fill="#5C4EE5"/>
      </svg>
    ),
  },
  {
    name: "Fivetran",
    category: "Ingestion",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31 13h6v3h-6v6h-3v-6h-3v-3h3v-3h3v3zm9 0h6v3h-6v-3zm0 6h6v3h-6v-3zm0 6h6v3h-6v-3zm9-12h6v3h-6v-3zm0 6h6v3h-6v-3zm0 6h6v3h-6v-3zm0 6h6v3h-6v-3zm-9 0h6v3h-6v-3zm-9 0h6v3h-6v-3zm-9 0h3v3h-3v-3z" fill="#0073FF" fillRule="evenodd"/>
      </svg>
    ),
  },
  {
    name: "Spark",
    category: "Processing",
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53 20c-1.3-5.3-3.5-6.5-4.8-6.5-.5 0-.8.2-.8.5.3 2 .3 4-.2 5.8-1.2 4-3.5 5.3-6 5.3-.5 0-1 0-1.5-.2l-.7-.2c-3.5-1-5.5 0-6.5 2-.8 1.5-.7 3.5.2 5 1.2 2 3.5 3.2 6 3.2.5 0 1 0 1.5-.2 4-1 6.8-3.2 8.5-6.5.5-1 1-2.2 1.2-3.5.5-1.5.7-3 1-4.8v.1z" fill="#E25A1C"/>
        <path d="M36.5 24c-2 .5-3 2-3 3.7 0 .7.2 1.3.5 2-1.5-1.2-2.3-3-2-5 .3-2.5 2.5-4 5-4h.5c-.5 1-1 2-1 3.3z" fill="#E25A1C" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "BigQuery",
    category: "Warehouse",
    svg: (
      <img src="/big query.png" alt="BigQuery" width={80} height={48} style={{ objectFit: "contain" }} />
    ),
  },
];

export default function LogoCloud() {
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="lc-section">
      <div className="ctr">
        <div className="lc-header">
          <span className="lc-label">Trusted Stack</span>
          <p className="lc-sub">We build on the platforms you already trust</p>
        </div>
      </div>
      <div
        className="lc-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHoveredIdx(null); }}
      >
        <div className="lc-fade lc-fade-l" />
        <div className="lc-fade lc-fade-r" />
        <div
          ref={trackRef}
          className="lc-track"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {[...logos, ...logos].map((logo, i) => {
            const realIdx = i % logos.length;
            return (
              <div
                key={`${logo.name}-${i}`}
                className={`lc-item${hoveredIdx !== null && hoveredIdx !== realIdx ? " dimmed" : ""}${hoveredIdx === realIdx ? " active" : ""}`}
                onMouseEnter={() => setHoveredIdx(realIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="lc-icon">{logo.svg}</div>
                <span className="lc-name">{logo.name}</span>
                <span className="lc-cat">{logo.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
