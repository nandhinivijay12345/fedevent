import { useEffect, useRef, useState } from "react";
import whatisfed from "@/assets/whatisfed.jpg";
import story from "@/assets/story-saree.jpg";
import whyfedMatters from "@/assets/whyfed-matters-3.jpg";

type Slide = {
  eyebrow: string;
  heading: string;
  body: string;
  pull: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Chapter 01",
    heading: "What is FED?",
    body: "The Future of Education (FED) is the flagship education summit hosted by American World School, bringing together educators, school leaders, students, entrepreneurs, and changemakers to explore bold ideas, showcase educational excellence, and shape the future of learning through collaboration, innovation, and thought leadership.",
    pull: "Three editions. One movement.",
    image: whatisfed,
  },
  {
    eyebrow: "Chapter 02",
    heading: "Story Behind FED",
    body: "FED was born from the belief that the future of education is not created in isolation but through the exchange of ideas, experiences, and perspectives. What began as an initiative by American World School has grown into a defining annual summit, bringing together the people and conversations that continue to influence education across the world.",
    pull: "A conversation that outgrew its room.",
    image: story,
  },
  {
    eyebrow: "Chapter 03",
    heading: "Why FED Matters",
    body: "The future of education will not be shaped by one school, one country, or one idea. It will be shaped by the collective wisdom of visionaries who come together to solve the world's greatest educational challenges. FED is where those conversations begin.",
    pull: "Where the next chapter is written.",
    image: whyfedMatters,
  },
];

const LOCK_MS = 900;

export function WhyFED() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [i, setI] = useState(0);
  const iRef = useRef(0);
  const lockedRef = useRef(false);
  const pinnedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    iRef.current = i;
  }, [i]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        pinnedRef.current = entry.intersectionRatio >= 0.9;
      },
      { threshold: [0, 0.5, 0.9, 1] },
    );
    io.observe(el);

    const align = () => {
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top) < 1) return;
      window.scrollTo({ top: window.scrollY + rect.top });
    };

    const canAdvance = (dir: 1 | -1) => {
      const n = iRef.current + dir;
      return n >= 0 && n < SLIDES.length;
    };

    const advance = (dir: 1 | -1) => {
      if (lockedRef.current) return false;
      const n = iRef.current + dir;
      if (n < 0 || n >= SLIDES.length) return false;
      lockedRef.current = true;
      iRef.current = n;
      setI(n);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, LOCK_MS);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!pinnedRef.current) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (lockedRef.current) {
        e.preventDefault();
        return;
      }
      if (!canAdvance(dir)) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) < 6) return;
      advance(dir);
      align();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!pinnedRef.current) return;
      let dir: 1 | -1 | 0 = 0;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) dir = 1;
      else if (["ArrowUp", "PageUp"].includes(e.key)) dir = -1;
      if (!dir) return;
      if (!canAdvance(dir)) return;
      e.preventDefault();
      advance(dir);
      align();
    };

    const ts = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const tm = (e: TouchEvent) => {
      if (!pinnedRef.current || touchStartY.current == null) return;
      const dy = touchStartY.current - (e.touches[0]?.clientY ?? 0);
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (!canAdvance(dir)) return;
      e.preventDefault();
      if (Math.abs(dy) < 30) return;
      if (advance(dir)) {
        touchStartY.current = null;
        align();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchmove", tm, { passive: false });

    return () => {
      io.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", ts);
      window.removeEventListener("touchmove", tm);
    };
  }, []);

  const s = SLIDES[i];

  return (
    <section
      id="why-fed"
      ref={sectionRef}
      
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <div className="mx-auto grid h-full max-w-[1280px] grid-cols-1 items-center gap-0 px-8 pt-[88px] pb-10 md:grid-cols-[52fr_48fr]">
        {/* LEFT — image (crossfade) */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] shadow-[0_40px_80px_-40px_rgba(20,44,115,0.35)] md:h-[78vh]">
          {SLIDES.map((sl, idx) => (
            <img
              key={idx}
              src={sl.image}
              alt={sl.heading}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{
                opacity: idx === i ? 1 : 0,
                objectPosition:
                  idx === 1 ? "center 20%" : idx === 2 ? "30% center" : "center",
              }}
            />
          ))}
        </div>

        {/* RIGHT — text */}
        <div className="relative flex h-full flex-col justify-center px-2 md:px-14">
          <div key={i} style={{ animation: "whyfade 600ms ease-out" }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
              Why FED
            </div>
            <h3 className="mt-5 font-serif text-[clamp(2.4rem,4.4vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#1B2A5E]">
              {s.heading}
              <span className="text-[#D62828]">.</span>
            </h3>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-[#1B2A5E]/75 md:text-[18px]">
              {s.body}
            </p>
          </div>

          {/* Manual nav + Progress rail */}
          <div className="absolute bottom-8 left-2 right-2 flex items-center gap-4 md:left-14 md:right-14">
            <button
              type="button"
              onClick={() => {
                const n = iRef.current - 1;
                if (n < 0) return;
                iRef.current = n;
                setI(n);
              }}
              disabled={i === 0}
              aria-label="Previous chapter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B2A5E]/20 text-[#1B2A5E] transition hover:border-[#D62828] hover:text-[#D62828] disabled:opacity-30 disabled:hover:border-[#1B2A5E]/20 disabled:hover:text-[#1B2A5E]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              onClick={() => {
                const n = iRef.current + 1;
                if (n >= SLIDES.length) return;
                iRef.current = n;
                setI(n);
              }}
              disabled={i === SLIDES.length - 1}
              aria-label="Next chapter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B2A5E]/20 text-[#1B2A5E] transition hover:border-[#D62828] hover:text-[#D62828] disabled:opacity-30 disabled:hover:border-[#1B2A5E]/20 disabled:hover:text-[#1B2A5E]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
            </button>
            <div className="flex items-center gap-3 pl-2">
              {SLIDES.map((_, idx) => (
                <span
                  key={idx}
                  className={`block h-[2px] transition-all duration-500 ${
                    idx === i ? "w-10 bg-[#D62828]" : "w-5 bg-[#1B2A5E]/25"
                  }`}
                />
              ))}
              <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/50">
                {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes whyfade { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </section>
  );
}
