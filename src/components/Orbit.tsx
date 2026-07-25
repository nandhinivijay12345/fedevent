import { useState } from "react";
import orbit1 from "@/assets/orbit1.jpg.asset.json";
import orbit2 from "@/assets/orbit2.jpg.asset.json";
import orbit3 from "@/assets/orbit3.jpg.asset.json";
import orbit4 from "@/assets/orbit4.jpg.asset.json";
import orbit5 from "@/assets/orbit5.jpg.asset.json";
import orbit6 from "@/assets/orbit6.jpg.asset.json";
import orbit7 from "@/assets/orbit7.jpg.asset.json";
import bgImg from "@/assets/orbit-bg.jpg.asset.json";

type Item = {
  label: string;
  imageUrl: string;
  // position in % relative to the stage center (50,50), plus radius in %
  angle: number; // degrees, 0 = right, -90 = top
  distance: number; // % of stage half-size
  size: number; // px baseline circle size at desktop
};

// Evenly spaced ring: 7 circles at 360/7 ≈ 51.43° increments, uniform radius & size.
const RADIUS = 40; // % of stage half-size
const SIZE = 168;  // px
const BASE: Omit<Item, "angle" | "distance" | "size">[] = [
  { label: "Top 100 Awards",     imageUrl: orbit7.url },
  { label: "Global Recognition", imageUrl: orbit1.url },
  { label: "Expert Speakers",    imageUrl: orbit3.url },
  { label: "Best Practices",     imageUrl: orbit2.url },
  { label: "Future Trends",      imageUrl: orbit5.url },
  { label: "Student Showcase",   imageUrl: orbit6.url },
  { label: "School Networking",  imageUrl: orbit4.url },
];
const ITEMS: Item[] = BASE.map((it, i) => ({
  ...it,
  angle: -90 + (360 / BASE.length) * i,
  distance: RADIUS,
  size: SIZE,
}));


export function Orbit() {
  const [hovered, setHovered] = useState<number | null>(null);
  const paused = hovered !== null;
  const activeBg = hovered !== null ? ITEMS[hovered].imageUrl : bgImg.url;

  return (
    <section
      id="orbit"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background layers with crossfade */}
      <div
        aria-hidden
        className="absolute inset-0 transition-[background-image] duration-500"
        style={{
          backgroundImage: `url(${bgImg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: hovered !== null ? 1 : 0,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(10, 20, 55, 0.82)" }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <div className="text-[12px] md:text-[13px] tracking-[0.28em] font-semibold text-[#FF5A5A] mb-4">
            <span className="inline-block w-6 h-px bg-[#FF5A5A] align-middle mr-3" />
            WHAT YOU GAIN
          </div>
          <h2 className="font-serif text-[44px] md:text-[64px] lg:text-[76px] leading-[1.05] text-white tracking-tight">
            Seven reasons to be<br />
            <span className="italic">in the room<span className="text-[#FF5A5A]">.</span></span>
          </h2>
        </div>

        {/* Desktop / tablet: scattered orbit */}
        <div className="hidden md:flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: "min(860px, 88vw)",
              height: "min(860px, 88vw)",
            }}
          >
            {/* Rotating cluster */}
            <div
              className="absolute inset-0"
              style={{
                animation: "orbitSpin 45s linear infinite",
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {ITEMS.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = 50 + item.distance * Math.cos(rad);
                const y = 50 + item.distance * Math.sin(rad);
                const isHovered = hovered === i;
                const isFaded = hovered !== null && !isHovered;
                return (
                  <div
                    key={item.label}
                    className="absolute transition-opacity duration-500 ease-out"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      opacity: isFaded ? 0 : 1,
                      pointerEvents: isFaded ? "none" : "auto",
                      zIndex: isHovered ? 20 : 10,
                    }}
                  >
                    <div
                      style={{
                        animation: "orbitSpinReverse 45s linear infinite",
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    >
                      <OrbitCircle
                        item={item}
                        onEnter={() => setHovered(i)}
                        onLeave={() => setHovered(null)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center anchor */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="font-serif text-white text-[56px] md:text-[76px] lg:text-[96px] leading-[1] tracking-tight">
                FED<span className="text-[#FF5A5A]">.</span>
              </div>
              <div className="mt-3 text-[11px] md:text-[13px] tracking-[0.32em] font-semibold text-white/70">
                CHENNAI · 2026
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative aspect-square rounded-full overflow-hidden border-2 border-white/80 flex items-center justify-center p-4 text-center"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0" style={{ background: "rgba(10,20,55,0.6)" }} />
              <span className="relative font-bold text-white text-[14px] leading-tight tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitSpinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}

function OrbitCircle({
  item,
  onEnter,
  onLeave,
}: {
  item: Item;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative rounded-full overflow-hidden border border-white/70 flex items-center justify-center text-center cursor-default transition-transform duration-500 ease-out hover:scale-[1.4]"
      style={{
        width: `clamp(120px, ${item.size / 10}vw, ${item.size}px)`,
        height: `clamp(120px, ${item.size / 10}vw, ${item.size}px)`,
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow:
          "0 24px 50px -20px rgba(0,0,0,0.55), 0 4px 12px -4px rgba(0,0,0,0.35)",
      }}
    >
      <span
        className="absolute inset-0 transition-colors duration-500"
        style={{ background: "rgba(10, 20, 55, 0.55)" }}
      />
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "0 0 0 2px #FF5A5A, 0 0 40px 0 rgba(255,90,90,0.45)",
        }}
      />
      <span className="relative px-4 font-bold text-white tracking-tight leading-[1.15] text-[14px] md:text-[15px] lg:text-[16px]">
        {item.label}
      </span>
    </div>
  );
}
