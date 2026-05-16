"use client";
import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion, useInView } from "framer-motion";

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
  sites?: number;
}

const CAT_COLOR: Record<Category, string> = {
  canopy:   "#F59E0B",   // amber  — solar canopy
  rooftop:  "#EF4444",   // red    — rooftop
  landfill: "#22C55E",   // green  — landfill
  bess:     "#A855F7",   // purple — BESS / microgrid
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
    name: "Extra Space — Georgia",
    coords: [-83.5, 32.8],
    location: "Georgia · 13 Sites",
    size: "2 MW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "13 Extra Space Storage rooftop solar installations across Georgia. Managed simultaneous permitting, procurement, and construction.",
    sites: 13,
  },
  {
    name: "Extra Space — Florida",
    coords: [-81.6, 28.0],
    location: "Florida · 10 Sites",
    size: "3 MW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "10 Extra Space Storage rooftop solar installations across Florida. Coordinated multi-site scheduling and electrical interconnections.",
    sites: 10,
  },
  {
    name: "Extra Space — Tennessee",
    coords: [-86.7, 35.9],
    location: "Tennessee · 10 Sites",
    size: "2 MW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "10 Extra Space Storage rooftop solar installations across Tennessee. Managed concurrent permitting and construction across multiple sites.",
    sites: 10,
  },
  {
    name: "Extra Space — Kentucky",
    coords: [-85.3, 37.8],
    location: "Kentucky · 3 Sites",
    size: "500 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "3 Extra Space Storage rooftop solar installations across Kentucky.",
    sites: 3,
  },
  {
    name: "Extra Space — Arizona",
    coords: [-111.6, 34.2],
    location: "Arizona · 2 Sites",
    size: "500 kW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "2 Extra Space Storage rooftop solar installations across Arizona.",
    sites: 2,
  },
  {
    name: "Caribbean Microgrid",
    coords: [-64.6, 18.4],
    location: "Caribbean",
    size: "1.0 MW / 4 MWh",
    type: "BESS & Microgrid",
    category: "bess",
    description: "Island microgrid with battery energy storage for an electric cooperative. Delivered full grid independence and resiliency for a remote off-grid community.",
  },
];


// State abbreviations at approximate centroids
const STATE_LABELS: { abbr: string; coords: [number, number] }[] = [
  { abbr: "ME", coords: [-69.2, 45.4] },
  { abbr: "NH", coords: [-71.5, 43.7] },
  { abbr: "VT", coords: [-72.6, 44.0] },
  { abbr: "MA", coords: [-71.8, 42.2] },
  { abbr: "RI", coords: [-71.4, 41.6] },
  { abbr: "CT", coords: [-72.7, 41.6] },
  { abbr: "NY", coords: [-75.5, 43.0] },
  { abbr: "NJ", coords: [-74.4, 40.1] },
  { abbr: "PA", coords: [-77.2, 40.9] },
  { abbr: "DE", coords: [-75.5, 38.9] },
  { abbr: "MD", coords: [-76.8, 38.8] },
  { abbr: "VA", coords: [-78.7, 37.5] },
  { abbr: "WV", coords: [-80.6, 38.6] },
  { abbr: "NC", coords: [-79.4, 35.6] },
  { abbr: "SC", coords: [-80.9, 33.8] },
  { abbr: "GA", coords: [-83.4, 32.7] },
  { abbr: "FL", coords: [-81.3, 27.8] },
  { abbr: "AL", coords: [-86.7, 32.7] },
  { abbr: "MS", coords: [-89.6, 32.7] },
  { abbr: "TN", coords: [-86.3, 35.9] },
  { abbr: "KY", coords: [-84.3, 37.5] },
  { abbr: "OH", coords: [-82.8, 40.4] },
  { abbr: "MI", coords: [-85.4, 44.3] },
  { abbr: "IN", coords: [-86.3, 40.3] },
  { abbr: "IL", coords: [-89.2, 40.0] },
  { abbr: "WI", coords: [-89.6, 44.6] },
  { abbr: "MN", coords: [-94.3, 46.4] },
  { abbr: "IA", coords: [-93.5, 42.0] },
  { abbr: "MO", coords: [-92.3, 38.5] },
  { abbr: "AR", coords: [-92.4, 34.8] },
  { abbr: "LA", coords: [-91.8, 30.9] },
  { abbr: "TX", coords: [-99.3, 31.5] },
  { abbr: "OK", coords: [-97.5, 35.5] },
  { abbr: "KS", coords: [-98.4, 38.5] },
  { abbr: "NE", coords: [-99.9, 41.5] },
  { abbr: "SD", coords: [-100.2, 44.4] },
  { abbr: "ND", coords: [-100.5, 47.5] },
  { abbr: "MT", coords: [-110.4, 47.0] },
  { abbr: "WY", coords: [-107.6, 43.0] },
  { abbr: "CO", coords: [-105.5, 39.1] },
  { abbr: "NM", coords: [-106.2, 34.5] },
  { abbr: "AZ", coords: [-111.6, 34.3] },
  { abbr: "UT", coords: [-111.1, 39.4] },
  { abbr: "NV", coords: [-116.7, 39.3] },
  { abbr: "CA", coords: [-119.7, 37.3] },
  { abbr: "OR", coords: [-120.6, 44.0] },
  { abbr: "WA", coords: [-120.5, 47.5] },
  { abbr: "ID", coords: [-114.5, 44.4] },
];

