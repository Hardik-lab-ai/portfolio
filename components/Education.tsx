"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EDUCATION = [
  {
    degree: "Diploma",
    field: "Civil Engineering",
    school: "Agnel Polytechnic",
    location: "Navi Mumbai, India",
    year: "2015",
    month: "May",
    gpa: "4.0 / 4.0",
    badge: "Perfect GPA",
    accent: false,
    courses: [
      "Technical Drawing & CAD", "Surveying & Levelling",
      "Construction Math", "Site Supervision",
      "Building Materials", "Concrete Technology",
    ],
  },
  {
    degree: "Bachelor of Engineering",
    field: "Civil Engineering",
    school: "Mumbai University",
    location: "Mumbai, India",
    year: "2018",
    month: "May",
    gpa: "3.75 / 4.0",
    badge: "Distinction",
    accent: false,
    courses: [
      "Structural Analysis & Design", "Geotechnical Engineering",
      "Construction Materials", "Fluid Mechanics",
      "Transportation Engineering", "Environmental Engineering",
    ],
  },
  {
    degree: "Master of Engineering",
    field: "Construction Eng. & Management",
    school: "Stevens Institute of Technology",
    location: "Hoboken, NJ",
    year: "2020",
    month: "Dec",
    gpa: "4.0 / 4.0",
    badge: "Perfect GPA",
    accent: true,
    courses: [
      "Project Lifecycle Management", "Cost & Schedule Control",
      "Construction Law & Contracts", "Risk Management",
      "BIM & Technology Integration", "Sustainable Construction",
    ],
  },
];

type Edu = (typeof EDUCATION)[number];

function EduCard({ edu, index }: { edu: Edu; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <div className="card" style={{
        flex: 1, borderRadius: 10, padding: "24px 22px 20px",
        position: "relative", overflow: "hidden",
        borderTop: edu.accent ? "3px solid var(--accent)" : "3px solid var(--border-strong)",
      }}>
        {/* Ghost year */}
        <div style={{
          position: "absolute", right: -6, top: -8,
          fontSize: 96, fontFamily: "var(--font-heading)", fontWeight: 900,
          color: edu.accent ? "var(--accent)" : "var(--text-3)",
          opacity: 0.05, lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>
          {edu.year}
        </div>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{ color: edu.accent ? "var(--accent)" : "var(--text-3)", fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", marginBottom: 4 }}>
              {edu.degree.toUpperCase()}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.25 }}>
              {edu.field}
            </div>
          </div>
          <div style={{
            textAlign: "center",
            background: edu.accent ? "var(--accent-light)" : "var(--chip-bg)",
            border: `1px solid ${edu.accent ? "rgba(232,96,10,0.22)" : "var(--chip-border)"}`,
            borderRadius: 8, padding: "6px 10px", flexShrink: 0,
          }}>
            <div style={{ color: "var(--text-3)", fontSize: 8, fontWeight: 700, letterSpacing: "0.10em" }}>GPA</div>
            <div style={{ color: edu.accent ? "var(--accent)" : "var(--text-2)", fontSize: 15, fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
              {edu.gpa.split(" / ")[0]}
            </div>
            <div style={{ color: "var(--text-3)", fontSize: 8 }}>/ {edu.gpa.split(" / ")[1]}</div>
          </div>
        </div>

        {/* School + location */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ color: "var(--text-2)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{edu.school}</div>
          <div style={{ display: "flex", gap: 14 }}>
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>{edu.location}</span>
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>{edu.month} {edu.year}</span>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: 14 }} />

        {/* Courses */}
        <div>
          <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 10 }}>
            KEY COURSEWORK
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {edu.courses.map((course, ci) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.22, delay: index * 0.15 + ci * 0.05 + 0.3 }}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: edu.accent ? "var(--accent)" : "var(--border-strong)", flexShrink: 0 }} />
                <span style={{ color: "var(--text-2)", fontSize: 12, lineHeight: 1.3 }}>{course}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector */}
      <div style={{ width: 2, height: 22, background: `linear-gradient(var(--border-strong), transparent)`, margin: "0 auto", flexShrink: 0 }} />

      {/* Node */}
      <div style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%",
          background: edu.accent ? "var(--accent)" : "var(--border-strong)",
          boxShadow: edu.accent ? "0 0 0 4px rgba(232,96,10,0.18)" : "0 0 0 4px var(--border)",
          zIndex: 2,
        }} />
      </div>
    </motion.div>
  );
}

export default function Education() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-40px" });

  return (
    <section id="education" style={{ background: "var(--bg-alt)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span className="section-label" style={{ marginBottom: 14 }}>Academic Foundation</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Engineered to Lead
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "flex", gap: 22, alignItems: "flex-end" }}>
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.year} edu={edu} index={i} />
          ))}
        </div>

        {/* Timeline line */}
        <div ref={lineRef} style={{ position: "relative", height: 2, marginTop: -1 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, var(--border-strong), var(--accent), var(--border-strong))",
              borderRadius: 2, transformOrigin: "left center",
            }}
          />
        </div>

        {/* Year labels */}
        <div style={{ display: "flex", marginTop: 12 }}>
          {EDUCATION.map((edu) => (
            <div key={edu.year} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ color: edu.accent ? "var(--accent)" : "var(--text-3)", fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                {edu.year}
              </div>
              <div style={{ color: "var(--text-3)", fontSize: 10 }}>{edu.month}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
