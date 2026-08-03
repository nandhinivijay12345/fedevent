import { useCallback, useEffect, useRef, useState } from "react";
import globalRecognition from "@/assets/global-recognition.jpg";
import orbit3 from "@/assets/orbit3.jpg";
import orbit4 from "@/assets/orbit4.jpg";
import futureTrends from "@/assets/future-trends.jpg";
import orbit6 from "@/assets/orbit6.jpg";
import showcase from "@/assets/story.png";
import bgImg from "@/assets/orbit-bg.jpg";

type Reason = { label: string; blurb: string; image: string };

const REASONS: Reason[] = [
  { label: "Global Recognition", blurb: "A stage that earns you a place in the conversation.", image: globalRecognition },
  { label: "Best Practices",     blurb: "Frameworks other schools are quietly adopting.",       image: orbit6 },
  { label: "Expert Speakers",    blurb: "Educators who built what everyone else discusses.",    image: orbit3 },
  { label: "School Networking",  blurb: "The partnerships that outlast the day itself.",        image: orbit4 },
  { label: "Future Trends",      blurb: "Where the next five years of learning are drafted.",   image: futureTrends },
  { label: "Student Showcase",   blurb: "The children rewriting what school can be.",           image: showcase },
];

const N = REASONS.length;
const CARD_ASPECT = 400 / 500;
const SIDE_SCALE = 0.68;
const GAP = 20;

// Everything in the viewport-height section other than the card itself
// (nav clearance, heading, spacing, dots) — used to size the card so the
// whole section fits within one screen at any viewport height.
const NON_CARD_HEIGHT = 249;

const DEFAULT_ACTIVE_H = 620;

function computeActiveH() {
  const byHeight = window.innerHeight - NON_CARD_HEIGHT;
  // Cap by width too, so the active card (plus its peeking neighbours)
  // never pushes past the viewport edges on narrow screens.
  const byWidth = (window.innerWidth - 64) / CARD_ASPECT;
  return Math.max(280, Math.min(680, byHeight, byWidth));
}

export function ReasonsCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  // Starts at a fixed, SSR-safe value so client hydration matches the
  // server-rendered markup exactly, then resolves to the real
  // viewport-based size once mounted (see effect below).
  const [activeH, setActiveH] = useState(DEFAULT_ACTIVE_H);
  const dragRef = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const ACTIVE_H = activeH;
  const ACTIVE_W = Math.round(activeH * CARD_ASPECT);
  const OFFSET = ACTIVE_W / 2 + (ACTIVE_W * SIDE_SCALE) / 2 + GAP;

  useEffect(() => {
    const onResize = () => setActiveH(computeActiveH());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const wrap = useCallback((n: number) => ((n % N) + N) % N, []);
  const next = useCallback(() => setIdx((v) => wrap(v + 1)), [wrap]);
  const prev = useCallback(() => setIdx((v) => wrap(v - 1)), [wrap]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => next(), 2200);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, active: true };
    setPaused(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.active = false;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  return (
    <section id="reasons" className="relative flex h-screen min-h-[620px] flex-col justify-center overflow-hidden pt-[80px]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(10,20,55,0.92)" }} />

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto max-w-[1280px] px-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF5A5A]">
            What You Gain
          </div>
          <h2 className="mt-2 max-w-[22ch] font-serif text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
            Six reasons to be in the room<span className="text-[#FF5A5A]">.</span>
          </h2>
        </div>

        <div
          className="relative mx-auto mt-5 flex items-center justify-center select-none"
          style={{ height: ACTIVE_H + 40 }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {REASONS.map((r, i) => {
            let d = i - idx;
            if (d > N / 2) d -= N;
            if (d < -N / 2) d += N;

            const isActive = d === 0;
            const isSide = d === -1 || d === 1;
            const visible = isActive || isSide;

            const scale = isActive ? 1 : SIDE_SCALE;
            const translate = d * OFFSET;
            const opacity = isActive ? 1 : isSide ? 0.55 : 0;
            const zIndex = isActive ? 20 : isSide ? 10 : 0;

            return (
              <button
                key={i}
                type="button"
                aria-label={r.label}
                tabIndex={visible ? 0 : -1}
                onClick={() => {
                  if (isActive) return;
                  setIdx(i);
                }}
                className="absolute top-1/2 left-1/2 overflow-hidden rounded-[20px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  width: ACTIVE_W,
                  height: ACTIVE_H,
                  transform: `translate(-50%, -50%) translateX(${translate}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: visible ? "auto" : "none",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <img
                  src={r.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "rgba(10,20,55,0.35)",
                    opacity: isActive ? 0 : 1,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[55%]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,15,35,0) 0%, rgba(10,15,35,0.85) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-7 text-left">
                  <span className="block h-[2px] w-8 bg-[#FF5A5A]" style={{ marginBottom: 18 }} />
                  <div className="font-serif text-[24px] font-medium leading-[1.1] text-white">
                    {r.label}
                  </div>
                  <div className="mt-2 text-[14px] leading-[1.5] text-white/70">
                    {r.blurb}
                  </div>
                </div>
              </button>
            );
          })}

          <div
            className="absolute top-1/2 z-30 hidden -translate-y-1/2 md:block"
            style={{ right: `calc(50% + ${OFFSET + (ACTIVE_W * SIDE_SCALE) / 2 + 20}px)` }}
          >
            <CircleArrow dir="prev" onClick={prev} />
          </div>
          <div
            className="absolute top-1/2 z-30 hidden -translate-y-1/2 md:block"
            style={{ left: `calc(50% + ${OFFSET + (ACTIVE_W * SIDE_SCALE) / 2 + 20}px)` }}
          >
            <CircleArrow dir="next" onClick={next} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2.5">
          {REASONS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to reason ${i + 1}`}
              onClick={() => setIdx(i)}
              className="h-[7px] w-[7px] rounded-full transition-all"
              style={{
                background: i === idx ? "#FF5A5A" : "rgba(255,255,255,0.35)",
                transform: i === idx ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CircleArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white hover:text-[#0a1437]"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {dir === "prev" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
