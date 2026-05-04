"use client";
import { useEffect, useRef } from "react";

export default function Company() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ventures" className="section-bg-a-r" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="tape-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(255,153,0,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Entrepreneurial Ventures</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Building Beyond{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Borders</span>
          </h2>
        </div>

        <div ref={ref} className="reveal" style={{ maxWidth: 820, margin: "0 auto" }}>
          <div className="glass-card" style={{
            borderRadius: 28, padding: 0, overflow: "hidden",
            border: "1px solid rgba(255,153,0,0.2)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.15), 0 0 60px rgba(255,153,0,0.05)",
          }}>
            {/* Header banner */}
            <div style={{
              padding: "28px 36px",
              background: "linear-gradient(135deg, rgba(255,153,0,0.12) 0%, rgba(19,136,8,0.08) 50%, rgba(0,0,128,0.08) 100%)",
              borderBottom: "1px solid rgba(255,153,0,0.15)",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: "linear-gradient(135deg, #FF9900, #FF6600)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, boxShadow: "0 8px 24px rgba(255,153,0,0.3)", flexShrink: 0,
                }}>🏢</div>
                <div>
                  <div style={{ color: "var(--text-2)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 4 }}>
                    FOUNDER &amp; DIRECTOR
                  </div>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.01em", lineHeight: 1.1,
                  }}>
                    Inland Supreme Constructions
                  </div>
                  <div style={{ color: "#FF9900", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                    🇮🇳 India-Based Construction Firm
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, opacity: 0.7 }}>
                <div style={{ width: 40, height: 4, borderRadius: 2, background: "#FF9900" }} />
                <div style={{ width: 40, height: 4, borderRadius: 2, background: "#FFFFFF" }} />
                <div style={{ width: 40, height: 4, borderRadius: 2, background: "#138808" }} />
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "32px 36px" }}>
              <p style={{ color: "var(--text-4)", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
                Inland Supreme Constructions is Hardik&apos;s proprietary venture in India — a construction and project management firm rooted in delivering quality infrastructure across residential, commercial, and civil domains. Drawing on international best practices from his US-based EPC career, Hardik brings a global standard of project delivery to the Indian construction market.
              </p>

              <div style={{ marginBottom: 28 }}>
                <div style={{ color: "var(--text-2)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 16 }}>
                  CORE FOCUS AREAS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                  {[
                    { icon: "🏘️", title: "Residential Projects",   sub: "Villas, Apartments & Complexes"    },
                    { icon: "🏢", title: "Commercial Construction", sub: "Offices, Retail & Mixed-Use"        },
                    { icon: "🛤️", title: "Infrastructure Works",    sub: "Roads, Bridges & Civil Works"       },
                    { icon: "♻️", title: "Sustainable Development", sub: "Green Building & Energy Efficiency" },
                  ].map(item => (
                    <div key={item.title} className="skill-badge" style={{
                      background: "var(--chip-bg-soft)", border: "1px solid var(--chip-border-soft)",
                      borderRadius: 14, padding: "14px 16px", cursor: "default",
                    }}>
                      <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                      <div style={{ color: "var(--text-1)", fontSize: 13, fontWeight: 600, marginBottom: 3, fontFamily: "var(--font-heading)" }}>
                        {item.title}
                      </div>
                      <div style={{ color: "var(--text-3)", fontSize: 11 }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderLeft: "3px solid #FF9900", paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
                <div style={{ color: "var(--text-2)", fontSize: 12, fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;Every structure we build is a commitment to quality, safety, and community — rooted in the same principles that drive our work across the globe.&rdquo;
                </div>
                <div style={{ color: "#FF9900", fontSize: 11, fontWeight: 700, marginTop: 8, letterSpacing: "0.05em" }}>
                  — HARDIK NAKRANI, Founder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tape-stripe" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />
    </section>
  );
}
