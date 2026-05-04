"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CATEGORIES = [
  {
    icon: "☀️", label: "Solar & Energy Systems", color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.25)",
    skills: [
      "SolarEdge Systems", "EPC Lifecycle Mgmt", "Commissioning",
      "System Startup", "Helioscope", "PV System Design",
    ],
  },
  {
    icon: "📊", label: "Project Management Tools", color: "#C9A84C",
    bgColor: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.25)",
    skills: ["Primavera P6", "MS Project", "Procore", "Bluebeam", "Smartsheets"],
  },
  {
    icon: "🏛️", label: "BIM & Design", color: "#10B981",
    bgColor: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)",
    skills: ["AutoCAD", "Revit (Arch/Struct/MEP)", "SketchUp", "Helioscope", "BIM Coordination"],
  },
  {
    icon: "⚙️", label: "Engineering Expertise", color: "#94A3B8",
    bgColor: "rgba(148,163,184,0.08)", borderColor: "rgba(148,163,184,0.25)",
    skills: [
      "Civil Engineering", "Risk Assessment", "Budget & Cost Control",
      "Value Engineering", "Procurement Mgmt", "QA/QC Management",
    ],
  },
];

const CERTS = [
  { name: "OSHA 30",             icon: "🦺", color: "#F59E0B" },
  { name: "OSHA 10",             icon: "⛑️",  color: "#F59E0B" },
  { name: "CMIT",                icon: "📜", color: "#C9A84C" },
  { name: "Procore Certified",   icon: "🏗️", color: "#10B981" },
  { name: "SolarEdge Certified", icon: "☀️", color: "#10B981" },
];

type Category = (typeof CATEGORIES)[number];

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card hover-lift"
      style={{ borderRadius: 20, padding: "28px 26px", borderTop: `3px solid ${cat.color}60` }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: cat.bgColor, border: `1px solid ${cat.borderColor}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>
          {cat.icon}
        </div>
        <div>
          <div style={{ color: cat.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 3 }}>
            EXPERTISE
          </div>
          <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            {cat.label}
          </div>
        </div>
      </div>

      {/* Skill chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cat.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + si * 0.07 + 0.25 }}
            style={{
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              color: cat.color,
              background: cat.bgColor,
              border: `1px solid ${cat.borderColor}`,
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  const certsRef = useRef(null);
  const certsInView = useInView(certsRef, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="section-bg-a-l" style={{ padding: "100px 0", position: "relative" }}>
      <div className="tape-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="section-label" style={{ marginBottom: 12 }}>Technical Arsenal</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Tools of the{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Trade
            </span>
          </h2>
        </motion.div>

        {/* Category cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          marginBottom: 64,
        }}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} index={i} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          ref={certsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={certsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div className="section-label">Certifications &amp; Credentials</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={certsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: i * 0.08 + 0.25 }}
                className="skill-badge glass-card"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 22px", borderRadius: 14, cursor: "default",
                  borderLeft: `3px solid ${cert.color}`,
                }}
              >
                <span style={{ fontSize: 20 }}>{cert.icon}</span>
                <div>
                  <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-heading)" }}>
                    {cert.name}
                  </div>
                  <div style={{ color: cert.color, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em" }}>
                    CERTIFIED ✓
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="tape-stripe" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />
    </section>
  );
}
