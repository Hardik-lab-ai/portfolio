"use client";
import { useEffect, useState } from "react";

const ROLES = [
  "Solar EPC Project Manager",
  "Construction Engineering Leader",
  "Renewable Energy Specialist",
  "Multi-Million Dollar Delivery Expert",
];

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [charIdx,   setCharIdx]   = useState(0);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 55);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section
      id="hero"
      className="blueprint-grid"
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 100, paddingBottom: 60,
      }}
    >
      {/* Radial ambient glow */}
      <div style={{
        position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,130,0,0.10) 0%, rgba(255,180,0,0.04) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Floating badges */}
      <div style={{
        position: "absolute", top: "18%", left: "8%",
        background: "var(--glass-bg)", border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: 12, padding: "12px 18px", backdropFilter: "blur(12px)",
        animation: "float 5s ease-in-out infinite",
      }}>
        <div style={{ color: "var(--accent)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em" }}>⚡ SOLAR EPC</div>
        <div style={{ color: "var(--text-1)", fontSize: 18, fontWeight: 700, fontFamily: "var(--font-heading)" }}>50+ MW</div>
        <div style={{ color: "var(--text-2)", fontSize: 11 }}>Delivered</div>
      </div>

      <div style={{
        position: "absolute", top: "22%", right: "8%",
        background: "var(--glass-bg)", border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: 12, padding: "12px 18px", backdropFilter: "blur(12px)",
        animation: "float 6s ease-in-out infinite 1s",
      }}>
        <div style={{ color: "var(--teal)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em" }}>💰 PORTFOLIO</div>
        <div style={{ color: "var(--text-1)", fontSize: 18, fontWeight: 700, fontFamily: "var(--font-heading)" }}>$100M+</div>
        <div style={{ color: "var(--text-2)", fontSize: 11 }}>Project Value</div>
      </div>

      <div style={{
        position: "absolute", bottom: "22%", left: "7%",
        background: "var(--glass-bg)", border: "1px solid rgba(201,168,76,0.25)",
        borderRadius: 12, padding: "12px 18px", backdropFilter: "blur(12px)",
        animation: "float 7s ease-in-out infinite 0.5s",
      }}>
        <div style={{ color: "var(--accent-2)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em" }}>🏆 SAVINGS</div>
        <div style={{ color: "var(--text-1)", fontSize: 18, fontWeight: 700, fontFamily: "var(--font-heading)" }}>$500K+</div>
        <div style={{ color: "var(--text-2)", fontSize: 11 }}>Cost Optimized</div>
      </div>

      <div style={{
        position: "absolute", bottom: "25%", right: "7%",
        background: "var(--glass-bg)", border: "1px solid var(--chip-border)",
        borderRadius: 12, padding: "12px 18px", backdropFilter: "blur(12px)",
        animation: "float 5.5s ease-in-out infinite 1.5s",
      }}>
        <div style={{ color: "var(--text-2)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em" }}>📋 CERTS</div>
        <div style={{ color: "var(--text-1)", fontSize: 18, fontWeight: 700, fontFamily: "var(--font-heading)" }}>OSHA 30</div>
        <div style={{ color: "var(--text-2)", fontSize: 11 }}>Certified</div>
      </div>

      {/* Main content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: 800, padding: "0 24px" }}>
        {/* Availability chip */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: 100, padding: "6px 18px", marginBottom: 28,
          animation: "fadeUp 0.5s ease-out forwards",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px #10B981" }} />
          <span style={{ color: "var(--teal)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
          marginBottom: 12,
          animation: "fadeUp 0.7s ease-out 0.1s forwards", opacity: 0,
        }}>
          <span style={{ color: "var(--text-1)" }}>HARDIK</span>{" "}
          <span className="text-shimmer">NAKRANI</span>
        </h1>

        {/* Typewriter role */}
        <div style={{
          fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
          color: "var(--text-2)", fontWeight: 400, minHeight: "2rem", marginBottom: 32,
          animation: "fadeUp 0.7s ease-out 0.2s forwards", opacity: 0,
        }}>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{displayed}</span>
          <span className="cursor" />
        </div>

        {/* Location & contact strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 24, flexWrap: "wrap", marginBottom: 44,
          animation: "fadeUp 0.7s ease-out 0.3s forwards", opacity: 0,
        }}>
          {[
            { icon: "📍", text: "Jersey City, NJ" },
            { icon: "📞", text: "(201) 657-9308" },
            { icon: "✉️", text: "Hardiknakrani3695@gmail.com" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-2)", fontSize: 13 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeUp 0.7s ease-out 0.4s forwards", opacity: 0,
        }}>
          <a href="#experience" className="btn-primary" style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
            color: "#0A1628", padding: "14px 32px", borderRadius: 100,
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 10, letterSpacing: "0.04em",
          }}>
            <span>🏗️</span> View My Work
          </a>
          <a href="#contact" style={{
            background: "transparent", color: "var(--text-1)", padding: "14px 32px", borderRadius: 100,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 10,
            border: "1px solid var(--glass-border)", transition: "all 0.4s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,158,11,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--glass-border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-1)"; }}
          >
            Get In Touch →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "fadeUp 0.7s ease-out 1s forwards", opacity: 0,
      }}>
        <span style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.12em", fontWeight: 500 }}>SCROLL DOWN</span>
        <div style={{
          width: 24, height: 38, borderRadius: 12, border: "1.5px solid var(--glass-border)",
          display: "flex", justifyContent: "center", paddingTop: 6,
        }}>
          <div style={{ width: 4, height: 8, borderRadius: 2, background: "var(--accent)", animation: "float 1.5s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Construction tape bottom accent */}
      <div className="tape-stripe" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, opacity: 0.6 }} />
    </section>
  );
}