const COUNTRY_LABELS: { name: string; coords: [number, number] }[] = [
  { name: "CANADA",  coords: [-96.0, 57.0] },
  { name: "MEXICO",  coords: [-102.5, 23.5] },
  { name: "CUBA",    coords: [-79.5, 21.8] },
  { name: "BAHAMAS", coords: [-77.4, 25.0] },
];

// Mercator SVG projection: center=[-92,28], scale=650, width=800, height=500
// x_svg = scale * (lng - centerLng) * (π/180) + width/2
// y_svg = -(scale * (ln(tan(π/4+lat*π/360)) - ln(tan(π/4+centerLat*π/360)))) + height/2
function mercatorXY(lng: number, lat: number): [number, number] {
  const scale = 650;
  const cx = -92, cy = 28;
  const w = 800, h = 500;
  const toRad = Math.PI / 180;
  const x = scale * (lng - cx) * toRad + w / 2;
  const mercY = (la: number) => Math.log(Math.tan(Math.PI / 4 + la * toRad / 2));
  const y = -(scale * (mercY(lat) - mercY(cy))) + h / 2;
  return [x, y];
}

const PROJECT_SVG: [number, number][] = PROJECTS.map(p => mercatorXY(p.coords[0], p.coords[1]));

// Jersey City home base
const JC_COORDS: [number, number] = [-74.077, 40.728];
const JC_SVG = mercatorXY(JC_COORDS[0], JC_COORDS[1]);

