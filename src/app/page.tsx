import Navbar from "@/components/Navbar";
import StickyBar from "@/components/StickyBar";
import LoginDetector from "@/components/LoginDetector";
import SubscribeForm from "@/components/SubscribeForm";

const CHECK = (<svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>);

const packages = [
  { tag: "Foundation", name: "Data Pipeline Builder", featured: false, time: "3-4 weeks", desc: "Production-ready ETL/ELT pipelines from SaaS sources to Snowflake, BigQuery, or Redshift.", features: ["Up to 10 source integrations", "Data quality checks & monitoring", "Full documentation & training"] },
  { tag: "Growth", name: "Modern ETL Overhaul", featured: true, time: "4-6 weeks", desc: "Migrate legacy ETL (SSIS, Informatica) to modern stack with dbt + cloud warehouse.", features: ["Legacy audit & migration roadmap", "Automated testing & CI/CD", "Cost optimization & tuning", "30-day post-launch support"] },
  { tag: "Scale", name: "Real-Time Streaming", featured: false, time: "5-7 weeks", desc: "Kafka/Pub-Sub + Spark/Flink streaming with sink to warehouse, dashboards, and alerting.", features: ["Event-driven architecture", "Real-time monitoring dashboards", "Auto-scaling & failover config"] },
];

const problems = [
  { icon: "\u{1F4B8}", title: "Budget black holes", desc: "Hourly billing turns a \u00a330k project into \u00a390k before you see a dashboard." },
  { icon: "\u{1F40C}", title: "Months of discovery", desc: "Endless requirements gathering delays value delivery by quarters." },
  { icon: "\u{1F511}", title: "Key-person dependency", desc: "When your one senior engineer leaves, the data stack becomes a mystery." },
  { icon: "\u{1F4C9}", title: "Delayed ROI", desc: "Leadership makes gut-feel decisions because the platform won't be ready for 6 months." },
];

const steps = [
  { n: "01", t: "Free Strategy Call", d: "30-minute call to diagnose your challenges and recommend the right package." },
  { n: "02", t: "Technical Scoping", d: "We audit your stack and send a fixed-price proposal within 48 hours." },
  { n: "03", t: "Build & Iterate", d: "Weekly demos using proven templates. You see results early." },
  { n: "04", t: "Launch & Support", d: "Full handover with docs, training, and 30 days of support." },
];

const faqs = [
  { q: "What if my project doesn't fit a standard package?", a: "Most fit with minor adjustments. For unique needs, we offer custom scoping \u2014 still fixed price." },
  { q: "Which cloud platforms do you support?", a: "AWS, GCP, and Azure. Templates are cloud-agnostic at logic layer, optimized per platform." },
  { q: "What happens after the project ends?", a: "30 days post-launch support, full docs, training. Optional retainers available." },
  { q: "How is this different from freelancers?", a: "We use battle-tested templates from 50+ projects. Faster, fewer bugs, a team not a single point of failure." },
  { q: "Startups or enterprise?", a: "Both. Productized model makes enterprise-grade accessible to Series A+ startups." },
  { q: "What's the investment range?", a: "\u00a38,000 to \u00a335,000. Every penny scoped upfront \u2014 no surprises." },
];

