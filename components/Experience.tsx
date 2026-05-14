"use client";
import { useEffect, useRef, useState } from "react";

const TIMELINE = [
  {
    period: "Feb 2023 – Present", role: "Project Manager",
    company: "Core Development Group LLC", location: "Jersey City, NJ — USA & Canada",
    color: "var(--accent)", tag: "Current",
    highlights: [
      "Lead EPC delivery of 50+ MW across solar canopy, rooftop, landfill, BESS, and microgrid projects valued at $100M+",
      "Managed multi-site programs in the USA and Canada — Extra Space Storage (38 sites, 8 MW) and Scripps Hospital (4.5 MW canopy + storage)",
      "Delivered Caribbean off-grid microgrid: 1 MW PV / 4 MWh BESS for an electric cooperative providing full grid independence",
      "2+ years of BESS project management including battery storage commissioning and grid-tied/off-grid integration",
      "Achieved $500,000+ in cost savings through value engineering and procurement optimization",
      "Enforced OSHA 30 safety standards — maintained zero-incident culture across all US and Canada jobsites",
      "Led commissioning and startup of SolarEdge, battery storage, and microgrid systems",
    ],
    tools: ["MS Project", "Primavera P6", "SolarEdge", "Procore", "BESS", "Microgrid", "OSHA 30"],
  },
  {
    period: "Feb 2022 – Feb 2023", role: "Assistant Project Manager",
    company: "Core Development Group LLC", location: "Jersey City, NJ",
    color: "var(--accent-2)", tag: "1 Year",
    highlights: [
      "Managed solar canopy, rooftop, and landfill EPC projects from pre-construction through closeout",
      "Coordinated RFIs, submittals, shop drawings and stakeholder communication across multiple active projects",
      "Tracked budgets and provided cost variance reports to senior leadership",
      "Oversaw site logistics, deliveries and subcontractor scheduling",
    ],
    tools: ["Procore", "Bluebeam", "Smartsheets", "AutoCAD"],
  },
  {
    period: "Oct 2021 – Feb 2022", role: "Senior Project Coordinator",
    company: "Core Development Group LLC", location: "Jersey City, NJ",
    color: "var(--text-3)", tag: "4 Months",
    highlights: [
      "Developed master schedules for multi-site projects across the US",
      "Implemented centralized financial tracking using Procore",
      "Conducted company-wide Procore training sessions",
      "Supported project managers with financial analysis & reporting",
    ],
    tools: ["Procore", "MS Project", "Excel"],
  },
  {
    period: "Jun 2018 – Jun 2019", role: "Project Engineer",
    company: "Kalpana Struct-Con Pvt. Ltd.", location: "Mumbai, India",
    color: "var(--accent-2)", tag: "1 Year",
    highlights: [
      "Managed infrastructure construction including railway station development",
      "Prepared & tracked RFIs, coordinating with architects & clients",
      "Reduced material & equipment costs by 5% through vendor negotiations",
      "Prepared monthly progress reports for stakeholder review meetings",
    ],
    tools: ["AutoCAD", "Revit", "MS Project"],
  },
];

// Top of section = completed project, bottom = construction starting (mirrors career timeline)
const STAGES = [
  {
    label: "System Online",
    sub: "Fully Operational",
    url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    fallback: "linear-gradient(160deg,#051525 0%,#0c3560 40%,#1a5080 65%,#0a2040 100%)",
  },
  {
    label: "Installation Phase",
    sub: "Under Construction",
    url: "https://images.unsplash.com/photo-1466611653911-ac5107f4a9c1?auto=format&fit=crop&w=1600&q=80",
    fallback: "linear-gradient(160deg,#0d1a10 0%,#1e3020 30%,#3d6040 55%,#0d2015 100%)",
  },
  {
    label: "Groundbreaking",
    sub: "Site Preparation",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    fallback: "linear-gradient(160deg,#1a0e05 0%,#3d2010 30%,#5c3a1e 50%,#2d1f0e 100%)",
  },
];

