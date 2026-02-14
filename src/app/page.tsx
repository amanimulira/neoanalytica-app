import Navbar from "@/components/Navbar";
import StickyBar from "@/components/StickyBar";
import LoginDetector from "@/components/LoginDetector";
import ScrollReveal from "@/components/ScrollReveal";
import SubscribeForm from "@/components/SubscribeForm";
import FaqAccordion from "@/components/FaqAccordion";
import AnimatedCounter from "@/components/AnimatedCounter";
import HoverCard from "@/components/HoverCard";
import ParallaxElement from "@/components/ParallaxElement";
import CursorGlow from "@/components/CursorGlow";

const CHK = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{color:"var(--accent)"}}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>;
const ARR = <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>;
const techs = ["Snowflake","BigQuery","Redshift","dbt","Airflow","Dagster","Prefect","Kafka","Spark","Terraform","Fivetran","Airbyte"];

const problems = [
  { icon: "\u{1F4B8}", title: "Budget black holes", desc: "Hourly billing turns a \u00a330k project into \u00a390k before you see a dashboard." },
  { icon: "\u{1F40C}", title: 'Months of \u201cdiscovery\u201d', desc: "Endless requirements gathering and committee approvals delay value by quarters." },
  { icon: "\u{1F511}", title: "Key-person risk", desc: "Everything runs through one senior engineer. When they leave, it\u2019s a mystery." },
  { icon: "\u{1F4C8}", title: "Delayed ROI", desc: "Leadership makes gut-feel decisions because the platform won\u2019t be ready for 6 months." },
];

const packages = [
  { tag: "Foundation", name: "Data Pipeline Builder", featured: false, time: "3\u20134 weeks", desc: "Production-ready ETL/ELT pipelines from SaaS sources to Snowflake, BigQuery, or Redshift.", features: ["Up to 10 source integrations", "Data quality checks & monitoring", "Full documentation & training"] },
  { tag: "Growth", name: "Modern ETL Overhaul", featured: true, time: "4\u20136 weeks", desc: "Migrate legacy ETL (SSIS, Informatica) to modern stack with dbt + cloud warehouse.", features: ["Legacy audit & migration roadmap", "Automated testing & CI/CD", "Cost optimization & tuning", "30-day post-launch support"] },
  { tag: "Scale", name: "Real-Time Streaming", featured: false, time: "5\u20137 weeks", desc: "Kafka/Pub-Sub + Spark/Flink streaming with sink to warehouse, dashboards, and alerting.", features: ["Event-driven architecture design", "Real-time monitoring dashboards", "Auto-scaling & failover config"] },
];

const steps = [
  { n: "01", t: "Free Strategy Call", d: "30-minute call to diagnose your challenges and recommend the right package." },
  { n: "02", t: "Technical Scoping", d: "We audit your stack and send a fixed-price proposal within 48 hours." },
  { n: "03", t: "Build & Iterate", d: "Weekly demos using proven templates. You see working results early." },
  { n: "04", t: "Launch & Support", d: "Full handover with docs, training, and 30 days of post-launch support." },
];

const stats = [
  { v: "50+", l: "Projects delivered" },
  { v: "3.2\u00d7", l: "Faster delivery" },
  { v: "40%", l: "Avg. cost savings" },
  { v: "97%", l: "Client retention" },
];

