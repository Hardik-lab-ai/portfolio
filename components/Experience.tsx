"use client";
import { useEffect, useRef } from "react";

const TIMELINE = [
  {
    period: "Feb 2023 – Present", role: "Project Manager",
    company: "Core Development Group LLC", location: "Jersey City, NJ",
    color: "#F59E0B", icon: "☀️", tag: "Current", tagColor: "#10B981",
    highlights: [
      "Lead full EPC lifecycle of solar projects totaling 50+ MW valued at over $100M",
      "Oversee engineering coordination — civil, structural & electrical disciplines",
      "Drive project schedules using MS Project & Primavera P6 for milestone adherence",
      "Achieved $500,000+ in cost savings through value engineering & procurement optimization",
      "Enforce OSHA safety standards — maintained zero-incident jobsite culture",
      "Lead commissioning & system startup of SolarEdge systems",
    ],
    tools: ["MS Project", "Primavera P6", "SolarEdge", "Procore", "OSHA 30"],
  },
  {
    period: "Feb 2022 – Feb 2023", role: "Assistant Project Manager",
    company: "Core Development Group LLC", location: "Jersey City, NJ",
    color: "#C9A84C", icon: "🏗️", tag: "1 Year", tagColor: "#C9A84C",
    highlights: [
      "Managed commercial & renewable projects from pre-construction through closeout",
      "Coordinated RFIs, submittals, shop drawings & stakeholder communication",
      "Tracked budgets & provided cost variance reports to senior leadership",
      "Oversaw site logistics, deliveries & subcontractor scheduling",
    ],
    tools: ["Procore", "Bluebeam", "Smartsheets", "AutoCAD"],
  },
  {
    period: "Oct 2021 – Feb 2022", role: "Senior Project Coordinator",
    company: "Core Development Group LLC", location: "Jersey City, NJ",
    color: "#94A3B8", icon: "📋", tag: "4 Months", tagColor: "#94A3B8",
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
    color: "#10B981", icon: "🔩", tag: "1 Year", tagColor: "#10B981",
    highlights: [
      "Managed infrastructure construction including railway station development",
      "Prepared & tracked RFIs, coordinating with architects & clients",
      "Reduced material & equipment costs by 5% through vendor negotiations",
      "Prepared monthly progress reports for stakeholder review meetings",
    ],
    tools: ["AutoCAD", "Revit", "MS Project"],
  },
];

export default function Experience() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    itemRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="section-bg-b-l" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Professional Journey</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Building{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Excellence</span>
            {" "}One Project at a Time
          </h2>
          <div className="ruler-divider" style={{ maxWidth: 400, margin: "24px auto 0" }} />
        </div>

        <div style={{ position: "relative" }}>
          {/* Center spine */}
          <div className="timeline-track" style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 3, transform: "translateX(-50%)", borderRadius: 2,
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
                  alignItems: "flex-start", marginBottom: 56,
                  paddingRight: isLeft ? "calc(50% + 36px)" : 0,
                  paddingLeft:  isLeft ? 0 : "calc(50% + 36px)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: "50%", transform: "translateX(-50%)",
                  width: 18, height: 18, borderRadius: "50%",
                  background: item.color,
                  border: `3px solid var(--bg-section-b)`,
                  boxShadow: `0 0 0 3px ${item.color}40, 0 0 20px ${item.color}50`,
                  zIndex: 2, marginTop: 28,
                }} />

                {/* Card */}
                <div className="glass-card card-glow" style={{
                  borderRadius: 18, padding: "28px 28px 24px",
                  maxWidth: 460, width: "100%",
                  borderLeft: `3px solid ${item.color}`,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.color}, transparent)` }} />

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${item.color}18`, border: `1px solid ${item.color}30`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                      }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "var(--text-1)", lineHeight: 1.2 }}>
                          {item.role}
                        </div>
                        <div style={{ color: item.color, fontSize: 13, fontWeight: 600, marginTop: 2 }}>{item.company}</div>
                      </div>
                    </div>
                    <span style={{
                      background: `${item.tagColor}18`, border: `1px solid ${item.tagColor}35`,
                      color: item.tagColor, fontSize: 10, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 100, letterSpacing: "0.05em", whiteSpace: "nowrap",
                    }}>{item.tag}</span>
                  </div>

                  <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                    <span style={{ color: "var(--text-3)", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>📅 {item.period}</span>
                    <span style={{ color: "var(--text-3)", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>📍 {item.location}</span>
                  </div>

                  <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: 18 }}>
                    {item.highlights.map((h, hi) => (
                      <li key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, color: "var(--text-4)", fontSize: 13, lineHeight: 1.5 }}>
                        <span style={{ color: item.color, marginTop: 2, flexShrink: 0, fontSize: 10 }}>◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.tools.map(tool => (
                      <span key={tool} className="skill-badge" style={{
                        background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
                        color: "var(--text-2)", fontSize: 11, padding: "3px 10px", borderRadius: 100, fontWeight: 500,
                      }}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{
            position: "absolute", left: "50%", bottom: -8, transform: "translateX(-50%)",
            width: 12, height: 12, borderRadius: "50%",
            background: "#10B981", boxShadow: "0 0 20px rgba(16,185,129,0.6)",
          }} />
        </div>
      </div>
    </section>
  );
}