export default function Experience() {
  const sectionRef   = useRef<HTMLElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  // Scroll-driven progress within this section
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect      = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) { setProgress(0); return; }
      setProgress(Math.max(0, Math.min(1, -rect.top / scrollable)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal timeline cards
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    itemRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Compute per-stage opacities based on scroll progress
  // p=0 (top)  → stage 0 (completed)
  // p=1 (bottom) → stage 2 (site prep)
  const p = progress;
  let ops: [number, number, number];
  if (p < 0.30) {
    ops = [1, 0, 0];
  } else if (p < 0.50) {
    const t = (p - 0.30) / 0.20;
    ops = [1 - t, t, 0];
  } else if (p < 0.65) {
    ops = [0, 1, 0];
  } else if (p < 0.85) {
    const t = (p - 0.65) / 0.20;
    ops = [0, 1 - t, t];
  } else {
    ops = [0, 0, 1];
  }

  const activeStage = ops.indexOf(Math.max(...ops));
  const buildPct    = Math.round((1 - progress) * 100);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ position: "relative", minHeight: "calc(100vh + 1200px)" }}
    >
      {/* ── Sticky scroll-driven background ─────────────────────────────── */}
      <div style={{
        position: "sticky", top: 0,
        height: "100vh", marginBottom: "-100vh",
        overflow: "hidden", zIndex: 0,
      }}>
        {STAGES.map((stage, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              background: `url(${stage.url}) center/cover no-repeat, ${stage.fallback}`,
              opacity: ops[i],
              transition: "opacity 1s ease",
            }}
          />
        ))}

        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.72) 100%)",
        }} />

        {/* Stage indicator — top right */}
        <div style={{
          position: "absolute", top: 90, right: 36,
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {STAGES.map((stage, i) => (
            <div key={stage.label} style={{
              display: "flex", alignItems: "center", gap: 10,
              opacity: activeStage === i ? 1 : 0.30,
              transition: "opacity 0.7s ease",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: activeStage === i ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                boxShadow: activeStage === i ? "0 0 6px rgba(255,255,255,0.8)" : "none",
                transition: "all 0.6s ease",
              }} />
              <div>
                <div style={{ color: "#FFFFFF", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em" }}>
                  {stage.label.toUpperCase()}
                </div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 9 }}>{stage.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Build progress meter — bottom left */}
        <div style={{
          position: "absolute", bottom: 36, left: 36,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.40)", fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 6 }}>
              PROJECT COMPLETION
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 160, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.18)" }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  width: `${buildPct}%`,
                  background: "linear-gradient(90deg, #4A78E0, #FFFFFF)",
                  transition: "width 0.15s ease",
                }} />
              </div>
              <span style={{
                color: "#FFFFFF", fontSize: 14, fontWeight: 800,
                fontFamily: "var(--font-heading)", letterSpacing: "0.03em",
              }}>
                {buildPct}%
              </span>
            </div>
          </div>
        </div>

        {/* Scroll hint at bottom */}
        <div style={{
          position: "absolute", bottom: 36, right: 36,
          color: "rgba(255,255,255,0.25)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em",
          writingMode: "vertical-rl", textOrientation: "mixed",
        }}>
          SCROLL TO BUILD
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, padding: "100px 0 140px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

          {/* Header — white text over dark image */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{
              fontFamily: "var(--font-heading)", letterSpacing: "0.20em",
              textTransform: "uppercase", color: "var(--accent)",
              fontSize: "0.70rem", fontWeight: 700, display: "block", marginBottom: 14,
            }}>
              Professional Journey
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: 24,
            }}>
              Professional Experience
            </h2>
            <div style={{
              height: 1, maxWidth: 360, margin: "0 auto",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 20%, rgba(74,120,224,0.8) 50%, rgba(255,255,255,0.35) 80%, transparent)",
            }} />
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Spine */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0,
              width: 2, transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.20)", borderRadius: 1,
            }} />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={el => { itemRefs.current[i] = el; }}
                  className={isLeft ? "reveal-left" : "reveal-right"}
                  style={{
                    display: "flex",
                    justifyContent: isLeft ? "flex-end" : "flex-start",
                    alignItems: "flex-start",
                    marginBottom: 52,
                    paddingRight: isLeft ? "calc(50% + 36px)" : 0,
                    paddingLeft:  isLeft ? 0 : "calc(50% + 36px)",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  {/* Dot on spine */}
                  <div style={{
                    position: "absolute", left: "50%", transform: "translateX(-50%)",
                    width: 16, height: 16, borderRadius: "50%",
                    background: item.color, border: "3px solid rgba(0,0,0,0.6)",
                    boxShadow: `0 0 0 3px ${item.color}50, 0 0 12px ${item.color}40`,
                    zIndex: 2, marginTop: 24,
                  }} />

                  {/* Glass card */}
                  <div style={{
                    borderRadius: 12, padding: "26px 26px 22px",
                    maxWidth: 460, width: "100%",
                    background: "rgba(255,255,255,0.93)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: `1px solid rgba(255,255,255,0.5)`,
                    borderTop: `3px solid ${item.color}`,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
                  }}>
                    {/* Role + company */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#080808", lineHeight: 1.2 }}>
                          {item.role}
                        </div>
                        <div style={{ color: item.color, fontSize: 13, fontWeight: 600, marginTop: 3 }}>{item.company}</div>
                      </div>
                      <span style={{
                        background: "rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.12)",
                        color: "#6E6E6E", fontSize: 10, fontWeight: 700,
                        padding: "3px 10px", borderRadius: 4, letterSpacing: "0.05em",
                        whiteSpace: "nowrap", flexShrink: 0, marginLeft: 12,
                      }}>{item.tag}</span>
                    </div>

                    {/* Period + location */}
                    <div style={{ display: "flex", gap: 18, marginBottom: 16 }}>
                      <span style={{ color: "#6E6E6E", fontSize: 11 }}>{item.period}</span>
                      <span style={{ color: "#6E6E6E", fontSize: 11 }}>{item.location}</span>
                    </div>

                    {/* Bullets */}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: 16 }}>
                      {item.highlights.map((h, hi) => (
                        <li key={hi} style={{
                          display: "flex", alignItems: "flex-start", gap: 8,
                          marginBottom: 7, color: "#1A1A1A", fontSize: 13, lineHeight: 1.55,
                        }}>
                          <span style={{ color: item.color, marginTop: 5, flexShrink: 0, fontSize: 8 }}>◆</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tool chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {item.tools.map(tool => (
                        <span key={tool} style={{
                          background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.12)",
                          color: "#6E6E6E", fontSize: 11, padding: "3px 10px",
                          borderRadius: 4, fontWeight: 500,
                        }}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End dot */}
            <div style={{
              position: "absolute", left: "50%", bottom: -8, transform: "translateX(-50%)",
              width: 10, height: 10, borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 14px rgba(74,120,224,0.6)",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
