"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CATEGORIES = [
  {
    label: "Solar & Energy Systems",
    skills: ["Solar EPC", "BESS", "Microgrid", "SolarEdge", "Commissioning", "PV Design", "Helioscope", "Grid Interconnection"],
    accent: true,
  },
  {
    label: "Project Management",
    skills: ["Primavera P6", "MS Project", "Procore", "Bluebeam", "Smartsheets"],
    accent: false,
  },
  {
    label: "BIM & Design",
    skills: ["AutoCAD", "Revit (Arch/Struct/MEP)", "SketchUp", "BIM Coordination"],
    accent: false,
  },
  {
    label: "Engineering & Controls",
    skills: ["Civil Engineering", "Risk Assessment", "Budget & Cost Control", "Value Engineering", "Procurement", "QA/QC"],
    accent: true,
  },
];

const CERTS = [
  { name: "OSHA 30",            detail: "Construction Safety"      },
  { name: "OSHA 10",            detail: "General Industry"         },
  { name: "CMIT",               detail: "Construction Mgmt"        },
  { name: "Procore Certified",  detail: "Project Delivery"         },
  { name: "SolarEdge Certified",detail: "Commissioning"            },
];

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const certsRef = useRef(null);
  const certsInView = useInView(certsRef, { once: true, margin: "-50px" });

  return (
    <section id="skills" style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span className="section-label" style={{ marginBottom: 12 }}>Technical Arsenal</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Tools of the Trade
          </h2>
        </motion.div>

        {/* Skill groups — no card wrappers, just headers + pills */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 64px", marginBottom: 72 }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 22 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.48, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: "32px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 3, height: 16, borderRadius: 2, background: cat.accent ? "var(--accent)" : "var(--accent-2)", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700,
                  color: "var(--text-1)", letterSpacing: "-0.01em",
                }}>
                  {cat.label}
                </span>
              </div>

              {/* Skill pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={gridInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.24, delay: i * 0.1 + si * 0.05 + 0.2 }}
                    className="skill-chip"
                    style={{
                      display: "inline-block",
                      padding: "5px 13px",
                      borderRadius: 99,
                      fontSize: 12, fontWeight: 500,
                      color: cat.accent ? "var(--accent)" : "var(--text-2)",
                      background: cat.accent ? "var(--accent-light)" : "var(--chip-bg)",
                      border: `1px solid ${cat.accent ? "rgba(217,107,67,0.16)" : "var(--chip-border)"}`,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications — clean row of badges */}
        <motion.div
          ref={certsRef}
          initial={{ opacity: 0, y: 18 }}
          animate={certsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="section-label">Certifications &amp; Credentials</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 12 }}
                animate={certsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 99,
                  cursor: "default",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.boxShadow = "0 2px 12px rgba(217,107,67,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                <span style={{ color: "var(--text-1)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-heading)" }}>
                  {cert.name}
                </span>
                <span style={{ color: "var(--text-3)", fontSize: 11, borderLeft: "1px solid var(--border)", paddingLeft: 10 }}>
                  {cert.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
