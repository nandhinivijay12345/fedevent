import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import slide1 from "@/assets/converge.jpg";
import slide2 from "@/assets/listen-3.jpg";
import slide3 from "@/assets/slide3.png";
import slide4 from "@/assets/launch.jpg";
import slide5 from "@/assets/slide5.jpg";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  word: string;
  line1: string;
  line2: string;
  image: string;
  cta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    word: "Converge",
    line1: "The world's most impactful change makers on one stage.",
    line2: "Edition 04. August 24. IITM Research Park.",
    image: slide1,
  },
  {
    word: "Listen",
    line1: "Global innovators and keynote speakers.",
    line2: "The leaders shaping what learning will look like.",
    image: slide2,
  },
  {
    word: "Pitch",
    line1:
      "The India Challenge, hosted by Kidspreneur, the Peter Jones Foundation, and American World School is now live.",
    line2: "Student founders from around the world take the mic.",
    image: slide3,
    cta: { label: "Curious? Find Out More.", href: "https://www.kidspreneur.org" },
  },
  {
    word: "Launch",
    line1: "Student founders launch their startups live.",
    line2: "Not a demo. A debut.",
    image: slide4,
  },
  {
    word: "Crown",
    line1: "India's Top 100 Schools, verified by AIAASC and WASC.",
    line2: "Recognition that travels beyond borders.",
    image: slide5,
  },
];

