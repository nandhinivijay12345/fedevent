import { useState } from "react";

import markNoufel from "@/assets/marknoufel.png";
import mohanalakshmi from "@/assets/mohanalakshmi.png";
import margaret from "@/assets/margaret.png";
import vimala from "@/assets/vimala.png";
import bill from "@/assets/bill.png";
import madhan from "@/assets/madhan.png";
import paul from "@/assets/paul.png";
import bhavanishankar from "@/assets/bhavanishankar.png";
import prince from "@/assets/prince.png";
import kabali from "@/assets/kabali.png";
import ckKumaravel from "@/assets/ckkumaravel.png";

type Panelist = { name: string; title: string; org: string; image?: string };

const PANELISTS: Panelist[] = [
  { name: "Mark Noufel", title: "President", org: "University of Silicon Valley", image: markNoufel },
  { name: "Dr. Mohanalakshmi", title: "Founder", org: "American World School", image: mohanalakshmi },
  { name: "Bill", title: "Managing Director", org: "Peter Jones Foundation", image: bill },
  { name: "Dr. Margaret", title: "International Vice President", org: "Western Association of Schools and Colleges", image: margaret },
  { name: "Dr. Madhan Karky", title: "Founder", org: "KaReFo", image: madhan },
  { name: "Paul Montague", title: "Chief Executive Officer", org: "Go Early College", image: paul },
  { name: "Bhavanishankar", title: "Director - Strategy, Research and Innovation", org: "Omega Schools", image: bhavanishankar },
  { name: "Vimala Britto", title: "Curriculum Expert", org: "Fefdy Curriculum", image: vimala },
  { name: "Nawabzada Mohamed Asif Ali", title: "Prince of Arcot", org: "", image: prince },
  { name: "Dr. Kabaly P Subramanian", title: "Senior Academic", org: "Arab Open University, Oman", image: kabali },
  { name: "CK Kumaravel", title: "Co-founder & CMD", org: "Naturals Salon & Spa", image: ckKumaravel },
];


const initials = (n: string) =>
  n.replace(/^Dr\.?\s*|^Prof\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export function Voices() {
  const [active, setActive] = useState<Panelist | null>(null);

  return (
    <section id="voices" className="bg-white py-28">
      <div className="mx-auto max-w-[1280px] px-8">
        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
              Distinguished Panel
            </div>
            <h2 className="mt-5 max-w-[22ch] font-serif text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#1B2A5E]">
              The people setting the agenda for the day.
            </h2>
          </div>
          <div className="text-[12px] uppercase tracking-[0.22em] text-[#6b7699]">
            11 Speakers · More Announced Soon
          </div>
        </div>

        {/* Portrait grid — images rendered as-is */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 items-start justify-items-center">
          {PANELISTS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(p)}
              className="group flex flex-col items-center text-center"
            >
              {p.image ? (
                <div
                  className="relative w-[200px] sm:w-[220px] lg:w-[260px] overflow-hidden rounded-full shadow-[0_10px_30px_-15px_rgba(27,42,94,0.25)] transition-transform duration-300 group-hover:scale-[1.04]"
                  style={{ aspectRatio: "1 / 1", borderRadius: "9999px" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-full object-cover"
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>
              ) : (
                <div
                  className="flex w-[200px] sm:w-[220px] lg:w-[260px] items-center justify-center bg-[#1B2A5E] rounded-full transition-transform duration-300 group-hover:scale-[1.04]"
                  style={{ aspectRatio: "1 / 1", borderRadius: "9999px" }}
                >
                  <span className="font-serif text-[56px] text-white">{initials(p.name)}</span>
                </div>
              )}

              <div className="mt-5 flex min-h-[104px] flex-col items-center">
                <div className="font-serif text-[22px] leading-tight text-[#1B2A5E]">{p.name}</div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D62828]">
                  {p.title}
                </div>
                <div className="mt-1 text-[14px] text-[#6b7699]">{p.org}</div>
              </div>
            </button>
          ))}
        </div>

      </div>



      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1a3f]/70 backdrop-blur-sm animate-fade-in px-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-[600px] bg-white p-10 md:p-12 animate-scale-in border border-[#E5E7EE] rounded-[20px]"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute left-0 top-0 h-full w-[3px] bg-[#D62828] rounded-l-[20px]" />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[#1B2A5E] transition hover:bg-[#f7f8fa] rounded-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="flex flex-col items-center text-center">
              {active.image ? (
                <img
                  src={active.image}
                  alt={active.name}
                  className="h-44 w-44 md:h-56 md:w-56 rounded-full object-cover"
                  style={{ objectPosition: "50% 25%" }}
                />
              ) : (
                <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#1B2A5E] md:h-56 md:w-56">
                  <span className="font-serif text-[72px] text-white">{initials(active.name)}</span>
                </div>
              )}
              <h3 className="mt-8 font-serif text-[32px] md:text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-[#1B2A5E]">
                {active.name}
              </h3>
              <div className="mt-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D62828]">
                {active.title}
              </div>
              <div className="mt-1 text-[15px] text-[#6b7699]">{active.org}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
