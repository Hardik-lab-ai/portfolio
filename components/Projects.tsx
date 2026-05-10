"use client";
import { useEffect, useRef } from "react";

interface Project {
  name: string;
  location: string;
  size: string;
  type: string;
  category: "canopy" | "rooftop" | "landfill" | "bess";
  description: string;
}

const PROJECTS: Project[] = [
  {
    name: "Croton-Harmon Train Station",
    location: "Hudson, NY",
    size: "4.2 MW",
    type: "Solar Canopy",
    category: "canopy",
    description: "Large-scale solar canopy over a Metro-North commuter rail parking facility. Managed EPC delivery from engineering through commissioning.",
  },
  {
    name: "Pennsville Solar Landfill",
    location: "Pennsville, NJ",
    size: "5.7 MW",
    type: "Landfill Solar",
    category: "landfill",
    description: "Utility-scale ground-mount on a closed municipal landfill. Coordinated environmental compliance, civil construction, and grid interconnection.",
  },
  {
    name: "Extra Space Storage",
    location: "38 Locations Nationwide",
    size: "8 MW Total",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Multi-site rooftop solar program across 38 storage facilities. Managed simultaneous permitting, procurement, and construction across multiple states.",
  },
  {
    name: "Scripps Hospital",
    location: "San Diego, CA",
    size: "4.5 MW",
    type: "Canopy + Storage",
    category: "canopy",
    description: "Solar canopy paired with battery storage on a major healthcare campus. Focused on energy resilience, critical load continuity, and safety compliance.",
  },
  {
    name: "Caribbean Microgrid",
    location: "Caribbean",
    size: "1.0 MW / 4 MWh",
    type: "BESS & Microgrid",
    category: "bess",
    description: "Island microgrid with battery energy storage for an electric cooperative. Delivered grid independence and resiliency in a remote, off-grid environment.",
  },
  {
    name: "Sicklerville Solar Landfill",
    location: "Sicklerville, NJ",
    size: "2.3 MW",
    type: "Landfill Solar",
    category: "landfill",
    description: "Brownfield solar redevelopment on a closed landfill. Oversaw geotechnical assessment, racking design, and NJ BPU interconnection process.",
  },
  {
    name: "Selective Insurance HQ",
    location: "Branchville, NJ",
    size: "780 kW",
    type: "Solar Canopy",
    category: "canopy",
    description: "Solar canopy at a corporate headquarters campus. Managed structural engineering coordination, municipality approvals, and on-time delivery.",
  },
  {
    name: "FedEx Distribution Facility",
    location: "Washington, DC",
    size: "914 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Commercial rooftop installation on a high-throughput logistics facility. Coordinated roof warranty compliance, loading analysis, and electrical interconnection.",
  },
  {
    name: "Brenntag Industrial Facility",
    location: "Santa Fe Springs, CA",
    size: "580 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Rooftop PV system on an industrial chemicals distribution center. Managed LADBS permitting, safety planning, and IOU interconnection.",
  },
  {
    name: "St. John's University",
    location: "Queens, NY",
    size: "118 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Rooftop solar supporting the university's sustainability program. Handled NYC DOB filings, Con Edison interconnection, and campus facilities coordination.",
  },
];

const TAG: Record<Project["category"], { bg: string; color: string }> = {
  canopy:   { bg: "var(--accent-light)",   color: "var(--accent)"   },
  rooftop:  { bg: "var(--accent-2-light)", color: "var(--accent-2)" },
  landfill: { bg: "rgba(16,185,129,0.12)", color: "#059669"         },
  bess:     { bg: "rgba(124,58,237,0.12)", color: "#7c3aed"         },
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ background: "var(--bg-alt)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <span className="section-label" style={{ marginBottom: 12 }}>Featured Projects</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Projects I Delivered
          </h2>
          <p style={{ color: "var(--text-3)", fontSize: 14, maxWidth: 560, lineHeight: 1.7 }}>
            A selection of solar EPC, landfill, canopy, rooftop, BESS, and microgrid projects managed
            as part of the project team at{" "}
            <a
              href="https://www.coredevusa.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
            >
              Core Development Group (Coredev USA)
            </a>.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {PROJECTS.map((project, i) => {
            const tag = TAG[project.category];
            return (
              <div
                key={project.name}
                className="reveal card card-lift"
                style={{ borderRadius: 12, padding: "24px", animationDelay: `${i * 0.05}s` }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
                  <span style={{
                    background: tag.bg, color: tag.color,
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.10em",
                    padding: "4px 10px", borderRadius: 4,
                  }}>
                    {project.type.toUpperCase()}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700,
                    color: "var(--accent)", letterSpacing: "0.02em",
                  }}>
                    {project.size}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700,
                  color: "var(--text-1)", marginBottom: 6, lineHeight: 1.3,
                }}>
                  {project.name}
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-3)", fontSize: 12, marginBottom: 14 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  {project.location}
                </div>

                <p style={{ color: "var(--text-3)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                  {project.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="reveal" style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ color: "var(--text-3)", fontSize: 12 }}>
            All projects publicly listed on{" "}
            <a
              href="https://www.coredevusa.com/company/projects/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              coredevusa.com
            </a>
            . Included with attribution as part of personal project management portfolio.
          </p>
        </div>

      </div>
    </section>
  );
}
