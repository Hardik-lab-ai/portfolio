"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50,  suffix: "+ MW",        label: "Solar Capacity Delivered",  accent: true,  desc: "EPC lifecycle, end-to-end",          prefix: "" },
  { value: 100, suffix: "M+",          label: "Project Portfolio Value",   accent: false, desc: "Across renewable & commercial",       prefix: "$" },
  { value: 500, suffix: "K+",          label: "Cost Savings Achieved",     accent: true,  desc: "Value engineering & procurement",     prefix: "$" },
  { value: 5,   suffix: "+ Yrs",       label: "Industry Experience",       accent: false, desc: "USA, Canada & India markets",         prefix: "" },
  { value: 4,   suffix: ".0",          label: "Master's Degree GPA",       accent: true,  desc: "Stevens Institute of Technology",     prefix: "" },
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

  return <div ref={ref}>{prefix}{count}{suffix}</div>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" style={{ background: "var(--bg-alt)", padding: "96px 0" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label" style={{ marginBottom: 14 }}>By The Numbers</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 0,
          }}>
            Impact That Speaks for Itself
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal card card-lift`}
              style={{
                borderRadius: 10, padding: "32px 24px",
                borderTop: stat.accent ? "3px solid var(--accent)" : "3px solid var(--border-strong)",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                color: stat.accent ? "var(--accent)" : "var(--text-1)",
                lineHeight: 1, marginBottom: 10,
              }}>
                <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 600, marginBottom: 5, fontFamily: "var(--font-heading)" }}>
                {stat.label}
              </div>
              <div style={{ color: "var(--text-3)", fontSize: 12 }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
