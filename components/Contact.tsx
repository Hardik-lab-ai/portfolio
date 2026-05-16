"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" style={{ background: "var(--bg-alt)", padding: "100px 0 90px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ marginBottom: 14 }}>Get In Touch</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 18,
          }}>
            Let&apos;s Build Something Great
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 15.5, maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
            Whether you&apos;re looking for a seasoned project manager to lead your next solar or construction project, or want to discuss a potential collaboration — I&apos;m always ready to connect.
          </p>
        </div>

        {/* Clean contact rows — no card boxes */}
        <div
          ref={ref}
          className="reveal"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
          {/* Email */}
          <a
            href="mailto:Hardiknakrani3695@gmail.com"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "24px 28px", textDecoration: "none",
              borderBottom: "1px solid var(--border)",
              transition: "background 0.2s ease",
              gap: 16,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,85,255,0.04)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--accent-light)", border: "1px solid rgba(0,85,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: "var(--text-3)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 3 }}>EMAIL</div>
                <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-heading)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  Hardiknakrani3695@gmail.com
                </div>
                <div style={{ color: "var(--text-3)", fontSize: 12, marginTop: 2 }}>Preferred contact</div>
              </div>
            </div>
            <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>Send a message →</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hardiknakrani"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "24px 28px", textDecoration: "none",
              borderBottom: "1px solid var(--border)",
              transition: "background 0.2s ease",
              gap: 16,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,85,255,0.04)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--accent-light)", border: "1px solid rgba(0,85,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div>
                <div style={{ color: "var(--text-3)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 3 }}>LINKEDIN</div>
                <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-heading)" }}>
                  linkedin.com/in/hardiknakrani
                </div>
                <div style={{ color: "var(--text-3)", fontSize: 12, marginTop: 2 }}>Connect professionally</div>
              </div>
            </div>
            <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>View profile →</span>
          </a>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "24px 28px" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--chip-bg)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <div style={{ color: "var(--text-3)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 3 }}>LOCATION</div>
              <div style={{ color: "var(--text-1)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-heading)" }}>Jersey City, NJ</div>
              <div style={{ color: "var(--text-3)", fontSize: 12, marginTop: 2 }}>New York Metro Area · Remote Ready</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href="mailto:Hardiknakrani3695@gmail.com"
            className="btn-primary"
            style={{ padding: "15px 44px", fontSize: 14, fontWeight: 700 }}
          >
            Start a Conversation →
          </a>
        </div>

      </div>
    </section>
  );
}
