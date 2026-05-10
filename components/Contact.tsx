"use client";
import { useEffect, useRef } from "react";

const CONTACT_METHODS = [
  {
    label: "EMAIL",
    value: "Hardiknakrani3695@gmail.com",
    sub: "Preferred contact",
    cta: "Send a message →",
    href: "mailto:Hardiknakrani3695@gmail.com",
    accent: true,
  },
  {
    label: "PHONE",
    value: "(201) 657-9308",
    sub: "Available for calls",
    cta: "Call now →",
    href: "tel:+12016579308",
    accent: false,
  },
  {
    label: "LOCATION",
    value: "Jersey City, NJ",
    sub: "New York Metro Area · Remote Ready",
    cta: null,
    href: null,
    accent: false,
  },
];

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
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ marginBottom: 14 }}>Get In Touch</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 18,
          }}>
            Let&apos;s Build Something Great
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
            Whether you&apos;re looking for a seasoned project manager to lead your next solar or construction project, or want to discuss a potential collaboration — I&apos;m always ready to connect.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 44 }}
        >
          {CONTACT_METHODS.map(method => (
            method.href ? (
              <a
                key={method.label}
                href={method.href}
                className="card card-lift"
                style={{
                  borderRadius: 10, padding: "28px 24px", textDecoration: "none", display: "block",
                  borderTop: method.accent ? "3px solid var(--accent)" : "3px solid var(--border-strong)",
                }}
              >
                <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 10 }}>{method.label}</div>
                <div style={{ color: "var(--text-1)", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 6 }}>
                  {method.value}
                </div>
                <div style={{ color: "var(--text-3)", fontSize: 12, marginBottom: 18 }}>{method.sub}</div>
                <div style={{ color: "var(--accent)", fontSize: 12, fontWeight: 600 }}>{method.cta}</div>
              </a>
            ) : (
              <div
                key={method.label}
                className="card"
                style={{
                  borderRadius: 10, padding: "28px 24px",
                  borderTop: "3px solid var(--border-strong)",
                }}
              >
                <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 10 }}>{method.label}</div>
                <div style={{ color: "var(--text-1)", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: 6 }}>
                  {method.value}
                </div>
                <div style={{ color: "var(--text-3)", fontSize: 12 }}>{method.sub}</div>
              </div>
            )
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href="mailto:Hardiknakrani3695@gmail.com"
            className="btn-primary"
            style={{ padding: "16px 44px", fontSize: 15, fontWeight: 700, letterSpacing: "0.03em" }}
          >
            Start a Conversation →
          </a>
        </div>

      </div>
    </section>
  );
}
