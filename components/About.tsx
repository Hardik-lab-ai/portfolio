"use client";
import { useEffect, useRef } from "react";

const HIGHLIGHTS = [
  { label: "5+ Years",          sub: "Solar EPC & Construction PM across USA, Canada & India" },
  { label: "Solar EPC",         sub: "Canopy, rooftop, landfill & ground-mount systems"       },
  { label: "BESS & Microgrid",  sub: "2 yrs battery storage & off-grid microgrid delivery"   },
  { label: "Zero Incidents",    sub: "OSHA 30 certified · safety-first on every jobsite"      },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.10, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Left — text */}
          <div className="reveal-left">
            <span className="section-label" style={{ marginBottom: 16 }}>About Me</span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.15,
            }}>
              Where Precision<br />Meets Purpose
            </h2>
            <span className="accent-bar" style={{ marginBottom: 28 }} />

            <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
              With over half a decade of hands-on experience across the USA, Canada, and India, I specialize in delivering complex renewable energy and construction projects — solar canopy, rooftop, landfill, Battery Energy Storage Systems (BESS), and off-grid microgrids — with zero compromise on quality, safety, or timeline.
            </p>
            <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
              Holding a <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>Master&apos;s in Construction Engineering &amp; Management</strong> from Stevens Institute of Technology (perfect 4.0 GPA), I&apos;ve led a $100M+ project portfolio at Core Development Group — from a 4.5 MW hospital solar canopy with battery storage in San Diego to a 1 MW / 4 MWh island microgrid in the Caribbean.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#experience" className="btn-primary">View Experience →</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </div>
          </div>

          {/* Right — clean data rows (no cards) */}
          <div className="reveal-right">

            {/* Highlights as horizontal rows */}
            <div>
              {HIGHLIGHTS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 20,
                    padding: "18px 0",
                    borderBottom: "1px solid var(--border)",
                    transition: "padding-left 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "6px"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; }}
                >
                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700,
                    color: "var(--text-1)", minWidth: 148, flexShrink: 0,
                  }}>
                    {item.label}
                  </div>
                  <div style={{ color: "var(--text-3)", fontSize: 13, lineHeight: 1.5 }}>{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Pull-quote — no card box, just a left accent line */}
            <div style={{
              marginTop: 28,
              paddingLeft: 18,
              borderLeft: "2px solid var(--accent)",
            }}>
              <div style={{ color: "var(--accent)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 8 }}>
                BUILT ON BLUEPRINTS
              </div>
              <div style={{ color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.65, fontStyle: "italic" }}>
                &ldquo;Civil Diploma → B.Eng. → M.Eng. → Solar EPC → BESS → Microgrid → $100M+ PM. Every step was by design.&rdquo;
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
