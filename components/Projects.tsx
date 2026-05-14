"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// World landmasses (includes Caribbean islands) + US state borders overlaid
const WORLD_GEO = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const US_GEO    = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type Category = "canopy" | "rooftop" | "landfill" | "bess";

interface Project {
  name: string;
  coords: [number, number];
  location: string;
  size: string;
  type: string;
  category: Category;
  description: string;
  multiSite?: boolean;
}

const CAT_COLOR: Record<Category, string> = {
  canopy:   "#2B55C4",
  rooftop:  "#C96B52",
  landfill: "#059669",
  bess:     "#7c3aed",
};

const CAT_LABEL: Record<Category, string> = {
  canopy:   "Solar Canopy",
  rooftop:  "Rooftop Solar",
  landfill: "Landfill Solar",
  bess:     "BESS & Microgrid",
};

const PROJECTS: Project[] = [
  {
    name: "Croton-Harmon Train Station",
    coords: [-73.89, 41.19],
    location: "Hudson, NY",
    size: "4.2 MW",
    type: "Solar Canopy",
    category: "canopy",
    description: "Large-scale solar canopy over a Metro-North commuter rail parking facility. Managed EPC delivery from engineering through commissioning.",
  },
  {
    name: "St. John's University",
    coords: [-73.80, 40.73],
    location: "Queens, NY",
    size: "118 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Rooftop solar supporting the university's sustainability program. Handled NYC DOB filings, Con Edison interconnection, and campus facilities coordination.",
  },
  {
    name: "Selective Insurance HQ",
    coords: [-74.74, 41.14],
    location: "Branchville, NJ",
    size: "780 kW",
    type: "Solar Canopy",
    category: "canopy",
    description: "Solar canopy at a corporate headquarters campus. Managed structural engineering coordination, municipality approvals, and on-time delivery.",
  },
  {
    name: "Pennsville Solar Landfill",
    coords: [-75.52, 39.65],
    location: "Pennsville, NJ",
    size: "5.7 MW",
    type: "Landfill Solar",
    category: "landfill",
    description: "Utility-scale ground-mount on a closed municipal landfill. Coordinated environmental compliance, civil construction, and grid interconnection.",
  },
  {
    name: "Sicklerville Solar Landfill",
    coords: [-75.00, 39.74],
    location: "Sicklerville, NJ",
    size: "2.3 MW",
    type: "Landfill Solar",
    category: "landfill",
    description: "Brownfield solar redevelopment on a closed landfill. Oversaw geotechnical assessment, racking design, and NJ BPU interconnection process.",
  },
  {
    name: "FedEx Distribution Facility",
    coords: [-77.04, 38.89],
    location: "Washington, DC",
    size: "914 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Commercial rooftop installation on a high-throughput logistics facility. Coordinated roof warranty compliance, loading analysis, and electrical interconnection.",
  },
  {
    name: "Scripps Hospital",
    coords: [-117.15, 32.77],
    location: "San Diego, CA",
    size: "4.5 MW",
    type: "Canopy + Storage",
    category: "canopy",
    description: "Solar canopy paired with battery storage on a major healthcare campus. Focused on energy resilience, critical load continuity, and safety compliance.",
  },
  {
    name: "Brenntag Industrial Facility",
    coords: [-118.08, 33.93],
    location: "Santa Fe Springs, CA",
    size: "580 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Rooftop PV system on an industrial chemicals distribution center. Managed LADBS permitting, safety planning, and IOU interconnection.",
  },
  {
    name: "Extra Space Storage",
    coords: [-98.35, 39.50],
    location: "38 Locations Nationwide",
    size: "8 MW Total",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "Multi-site rooftop solar program across 38 storage facilities. Managed simultaneous permitting, procurement, and construction across multiple states.",
    multiSite: true,
  },
  {
    name: "Caribbean Microgrid",
    coords: [-62.0, 17.0],
    location: "Caribbean",
    size: "1.0 MW / 4 MWh",
    type: "BESS & Microgrid",
    category: "bess",
    description: "Island microgrid with battery energy storage for an electric cooperative. Delivered full grid independence and resiliency for a remote off-grid community.",
  },
];

function PinIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeProject = PROJECTS.find(p => p.name === active);

  return (
    <section id="projects" style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <span className="section-label" style={{ marginBottom: 12 }}>Featured Projects</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Projects
          </h2>
          <p style={{ color: "var(--text-3)", fontSize: 14, maxWidth: 560, lineHeight: 1.7 }}>
            Solar EPC, BESS, and microgrid projects managed at{" "}
            <a href="https://www.coredevusa.com" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              Core Development Group (Coredev USA)
            </a>
            . Hover any pin to explore.
          </p>
        </div>

        {/* Map + sidebar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          alignItems: "start",
        }}>

          {/* ── Map ──────────────────────────────────────────── */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}>
            {mounted ? (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [-92, 28], scale: 650 }}
                height={500}
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                {/* World landmasses — fills Caribbean islands */}
                <Geographies geography={WORLD_GEO}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="var(--bg-alt)"
                        stroke="var(--border-strong)"
                        strokeWidth={0.3}
                        style={{
                          default: { outline: "none" },
                          hover:   { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {/* US state borders on top */}
                <Geographies geography={US_GEO}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="transparent"
                        stroke="var(--border)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover:   { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {PROJECTS.map(project => {
                  const color    = CAT_COLOR[project.category];
                  const isActive = active === project.name;
                  return (
                    <Marker
                      key={project.name}
                      coordinates={project.coords}
                      onMouseEnter={() => setActive(project.name)}
                      onMouseLeave={() => setActive(null)}
                    >
                      {/* Outer glow ring */}
                      <circle
                        r={isActive ? 22 : 14}
                        fill={color}
                        opacity={isActive ? 0.18 : 0.10}
                        style={{ transition: "r 0.25s ease, opacity 0.25s ease" }}
                      />
                      {/* Mid ring */}
                      <circle
                        r={isActive ? 14 : 9}
                        fill={color}
                        opacity={isActive ? 0.30 : 0.18}
                        style={{ transition: "r 0.25s ease" }}
                      />
                      {/* Core pin */}
                      <circle
                        r={isActive ? 7 : 5}
                        fill={color}
                        stroke="#FFFFFF"
                        strokeWidth={isActive ? 2.5 : 1.5}
                        style={{
                          cursor: "pointer",
                          transition: "r 0.2s ease",
                          filter: isActive ? `drop-shadow(0 0 4px ${color})` : "none",
                        }}
                      />
                      {/* Multi-site label */}
                      {project.multiSite && (
                        <text
                          y={isActive ? -26 : -19}
                          textAnchor="middle"
                          fill={color}
                          style={{
                            fontSize: 7, fontWeight: 700, letterSpacing: "0.10em",
                            pointerEvents: "none", transition: "y 0.2s ease",
                          }}
                        >
                          38 SITES
                        </text>
                      )}
                    </Marker>
                  );
                })}
              </ComposableMap>
            ) : (
              <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "var(--text-3)", fontSize: 13 }}>Loading map…</span>
              </div>
            )}

            {/* Map legend */}
            <div style={{
              padding: "14px 20px",
              borderTop: "1px solid var(--border)",
              display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center",
            }}>
              <span style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em" }}>LEGEND</span>
              {(["canopy", "rooftop", "landfill", "bess"] as Category[]).map(cat => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLOR[cat] }} />
                  <span style={{ color: "var(--text-3)", fontSize: 11 }}>{CAT_LABEL[cat]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <div style={{ position: "sticky", top: 90, display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Detail card */}
            {activeProject ? (
              <div
                key={activeProject.name}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderTop: `3px solid ${CAT_COLOR[activeProject.category]}`,
                  borderRadius: 12,
                  padding: "26px 22px",
                  boxShadow: "var(--shadow-md)",
                  animation: "fadeUp 0.2s ease-out forwards",
                }}
              >
                <span style={{
                  display: "inline-block",
                  background: `${CAT_COLOR[activeProject.category]}18`,
                  color: CAT_COLOR[activeProject.category],
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.14em",
                  padding: "4px 10px", borderRadius: 4, marginBottom: 14,
                }}>
                  {activeProject.type.toUpperCase()}
                </span>

                <h3 style={{
                  fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 700,
                  color: "var(--text-1)", lineHeight: 1.25, marginBottom: 10,
                }}>
                  {activeProject.name}
                </h3>

                <div style={{
                  fontFamily: "var(--font-heading)", fontSize: 30, fontWeight: 800,
                  color: CAT_COLOR[activeProject.category], lineHeight: 1, marginBottom: 14,
                }}>
                  {activeProject.size}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
                  <PinIcon color={CAT_COLOR[activeProject.category]} />
                  <span style={{ color: "var(--text-2)", fontSize: 13, fontWeight: 500 }}>
                    {activeProject.location}
                  </span>
                </div>

                <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />

                <p style={{ color: "var(--text-2)", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                  {activeProject.description}
                </p>
              </div>
            ) : (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "22px 20px",
              }}>
                <div style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 14 }}>
                  SELECT A PROJECT
                </div>
                <p style={{ color: "var(--text-3)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                  Hover any pin on the map to explore project details.
                </p>
              </div>
            )}

            {/* Project list */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}>
              <div style={{ padding: "14px 18px 10px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em" }}>
                  {PROJECTS.length} PROJECTS ON MAP
                </span>
              </div>
              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {PROJECTS.map(p => {
                  const isActive = active === p.name;
                  return (
                    <div
                      key={p.name}
                      onMouseEnter={() => setActive(p.name)}
                      onMouseLeave={() => setActive(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 18px",
                        background: isActive ? `${CAT_COLOR[p.category]}10` : "transparent",
                        borderLeft: isActive ? `3px solid ${CAT_COLOR[p.category]}` : "3px solid transparent",
                        cursor: "default",
                        transition: "all 0.18s ease",
                      }}
                    >
                      <div style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: CAT_COLOR[p.category], flexShrink: 0,
                        boxShadow: isActive ? `0 0 6px ${CAT_COLOR[p.category]}` : "none",
                        transition: "box-shadow 0.2s ease",
                      }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          color: isActive ? "var(--text-1)" : "var(--text-2)",
                          fontSize: 12, fontWeight: 600,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          transition: "color 0.18s ease",
                        }}>
                          {p.name}
                        </div>
                        <div style={{ color: "var(--text-3)", fontSize: 10 }}>
                          {p.location} · {p.size}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <p style={{ color: "var(--text-3)", fontSize: 12 }}>
            All projects publicly listed on{" "}
            <a href="https://www.coredevusa.com/company/projects/" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none" }}>
              coredevusa.com
            </a>
            . Included with attribution as part of personal project management portfolio.
          </p>
        </div>

      </div>
    </section>
  );
}
