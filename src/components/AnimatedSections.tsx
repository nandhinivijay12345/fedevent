import { useEffect, useRef, useState } from "react";

import slide1 from "@/assets/converge.jpg";
import slide2 from "@/assets/listen-3.jpg";
import slide3 from "@/assets/slide3.png";
import slide4 from "@/assets/launch.jpg";
import slide5 from "@/assets/slide5.jpg";

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

const WHEEL_LOCK_MS = 350;
const MOMENTUM_EXTEND_MS = 300;
const MOMENTUM_NOISE_DELTA = 3;
const ENTRY_LOCK_MS = 950;

export function AnimatedSections() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const pinnedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const lockTimerRef = useRef<number | null>(null);
  const entrySnapTimerRef = useRef<number | null>(null);
  const releasedDirRef = useRef<1 | -1 | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const alignSection = (behavior: ScrollBehavior = "auto") => {
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top) < 1) return;
      window.scrollTo({ top: window.scrollY + rect.top, behavior });
    };

    const getCatchState = (dir: 1 | -1) => {
      const rect = el.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) {
        releasedDirRef.current = null;
      }
      return {
        fromAbove: dir > 0 && rect.top > 1,
        fromBelow: dir < 0 && rect.bottom < window.innerHeight - 1,
        shouldCatch:
          dir > 0
            ? rect.bottom > 0 && rect.top <= window.innerHeight
            : rect.top < window.innerHeight && rect.bottom >= 0,
      };
    };

    const armLock = (ms = WHEEL_LOCK_MS) => {
      lockedRef.current = true;
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
      }
      lockTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
        lockTimerRef.current = null;
      }, ms);
    };

    // Called while locked, for wheel events still carrying real momentum
    // (deltaY above the noise floor). Keeps pushing the unlock out for as
    // long as the trackpad's momentum genuinely keeps flowing, so a hard
    // flick can't outlast the lock and trigger a second advance — but once
    // events decay into the tail-end dribble, we stop extending and let the
    // lock expire on schedule instead of waiting for total silence.
    const extendLock = (ms = MOMENTUM_EXTEND_MS) => {
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
      }
      lockTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
        lockTimerRef.current = null;
      }, ms);
    };

    const release = (dir: 1 | -1) => {
      pinnedRef.current = false;
      releasedDirRef.current = dir;
    };

    const tryCatch = (dir: 1 | -1) => {
      if (pinnedRef.current || lockedRef.current) return false;
      const catchState = getCatchState(dir);
      if (!catchState.shouldCatch) return false;
      if (releasedDirRef.current === dir) return false;
      releasedDirRef.current = null;
      pinnedRef.current = true;
      if (catchState.fromAbove || catchState.fromBelow) {
        const entrySlide = catchState.fromAbove ? 0 : SLIDES.length - 1;
        activeRef.current = entrySlide;
        setActive(entrySlide);
        alignSection("smooth");
        armLock(ENTRY_LOCK_MS);
        if (entrySnapTimerRef.current) {
          clearTimeout(entrySnapTimerRef.current);
        }
        entrySnapTimerRef.current = window.setTimeout(() => {
          alignSection("auto");
          entrySnapTimerRef.current = null;
        }, ENTRY_LOCK_MS);
        return true;
      }
      alignSection("auto");
      return true;
    };

    const advance = (dir: 1 | -1) => {
      if (lockedRef.current) return false;
      const next = activeRef.current + dir;
      if (next < 0 || next >= SLIDES.length) return false;
      activeRef.current = next;
      setActive(next);
      armLock();
      return true;
    };

    const canAdvance = (dir: 1 | -1) => {
      const next = activeRef.current + dir;
      return next >= 0 && next < SLIDES.length;
    };

    const wheelHandler = (e: WheelEvent) => {
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;

      if (!pinnedRef.current) {
        if (tryCatch(dir)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        return;
      }

      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        if (Math.abs(e.deltaY) > MOMENTUM_NOISE_DELTA) {
          extendLock();
        }
        return;
      }

      if (!canAdvance(dir)) {
        release(dir);
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (advance(dir)) {
        alignSection();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      let dir: 1 | -1 | 0 = 0;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) dir = 1;
      else if (["ArrowUp", "PageUp"].includes(e.key)) dir = -1;
      if (!dir) return;
      if (!pinnedRef.current) {
        if (tryCatch(dir)) e.preventDefault();
        return;
      }
      if (!canAdvance(dir)) {
        release(dir);
        return;
      }
      e.preventDefault();
      advance(dir);
      alignSection();
    };

    const touchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const touchMove = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const dy = touchStartY.current - (e.touches[0]?.clientY ?? 0);
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (!pinnedRef.current) {
        if (tryCatch(dir)) {
          e.preventDefault();
          touchStartY.current = null;
        }
        return;
      }
      if (!canAdvance(dir)) {
        release(dir);
        return;
      }
      e.preventDefault();
      if (Math.abs(dy) < 30) return;
      if (advance(dir)) {
        touchStartY.current = null;
        alignSection();
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: false });

    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      if (entrySnapTimerRef.current) clearTimeout(entrySnapTimerRef.current);
      window.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      data-hide-nav
      className="relative z-40 h-screen w-full overflow-hidden bg-ink"
      aria-label="Chapters of the day"
    >
      {SLIDES.map((s, i) => {
        const revealed = i <= active;
        const isActive = active === i;
        const chapterLabel = `CHAPTER 0${i + 1}`;
        return (
          <div
            key={i}
            className="absolute inset-0 will-change-[clip-path] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{
              zIndex: i + 1,
              clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {/* Full-bleed photo */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.image})` }}
              />
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
                    className="text-[11px] uppercase tracking-[0.28em] text-white/60 transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(-10px)",
                      transitionDelay: isActive ? "150ms" : "0ms",
                    }}
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
                    className="font-serif font-medium leading-none tracking-[-0.03em] text-white text-center"
                    style={{
                      fontSize: "clamp(4rem, 12vw, 12rem)",
                      textShadow: "0 4px 60px rgba(0,0,0,0.5)",
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0) scale(1)"
                        : "translateY(40px) scale(0.96)",
                      transition: "opacity 700ms ease-out, transform 700ms ease-out",
                    }}
                  >
                    {s.word}
                    <span
                      className="inline-block text-[#D62828]"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scale(1)" : "scale(0.6)",
                        transition: "opacity 400ms ease-out 900ms, transform 400ms ease-out 900ms",
                      }}
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
                    className="pointer-events-auto max-w-[560px] transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      transitionDelay: isActive ? "500ms" : "0ms",
                    }}
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
          </div>
        );
      })}

      <div className="pointer-events-none absolute right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 md:right-10">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`block w-px transition-all duration-500 ${
              i === active ? "bg-[#D62828] h-[44px]" : "bg-white/70 h-[22px]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