const testimonials = [
  { q: "We\u2019d been quoted 6 months and \u00a3120k. Neo Analytica delivered our pipeline migration in 5 weeks at a fraction of the cost.", n: "James H.", r: "Head of Data, Series B FinTech", i: "JH" },
  { q: "The productized approach was exactly what we needed. Working data platform in weeks, not months of architecture debates.", n: "Sarah P.", r: "CTO, E-commerce Scale-up", i: "SP" },
  { q: "Zero vendor lock-in. After handover, my team owned everything and maintained it independently.", n: "Michael K.", r: "VP Engineering, HealthTech", i: "MK" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LoginDetector />
      <ScrollReveal />

      {/* HERO */}
      <section className="hero" id="hero">
        <ParallaxElement speed={0.15} className="hg" />
        <ParallaxElement speed={0.1} className="hg2" />
        <div className="hgrid" />
        <CursorGlow />
        <div className="ctr"><div className="hc">
          <div className="hb"><span className="pulse" />Accepting 3 new clients this quarter</div>
          <h1>Your data pipelines<br />are broken. <em>We fix<br />them in weeks.</em></h1>
          <p className="hs">Productized data engineering packages with fixed pricing on AWS, Azure &amp; GCP. No scope creep. No endless proposals. Just production-ready infrastructure.</p>
          <div className="ha">
            <a href="#book" className="bp btn-ripple">Book Free Strategy Call {ARR}</a>
            <a href="#packages" className="bs">See Packages &amp; Pricing</a>
          </div>
          <div className="hp">
            {["50+ projects delivered", "AWS / GCP / Azure", "UK-based team"].map((t) => (
              <span key={t}>{CHK}{t}</span>
            ))}
          </div>
        </div></div>
      </section>

      {/* MARQUEE */}
      <div className="mw">
        <div className="mi-inner">
          {[...techs, ...techs].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* PROBLEMS */}
      <section className="sec">
        <div className="ctr">
          <div className="sl rv">The Problem</div>
          <h2 className="st rv d1">Traditional consultancies<br />drain your budget</h2>
          <p className="sd rv d2">You hire a consultancy, they spend 3 months &ldquo;discovering requirements,&rdquo; and you end up with a bloated SOW and half-built pipelines.</p>
          <div className="bg">
            {problems.map((p, i) => (
              <HoverCard key={p.title} className={`bc rv ${i > 0 ? `d${i}` : ""}`}>
                <div className="bi">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="sec" id="packages">
        <div className="ctr">
          <div className="sl rv">Our Packages</div>
          <h2 className="st rv d1">Fixed price. Fixed scope.<br />Delivered in weeks.</h2>
          <p className="sd rv d2">Every engagement includes documentation, handover training, and 30 days of support.</p>
          <div className="pg">
            {packages.map((pkg, i) => (
              <HoverCard key={pkg.name} className={`pc rv ${i > 0 ? `d${i}` : ""} ${pkg.featured ? "f" : ""}`}>
                {pkg.featured && <span className="pb2">Popular</span>}
                <div className="ptg">{pkg.tag}</div>
                <h3 className="pn">{pkg.name}</h3>
                <p className="pds">{pkg.desc}</p>
                <ul className="pfl">{pkg.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <div className="pft">
                  <span className="ptm">{"\u23f1"} {pkg.time}</span>
                  <a href="#book" className="pct">Get Started</a>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec" id="process">
        <div className="ctr">
          <div className="sl rv">How It Works</div>
          <h2 className="st rv d1">From call to production<br />in four steps</h2>
          <p className="sd rv d2">No 40-page proposals. No procurement circus.</p>
          <div className="ssg rv">
            {steps.map((s) => (
              <div key={s.n} className="sc2">
                <div className="sn">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="sec" id="results">
        <div className="ctr">
          <div className="sl rv">Results</div>
          <h2 className="st rv d1">Trusted by data teams<br />who don&rsquo;t waste time</h2>
          <div style={{ marginBottom: 56 }} />
          <div className="sr rv">
            {stats.map((s) => (
              <div key={s.l} className="sta">
                <AnimatedCounter end={s.v} className="stv" />
                <div className="stl">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="tg">
            {testimonials.map((t, i) => (
              <HoverCard key={t.n} className={`tc rv ${i > 0 ? `d${i}` : ""}`}>
                <p className="tq">&ldquo;{t.q}&rdquo;</p>
                <div className="tau">
                  <div className="tav">{t.i}</div>
                  <div><div className="tnm">{t.n}</div><div className="trl">{t.r}</div></div>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="sec">
        <div className="ctr">
          <div className="mag rv">
            <div className="mgc">
              <div className="sl">Free Resource</div>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 28, letterSpacing: "-.5px", marginBottom: 12 }}>The Data Stack Decision Framework</h2>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, marginBottom: 8 }}>A 12-page guide for choosing the right cloud warehouse, orchestration tools, and transformation layer &mdash; without overspending. Used by 200+ data teams.</p>
              <SubscribeForm source="lead_magnet" magnetName="data-stack-framework" />
              <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
            </div>
            <div className="mgv">
              <div className="mgd">
                <div className="ln" style={{ width: "50%", background: "var(--accent)", opacity: 0.5 }} />
                <div className="ln" style={{ width: "70%", background: "var(--border2)" }} />
                <div className="ln" style={{ width: "100%", background: "var(--border2)" }} />
                <div className="ln" style={{ width: "85%", background: "var(--border2)" }} />
                <div style={{ flex: 1, background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", margin: "12px 0" }} />
                <div className="ln" style={{ width: "60%", background: "var(--border2)" }} />
                <div className="ln" style={{ width: "100%", background: "var(--border2)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" id="faq">
        <div className="ctr">
          <div className="sl rv">FAQ</div>
          <h2 className="st rv d1">Common questions</h2>
          <p className="sd rv d2">Still curious? Book a free call and we&rsquo;ll answer everything.</p>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="fc" id="book">
        <div className="ctr" style={{ position: "relative", zIndex: 2 }}>
          <div className="sl">Let&rsquo;s Talk</div>
          <h2 className="st" style={{ maxWidth: 600, margin: "0 auto 16px" }}>Stop burning budget<br />on consultants who<br />over-promise</h2>
          <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 480, margin: "0 auto 16px", lineHeight: 1.7 }}>Book a free 30-minute strategy call. Honest assessment &mdash; even if that means telling you that you don&rsquo;t need us.</p>
          <p className="ur">{"\u26a1"} 1 spot remaining for Q1 2026</p>
          <a href="https://neoanalytica.co.uk/discovery-call" className="bp btn-ripple" style={{ fontSize: 16, padding: "16px 36px" }}>
            Book Your Free Strategy Call <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </a>
          <div className="gu">
            {["Free, no-obligation", "Fixed pricing in 48hrs", "Zero vendor lock-in"].map((g) => (
              <span key={g}>{CHK}{g}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fot">
        <div className="ctr foti">
          <p>&copy; 2026 Neo Analytica. London, UK.</p>
          <div className="fol">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>

      <StickyBar />
    </>
  );
}
