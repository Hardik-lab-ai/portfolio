"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CATEGORIES = [
  {
    label: "Solar & Energy Systems",
    skills: ["Solar EPC", "BESS (Battery Storage)", "Microgrid Systems", "SolarEdge", "Commissioning & Startup", "PV System Design", "Helioscope", "Grid Interconnection"],
    accent: true,
  },
  {
    label: "Project Management Tools",
    skills: ["Primavera P6", "MS Project", "Procore", "Bluebeam", "Smartsheets"],
    accent: false,
  },
  {
    label: "BIM & Design",
    skills: ["AutoCAD", "Revit (Arch/Struct/MEP)", "SketchUp", "Helioscope", "BIM Coordination"],
    accent: false,
  },
  {
    label: "Engineering Expertise",
    skills: ["Civil Engineering", "Risk Assessment", "Budget & Cost Control", "Value Engineering", "Procurement Mgmt", "QA/QC Management"],
    accent: true,
  },
];

const CERTS = [
  { name: "OSHA 30"           },
  { name: "OSHA 10"           },
  { name: "CMIT"              },
  { name: "Procore Certified" },
  { name: "SolarEdge Certified" },
];

type Category = (typeof CATEGORIES)[number];

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card card-lift"
      style={{ borderRadius: 10, padding: "28px 26px", borderTop: cat.accent ? "3px solid var(--accent)" : "3px solid var(--border-strong)" }}
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 6 }}>
          EXPERTISE
        </div>
        <div style={{ color: "var(--text-1)", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-heading)" }}>
          {cat.label}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cat.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.28, delay: index * 0.1 + si * 0.06 + 0.2 }}
            className="skill-chip"
            style={{
              display: "inline-block",
              padding: "6px 13px",
              borderRadius: 4,
              fontSize: 12, fontWeight: 600,
              color: cat.accent ? "var(--accent)" : "var(--text-2)",
              background: cat.accent ? "var(--accent-light)" : "var(--chip-bg)",
              border: `1px solid ${cat.accent ? "rgba(232,96,10,0.20)" : "var(--chip-border)"}`,
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
    <section id="skills" style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span className="section-label" style={{ marginBottom: 14 }}>Technical Arsenal</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Tools of the Trade
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22, marginBottom: 64 }}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} index={i} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          ref={certsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={certsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-label">Certifications &amp; Credentials</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 14 }}
                animate={certsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.08 + 0.2 }}
                className="card card-lift"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 24px", borderRadius: 10,
                  borderLeft: "4px solid var(--accent)",
                  cursor: "default",
                }}
              >
                <div>
                  <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-heading)" }}>
                    {cert.name}
                  </div>
                  <div style={{ color: "var(--accent)", fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", marginTop: 2 }}>
                    CERTIFIED
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
