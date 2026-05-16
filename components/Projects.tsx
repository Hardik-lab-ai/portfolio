"use client";
import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { AnimatePresence, motion } from "framer-motion";

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

// Flight route: west-to-east across the US, ending at Caribbean
// Index into PROJECTS array
const FLIGHT_ROUTE = [6, 7, 12, 10, 11, 8, 9, 5, 3, 4, 2, 1, 0, 13];

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
const ROUTE_SVG: [number, number][] = FLIGHT_ROUTE.map(i => PROJECT_SVG[i]);

export default function Projects() {
  const [mounted,     setMounted]     = useState(false);
  const [step,        setStep]        = useState(-1);       // which route stop plane is at
  const [phase,       setPhase]       = useState<"idle"|"flying"|"landed">("idle");
  const [visitedIdxs, setVisitedIdxs] = useState<number[]>([]); // project indices visited
  const [hoveredIdx,  setHoveredIdx]  = useState<number | null>(null);
  const [tooltip,     setTooltip]     = useState<{project: Project; x: number; y: number} | null>(null);
  const [winW,        setWinW]        = useState(1280);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef    = useRef(step);
  const phaseRef   = useRef(phase);
  stepRef.current  = step;
  phaseRef.current = phase;

  useEffect(() => {
    setMounted(true);
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Start animation when section scrolls into view
  useEffect(() => {
    if (!mounted) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phaseRef.current === "idle") {
          startFlight();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  function startFlight() {
    setStep(0);
    setPhase("flying");
    setVisitedIdxs([]);
  }

  // Advance the flight: fly → land → pause → fly again
  useEffect(() => {
    if (step < 0 || phase === "idle") return;
    if (phase === "flying") {
      // After fly duration (1600ms), land
      const t = setTimeout(() => {
        setPhase("landed");
        setVisitedIdxs(prev => [...prev, FLIGHT_ROUTE[step]]);
      }, 1700);
      return () => clearTimeout(t);
    }
    if (phase === "landed") {
      // Pause at location, then fly to next
      const t = setTimeout(() => {
        if (step < FLIGHT_ROUTE.length - 1) {
          setStep(s => s + 1);
          setPhase("flying");
        } else {
          setPhase("idle");
        }
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [step, phase]);

  const planePos = step >= 0 ? ROUTE_SVG[step] : ROUTE_SVG[0];
  const prevPos  = step > 0  ? ROUTE_SVG[step - 1] : ROUTE_SVG[0];

  // Compute plane rotation angle
  const dx = planePos[0] - prevPos[0];
  const dy = planePos[1] - prevPos[1];
  const planeAngle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Current landed project
  const landedProject = phase === "landed" ? PROJECTS[FLIGHT_ROUTE[step]] : null;

  // Tooltip width
  const TOOLTIP_W = 272;
  const ttLeft = tooltip ? Math.max(8, Math.min(tooltip.x - TOOLTIP_W / 2, winW - TOOLTIP_W - 8)) : 0;
  const ttTop  = tooltip ? tooltip.y + 18 : 0;

  // Trail points: all visited positions
  const trailPoints = visitedIdxs.map(i => PROJECT_SVG[i]);
  const trailStr = trailPoints.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <section id="projects" ref={sectionRef} style={{ background: "var(--bg-page)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: 52 }}>
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
        </div>

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

                {/* Dotted flight trail */}
                {trailPoints.length >= 2 && (
                  <polyline
                    points={trailStr}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={1}
                    strokeDasharray="3,4"
                    opacity={0.35}
                    style={{ pointerEvents: "none" }}
                  />
                )}

                {/* Project pins */}
                {PROJECTS.map((project, idx) => {
                  const color     = CAT_COLOR[project.category];
                  const isHovered = hoveredIdx === idx;
                  const isVisited = visitedIdxs.includes(idx);
                  const isLanding = phase === "landed" && FLIGHT_ROUTE[step] === idx;
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
                      {/* Pulse ring on landing */}
                      {isLanding && (
                        <circle r={14} fill={color} opacity={0} style={{
                          animation: "landPulse 1s ease-out forwards",
                        }} />
                      )}
                      {/* Glow */}
                      <circle r={isHovered ? 11 : 7} fill={color}
                        opacity={isHovered ? 0.18 : isVisited ? 0.14 : 0.08}
                        style={{ transition: "r 0.22s ease, opacity 0.3s ease" }}
                      />
                      {/* Mid ring */}
                      <circle r={isHovered ? 7 : 4.5} fill={color}
                        opacity={isHovered ? 0.30 : isVisited ? 0.24 : 0.14}
                        style={{ transition: "r 0.22s ease" }}
                      />
                      {/* Core dot */}
                      <circle
                        r={isHovered ? 3.5 : 2.5}
                        fill={isVisited ? color : "var(--text-3)"}
                        stroke="#FFFFFF"
                        strokeWidth={isHovered ? 1.5 : 1}
                        style={{
                          cursor: "pointer",
                          transition: "r 0.18s ease, fill 0.4s ease",
                          filter: isHovered ? `drop-shadow(0 0 3px ${color})` : "none",
                        }}
                      />
                    </Marker>
                  );
                })}

                {/* Airplane */}
                {step >= 0 && (
                  <g
                    style={{
                      transform: `translate(${planePos[0]}px, ${planePos[1]}px) rotate(${planeAngle}deg)`,
                      transition: phase === "flying" ? "transform 1.6s cubic-bezier(0.45,0,0.55,1)" : "none",
                    }}
                  >
                    {/* Plane silhouette — pointing right (+x) */}
                    <g transform="translate(-8,-5) scale(0.9)">
                      <path
                        d="M16 5 L2 8 L0 6 L2 5 L0 4 L2 3 L16 5 Z"
                        fill="#1A1714"
                        opacity={0.85}
                      />
                      <path d="M10 5 L6 2 L5 3 L8 5 Z" fill="#1A1714" opacity={0.7} />
                      <path d="M10 5 L6 8 L5 7 L8 5 Z" fill="#1A1714" opacity={0.7} />
                      <path d="M5 5 L3 3.5 L2.5 4 L4 5 Z" fill="#1A1714" opacity={0.6} />
                      <path d="M5 5 L3 6.5 L2.5 6 L4 5 Z" fill="#1A1714" opacity={0.6} />
                    </g>
                  </g>
                )}

              </ComposableMap>

              {/* Landing card — positioned absolutely over the map */}
              <AnimatePresence>
                {landedProject && (() => {
                  const [px, py] = PROJECT_SVG[FLIGHT_ROUTE[step]];
                  // The map SVG is 800×500 internal units; actual rendered width is 100% of container
                  // We use percentage positioning
                  const pctX = (px / 800) * 100;
                  const pctY = (py / 500) * 100;
                  const flipLeft = pctX > 60;
                  const flipUp   = pctY > 55;
                  const color = CAT_COLOR[landedProject.category];
                  return (
                    <motion.div
                      key={landedProject.name}
                      initial={{ opacity: 0, scale: 0.88, y: flipUp ? 8 : -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: "absolute",
                        left:  flipLeft ? "auto" : `calc(${pctX}% + 14px)`,
                        right: flipLeft ? `calc(${100 - pctX}% + 14px)` : "auto",
                        top:   flipUp   ? "auto" : `calc(${pctY}% + 10px)`,
                        bottom:flipUp   ? `calc(${100 - pctY}% + 10px)` : "auto",
                        width: 210,
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      <div style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderTop: `3px solid ${color}`,
                        borderRadius: 10,
                        padding: "13px 15px 14px",
                        boxShadow: "var(--shadow-lg)",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                          <span style={{
                            background: `${color}18`, color,
                            fontSize: 8.5, fontWeight: 800, letterSpacing: "0.12em",
                            padding: "2px 7px", borderRadius: 4,
                          }}>
                            {landedProject.type.toUpperCase()}
                          </span>
                          <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 800, color, lineHeight: 1 }}>
                            {landedProject.size}
                          </span>
                        </div>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 5 }}>
                          {landedProject.name}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            <circle cx="12" cy="9" r="2.5"/>
                          </svg>
                          <span style={{ color: "var(--text-3)", fontSize: 11 }}>{landedProject.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
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
            <button
              onClick={() => { setStep(-1); setPhase("idle"); setVisitedIdxs([]); setTimeout(startFlight, 80); }}
              style={{
                background: "transparent", border: "1px solid var(--border)",
                borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 600,
                color: "var(--text-3)", cursor: "pointer", letterSpacing: "0.02em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"; }}
            >
              ↺ Replay Tour
            </button>
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