type PanelRefs = {
  img: HTMLDivElement | null;
  eyebrow: HTMLDivElement | null;
  word: HTMLHeadingElement | null;
  dot: HTMLSpanElement | null;
  caption: HTMLDivElement | null;
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Extra scroll distance (in viewport heights) the pin holds after the final
// slide reaches full opacity, before unpinning.
const HOLD_VH = 1;

export function AnimatedSections() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<PanelRefs[]>(
    SLIDES.map(() => ({ img: null, eyebrow: null, word: null, dot: null, caption: null })),
  );
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Touch devices (and narrow windows) get a native swipeable filmstrip instead
  // of the scroll-jacked pin: horizontal scroll-jacking fights the browser's own
  // swipe-back / address-bar gestures on touch, so we hand control back to the
  // browser there rather than trying to out-tune it.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const compactMql = window.matchMedia(
      "(max-width: 1023px), (hover: none) and (pointer: coarse)",
    );
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setCompact(compactMql.matches);
      setReduceMotion(reduceMql.matches);
    };
    update();
    compactMql.addEventListener("change", update);
    reduceMql.addEventListener("change", update);
    return () => {
      compactMql.removeEventListener("change", update);
      reduceMql.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (compact || reduceMotion) return;

    const panels = panelRefs.current;
    const lastActive = { current: 0 };

    const applyProgress = (progress: number) => {
      const raw = progress * (SLIDES.length - 1);
      const nearest = Math.round(raw);
      if (nearest !== lastActive.current) {
        lastActive.current = nearest;
        setActive(nearest);
      }

      panels.forEach((p, i) => {
        const dist = raw - i;
        const eyebrowT = clamp01(1 - Math.abs(dist) * 1.3);
        const wordT = clamp01(1 - Math.abs(dist) * 1.6);
        const captionT = clamp01(1 - Math.abs(dist) * 1.9);
        const dotT = clamp01(1 - Math.abs(dist) * 2.6);
        const bounded = Math.max(-1, Math.min(1, dist));

        if (p.eyebrow) gsap.set(p.eyebrow, { opacity: eyebrowT, y: (1 - eyebrowT) * -10 });
        if (p.word)
          gsap.set(p.word, { opacity: wordT, y: (1 - wordT) * 40, scale: 0.96 + wordT * 0.04 });
        if (p.dot) gsap.set(p.dot, { opacity: dotT, scale: 0.6 + dotT * 0.4 });
        if (p.caption) {
          gsap.set(p.caption, {
            opacity: captionT,
            y: (1 - captionT) * 16,
            pointerEvents: captionT > 0.5 ? "auto" : "none",
          });
        }
        // scale's overhang (half the growth, per side) must stay >= |xPercent|
        // or the translated image runs out of coverage and the section's dark
        // bg-ink shows through the gap at the trailing edge.
        if (p.img) gsap.set(p.img, { xPercent: bounded * -4, scale: 1 + Math.abs(bounded) * 0.12 });
      });
    };

    const ctx = gsap.context(() => {
      const getTravel = () => SLIDES.length * window.innerWidth - window.innerWidth;
      const getActiveVh = () => SLIDES.length * window.innerHeight;
      // Interior slides get dwell time on both sides of their peak (raw
      // approaches, then moves past). The last slide only ever gets the
      // "approach" half — raw caps out exactly when progress hits 1, which
      // is also exactly when the pin's `end` is reached. Without a trailing
      // hold zone, Crown reaches full opacity at the same scroll position
      // where the section unpins, so scroll momentum alone sweeps it away.
      // HOLD_VH adds scroll distance where progress/track position are
      // clamped at their final values, giving the last slide real dwell time.
      const getPinVh = () => getActiveVh() + HOLD_VH * window.innerHeight;
      const holdEase = (p: number) => Math.min(1, p / (getActiveVh() / getPinVh()));

      gsap.to(track, {
        x: () => -getTravel(),
        ease: holdEase,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          // Pin duration is based on viewport HEIGHT, not width — the x-travel
          // (getTravel) is a separate, width-based distance. Tying this to
          // width too would make the scroll-distance balloon on wide desktop
          // monitors even though the vertical scroll pacing users feel is a
          // function of viewport height, not width.
          end: () => `+=${getPinVh()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyProgress(holdEase(self.progress)),
        },
      });

      applyProgress(0);
    }, container);

    return () => ctx.revert();
  }, [compact, reduceMotion]);

  const staticMode = reduceMotion || compact;

  return (
    <section
      ref={containerRef}
      data-hide-nav
      className="relative z-40 h-screen w-full overflow-hidden bg-ink"
      aria-label="Chapters of the day"
    >
      <div
        ref={trackRef}
        className={`flex h-full w-full ${staticMode ? "overflow-x-auto snap-x snap-mandatory" : ""}`}
      >
        {SLIDES.map((s, i) => {
          const chapterLabel = `CHAPTER 0${i + 1}`;
          return (
            <div
              key={i}
              className={`relative h-full w-screen shrink-0 overflow-hidden ${
                staticMode ? "snap-center" : ""
              }`}
            >
              {/* Full-bleed photo */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  ref={(el) => {
                    panelRefs.current[i].img = el;
                  }}
                  className="absolute inset-0 bg-cover bg-center will-change-transform"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
              </div>
              {/* Cinematic grade: flat overlay + vignette */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "rgba(10,15,35,0.55)" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(10,15,35,0) 45%, rgba(10,15,35,0.55) 100%)",
                }}
              />

              {/* Eyebrow — top, container-aligned */}
              <div className="pointer-events-none absolute inset-x-0 top-8 md:top-10">
                <div className="mx-auto max-w-[1280px] px-8">
                  <div
                    ref={(el) => {
                      panelRefs.current[i].eyebrow = el;
                    }}
                    className="text-[11px] uppercase tracking-[0.28em] text-white/60 will-change-transform"
                    style={{ opacity: staticMode ? 1 : i === 0 ? 1 : 0 }}
                  >
                    {chapterLabel} · Edition 04
                  </div>
                </div>
              </div>

              {/* The Word — left aligned within container */}
              <div
                className="pointer-events-none absolute inset-x-0"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <div className="mx-auto max-w-[1280px] px-8">
                  <h2
                    ref={(el) => {
                      panelRefs.current[i].word = el;
                    }}
                    className="font-serif font-medium leading-none tracking-[-0.03em] text-white text-center will-change-transform"
                    style={{
                      fontSize: "clamp(4rem, 12vw, 12rem)",
                      textShadow: "0 4px 60px rgba(0,0,0,0.5)",
                      opacity: staticMode ? 1 : i === 0 ? 1 : 0,
                    }}
                  >
                    {s.word}
                    <span
                      ref={(el) => {
                        panelRefs.current[i].dot = el;
                      }}
                      className="inline-block text-[#D62828] will-change-transform"
                      style={{ opacity: staticMode ? 1 : i === 0 ? 1 : 0 }}
                    >
                      .
                    </span>
                  </h2>
                </div>
              </div>

              {/* Captions — bottom, container-aligned */}
              <div className="pointer-events-none absolute inset-x-0 bottom-10 md:bottom-12">
                <div className="mx-auto max-w-[1280px] px-8">
                  <div
                    ref={(el) => {
                      panelRefs.current[i].caption = el;
                    }}
                    className="pointer-events-auto max-w-[560px] will-change-transform"
                    style={{ opacity: staticMode ? 1 : i === 0 ? 1 : 0 }}
                  >
                    <div className="mb-4 w-6 bg-[#D62828]" style={{ height: "2px" }} />
                    <p className="text-[18px] leading-[1.5] text-white">{s.line1}</p>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-white/70">
                      {s.line2}
                    </p>
                    {s.cta ? (
                      <a
                        href={s.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block rounded-full border border-white/40 bg-white/10 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-white backdrop-blur transition-colors duration-300 hover:bg-white/20"
                      >
                        {s.cta.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!staticMode && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-50 flex justify-center gap-3 md:bottom-8">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`block h-px transition-all duration-500 ${
                i === active ? "bg-[#D62828] w-[44px]" : "bg-white/70 w-[22px]"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
