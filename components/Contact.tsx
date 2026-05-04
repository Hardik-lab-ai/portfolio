"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="section-bg-b-l" style={{ padding: "100px 0 80px", position: "relative" }}>
      <div className="tape-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, opacity: 0.5 }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>Get In Touch</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 16,
          }}>
            Let&apos;s Build{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Something Great
            </span>
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Whether you&apos;re looking for a seasoned project manager to lead your next solar or construction project, or want to discuss a potential collaboration — I&apos;m always ready to connect.
          </p>
        </div>

        <div ref={ref} className="reveal" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40,
        }}>
          <a href="mailto:Hardiknakrani3695@gmail.com" className="glass-card hover-lift" style={{
            borderRadius: 20, padding: "28px 26px", textDecoration: "none", display: "block",
            borderTop: "3px solid var(--accent)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>✉️</div>
            <div style={{ color: "var(--accent)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>EMAIL</div>
            <div style={{ color: "var(--text-1)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-heading)", marginBottom: 4 }}>
              Hardiknakrani3695
            </div>
            <div style={{ color: "var(--text-2)", fontSize: 13 }}>@gmail.com</div>
            <div style={{ color: "var(--accent)", fontSize: 12, marginTop: 14, display: "flex", alignItems: "center", gap: 4 }}>
              Send a message →
            </div>
          </a>

          <a href="tel:+12016579308" className="glass-card hover-lift" style={{
            borderRadius: 20, padding: "28px 26px", textDecoration: "none", display: "block",
            borderTop: "3px solid var(--accent-2)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>📞</div>
            <div style={{ color: "var(--accent-2)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>PHONE</div>
            <div style={{ color: "var(--text-1)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-heading)", marginBottom: 4 }}>
              (201) 657-9308
            </div>
            <div style={{ color: "var(--text-2)", fontSize: 13 }}>Available for calls</div>
            <div style={{ color: "var(--accent-2)", fontSize: 12, marginTop: 14, display: "flex", alignItems: "center", gap: 4 }}>
              Call now →
            </div>
          </a>

          <div className="glass-card hover-lift" style={{
            borderRadius: 20, padding: "28px 26px", borderTop: "3px solid var(--teal)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>📍</div>
            <div style={{ color: "var(--teal)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>LOCATION</div>
            <div style={{ color: "var(--text-1)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-heading)", marginBottom: 4 }}>
              Jersey City, NJ
            </div>
            <div style={{ color: "var(--text-2)", fontSize: 13 }}>United States</div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {["New York Metro", "Remote Ready"].map(tag => (
                <span key={tag} style={{
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                  color: "var(--teal)", fontSize: 10, padding: "3px 10px", borderRadius: 100, fontWeight: 600,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="mailto:Hardiknakrani3695@gmail.com" className="btn-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
            color: "#0A1628", padding: "18px 48px", borderRadius: 100,
            fontSize: 16, fontWeight: 800, textDecoration: "none",
            fontFamily: "var(--font-heading)", letterSpacing: "0.04em",
            boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
          }}>
            <span>⚡</span> Start a Conversation <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
