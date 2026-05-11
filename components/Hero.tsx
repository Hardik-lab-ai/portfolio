"use client";
import { useEffect, useState, useRef } from "react";

const ROLES = [
  "Solar EPC Project Manager",
  "Construction Engineering Leader",
  "Renewable Energy Specialist",
  "Microgrid & BESS Project Manager",
  "Multi-Million Dollar Delivery Expert",
];

interface StatItem {
  num?: number;
  text?: string;
  pre?: string;
  suf?: string;
  label: string;
  decimal?: boolean;
}

const HERO_STATS: StatItem[] = [
  { num: 50,  pre: "",  suf: "+ MW",   label: "Solar Capacity Delivered"   },
  { num: 100, pre: "$", suf: "M+",    label: "Project Portfolio Value"     },
  { num: 500, pre: "$", suf: "K+",    label: "Cost Savings Achieved"       },
  { num: 4,   pre: "",  suf: " GPA",  label: "Master's Degree — Stevens",  decimal: true },
  { num: 5,   pre: "",  suf: "+ Yrs", label: "USA, Canada & India"          },
  { num: 0,   pre: "",  suf: "",      label: "Safety Incidents — OSHA 30"  },
  { num: 2,   pre: "",  suf: " Yrs",  label: "BESS Project Experience"     },
  { text: "Microgrid",                 label: "Distributed Energy Systems" },
];

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [charIdx,   setCharIdx]   = useState(0);
  const [counts,    setCounts]    = useState<number[]>(HERO_STATS.map(() => 0));
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 55);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const targets = HERO_STATS.map(s => s.num ?? 0);
    let started = false;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const duration = 2000;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setCounts(targets.map(n => e * n));
          if (p < 1) requestAnimationFrame(tick);
          else setCounts(targets);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayStat = (stat: StatItem, count: number): string => {
    if (stat.text) return stat.text;
    const n = stat.decimal ? count.toFixed(1) : Math.floor(count).toString();
    return `${stat.pre ?? ""}${n}${stat.suf ?? ""}`;
  };

  return (
    <section id="hero" className="hero-grid">

      {/* LEFT — text content */}
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 10% 80px 10%",
        background: "var(--bg-page)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Soft background accent glows */}
        <div style={{
          position: "absolute", top: "15%", left: "-15%",
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-light) 0%, transparent 65%)",
          filter: "blur(60px)", pointerEvents: "none", opacity: 0.9,
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-5%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-2-light) 0%, transparent 65%)",
          filter: "blur(50px)", pointerEvents: "none", opacity: 0.7,
        }} />

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: "var(--text-1)",
          marginBottom: 20,
          animation: "fadeUp 0.6s ease-out 0.1s forwards", opacity: 0,
        }}>
          HARDIK<br />NAKRANI
        </h1>

        {/* Accent bar */}
        <span className="accent-bar" style={{ marginBottom: 24, animation: "fadeUp 0.6s ease-out 0.15s forwards", opacity: 0 }} />

        {/* Typewriter role */}
        <div style={{
          fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
          color: "var(--text-2)", fontWeight: 400, minHeight: "1.8rem", marginBottom: 40,
          animation: "fadeUp 0.6s ease-out 0.2s forwards", opacity: 0,
        }}>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{displayed}</span>
          <span className="cursor" />
        </div>

        {/* Contact strip */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 10, marginBottom: 44,
          animation: "fadeUp 0.6s ease-out 0.3s forwards", opacity: 0,
        }}>
          {[
            { label: "Location", value: "Jersey City, NJ" },
            { label: "Email",    value: "Hardiknakrani3695@gmail.com" },
            { label: "LinkedIn", value: "linkedin.com/in/hardiknakrani" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--text-3)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", width: 56, flexShrink: 0 }}>{label.toUpperCase()}</span>
              <span style={{ width: 1, height: 12, background: "var(--border-strong)", flexShrink: 0 }} />
              <span style={{ color: "var(--text-2)", fontSize: 13 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap",
          animation: "fadeUp 0.6s ease-out 0.4s forwards", opacity: 0,
        }}>
          <a href="#projects" className="btn-primary">View My Work →</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "10%",
          display: "flex", alignItems: "center", gap: 8,
          animation: "fadeUp 0.6s ease-out 1s forwards", opacity: 0,
        }}>
          <div style={{ width: 20, height: 32, borderRadius: 10, border: "1.5px solid var(--border-strong)", display: "flex", justifyContent: "center", paddingTop: 5 }}>
            <div style={{ width: 3, height: 7, borderRadius: 2, background: "var(--accent)", animation: "fadeUp 1.5s ease-in-out infinite" }} />
          </div>
          <span style={{ color: "var(--text-3)", fontSize: 10, letterSpacing: "0.14em", fontWeight: 600 }}>SCROLL</span>
        </div>
      </div>

      {/* RIGHT — stats panel */}
      <div ref={rightRef} style={{
        background: "var(--bg-alt)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 10% 80px",
        position: "relative", overflow: "hidden",
        borderLeft: "1px solid var(--border)",
      }}>
        {/* Animated color blobs */}
        <div style={{
          position: "absolute", top: "-15%", right: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-light) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none",
          animation: "blobFloat1 9s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-5%", left: "-15%",
          width: 340, height: 340, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-2-light) 0%, transparent 70%)",
          filter: "blur(70px)", pointerEvents: "none",
          animation: "blobFloat2 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "42%", left: "35%",
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-light) 0%, transparent 70%)",
          filter: "blur(55px)", pointerEvents: "none",
          animation: "blobFloat3 7s ease-in-out infinite",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{ color: "var(--accent)", fontSize: 10, fontWeight: 700, letterSpacing: "0.20em", marginBottom: 24 }}>
            BY THE NUMBERS
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10, padding: "20px 18px",
                  animation: `fadeUp 0.6s ease-out ${0.1 + i * 0.08}s forwards`, opacity: 0,
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.boxShadow = "var(--shadow-md)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
                  fontWeight: 700, color: "var(--accent)", lineHeight: 1, marginBottom: 6,
                }}>
                  {displayStat(stat, counts[i])}
                </div>
                <div style={{ color: "var(--text-3)", fontSize: 11, lineHeight: 1.4, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications row */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 10 }}>
              CERTIFICATIONS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["OSHA 30", "OSHA 10", "CMIT", "Procore", "SolarEdge"].map(cert => (
                <span
                  key={cert}
                  style={{
                    background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
                    color: "var(--text-2)", fontSize: 10, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 4, letterSpacing: "0.04em",
                    transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.background = "var(--accent-light)";
                    el.style.borderColor = "var(--accent)";
                    el.style.color = "var(--accent)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.background = "var(--chip-bg)";
                    el.style.borderColor = "var(--chip-border)";
                    el.style.color = "var(--text-2)";
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
