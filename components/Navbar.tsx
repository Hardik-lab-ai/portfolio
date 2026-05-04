"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/ThemeContext";

const NAV = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills"     },
  { label: "Education",  href: "#education"  },
  { label: "Ventures",   href: "#ventures"   },
  { label: "Contact",    href: "#contact"    },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78"  x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active,   setActive]   = useState("");
  const [spin,     setSpin]     = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      setProgress(pct);
      setScrolled(window.scrollY > 60);
      const ids = NAV.map(n => n.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    setSpin(true);
    toggle();
    setTimeout(() => setSpin(false), 500);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-100"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--teal))" }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          padding: scrolled ? "12px 0" : "22px 0",
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? `1px solid var(--nav-border)` : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.18)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
              transition: "all 0.3s ease",
            }}>
              <span style={{ color: "#0A1628", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-heading)" }}>HN</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "var(--text-1)", fontWeight: 600, fontSize: 14, letterSpacing: "0.05em", fontFamily: "var(--font-heading)", lineHeight: 1 }}>HARDIK NAKRANI</span>
              <span style={{ color: "var(--text-2)", fontSize: 11, marginTop: 2, lineHeight: 1 }}>Senior Project Manager</span>
            </div>
          </a>

          {/* Specialty pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6, padding: "5px 14px",
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 100,
          }}>
            <span style={{ fontSize: 14 }}>🦺</span>
            <span style={{ color: "var(--accent)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>CONSTRUCTION PM</span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV.map(item => {
              const id  = item.href.slice(1);
              const act = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    position: "relative", padding: "8px 14px",
                    color: act ? "var(--accent)" : "var(--text-2)",
                    fontSize: 13, fontWeight: 500, textDecoration: "none",
                    borderRadius: 8,
                    background: act ? "var(--chip-bg)" : "transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { if (!act) (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-1)"; }}
                  onMouseLeave={e => { if (!act) (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)"; }}
                >
                  {item.label}
                  {act && (
                    <span style={{
                      position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)",
                      width: 5, height: 5, borderRadius: "50%", background: "var(--accent)",
                    }} />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side: theme toggle + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Theme toggle */}
            <button
              onClick={handleToggle}
              aria-label="Toggle theme"
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "var(--chip-bg)",
                border: "1px solid var(--chip-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--accent)",
                transition: "background 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,158,11,0.15)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--chip-bg)"; }}
            >
              <span className={spin ? "theme-spin" : ""} style={{ display: "flex" }}>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-primary"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
                color: "#0A1628", padding: "10px 22px", borderRadius: 100,
                fontSize: 13, fontWeight: 700, textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Let&apos;s Connect <span style={{ fontSize: 16 }}>→</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
