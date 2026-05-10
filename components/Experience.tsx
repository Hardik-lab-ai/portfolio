"use client";
import { useEffect, useRef } from "react";

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

export default function Experience() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    itemRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" style={{ background: "var(--bg-alt)", padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label" style={{ marginBottom: 14 }}>Professional Journey</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 24,
          }}>
            Building Excellence One Project at a Time
          </h2>
          <div className="ruler-divider" style={{ maxWidth: 360, margin: "0 auto" }} />
        </div>

        <div style={{ position: "relative" }}>
          {/* Spine */}
          <div className="timeline-spine" />

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
                  marginBottom: 48,
                  paddingRight: isLeft ? "calc(50% + 36px)" : 0,
                  paddingLeft:  isLeft ? 0 : "calc(50% + 36px)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: "50%", transform: "translateX(-50%)",
                  width: 16, height: 16, borderRadius: "50%",
                  background: item.color, border: "3px solid var(--bg-alt)",
                  boxShadow: `0 0 0 3px ${item.color}40`,
                  zIndex: 2, marginTop: 26,
                }} />

                {/* Card */}
                <div className="card" style={{
                  borderRadius: 10, padding: "26px 26px 22px",
                  maxWidth: 460, width: "100%",
                  borderTop: `3px solid ${item.color}`,
                  position: "relative",
                }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--text-1)", lineHeight: 1.2 }}>
                        {item.role}
                      </div>
                      <div style={{ color: item.color, fontSize: 13, fontWeight: 600, marginTop: 3 }}>{item.company}</div>
                    </div>
                    <span style={{
                      background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
                      color: "var(--text-3)", fontSize: 10, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 4, letterSpacing: "0.05em", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 12,
                    }}>{item.tag}</span>
                  </div>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: 18, marginBottom: 16 }}>
                    <span style={{ color: "var(--text-3)", fontSize: 11 }}>{item.period}</span>
                    <span style={{ color: "var(--text-3)", fontSize: 11 }}>{item.location}</span>
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: 16 }}>
                    {item.highlights.map((h, hi) => (
                      <li key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7, color: "var(--text-2)", fontSize: 13, lineHeight: 1.55 }}>
                        <span style={{ color: item.color, marginTop: 5, flexShrink: 0, fontSize: 8 }}>◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tool chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.tools.map(tool => (
                      <span key={tool} className="skill-chip" style={{
                        background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
                        color: "var(--text-3)", fontSize: 11, padding: "3px 10px", borderRadius: 4, fontWeight: 500,
                      }}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{
            position: "absolute", left: "50%", bottom: -8, transform: "translateX(-50%)",
            width: 10, height: 10, borderRadius: "50%",
            background: "var(--accent)", boxShadow: "0 0 14px rgba(193,78,35,0.45)",
          }} />
        </div>
      </div>
    </section>
  );
}
