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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.52, delay: index * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <div style={{
        flex: 1,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderTop: edu.accent ? "2px solid var(--accent)" : "2px solid var(--border-strong)",
        borderRadius: 12,
        padding: "22px 20px 18px",
        position: "relative", overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "var(--shadow-md)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "var(--shadow-sm)";
        }}
      >
        {/* Ghost year */}
        <div style={{
          position: "absolute", right: -4, top: -6,
          fontSize: 88, fontFamily: "var(--font-heading)", fontWeight: 900,
          color: edu.accent ? "var(--accent)" : "var(--text-3)",
          opacity: 0.04, lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>
          {edu.year}
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ flex: 1, paddingRight: 10 }}>
            <div style={{ color: edu.accent ? "var(--accent)" : "var(--text-3)", fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", marginBottom: 4 }}>
              {edu.degree.toUpperCase()}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 14.5, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.25 }}>
              {edu.field}
            </div>
          </div>
          <div style={{
            textAlign: "center",
            background: edu.accent ? "var(--accent-light)" : "var(--chip-bg)",
            border: `1px solid ${edu.accent ? "rgba(0,206,209,0.18)" : "var(--chip-border)"}`,
            borderRadius: 8, padding: "5px 9px", flexShrink: 0,
          }}>
            <div style={{ color: "var(--text-3)", fontSize: 7.5, fontWeight: 700, letterSpacing: "0.10em" }}>GPA</div>
            <div style={{ color: edu.accent ? "var(--accent)" : "var(--text-2)", fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
              {edu.gpa.split(" / ")[0]}
            </div>
            <div style={{ color: "var(--text-3)", fontSize: 7.5 }}>/ {edu.gpa.split(" / ")[1]}</div>
          </div>
        </div>

        {/* School + location */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ color: "var(--text-2)", fontSize: 12.5, fontWeight: 600, marginBottom: 3 }}>{edu.school}</div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>{edu.location}</span>
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>{edu.month} {edu.year}</span>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: 12 }} />

        {/* Courses */}
        <div>
          <div style={{ color: "var(--text-3)", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 9 }}>
            KEY COURSEWORK
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {edu.courses.map((course, ci) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.2, delay: index * 0.14 + ci * 0.05 + 0.28 }}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: edu.accent ? "var(--accent)" : "var(--border-strong)", flexShrink: 0 }} />
                <span style={{ color: "var(--text-2)", fontSize: 11.5, lineHeight: 1.3 }}>{course}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector */}
      <div style={{ width: 1, height: 20, background: `linear-gradient(var(--border-strong), transparent)`, margin: "0 auto", flexShrink: 0 }} />

      {/* Node */}
      <div style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: edu.accent ? "var(--accent)" : "var(--border-strong)",
          boxShadow: edu.accent ? "0 0 0 4px rgba(0,206,209,0.14)" : "0 0 0 4px var(--border)",
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
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span className="section-label" style={{ marginBottom: 12 }}>Academic Foundation</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
          }}>
            Engineered to Lead
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.year} edu={edu} index={i} />
          ))}
        </div>

        {/* Timeline line */}
        <div ref={lineRef} style={{ position: "relative", height: 1, marginTop: -1 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, var(--border-strong), var(--accent), var(--border-strong))",
              borderRadius: 2, transformOrigin: "left center",
            }}
          />
        </div>

        {/* Year labels */}
        <div style={{ display: "flex", marginTop: 10 }}>
          {EDUCATION.map((edu) => (
            <div key={edu.year} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ color: edu.accent ? "var(--accent)" : "var(--text-3)", fontSize: 13, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
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
