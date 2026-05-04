"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50,  suffix: "+ MW",      label: "Solar Capacity Delivered",  icon: "⚡", color: "#F59E0B", desc: "EPC lifecycle end-to-end" },
  { value: 100, suffix: "M+",        label: "Project Portfolio Value",   icon: "💰", color: "#C9A84C", desc: "Across renewable & commercial", prefix: "$" },
  { value: 500, suffix: "K+",        label: "Cost Savings Achieved",     icon: "🏆", color: "#10B981", desc: "Value engineering & procurement", prefix: "$" },
  { value: 5,   suffix: "+ Yrs",     label: "Industry Experience",       icon: "📐", color: "#94A3B8", desc: "US & India construction markets" },
  { value: 4,   suffix: ".0",        label: "Master's Degree GPA",       icon: "🎓", color: "#F59E0B", desc: "Stevens Institute of Technology" },
  { value: 0,   suffix: " incidents",label: "Safety Record",             icon: "🦺", color: "#10B981", desc: "OSHA 30 certified — Zero incidents" },
];

function CountUp({ target, duration = 1800, prefix = "", suffix = "" }: {
  target: number; duration?: number; prefix?: string; suffix?: string;
}) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return <div ref={ref} className="stat-number">{prefix}{count}{suffix}</div>;
}

export default function Stats() {
  return (
    <section id="stats" className="section-bg-a-r" style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div className="tape-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 800, height: 300, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>By The Numbers</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Impact That{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Speaks for Itself</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {STATS.map(stat => (
            <div key={stat.label} className="glass-card stat-card" style={{
              borderRadius: 16, padding: "28px 24px", position: "relative", overflow: "hidden", cursor: "default",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: -1, right: -1,
                  width: 0, height: 0, borderStyle: "solid",
                  borderWidth: "0 40px 40px 0",
                  borderColor: `transparent ${stat.color}30 transparent transparent`,
                }} />
              </div>

              <div style={{ fontSize: 28, marginBottom: 12 }}>{stat.icon}</div>

              <div style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 700, color: stat.color, lineHeight: 1, marginBottom: 6, transition: "all 0.4s ease",
              }}>
                <CountUp target={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} />
              </div>

              <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 600, marginBottom: 4, fontFamily: "var(--font-heading)" }}>
                {stat.label}
              </div>
              <div style={{ color: "var(--text-3)", fontSize: 12 }}>{stat.desc}</div>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: stat.color, opacity: 0.4 }} />
            </div>
          ))}
        </div>
      </div>

      <div className="tape-stripe" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />
    </section>
  );
}
