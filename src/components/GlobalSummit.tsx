import { useEffect, useRef, useState } from "react";
import { WORLD_MAP_D, WORLD_MAP_VIEWBOX, WORLD_MAP_W, WORLD_MAP_H } from "./worldMapPath";

export const MAP_W = WORLD_MAP_W;
export const MAP_H = WORLD_MAP_H;

const project = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * MAP_W,
  y: ((90 - lat) / 180) * MAP_H,
});
const toPct = (p: { x: number; y: number }) => ({ x: (p.x / MAP_W) * 100, y: (p.y / MAP_H) * 100 });

const HUB = { name: "India", lon: 78, lat: 22 };

type Dest = { name: string; lon: number; lat: number; labelSide?: "left" | "right"; labelDy?: number };

const DESTINATIONS: Dest[] = [
  { name: "Malaysia", lon: 102, lat: 3, labelSide: "right", labelDy: 6 },
  { name: "Hong Kong", lon: 114, lat: 22, labelSide: "right", labelDy: -8 },
  { name: "New York, USA", lon: -74, lat: 40.7, labelSide: "right" },
  { name: "California, USA", lon: -122, lat: 37, labelSide: "left" },
  { name: "United Kingdom", lon: -2, lat: 54, labelSide: "left" },
];

const LINE_COLOR = "#3B5BD9";

const curvePath = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) { nx = -nx; ny = -ny; }
  const bulge = dist * 0.22;
  return `M ${x1} ${y1} Q ${mx + nx * bulge} ${my + ny * bulge} ${x2} ${y2}`;
};

// Render as dotted stipple map for the brand motif
export function WorldMap({ color = "#C7CDE4" }: { color?: string } = {}) {
  const patternId = `dotstip-${color.replace("#", "")}`;
  return (
    <svg
      viewBox={WORLD_MAP_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill={color} />
        </pattern>
        <mask id={`landmask-${patternId}`}>
          <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="black" />
          <path d={WORLD_MAP_D} fill="white" fillRule="evenodd" />
        </mask>
      </defs>
      <rect x="0" y="0" width={MAP_W} height={MAP_H} fill={`url(#${patternId})`} mask={`url(#landmask-${patternId})`} />
    </svg>
  );
}


export function GlobalSummit() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hub = project(HUB.lon, HUB.lat);
  const hubPct = toPct(hub);

  return (
    <>
    <section ref={sectionRef} id="global" className="bg-white pt-28 pb-0">

      <div className="mx-auto max-w-[1280px] px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[40fr_60fr] lg:gap-16">
          {/* LEFT */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
              Global Reach
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#142c73]">
              A global summit for{" "}
              <span className="italic text-[#D62828]">education innovation.</span>
            </h2>
            <p className="mt-6 max-w-[400px] text-[18px] leading-[1.6] text-[#3D4666]">
              Educators, founders and policy leaders from five regions converge on Chennai — with India at the center of the conversation.
            </p>
          </div>

          {/* RIGHT — map */}
          <div className="hidden md:block">
            <div className="relative mx-auto w-full" style={{ maxHeight: 520, aspectRatio: `${MAP_W} / ${MAP_H}` }}>
              <div className="relative h-full w-full">
                <WorldMap />

                <svg
                  viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
                >
                  {DESTINATIONS.map((d, i) => {
                    const p = project(d.lon, d.lat);
                    const path = curvePath(hub.x, hub.y, p.x, p.y);
                    const dim = hovered && hovered !== d.name;
                    return (
                      <path
                        key={d.name}
                        d={path}
                        fill="none"
                        stroke={LINE_COLOR}
                        strokeWidth={hovered === d.name ? 2.2 : 1.6}
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray="1"
                        strokeDashoffset={inView ? 0 : 1}
                        style={{
                          transition: "stroke-dashoffset 1.5s ease-out, opacity 0.3s, stroke-width 0.3s",
                          transitionDelay: `${0.15 + i * 0.15}s`,
                          opacity: dim ? 0.15 : 0.9,
                        }}
                      />
                    );
                  })}
                </svg>

                <HubPin x={hubPct.x} y={hubPct.y} highlighted={hovered === null || hovered === "India"} onHover={setHovered} pulse={inView} />

                {DESTINATIONS.map((d) => {
                  const p = toPct(project(d.lon, d.lat));
                  return (
                    <Pin
                      key={d.name}
                      x={p.x}
                      y={p.y}
                      label={d.name}
                      side={d.labelSide ?? "right"}
                      labelDy={d.labelDy ?? 0}
                      highlighted={hovered === null || hovered === d.name}
                      onHover={setHovered}
                      pulse={inView}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE list */}
          <ul className="md:hidden divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
            <li className="flex items-center gap-3 py-4">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#D62828" }} />
              <span className="text-[13px] font-semibold text-[#142c73]">India</span>
              <span className="ml-auto text-[10px] tracking-[0.2em] font-semibold text-[#D62828] bg-[#D62828]/10 px-2 py-0.5 rounded">HOST</span>
            </li>
            {DESTINATIONS.map((d) => (
              <li key={d.name} className="flex items-center gap-3 py-4">
                <span className="h-2.5 w-2.5 rounded-full border border-[#142c73]/30 bg-white" />
                <span className="text-[13px] text-[#142c73]">{d.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}




function Pin({ x, y, label, side, labelDy, highlighted, onHover, pulse }: {
  x: number; y: number; label: string; side: "left" | "right"; labelDy: number;
  highlighted: boolean; onHover: (name: string | null) => void; pulse: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", opacity: highlighted ? 1 : 0.35, transition: "opacity 0.3s", zIndex: 10 }}
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative flex items-center justify-center">
        {pulse && <span className="absolute rounded-full animate-ping" style={{ background: "#142c73", width: 12, height: 12, opacity: 0.25, animationIterationCount: 1, animationDuration: "1.4s" }} />}
        <span className="relative rounded-full bg-white" style={{ width: 9, height: 9, border: "2px solid #142c73" }} />
      </div>
      <div className="absolute whitespace-nowrap" style={{ top: `calc(50% + ${labelDy}px)`, transform: "translateY(-50%)", [side === "right" ? "left" : "right"]: "calc(50% + 12px)" }}>
        <span className="text-[13px] font-medium text-[#142c73]">{label}</span>
      </div>
    </div>
  );
}

function HubPin({ x, y, highlighted, onHover, pulse }: {
  x: number; y: number; highlighted: boolean; onHover: (name: string | null) => void; pulse: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", opacity: highlighted ? 1 : 0.4, transition: "opacity 0.3s", zIndex: 20 }}
      onMouseEnter={() => onHover("India")}
      onMouseLeave={() => onHover(null)}
    >
      <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ bottom: "calc(50% + 16px)" }}>
        <span className="text-[10px] tracking-[0.22em] font-bold text-white bg-[#D62828] px-2 py-[3px] rounded-full">HOST</span>
      </div>
      <div className="relative flex items-center justify-center">
        {pulse && <span className="absolute rounded-full animate-ping" style={{ background: "#D62828", width: 22, height: 22, opacity: 0.4, animationIterationCount: 1, animationDuration: "1.4s" }} />}
        <span className="relative rounded-full ring-[2px] ring-white" style={{ background: "#D62828", width: 13, height: 13 }} />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ top: "calc(50% + 14px)" }}>
        <span className="text-[13px] font-semibold text-[#D62828]">India</span>
      </div>
    </div>
  );
}
