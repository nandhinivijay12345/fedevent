import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";
import { WorldMap, MAP_W, MAP_H } from "./GlobalSummit";
import ctaBg from "@/assets/cta-bg-2.png";

export function FinalCTA() {
  return (
    <section className="bg-white pt-24 pb-16 md:pt-[96px] md:pb-[64px]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] bg-[#141F45] p-10 md:p-24 text-center">
            {/* Background photo */}
            <img
              src={ctaBg}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark navy overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(20,31,69,0.88) 0%, rgba(20,31,69,0.94) 100%)" }}
            />
            {/* Faint dotted globe motif — top-right corner only, cropped by rounded edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-24 w-[520px] max-w-[70%]"
              style={{ aspectRatio: `${MAP_W} / ${MAP_H}`, opacity: 0.06 }}
            >
              <WorldMap color="#FFFFFF" />
            </div>


            <div className="relative mx-auto flex flex-col items-center">
              <Reveal delay={140}>
                <div
                  className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold uppercase text-white/60"
                  style={{ letterSpacing: "0.22em" }}
                >
                  <span>August 24, 2026</span>
                  <span className="inline-block h-[4px] w-[4px] rounded-full bg-[#D62828]" />
                  <span>IITM Research Park, Chennai</span>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-4 h-[2px] w-10 bg-[#D62828]" />
              </Reveal>

              <Reveal delay={300}>
                <h2 className="mt-6 font-serif font-medium leading-[1.02] tracking-[-0.02em] text-white text-[48px] md:text-[64px] lg:text-[80px]">
                  Will we see you <span className="italic text-[#D62828]">there?</span>
                </h2>
              </Reveal>

              <Reveal delay={400}>
                <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] text-white/70">
                  One room. One day. The people deciding what school becomes next.
                </p>
              </Reveal>

              <Reveal delay={500}>
                <div className="mt-12 flex flex-col items-center gap-5">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/confirm"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#D62828] px-7 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#b71f1f] sm:w-auto"
                    >
                      Awardee Registration
                    </Link>
                    <a
                      href="https://www.kidspreneur.org/global-flash-challenge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#141F45] transition hover:bg-white/90 sm:w-auto"
                    >
                      Enter the India Challenge
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={620}>
                <div className="mt-14">
                  <FinalCountdown />
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCountdown() {
  const target = new Date("2026-08-24T09:00:00+05:30").getTime();
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    setT(calc(target));
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const cells = [
    { v: t?.d ?? 0, l: "Days" },
    { v: t?.h ?? 0, l: "Hrs" },
    { v: t?.m ?? 0, l: "Min" },
    { v: t?.s ?? 0, l: "Sec" },
  ];
  return (
    <div className="flex flex-col items-center gap-4" suppressHydrationWarning>
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
        <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#D62828]" />
        Doors open in
      </div>
      <div className="flex flex-wrap items-baseline justify-center gap-4" suppressHydrationWarning>
        {cells.map((c, i) => (
          <div key={c.l} className="flex items-baseline gap-4">
            {i > 0 && <span className="h-6 w-px self-center bg-white/20" />}
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-serif text-[32px] font-medium leading-none tracking-[-0.02em] text-white tabular-nums"
                suppressHydrationWarning
              >
                {t ? String(c.v).padStart(2, "0") : "––"}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {c.l}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calc(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}
