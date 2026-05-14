"use client";
import { useState, useEffect, useRef } from "react";

const TOOLTIP_W = 288;

// ESRI tile layers — no API key required
const TILE_SATELLITE = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const TILE_TOPO      = "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";
const TILE_ATTR      = "Tiles &copy; <a href='https://www.esri.com'>Esri</a>";

type Category = "canopy" | "rooftop" | "landfill" | "bess";

interface Project {
  name: string;
  coords: [number, number]; // [lng, lat]
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
    coords: [-62.0, 17.0],
    location: "Caribbean",
    size: "1.0 MW / 4 MWh",
    type: "BESS & Microgrid",
    category: "bess",
    description: "Island microgrid with battery energy storage for an electric cooperative. Delivered full grid independence and resiliency for a remote off-grid community.",
  },
];

interface TooltipState { project: Project; x: number; y: number; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComp = React.ComponentType<any>;
interface MapLib { MapContainer: AnyComp; TileLayer: AnyComp; CircleMarker: AnyComp; }

export default function Projects() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [winW,    setWinW]    = useState(1280);
  const [mapLib,  setMapLib]  = useState<MapLib | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);

    // Dynamically import Leaflet + CSS to avoid SSR issues
    Promise.all([
      import("leaflet/dist/leaflet.css" as string),
      import("react-leaflet"),
    ]).then(([, rl]) => {
      setMapLib({
        MapContainer:  rl.MapContainer,
        TileLayer:     rl.TileLayer,
        CircleMarker:  rl.CircleMarker,
      });
    });

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const ttLeft = tooltip
    ? Math.max(8, Math.min(tooltip.x - TOOLTIP_W / 2, winW - TOOLTIP_W - 8))
    : 0;
  const ttTop = tooltip ? tooltip.y + 18 : 0;

  const { MapContainer, TileLayer, CircleMarker } = mapLib ?? {};

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
            </a>.
          </p>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
            height: 540,
            background: "#0d1f2d",
          }}
        >
          {MapContainer && TileLayer && CircleMarker ? (
            <MapContainer
              center={[32, -90] as [number, number]}
              zoom={4}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              attributionControl={true}
            >
              {/* Satellite base */}
              <TileLayer url={TILE_SATELLITE} attribution={TILE_ATTR} maxZoom={19} />
              {/* Topo / reference overlay */}
              <TileLayer url={TILE_TOPO} maxZoom={19} opacity={0.75} />

              {PROJECTS.map(project => {
                const color    = CAT_COLOR[project.category];
                const isActive = tooltip?.project.name === project.name;
                return (
                  <CircleMarker
                    key={project.name}
                    center={[project.coords[1], project.coords[0]] as [number, number]}
                    radius={isActive ? 8 : 5}
                    pathOptions={{
                      fillColor: color,
                      color: "#FFFFFF",
                      weight: isActive ? 2 : 1.5,
                      fillOpacity: 1,
                      opacity: 1,
                    }}
                    eventHandlers={{
                      mouseover: (e: { originalEvent: MouseEvent }) =>
                        setTooltip({ project, x: e.originalEvent.clientX, y: e.originalEvent.clientY }),
                      mousemove: (e: { originalEvent: MouseEvent }) =>
                        setTooltip(t => t?.project.name === project.name
                          ? { ...t, x: e.originalEvent.clientX, y: e.originalEvent.clientY }
                          : t),
                      mouseout: () => setTooltip(null),
                    }}
                  />
                );
              })}
            </MapContainer>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading satellite map…</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div style={{
          marginTop: 16, display: "flex", flexWrap: "wrap", gap: 20,
          padding: "0 4px",
        }}>
          {(["canopy", "rooftop", "landfill", "bess"] as Category[]).map(cat => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: CAT_COLOR[cat] }} />
              <span style={{ color: "var(--text-3)", fontSize: 11 }}>{CAT_LABEL[cat]}</span>
            </div>
          ))}
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

      {/* Floating tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed",
          left: ttLeft,
          top: ttTop,
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
            borderTop: `3px solid ${CAT_COLOR[tooltip.project.category]}`,
            borderRadius: 10,
            padding: "16px 18px 18px",
            boxShadow: "var(--shadow-lg)",
          }}>
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
          </div>
        </div>
      )}
    </section>
  );
}