export default function Projects() {
  const [mounted,    setMounted]    = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltip,    setTooltip]    = useState<{project: Project; x: number; y: number} | null>(null);
  const [winW,       setWinW]       = useState(1280);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    setMounted(true);
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Tooltip width
  const TOOLTIP_W = 272;
  const ttLeft = tooltip ? Math.max(8, Math.min(tooltip.x - TOOLTIP_W / 2, winW - TOOLTIP_W - 8)) : 0;
  const ttTop  = tooltip ? tooltip.y + 18 : 0;

  return (
    <section id="projects" ref={sectionRef} style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 52 }}
        >
          <span className="section-label" style={{ marginBottom: 12 }}>Featured Projects</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em",
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Projects Across the Map
          </h2>
          <p style={{ color: "var(--text-3)", fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>
            From California to the Caribbean — solar canopies, rooftop arrays, landfill conversions, and microgrids delivered across 14 engagements.
          </p>
        </motion.div>

        {/* Map container */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "var(--shadow-md)",
        }}>
          {mounted ? (
            <div style={{ position: "relative" }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [-92, 28], scale: 650 }}
                width={800}
                height={500}
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                {/* World fill */}
                <Geographies geography={WORLD_GEO}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="var(--bg-alt)"
                        stroke="var(--border-strong)"
                        strokeWidth={0.3}
                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      />
                    ))
                  }
                </Geographies>

                {/* US state borders */}
                <Geographies geography={US_GEO}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="transparent"
                        stroke="var(--border)"
                        strokeWidth={0.5}
                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      />
                    ))
                  }
                </Geographies>

                {/* Country labels */}
                {COUNTRY_LABELS.map(({ name, coords }) => (
                  <Marker key={name} coordinates={coords}>
                    <text textAnchor="middle" fill="var(--text-2)"
                      style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.14em", opacity: 0.4, pointerEvents: "none", userSelect: "none" }}>
                      {name}
                    </text>
                  </Marker>
                ))}

                {/* State labels */}
                {STATE_LABELS.map(({ abbr, coords }) => (
                  <Marker key={abbr} coordinates={coords}>
                    <text textAnchor="middle" fill="var(--text-3)"
                      style={{ fontSize: 5.5, fontWeight: 600, letterSpacing: "0.04em", opacity: 0.55, pointerEvents: "none", userSelect: "none" }}>
                      {abbr}
                    </text>
                  </Marker>
                ))}

                {/* Direct lines from Jersey City to every project */}
                {PROJECTS.map((project, idx) => {
                  const [x2, y2] = PROJECT_SVG[idx];
                  const [x1, y1] = JC_SVG;
                  return (
                    <line
                      key={project.name + "-line"}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="var(--accent)"
                      strokeWidth={0.8}
                      strokeDasharray="3,5"
                      opacity={hoveredIdx === idx ? 0.80 : 0.35}
                      style={{ pointerEvents: "none", transition: "opacity 0.2s ease" }}
                    />
                  );
                })}

                {/* Pulsing dots travelling from JC to each project pin */}
                {PROJECTS.map((project, idx) => {
                  const [x1, y1] = JC_SVG;
                  const [x2, y2] = PROJECT_SVG[idx];
                  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                  const dur  = `${(dist / 100).toFixed(2)}s`;
                  const delay = `${(idx * 0.38).toFixed(2)}s`;
                  const path = `M ${x1},${y1} L ${x2},${y2}`;
                  const color = CAT_COLOR[project.category];
                  return (
                    <g key={project.name + "-pulse"} style={{ pointerEvents: "none" }}>
                      {/* Halo */}
                      <circle r={0} fill={color} opacity={0}>
                        <animateMotion dur={dur} repeatCount="indefinite" begin={delay} path={path} />
                        <animate attributeName="r"       values="4;5;4"         dur={dur} repeatCount="indefinite" begin={delay} />
                        <animate attributeName="opacity" values="0;0.25;0.25;0" keyTimes="0;0.08;0.82;1" dur={dur} repeatCount="indefinite" begin={delay} />
                      </circle>
                      {/* Core */}
                      <circle r={0} fill={color} opacity={0}>
                        <animateMotion dur={dur} repeatCount="indefinite" begin={delay} path={path} />
                        <animate attributeName="r"       values="2;2.5;2"       dur={dur} repeatCount="indefinite" begin={delay} />
                        <animate attributeName="opacity" values="0;1;1;0"       keyTimes="0;0.06;0.84;1" dur={dur} repeatCount="indefinite" begin={delay} />
                      </circle>
                    </g>
                  );
                })}

                {/* Jersey City home-base marker */}
                <Marker coordinates={JC_COORDS}>
                  <circle r={6} fill="var(--accent)" opacity={0.15} />
                  <circle r={3.5} fill="var(--accent)" stroke="#FFFFFF" strokeWidth={1.5} />
                  <text
                    textAnchor="middle"
                    y={-10}
                    style={{ fontSize: 7, fill: "var(--accent)", fontWeight: 700, fontFamily: "var(--font-heading)", letterSpacing: "0.04em" }}
                  >
                    HOME
                  </text>
                </Marker>

                {/* Project pins */}
                {PROJECTS.map((project, idx) => {
                  const color     = CAT_COLOR[project.category];
                  const isHovered = hoveredIdx === idx;
                  return (
                    <Marker
                      key={project.name}
                      coordinates={project.coords}
                      onMouseEnter={e => {
                        setHoveredIdx(idx);
                        setTooltip({ project, x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY });
                      }}
                      onMouseMove={e => setTooltip(t => t ? { ...t, x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY } : t)}
                      onMouseLeave={() => { setHoveredIdx(null); setTooltip(null); }}
                    >
                      {/* Glow */}
                      <circle r={isHovered ? 11 : 7} fill={color}
                        opacity={isHovered ? 0.22 : 0.12}
                        style={{ transition: "r 0.22s ease, opacity 0.3s ease" }}
                      />
                      {/* Mid ring */}
                      <circle r={isHovered ? 7 : 4.5} fill={color}
                        opacity={isHovered ? 0.35 : 0.20}
                        style={{ transition: "r 0.22s ease" }}
                      />
                      {/* Core dot */}
                      <circle
                        r={isHovered ? 3.5 : 2.5}
                        fill={color}
                        stroke="#FFFFFF"
                        strokeWidth={isHovered ? 1.5 : 1}
                        style={{
                          cursor: "pointer",
                          transition: "r 0.18s ease",
                          filter: isHovered ? `drop-shadow(0 0 4px ${color})` : "none",
                        }}
                      />
                    </Marker>
                  );
                })}

              </ComposableMap>


            </div>
          ) : (
            <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--text-3)", fontSize: 13 }}>Loading map…</span>
            </div>
          )}

          {/* Legend + replay */}
          <div style={{
            padding: "12px 24px",
            borderTop: "1px solid var(--border)",
            display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {(["canopy", "rooftop", "landfill", "bess"] as Category[]).map(cat => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLOR[cat] }} />
                  <span style={{ color: "var(--text-3)", fontSize: 11 }}>{CAT_LABEL[cat]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
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

      {/* Hover tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed", left: ttLeft, top: ttTop, width: TOOLTIP_W,
          zIndex: 9999, pointerEvents: "none", animation: "fadeUp 0.15s ease-out forwards",
        }}>
          <div style={{
            position: "absolute", top: -6, left: tooltip.x - ttLeft - 6,
            width: 12, height: 12, background: "var(--bg-card)",
            borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)",
            transform: "rotate(45deg)", borderRadius: 2,
          }} />
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderTop: `3px solid ${CAT_COLOR[tooltip.project.category]}`,
            borderRadius: 10, padding: "15px 17px 17px", boxShadow: "var(--shadow-lg)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
              <span style={{
                background: `${CAT_COLOR[tooltip.project.category]}18`,
                color: CAT_COLOR[tooltip.project.category],
                fontSize: 9, fontWeight: 800, letterSpacing: "0.13em", padding: "3px 8px", borderRadius: 4,
              }}>
                {tooltip.project.type.toUpperCase()}
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: CAT_COLOR[tooltip.project.category], lineHeight: 1 }}>
                {tooltip.project.size}
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.25, marginBottom: 6 }}>
              {tooltip.project.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 9 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={CAT_COLOR[tooltip.project.category]} strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <span style={{ color: "var(--text-2)", fontSize: 12, fontWeight: 500 }}>{tooltip.project.location}</span>
            </div>
            <div style={{ height: 1, background: "var(--border)", marginBottom: 9 }} />
            <p style={{ color: "var(--text-2)", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{tooltip.project.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
