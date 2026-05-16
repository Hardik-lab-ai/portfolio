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
  { num: 4,   pre: "",  suf: " GPA",  label: "Master's — Stevens",  decimal: true },
  { num: 5,   pre: "",  suf: "+ Yrs", label: "USA, Canada & India"          },
  { num: 0,   pre: "",  suf: "",      label: "Safety Incidents / OSHA 30"  },
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
        position: "relative", overflow: "hidden",
      }}>
        {/* Soft ambient glow */}
        <div style={{
          position: "absolute", top: "10%", left: "-20%",
          width: 540, height: 540, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-light) 0%, transparent 65%)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-8%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-2-light) 0%, transparent 65%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: "var(--text-1)",
          marginBottom: 22,
          animation: "fadeUp 0.6s ease-out 0.1s forwards", opacity: 0,
        }}>
          HARDIK<br />NAKRANI
        </h1>

        {/* Accent bar */}
        <span className="accent-bar" style={{ marginBottom: 24, animation: "fadeUp 0.6s ease-out 0.15s forwards", opacity: 0 }} />

        {/* Typewriter role */}
        <div style={{
          fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
          color: "var(--text-3)", fontWeight: 400, minHeight: "1.7rem", marginBottom: 40,
          animation: "fadeUp 0.6s ease-out 0.2s forwards", opacity: 0,
        }}>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{displayed}</span>
          <span className="cursor" />
        </div>

        {/* Contact strip */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 9, marginBottom: 44,
          animation: "fadeUp 0.6s ease-out 0.3s forwards", opacity: 0,
        }}>
          {[
            { label: "Location", value: "Jersey City, NJ" },
            { label: "Email",    value: "Hardiknakrani3695@gmail.com" },
            { label: "LinkedIn", value: "linkedin.com/in/hardiknakrani" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--text-3)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.12em", width: 56, flexShrink: 0 }}>{label.toUpperCase()}</span>
              <span style={{ width: 1, height: 11, background: "var(--border)", flexShrink: 0 }} />
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
          <div style={{ width: 18, height: 30, borderRadius: 9, border: "1.5px solid var(--border-strong)", display: "flex", justifyContent: "center", paddingTop: 4 }}>
            <div style={{ width: 2.5, height: 6, borderRadius: 2, background: "var(--accent)", animation: "fadeUp 1.5s ease-in-out infinite" }} />
          </div>
          <span style={{ color: "var(--text-3)", fontSize: 9.5, letterSpacing: "0.14em", fontWeight: 600 }}>SCROLL</span>
        </div>
      </div>

      {/* RIGHT — stats panel */}
      <div ref={rightRef} style={{
        background: "var(--hero-panel)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 10% 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow blobs */}
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,85,255,0.22) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none",
          animation: "blobFloat1 9s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-8%", left: "-12%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,104,32,0.12) 0%, transparent 70%)",
          filter: "blur(70px)", pointerEvents: "none",
          animation: "blobFloat2 12s ease-in-out infinite",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{ color: "rgba(255,255,255,0.30)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.22em", marginBottom: 32 }}>
            BY THE NUMBERS
          </div>

          {/* Flat 2-column stat grid — no individual cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 0 }}>
            {HERO_STATS.map((stat, i) => {
              const isLastRow = i >= HERO_STATS.length - 2;
              const isRightCol = i % 2 === 1;
              return (
                <div
                  key={stat.label}
                  style={{
                    padding: "20px 0",
                    borderBottom: isLastRow ? "none" : "1px solid rgba(255,255,255,0.07)",
                    borderRight: !isRightCol ? "1px solid rgba(255,255,255,0.07)" : "none",
                    paddingRight: !isRightCol ? 28 : 0,
                    paddingLeft: isRightCol ? 28 : 0,
                    animation: `fadeUp 0.6s ease-out ${0.15 + i * 0.07}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.35rem, 2vw, 1.65rem)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.90)",
                    lineHeight: 1, marginBottom: 5,
                    letterSpacing: "-0.01em",
                  }}>
                    {displayStat(stat, counts[i])}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10.5, lineHeight: 1.4, fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ color: "rgba(255,255,255,0.22)", fontSize: 9, fontWeight: 700, letterSpacing: "0.20em", marginBottom: 12 }}>
              CERTIFICATIONS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["OSHA 30", "OSHA 10", "CMIT", "Procore", "SolarEdge"].map(cert => (
                <span
                  key={cert}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 10, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 99,
                    letterSpacing: "0.04em",
                    transition: "background 0.2s ease, color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.background = "rgba(0,85,255,0.22)";
                    el.style.color = "rgba(255,255,255,0.88)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.color = "rgba(255,255,255,0.55)";
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
