"use client";
import { useEffect, useRef } from "react";

const FOCUS_AREAS = [
  { title: "Residential Projects",   sub: "Villas, Apartments & Complexes"    },
  { title: "Commercial Construction", sub: "Offices, Retail & Mixed-Use"        },
  { title: "Infrastructure Works",    sub: "Roads, Bridges & Civil Works"       },
  { title: "Sustainable Development", sub: "Green Building & Energy Efficiency" },
];

export default function Company() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ventures" style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label" style={{ marginBottom: 14 }}>Entrepreneurial Ventures</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Building Beyond Borders
          </h2>
        </div>

        <div ref={ref} className="reveal" style={{ maxWidth: 820, margin: "0 auto" }}>
          <div className="card" style={{ borderRadius: 12, overflow: "hidden" }}>

            {/* Header band */}
            <div style={{
              padding: "28px 36px",
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 10,
                  background: "rgba(255,255,255,0.20)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ color: "#FFF", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>ISC</span>
                </div>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.70)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 5 }}>
                    FOUNDER &amp; DIRECTOR
                  </div>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                    fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.1,
                  }}>
                    Inland Supreme Constructions
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, marginTop: 4 }}>
                    India-Based Construction Firm
                  </div>
                </div>
              </div>

              {/* India flag bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4, opacity: 0.8 }}>
                <div style={{ width: 36, height: 5, borderRadius: 2, background: "#FF9933" }} />
                <div style={{ width: 36, height: 5, borderRadius: 2, background: "#FFFFFF" }} />
                <div style={{ width: 36, height: 5, borderRadius: 2, background: "#138808" }} />
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "32px 36px" }}>
              <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.80, marginBottom: 32 }}>
                Inland Supreme Constructions is Hardik&apos;s proprietary venture in India — a construction and project management firm rooted in delivering quality infrastructure across residential, commercial, and civil domains. Drawing on international best practices from his US-based EPC career, Hardik brings a global standard of project delivery to the Indian construction market.
              </p>

              <div style={{ marginBottom: 32 }}>
                <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16 }}>
                  CORE FOCUS AREAS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                  {FOCUS_AREAS.map(item => (
                    <div key={item.title} style={{
                      background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
                      borderRadius: 8, padding: "16px 18px",
                    }}>
                      <div style={{ color: "var(--text-1)", fontSize: 13, fontWeight: 600, marginBottom: 4, fontFamily: "var(--font-heading)" }}>
                        {item.title}
                      </div>
                      <div style={{ color: "var(--text-3)", fontSize: 11 }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div style={{ borderLeft: "4px solid var(--accent)", paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
                <div style={{ color: "var(--text-2)", fontSize: 14, fontStyle: "italic", lineHeight: 1.7 }}>
                  &ldquo;Every structure we build is a commitment to quality, safety, and community — rooted in the same principles that drive our work across the globe.&rdquo;
                </div>
                <div style={{ color: "var(--accent)", fontSize: 11, fontWeight: 700, marginTop: 10, letterSpacing: "0.06em" }}>
                  — HARDIK NAKRANI, Founder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
