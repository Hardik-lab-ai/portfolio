"use client";
import { useEffect, useRef } from "react";

const HIGHLIGHTS = [
  { icon: "🏗️", label: "5+ Years",      sub: "Construction & Renewable Energy PM"       },
  { icon: "☀️", label: "Solar EPC",      sub: "Full lifecycle from engineering to startup" },
  { icon: "🌍", label: "US & India",     sub: "International project delivery experience"  },
  { icon: "🦺", label: "Zero Incidents", sub: "OSHA-enforced safety-first culture"         },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="section-bg-b-r" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* Left — text */}
          <div className="reveal-left">
            <div className="section-label" style={{ marginBottom: 16 }}>About Me</div>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2,
            }}>
              Where Precision Meets{" "}
              <span style={{
                backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Purpose</span>
            </h2>

            <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
              With over half a decade of hands-on experience spanning two continents, I specialize in delivering complex solar EPC and construction projects with zero compromise on quality, safety, or timeline. From railway station developments in Mumbai to 50+ MW solar farms across the United States — every project is a blueprint for excellence.
            </p>
            <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.85, marginBottom: 32 }}>
              Holding a <strong style={{ color: "var(--text-1)" }}>Master&apos;s in Construction Engineering &amp; Management</strong> from Stevens Institute of Technology (perfect 4.0 GPA), I combine rigorous academic foundations with practical field leadership — wielding Primavera P6, Procore, and SolarEdge systems as naturally as a carpenter wields a hammer.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#experience" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
                color: "var(--accent)", padding: "10px 22px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,158,11,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,158,11,0.1)"; }}
              >
                View Experience →
              </a>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
                color: "var(--text-2)", padding: "10px 22px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)"; }}
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right — highlights grid */}
          <div className="reveal-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {HIGHLIGHTS.map((item, i) => (
              <div key={i} className="glass-card card-glow" style={{
                borderRadius: 18, padding: "24px 20px", textAlign: "center", transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>
                  {item.label}
                </div>
                <div style={{ color: "var(--text-3)", fontSize: 11, lineHeight: 1.4 }}>{item.sub}</div>
              </div>
            ))}

            <div className="glass-card" style={{
              borderRadius: 18, padding: "20px", gridColumn: "1 / -1",
              display: "flex", alignItems: "center", gap: 16,
              borderLeft: "3px solid var(--accent)",
            }}>
              <span style={{ fontSize: 26 }}>📐</span>
              <div>
                <div style={{ color: "var(--accent)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>
                  BUILT ON BLUEPRINTS
                </div>
                <div style={{ color: "var(--text-2)", fontSize: 13, lineHeight: 1.5 }}>
                  Civil Diploma → B.Eng. → M.Eng. → $100M+ PM. Every step was by design.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
