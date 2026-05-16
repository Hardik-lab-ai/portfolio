"use client";
import { useState, useEffect } from "react";

const NAV = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
];

const ROLES = [
  "Solar EPC Project Manager",
  "Construction Engineering Leader",
  "Renewable Energy Specialist",
  "Microgrid & BESS Project Manager",
  "Multi-Million Dollar Delivery Expert",
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("");
  const [showName,   setShowName]   = useState(false);
  const [roleIdx,    setRoleIdx]    = useState(0);
  const [displayed,  setDisplayed]  = useState("");
  const [deleting,   setDeleting]   = useState(false);
  const [charIdx,    setCharIdx]    = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      const ids = NAV.map(n => n.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowName(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!showName) return;
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
  }, [charIdx, deleting, roleIdx, showName]);

  useEffect(() => {
    if (!showName) {
      setDisplayed("");
      setCharIdx(0);
      setDeleting(false);
      setRoleIdx(0);
    }
  }, [showName]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-400"
      style={{
        padding: scrolled ? "14px 0" : "22px 0",
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--nav-border)",
        boxShadow: scrolled ? "0 2px 16px rgba(26,23,20,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", minWidth: 220 }}>
          <div style={{
            display: "flex", flexDirection: "column", lineHeight: 1,
            opacity: showName ? 1 : 0,
            transform: showName ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}>
            <span style={{ color: "var(--text-1)", fontWeight: 700, fontSize: 17, letterSpacing: "0.06em", fontFamily: "var(--font-heading)" }}>
              HARDIK NAKRANI
            </span>
            <div style={{ fontSize: 12, marginTop: 4, minHeight: "1rem" }}>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>{displayed}</span>
              <span style={{
                display: "inline-block", width: 1.5, height: "0.85em",
                background: "var(--accent)", marginLeft: 2,
                verticalAlign: "middle",
                animation: "blink 1.2s step-end infinite",
              }} />
            </div>
          </div>
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV.map(item => {
            const id  = item.href.slice(1);
            const act = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${act ? "active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="#contact" className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>
            Let&apos;s Connect →
          </a>
        </div>
      </div>
    </nav>
  );
}
