import { useState } from "react";

import { Reveal } from "./Reveal";
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
import meenakshi from "@/assets/meenakshi.png";
import benjamin from "@/assets/benjamin.png";
import gloria from "@/assets/gloria.png";
import usha from "@/assets/usha.png";
import anilSrinivasa from "@/assets/anilsrinivasa.png";

type Panelist = { name: string; title: string; org: string; image?: string; aspect: string };

// aspect is hand-set per portrait (not derived from position) so reordering
// panelists never reshuffles anyone else's photo proportions. A couple of
// landscape crops (4/3) are mixed in for real editorial weight, not just
// varying degrees of "tall".
const PANELISTS: Panelist[] = [
  { name: "Dr. Mohanalakshmi", title: "Founder", org: "American World School", image: mohanalakshmi, aspect: "1 / 1" },
  { name: "Dr. Mark Naufel", title: "President", org: "University of Silicon Valley - California", image: markNoufel, aspect: "4 / 5" },
  { name: "Dr. Margaret", title: "International Vice President", org: "Western Association of Schools and Colleges - California", image: margaret, aspect: "3 / 4" },
  { name: "Bill Muirhead", title: "Managing Director", org: "Peter Jones Foundation", image: bill, aspect: "4 / 3" },
  { name: "Dr. Meenakshi Ramesh", title: "Director – Academics, Curriculum, Research and Development", org: "Vels Group of Schools", image: meenakshi, aspect: "4 / 5" },
  { name: "Paul Montague", title: "Chief Executive Officer", org: "Go Early College", image: paul, aspect: "4 / 5" },
  { name: "Dr. Vimala Rani Britto", title: "Founder", org: "Fefdy Curriculum", image: vimala, aspect: "4 / 3" },
  { name: "Nawabzada Mohamed Asif Ali", title: "Prince of Arcot Dewan", org: "", image: prince, aspect: "4 / 5" },
  { name: "Dr. Madhan Karky", title: "Founder & Managing Director", org: "Karky Tamil Academy", image: madhan, aspect: "3 / 4" },
  { name: "Dr. Bhavanishankar", title: "Director - Strategy, Research and Innovation", org: "Omega Schools", image: bhavanishankar, aspect: "1 / 1" },
  { name: "Dr. Kabaly P Subramanian", title: "Senior Academic", org: "Arab Open University, Oman", image: kabali, aspect: "3 / 4" },
  { name: "CK Kumaravel", title: "Co-founder & CMD", org: "Naturals Salon & Spa", image: ckKumaravel, aspect: "3 / 4" },
  { name: "Benjamin J. Abott", title: "Chief of American Citizens Services", org: "U.S. Consulate General Chennai", image: benjamin, aspect: "4 / 5" },
  { name: "Gloria Brown", title: "Founder", org: "La Senda Global Academy", image: gloria, aspect: "3 / 4" },
  { name: "Usha Iyer", title: "Managing Director", org: "The Green School Bangalore", image: usha, aspect: "4 / 5" },
  { name: "Prof. Anil Srinivasan", title: "Founder", org: "Kruu", image: anilSrinivasa, aspect: "4 / 5" },
];


const initials = (n: string) =>
  n.replace(/^Dr\.?\s*|^Prof\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

function SpeakerCard({ p, delay, onOpen }: { p: Panelist; delay: number; onOpen: () => void }) {
  // Square-cropped tiles carry the name-first caption — the pairing is
  // systematic (tied to tile shape), not arbitrary.
  const nameFirst = p.aspect === "1 / 1";
  return (
    <Reveal delay={delay} className="mb-16">
      <button type="button" onClick={onOpen} className="group block w-full text-left">
        {p.image ? (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: p.aspect }}>
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover contrast-[1.05] transition-all duration-500 ease-out lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-[1.02]"
              style={{ objectPosition: "50% 18%" }}
            />
          </div>
        ) : (
          <div className="flex w-full items-center justify-center bg-[#1B2A5E]" style={{ aspectRatio: p.aspect }}>
            <span className="font-serif text-[56px] text-white">{initials(p.name)}</span>
          </div>
        )}

        {nameFirst ? (
          <div className="mt-5 flex flex-col transition-transform duration-300 group-hover:translate-y-[-2px]">
            <h3 className="font-serif text-[21px] font-semibold leading-[1.15] text-[#1B2A5E]">{p.name}</h3>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <span className="text-[#D62828]">{p.title}</span>
              {p.org && <span className="text-[#6b7699]"> · {p.org}</span>}
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-col transition-transform duration-300 group-hover:translate-y-[-2px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D62828]">{p.title}</div>
            <h3 className="mt-2 font-serif text-[21px] font-semibold leading-[1.15] text-[#1B2A5E]">{p.name}</h3>
            {p.org && (
              <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6b7699]">
                {p.org}
              </div>
            )}
          </div>
        )}
      </button>
    </Reveal>
  );
}

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
            16 Speakers · More Announced Soon
          </div>
        </div>

        {/* Editorial masonry — explicit column groups (not CSS `columns`, whose
            height-balancing can silently shift which panelist lands at the
            top of a column depending on viewport width). Each column's first
            entry is guaranteed to render at the top, always. */}
        <div className="mt-16 flex flex-col gap-16 sm:hidden">
          {PANELISTS.map((p, i) => (
            <SpeakerCard key={p.name} p={p} delay={0} onOpen={() => setActive(p)} />
          ))}
        </div>

        <div className="mt-16 hidden gap-x-10 sm:flex lg:hidden">
          {[PANELISTS.slice(0, 8), PANELISTS.slice(8, 16)].map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col">
              {col.map((p, i) => (
                <SpeakerCard key={p.name} p={p} delay={i === 0 ? ci * 100 : 0} onOpen={() => setActive(p)} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 hidden gap-x-10 lg:flex">
          {[PANELISTS.slice(0, 6), PANELISTS.slice(6, 11), PANELISTS.slice(11, 16)].map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col">
              {col.map((p, i) => (
                <SpeakerCard key={p.name} p={p} delay={i === 0 ? ci * 100 : 0} onOpen={() => setActive(p)} />
              ))}
            </div>
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
                  className="h-56 w-[180px] md:h-72 md:w-[230px] rounded-[20px] object-cover"
                  style={{ objectPosition: "50% 18%" }}
                />
              ) : (
                <div className="flex h-56 w-[180px] items-center justify-center rounded-[20px] bg-[#1B2A5E] md:h-72 md:w-[230px]">
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
