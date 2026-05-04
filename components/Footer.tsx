export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-section-a)",
      borderTop: "1px solid var(--footer-border)",
      padding: "40px 24px",
      textAlign: "center",
    }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(90deg, transparent, var(--footer-border))" }} />
        <span style={{ fontSize: 20 }}>🏗️</span>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(90deg, var(--footer-border), transparent)" }} />
      </div>

      <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 8, letterSpacing: "-0.01em" }}>
        HARDIK NAKRANI
      </div>
      <div style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 24 }}>
        Senior Project Manager · Solar EPC · Construction Engineering
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { label: "Jersey City, NJ",               icon: "📍" },
          { label: "(201) 657-9308",                icon: "📞" },
          { label: "Hardiknakrani3695@gmail.com",   icon: "✉️" },
        ].map(item => (
          <span key={item.label} style={{ color: "var(--text-2)", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
            <span>{item.icon}</span> {item.label}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        {["OSHA 10 & 30", "CMIT", "Procore Certified", "SolarEdge Certified"].map(cert => (
          <span key={cert} style={{
            background: "var(--chip-bg)", border: "1px solid var(--chip-border)",
            color: "var(--text-3)", fontSize: 11, padding: "4px 12px", borderRadius: 100, fontWeight: 500,
          }}>{cert}</span>
        ))}
      </div>

      <div style={{ color: "var(--footer-copy)", fontSize: 11, letterSpacing: "0.05em" }}>
        © {new Date().getFullYear()} Hardik Nakrani · Inland Supreme Constructions · Built with precision
      </div>
    </footer>
  );
}
