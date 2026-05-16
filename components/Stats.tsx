"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50,  suffix: "+ MW",  label: "Solar Capacity Delivered",  desc: "EPC lifecycle, end-to-end",      prefix: "",  accent: true  },
  { value: 100, suffix: "M+",   label: "Project Portfolio Value",    desc: "Across renewable & commercial", prefix: "$", accent: false },
  { value: 500, suffix: "K+",   label: "Cost Savings Achieved",      desc: "Value engineering",             prefix: "$", accent: true  },
  { value: 5,   suffix: "+ Yrs",label: "Industry Experience",        desc: "USA, Canada & India markets",   prefix: "",  accent: false },
  { value: 4,   suffix: ".0",   label: "Master's Degree GPA",        desc: "Stevens Institute of Tech.",    prefix: "",  accent: true  },
];

function CountUp({ target, prefix = "", suffix = "", duration = 1800 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

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
      const ease = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3);
      setCount(Math.floor(ease * target));
      if (ease < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} style={{ background: "var(--bg-alt)", padding: "88px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ marginBottom: 12 }}>By The Numbers</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Impact That Speaks for Itself
          </h2>
        </div>

        {/* Horizontal strip — no cards, just numbers */}
        <div
          className="reveal"
          style={{
            display: "flex",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                padding: "44px 28px",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                textAlign: "center",
                transition: "background 0.22s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,245,255,0.03)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                fontWeight: 700,
                color: stat.accent ? "var(--accent)" : "var(--text-1)",
                lineHeight: 1,
                marginBottom: 10,
                letterSpacing: "-0.02em",
              }}>
                <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div style={{ color: "var(--text-2)", fontSize: 13, fontWeight: 600, marginBottom: 4, fontFamily: "var(--font-heading)" }}>
                {stat.label}
              </div>
              <div style={{ color: "var(--text-3)", fontSize: 11.5 }}>{stat.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
