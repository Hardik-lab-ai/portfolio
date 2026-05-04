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
    color: "#10B981",
    icon: "📐",
    badge: "Perfect GPA",
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
    color: "#C9A84C",
    icon: "🎓",
    badge: "Distinction",
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
    color: "#F59E0B",
    icon: "🏛️",
    badge: "Perfect GPA",
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
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      {/* Card */}
      <div style={{
        flex: 1,
        borderRadius: 18,
        padding: "22px 22px 18px",
        position: "relative",
        overflow: "hidden",
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderTop: `3px solid ${edu.color}`,
      }}>

        {/* Ghost year watermark */}
        <div style={{
          position: "absolute",
          right: -8,
          top: -10,
          fontSize: 100,
          fontFamily: "var(--font-heading)",
          fontWeight: 900,
          color: edu.color,
          opacity: 0.06,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}>
          {edu.year}
        </div>

        {/* Header row: icon + degree label + GPA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{edu.icon}</span>
            <div>
              <div style={{ color: edu.color, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", marginBottom: 2 }}>
                {edu.degree.toUpperCase()}
              </div>
              <div style={{
                fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700,
                color: "var(--text-1)", lineHeight: 1.25,
              }}>
                {edu.field}
              </div>
            </div>
          </div>
          <div style={{
            textAlign: "center",
            background: `${edu.color}15`,
            border: `1px solid ${edu.color}30`,
            borderRadius: 10,
            padding: "5px 10px",
            flexShrink: 0,
          }}>
            <div style={{ color: "var(--text-3)", fontSize: 8, fontWeight: 700, letterSpacing: "0.1em" }}>GPA</div>
            <div style={{ color: edu.color, fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
              {edu.gpa.split(" / ")[0]}
            </div>
            <div style={{ color: "var(--text-3)", fontSize: 8 }}>/ {edu.gpa.split(" / ")[1]}</div>
          </div>
        </div>

        {/* School + location */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: "var(--text-2)", fontSize: 12, fontWeight: 600, marginBottom: 3 }}>
            {edu.school}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>📍 {edu.location}</span>
            <span style={{ color: "var(--text-3)", fontSize: 11 }}>📅 {edu.month} {edu.year}</span>
          </div>
        </div>

        {/* Badge */}
        <div style={{ marginBottom: 14 }}>
          <span style={{
            background: `${edu.color}15`,
            border: `1px solid ${edu.color}35`,
            color: edu.color,
            fontSize: 9, fontWeight: 800,
            padding: "3px 10px", borderRadius: 100, letterSpacing: "0.08em",
          }}>
            ✦ {edu.badge}
          </span>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${edu.color}40, transparent)`,
          marginBottom: 12,
        }} />

        {/* Courses */}
        <div>
          <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
            KEY COURSEWORK
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {edu.courses.map((course, ci) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.25, delay: index * 0.15 + ci * 0.05 + 0.35 }}
                style={{ display: "flex", alignItems: "center", gap: 7 }}
              >
                <div style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: edu.color, flexShrink: 0,
                }} />
                <span style={{ color: "var(--text-4)", fontSize: 11, lineHeight: 1.3 }}>
                  {course}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector line down to timeline */}
      <div style={{
        width: 2,
        height: 24,
        background: `linear-gradient(${edu.color}, ${edu.color}40)`,
        margin: "0 auto",
        flexShrink: 0,
      }} />

      {/* Timeline node */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          background: edu.color,
          boxShadow: `0 0 0 4px ${edu.color}25, 0 0 16px ${edu.color}50`,
          zIndex: 2,
          flexShrink: 0,
        }} />
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-40px" });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-bg-b-r"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "56px 0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", width: "100%" }}>

        {/* Heading */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div className="section-label" style={{ marginBottom: 10 }}>Academic Foundation</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", margin: 0,
          }}>
            Engineered to{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Lead</span>
          </h2>
        </motion.div>

        {/* Cards + timeline */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.year} edu={edu} index={i} />
          ))}
        </div>

        {/* Horizontal timeline line */}
        <div ref={lineRef} style={{ position: "relative", height: 3, marginTop: -2 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, #10B981, #C9A84C, #F59E0B)",
              borderRadius: 2,
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Year labels */}
        <div style={{ display: "flex", marginTop: 12 }}>
          {EDUCATION.map((edu) => (
            <div key={edu.year} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ color: edu.color, fontSize: 13, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
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
