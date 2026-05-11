export default function Footer() {
  return (
    <footer style={{
      background: "var(--footer-bg)",
      padding: "48px 32px 36px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ color: "#FFFFFF", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, letterSpacing: "0.06em" }}>
                HARDIK NAKRANI
              </span>
            </div>
            <div style={{ color: "var(--footer-muted)", fontSize: 13, lineHeight: 1.6, maxWidth: 280 }}>
              Senior Project Manager · Solar EPC · Construction Engineering
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.30)", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 14 }}>
              CONTACT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "var(--footer-muted)", fontSize: 13 }}>Jersey City, NJ</span>
              <span style={{ color: "var(--footer-muted)", fontSize: 13 }}>Hardiknakrani3695@gmail.com</span>
              <a href="https://www.linkedin.com/in/hardiknakrani" target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--footer-muted)", fontSize: 13, textDecoration: "none" }}>
                linkedin.com/in/hardiknakrani
              </a>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.30)", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 14 }}>
              CREDENTIALS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["OSHA 10 & 30", "CMIT", "Procore Certified", "SolarEdge Certified"].map(cert => (
                <span key={cert} style={{ color: "var(--footer-muted)", fontSize: 13 }}>{cert}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div style={{ borderTop: "1px solid var(--footer-border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Hardik Nakrani
          </span>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, letterSpacing: "0.04em" }}>
            Built with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
