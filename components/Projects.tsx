"use client";
import { useState, useEffect, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const WORLD_GEO = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const US_GEO    = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const TOOLTIP_W = 288;

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

interface StateGroup {
  key: string;
  label: string;
  pin: [number, number];
  zoomCenter: [number, number];
  zoomScale: number;
  projectNames: string[];
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
    size: "500 KW",
    type: "Rooftop Solar",
    category: "rooftop",
    description: "3 Extra Space Storage rooftop solar installations across Kentucky.",
    sites: 3,
  },
  {
    name: "Extra Space — Arizona",
    coords: [-111.6, 34.2],
    location: "Arizona · 2 Sites",
    size: "500 KW",
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

// Each group = one state/region cluster pin in overview
const STATE_GROUPS: StateGroup[] = [
  {
    key: "ny", label: "New York",
    pin: [-75.5, 43.0],
    zoomCenter: [-73.85, 40.96], zoomScale: 15000,
    projectNames: ["Croton-Harmon Train Station", "St. John's University"],
  },
  {
    key: "nj", label: "New Jersey",
    pin: [-74.4, 40.1],
    zoomCenter: [-75.13, 40.40], zoomScale: 10000,
    projectNames: ["Selective Insurance HQ", "Pennsville Solar Landfill", "Sicklerville Solar Landfill"],
  },
  {
    key: "dc", label: "Washington DC",
    pin: [-77.04, 38.89],
    zoomCenter: [-77.04, 38.89], zoomScale: 15000,
    projectNames: ["FedEx Distribution Facility"],
  },
  {
    key: "ca", label: "California",
    pin: [-119.7, 37.3],
    zoomCenter: [-117.6, 33.35], zoomScale: 8000,
    projectNames: ["Scripps Hospital", "Brenntag Industrial Facility"],
  },
  {
    key: "ga", label: "Georgia",
    pin: [-83.4, 32.7],
    zoomCenter: [-83.5, 32.8], zoomScale: 6000,
    projectNames: ["Extra Space — Georgia"],
  },
  {
    key: "fl", label: "Florida",
    pin: [-81.3, 27.8],
    zoomCenter: [-81.6, 28.0], zoomScale: 5000,
    projectNames: ["Extra Space — Florida"],
  },
  {
    key: "tn", label: "Tennessee",
    pin: [-86.3, 35.9],
    zoomCenter: [-86.7, 35.9], zoomScale: 6000,
    projectNames: ["Extra Space — Tennessee"],
  },
  {
    key: "ky", label: "Kentucky",
    pin: [-84.3, 37.5],
    zoomCenter: [-85.3, 37.8], zoomScale: 6000,
    projectNames: ["Extra Space — Kentucky"],
  },
  {
    key: "az", label: "Arizona",
    pin: [-111.6, 34.3],
    zoomCenter: [-111.6, 34.2], zoomScale: 5000,
    projectNames: ["Extra Space — Arizona"],
  },
  {
    key: "caribbean", label: "Caribbean",
    pin: [-64.6, 18.4],
    zoomCenter: [-64.6, 18.4], zoomScale: 10000,
    projectNames: ["Caribbean Microgrid"],
  },
];

// State abbreviations for states WITHOUT cluster pins
const STATE_LABELS: { abbr: string; coords: [number, number] }[] = [
  { abbr: "ME", coords: [-69.2, 45.4] },
  { abbr: "NH", coords: [-71.5, 43.7] },
  { abbr: "VT", coords: [-72.6, 44.0] },
  { abbr: "MA", coords: [-71.8, 42.2] },
  { abbr: "RI", coords: [-71.4, 41.6] },
  { abbr: "CT", coords: [-72.7, 41.6] },
  { abbr: "PA", coords: [-77.2, 40.9] },
  { abbr: "DE", coords: [-75.5, 38.9] },
  { abbr: "MD", coords: [-76.8, 38.8] },
  { abbr: "VA", coords: [-78.7, 37.5] },
  { abbr: "WV", coords: [-80.6, 38.6] },
  { abbr: "NC", coords: [-79.4, 35.6] },
  { abbr: "SC", coords: [-80.9, 33.8] },
  { abbr: "AL", coords: [-86.7, 32.7] },
  { abbr: "MS", coords: [-89.6, 32.7] },
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
  { abbr: "UT", coords: [-111.1, 39.4] },
  { abbr: "NV", coords: [-116.7, 39.3] },
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

type TooltipState =
  | { kind: "project"; project: Project; x: number; y: number }
  | { kind: "cluster"; group: StateGroup; x: number; y: number };

export default function Projects() {
  const [selectedGroup, setSelectedGroup] = useState<StateGroup | null>(null);
  const [transitioning,  setTransitioning]  = useState(false);
  const [tooltip,        setTooltip]        = useState<TooltipState | null>(null);
  const [mounted,        setMounted]        = useState(false);
  const [winW,           setWinW]           = useState(1280);

  const changeView = useCallback((next: StateGroup | null) => {
    setTooltip(null);
    setTransitioning(true);
    setTimeout(() => {
      setSelectedGroup(next);
      setTransitioning(false);
    }, 220);
  }, []);

  useEffect(() => {
    setMounted(true);
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedGroup) changeView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedGroup, changeView]);

  const projConfig = selectedGroup
    ? { center: selectedGroup.zoomCenter, scale: selectedGroup.zoomScale }
    : { center: [-92, 28] as [number, number], scale: 650 };

  const isOverview    = !selectedGroup && !transitioning;
  const isDetail      = !!selectedGroup && !transitioning;
  const activeProject = tooltip?.kind === "project" ? tooltip.project.name : null;

  const currentProjects = selectedGroup
    ? PROJECTS.filter(p => selectedGroup.projectNames.includes(p.name))
    : [];

  const ttLeft = tooltip
    ? Math.max(8, Math.min(tooltip.x - TOOLTIP_W / 2, winW - TOOLTIP_W - 8))
    : 0;
  const ttTop = tooltip ? tooltip.y + 18 : 0;

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
            . Click a state pin to explore, press ESC to zoom back out.
          </p>
        </div>

        {/* Map card */}
        <div style={{
          position: "relative",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}>

          {/* Back button overlay */}
          {isDetail && (
            <button
              onClick={() => changeView(null)}
              style={{
                position: "absolute", top: 14, left: 14, zIndex: 10,
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(15,23,42,0.72)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 8, color: "#fff",
                padding: "7px 14px 7px 10px",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                lineHeight: 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              {selectedGroup!.label}
              <span style={{
                background: "rgba(255,255,255,0.12)", borderRadius: 4,
                padding: "2px 6px", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)",
              }}>
                ESC
              </span>
            </button>
          )}

          {/* Map */}
          {mounted ? (
            <div style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.22s ease" }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={projConfig}
                height={500}
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                {/* World landmasses */}
                <Geographies geography={WORLD_GEO}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography key={geo.rsmKey} geography={geo}
                        fill="var(--bg-alt)" stroke="var(--border-strong)" strokeWidth={0.3}
                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      />
                    ))
                  }
                </Geographies>

                {/* US state borders */}
                <Geographies geography={US_GEO}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography key={geo.rsmKey} geography={geo}
                        fill="transparent" stroke="var(--border)" strokeWidth={0.5}
                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      />
                    ))
                  }
                </Geographies>

                {/* Country + state labels (overview only) */}
                {isOverview && (
                  <>
                    {COUNTRY_LABELS.map(({ name, coords }) => (
                      <Marker key={name} coordinates={coords}>
                        <text textAnchor="middle" fill="var(--text-2)"
                          style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.14em", opacity: 0.45, pointerEvents: "none", userSelect: "none" }}>
                          {name}
                        </text>
                      </Marker>
                    ))}
                    {STATE_LABELS.map(({ abbr, coords }) => (
                      <Marker key={abbr} coordinates={coords}>
                        <text textAnchor="middle" fill="var(--text-3)"
                          style={{ fontSize: 5.5, fontWeight: 600, letterSpacing: "0.04em", opacity: 0.6, pointerEvents: "none", userSelect: "none" }}>
                          {abbr}
                        </text>
                      </Marker>
                    ))}
                  </>
                )}

                {/* ── OVERVIEW: cluster pins ─────────────────────── */}
                {isOverview && STATE_GROUPS.map(group => {
                  const isHovered = tooltip?.kind === "cluster" && tooltip.group.key === group.key;
                  const count = group.projectNames.length;
                  return (
                    <Marker
                      key={group.key}
                      coordinates={group.pin}
                      onClick={() => changeView(group)}
                      onMouseEnter={(e) => setTooltip({ kind: "cluster", group, x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY })}
                      onMouseMove={(e)  => setTooltip(t => t?.kind === "cluster" && t.group.key === group.key
                        ? { ...t, x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY } : t)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {/* Outer glow */}
                      <circle
                        r={isHovered ? 17 : 13}
                        fill="#2B55C4" opacity={isHovered ? 0.22 : 0.13}
                        style={{ transition: "r 0.18s ease, opacity 0.18s ease" }}
                      />
                      {/* Fill circle */}
                      <circle
                        r={isHovered ? 12 : 9}
                        fill="#2B55C4" stroke="#ffffff" strokeWidth={1.5}
                        style={{ cursor: "pointer", transition: "r 0.18s ease" }}
                      />
                      {/* Count label */}
                      <text
                        textAnchor="middle" y="0.38em"
                        fill="#ffffff"
                        style={{ fontSize: count > 9 ? 2.25 : 2.75, fontWeight: 800, pointerEvents: "none", userSelect: "none" }}
                      >
                        {count}
                      </text>
                    </Marker>
                  );
                })}

                {/* ── DETAIL: individual project pins ───────────── */}
                {isDetail && currentProjects.map(project => {
                  const color    = CAT_COLOR[project.category];
                  const isActive = activeProject === project.name;
                  return (
                    <Marker
                      key={project.name}
                      coordinates={project.coords}
                      onMouseEnter={(e) => setTooltip({ kind: "project", project, x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY })}
                      onMouseMove={(e)  => setTooltip(t => t?.kind === "project" && t.project.name === project.name
                        ? { ...t, x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY } : t)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <circle r={isActive ? 11 : 7} fill={color}
                        opacity={isActive ? 0.18 : 0.10}
                        style={{ transition: "r 0.22s ease, opacity 0.22s ease" }}
                      />
                      <circle r={isActive ? 7 : 4.5} fill={color}
                        opacity={isActive ? 0.30 : 0.18}
                        style={{ transition: "r 0.22s ease" }}
                      />
                      <circle
                        r={isActive ? 3.5 : 2.5}
                        fill={color} stroke="#FFFFFF" strokeWidth={isActive ? 1.5 : 1}
                        style={{
                          cursor: "pointer", transition: "r 0.18s ease",
                          filter: isActive ? `drop-shadow(0 0 3px ${color})` : "none",
                        }}
                      />
                      {project.sites && (
                        <text
                          y={isActive ? -13 : -9} textAnchor="middle" fill={color}
                          style={{ fontSize: 6, fontWeight: 700, letterSpacing: "0.10em", pointerEvents: "none" }}
                        >
                          {project.sites} SITES
                        </text>
                      )}
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

          {/* Legend */}
          <div style={{
            padding: "13px 24px",
            borderTop: "1px solid var(--border)",
            display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center",
          }}>
            {(["canopy", "rooftop", "landfill", "bess"] as Category[]).map(cat => (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: CAT_COLOR[cat] }} />
                <span style={{ color: "var(--text-3)", fontSize: 11 }}>{CAT_LABEL[cat]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 28, textAlign: "center" }}>
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

      {/* ── Floating tooltip ──────────────────────────────────── */}
      {tooltip && (
        <div style={{
          position: "fixed",
          left: ttLeft, top: ttTop,
          width: TOOLTIP_W,
          zIndex: 9999,
          pointerEvents: "none",
          animation: "fadeUp 0.15s ease-out forwards",
        }}>
          {/* Arrow */}
          <div style={{
            position: "absolute",
            top: -6, left: tooltip.x - ttLeft - 6,
            width: 12, height: 12,
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border)",
            borderLeft: "1px solid var(--border)",
            transform: "rotate(45deg)",
            borderRadius: 2,
          }} />

          {/* Card */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderTop: tooltip.kind === "cluster"
              ? "3px solid #2B55C4"
              : `3px solid ${CAT_COLOR[tooltip.project.category]}`,
            borderRadius: 10,
            padding: "16px 18px 18px",
            boxShadow: "var(--shadow-lg)",
          }}>
            {tooltip.kind === "cluster" ? (
              /* ── Cluster card ── */
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{
                    background: "#2B55C418",
                    color: "#2B55C4",
                    fontSize: 9, fontWeight: 800, letterSpacing: "0.13em",
                    padding: "3px 8px", borderRadius: 4,
                  }}>
                    {tooltip.group.projectNames.length} PROJECT{tooltip.group.projectNames.length > 1 ? "S" : ""}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700,
                  color: "var(--text-1)", lineHeight: 1.25, marginBottom: 12,
                }}>
                  {tooltip.group.label}
                </div>
                <div style={{ height: 1, background: "var(--border)", marginBottom: 10 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {tooltip.group.projectNames.map(name => {
                    const proj = PROJECTS.find(p => p.name === name)!;
                    return (
                      <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ color: "var(--text-2)", fontSize: 12, lineHeight: 1.4 }}>{name}</span>
                        <span style={{
                          color: CAT_COLOR[proj.category], fontSize: 11, fontWeight: 700,
                          flexShrink: 0, lineHeight: 1,
                        }}>
                          {proj.size}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div style={{
                  marginTop: 12, color: "var(--text-3)", fontSize: 10,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  Click to explore
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </>
            ) : (
              /* ── Project card (existing design) ── */
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{
                    background: `${CAT_COLOR[tooltip.project.category]}18`,
                    color: CAT_COLOR[tooltip.project.category],
                    fontSize: 9, fontWeight: 800, letterSpacing: "0.13em",
                    padding: "3px 8px", borderRadius: 4,
                  }}>
                    {tooltip.project.type.toUpperCase()}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800,
                    color: CAT_COLOR[tooltip.project.category], lineHeight: 1,
                  }}>
                    {tooltip.project.size}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700,
                  color: "var(--text-1)", lineHeight: 1.25, marginBottom: 6,
                }}>
                  {tooltip.project.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke={CAT_COLOR[tooltip.project.category]} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <span style={{ color: "var(--text-2)", fontSize: 12, fontWeight: 500 }}>
                    {tooltip.project.location}
                  </span>
                </div>
                <div style={{ height: 1, background: "var(--border)", marginBottom: 10 }} />
                <p style={{ color: "var(--text-2)", fontSize: 12, lineHeight: 1.65, margin: 0 }}>
                  {tooltip.project.description}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