const testimonials = [
  { q: "We'd been quoted 6 months and \u00a3120k. Neo Analytica delivered our pipeline migration in 5 weeks at a fraction of the cost.", n: "James H.", r: "Head of Data, Series B FinTech", i: "JH" },
  { q: "The productized approach was exactly what we needed. Working data platform in weeks, not months.", n: "Sarah P.", r: "CTO, E-commerce Scale-up", i: "SP" },
  { q: "Zero vendor lock-in. After handover, my team owned everything and maintained it independently.", n: "Michael K.", r: "VP Engineering, HealthTech", i: "MK" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LoginDetector />

      {/* HERO */}
      <section id="hero" className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse,rgba(13,150,104,0.08),transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 max-w-[800px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/[0.08] border border-accent/20 rounded-full text-xs font-medium text-accent mb-7">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Accepting 3 new clients this quarter
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] mb-6">
            Your data pipelines are broken. <span className="text-accent">We fix them in weeks.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-[600px] mb-10">
            Productized data engineering packages with fixed pricing on AWS, Azure, and GCP. No scope creep. No endless proposals.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#book" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dim transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20">
              Book Your Free 30-Min Strategy Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
            </a>
            <a href="#packages" className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">See Packages</a>
          </div>
          <div className="flex flex-wrap gap-6">
            {["50+ projects delivered", "AWS / GCP / Azure certified", "UK-based team"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-xs text-gray-500">{CHECK}{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Traditional data consultancies drain your budget</h2>
          <p className="text-base text-gray-500 max-w-[600px] mb-12">You hire a consultancy, they spend 3 months in discovery, and you end up with a bloated SOW and half-built pipelines.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p) => (
              <div key={p.title} className="p-7 bg-gray-50 border border-gray-200 rounded-xl hover:border-red-200 transition-all">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-lg mb-4">{p.icon}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">Our Packages</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Fixed price. Fixed scope. Delivered in weeks.</h2>
          <p className="text-base text-gray-500 max-w-[600px] mb-12">Every engagement includes documentation, handover training, and 30 days of support.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`p-8 rounded-2xl border relative transition-all hover:-translate-y-0.5 hover:shadow-lg ${pkg.featured ? "border-accent/30 bg-gradient-to-br from-gray-50 to-accent/[0.03]" : "border-gray-200 bg-gray-50"}`}>
                {pkg.featured && <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />}
                {pkg.featured && <span className="absolute top-4 right-4 px-2 py-0.5 bg-accent text-white text-[10px] font-bold uppercase rounded">Popular</span>}
                <p className="font-mono text-[10px] text-accent uppercase tracking-[1.5px] mb-3">{pkg.tag}</p>
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{pkg.desc}</p>
                <ul className="space-y-2 mb-7">{pkg.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm text-gray-500">{CHECK}{f}</li>))}</ul>
                <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                  <span className="font-mono text-xs text-gray-400">{pkg.time}</span>
                  <a href="#book" className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-dim">Get Started</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">From call to production in four steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.n} className={`p-8 bg-gray-50 ${i === 0 ? "rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" : ""} ${i === 3 ? "rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none" : ""} ${i > 0 ? "border-t md:border-t-0 md:border-l border-gray-200" : ""}`}>
                <span className="font-mono text-5xl font-bold text-accent/20">{s.n}</span>
                <h3 className="font-semibold mt-4 mb-2">{s.t}</h3>
                <p className="text-sm text-gray-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">Results</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Trusted by data teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 mb-14">
            {[{ n: "50+", l: "Projects" }, { n: "3.2\u00d7", l: "Faster delivery" }, { n: "40%", l: "Cost savings" }, { n: "97%", l: "Retention" }].map((s, i) => (
              <div key={s.l} className={`py-9 text-center bg-gray-50 ${i === 0 ? "rounded-l-2xl" : ""} ${i === 3 ? "rounded-r-2xl" : ""} ${i > 0 ? "border-l border-gray-200" : ""}`}>
                <p className="text-4xl font-bold text-accent tracking-tight">{s.n}</p>
                <p className="text-sm text-gray-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.n} className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-700 italic mb-6">&ldquo;{t.q}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-cyan-600 rounded-xl flex items-center justify-center font-bold text-sm text-white">{t.i}</div>
                  <div><p className="text-sm font-semibold">{t.n}</p><p className="text-xs text-gray-400">{t.r}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-12">
              <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">Free Resource</p>
              <h2 className="text-2xl font-bold mb-3">The Data Stack Decision Framework</h2>
              <p className="text-sm text-gray-500 mb-7">12-page guide for choosing the right cloud warehouse, orchestration tools, and transformation layer.</p>
              <SubscribeForm source="lead_magnet" magnetName="data-stack-framework" />
              <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
            <div className="hidden lg:flex bg-gradient-to-br from-accent/5 to-cyan-500/5 items-center justify-center p-12">
              <div className="w-full max-w-[260px] aspect-[3/4] bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3 shadow-md">
                <div className="h-2 w-2/5 bg-accent/30 rounded" /><div className="h-2 w-3/5 bg-gray-200 rounded" /><div className="h-2 bg-gray-200 rounded" /><div className="flex-1 bg-gray-50 rounded-lg border border-gray-200" /><div className="h-2 w-3/5 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">FAQ</p>
          <h2 className="text-3xl font-bold mb-10">Common questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px]">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer">
                <summary className="flex justify-between gap-4 font-semibold text-sm list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-45 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14m-7-7h14" /></svg>
                </summary>
                <p className="mt-4 text-sm text-gray-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book" className="py-24 border-t border-gray-200 text-center relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(13,150,104,0.08),transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <p className="font-mono text-xs uppercase tracking-[2px] text-accent mb-4">Let&apos;s Talk</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-[600px] mx-auto mb-4">Stop burning budget on consultants who over-promise</h2>
          <p className="text-base text-gray-500 max-w-[500px] mx-auto mb-8">Book a free 30-minute strategy call. Honest assessment, even if you don&apos;t need us.</p>
          <p className="font-mono text-xs text-amber-600 mb-8">1 spot remaining for Q1 2026</p>
          <a href="https://neoanalytica.co.uk/discovery-call" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-base font-semibold rounded-lg hover:bg-accent-dim transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/20">
            Book Your Free Strategy Call
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
          </a>
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {["Free, no-obligation", "Fixed pricing in 48hrs", "Zero vendor lock-in"].map((g) => (
              <span key={g} className="flex items-center gap-1.5 text-xs text-gray-400">{CHECK}{g}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; 2026 Neo Analytica. All rights reserved. London, UK.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "LinkedIn"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <StickyBar />
    </>
  );
}
