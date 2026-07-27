import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/aws-logo.png";
import aiaascLogo from "@/assets/aiaasc-logo.png";
import wascLogo from "@/assets/wasc-logo.png";
import ncpsaLogo from "@/assets/partners/ncpsa.png";
import panworldLogo from "@/assets/partners/panworld.png";
import mcgrawHillLogo from "@/assets/partners/mcgraw-hill.png";
import fefdyLogo from "@/assets/partners/fefdy.png";
import vaayusastraLogo from "@/assets/partners/vaayusastra.png";
import thambaLogo from "@/assets/partners/thamba.png";
import karkyTamilLogo from "@/assets/partners/karky-tamil.png";
import peterJonesLogo from "@/assets/partners/peter-jones.png";
import universityOfSiliconValleyLogo from "@/assets/partners/university-of-silicon-valley.png";
import { Reveal } from "./Reveal";

const CONVENERS = [
  {
    label: "Host",
    logo: logoAsset,
    alt: "American World School",
    description:
      "Asia's first entrepreneurial K-12 school, WASC-accredited and headquartered in Chennai — empowering young minds across the world to become architects of their future.",
  },
  {
    label: "Co-Presented By",
    logo: aiaascLogo,
    alt: "AIAASC — American International Accreditation Association of Schools and Colleges",
    description:
      "The American International Accreditation Association of Schools and Colleges — the global benchmark for institutional excellence, holding schools on every continent to the highest standards of American education.",
  },
  {
    label: "Co-Presented By",
    logo: wascLogo,
    alt: "Fully accredited by WASC — Accrediting Commission for Schools",
    description:
      "The Western Association of Schools and Colleges — trusted by Stanford, UCLA, and more than 5,000 institutions worldwide as the gold standard of American education.",
  },
];

const PARTNERS = [
  { name: "NCPSA", logo: ncpsaLogo },
  { name: "Panworld Education", logo: panworldLogo },
  { name: "McGraw Hill Education", logo: mcgrawHillLogo },
  { name: "Fefdy", logo: fefdyLogo },
  { name: "Vaayusastra Aerospace", logo: vaayusastraLogo },
  { name: "Thamba Tamil Aayvagam", logo: thambaLogo },
  { name: "Karky Tamil Academy", logo: karkyTamilLogo },
  { name: "Peter Jones Foundation", logo: peterJonesLogo },
  { name: "University of Silicon Valley", logo: universityOfSiliconValleyLogo },
];

export function HostedBy() {
  return (
    <section className="mt-20 bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-8">
        {/* HEADLINE */}
        <Reveal>
          <span className="eyebrow">Our Conveners</span>
          <h2 className="mt-5 font-serif text-[clamp(1.875rem,4.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#142c73]">
            A Synergy of Great <span className="text-[#D62828]">Minds.</span>
          </h2>
        </Reveal>

        {/* CONVENERS — one row, equal weight */}
        <Reveal
          delay={140}
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12"
        >
          {CONVENERS.map((c) => (
            <div key={c.alt} className="flex flex-col items-center text-center">
              <span className="eyebrow text-[10px]">{c.label}</span>
              <img src={c.logo} alt={c.alt} className="mt-4 h-14 w-auto md:h-16" />
              <p className="mt-5 max-w-[300px] text-[15px] leading-[1.6] text-[#3D4666]">
                {c.description}
              </p>
            </div>
          ))}
        </Reveal>

        {/* PARTNER MARQUEE */}
        <div className="mt-[72px]">
          <Reveal delay={280} className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4a5b96]">
              In Partnership With
            </span>
          </Reveal>
          <div className="mt-6">
            <PartnerMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerMarquee() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !hovered;

  return (
    <div
      ref={ref}
      className="partner-marquee-mask relative w-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex h-20 w-max items-center gap-14 animate-[drift_45s_linear_infinite]"
        style={{ animationPlayState: playing ? "running" : "paused" }}
      >
        {[...PARTNERS, ...PARTNERS].map((partner, i) => (
          <PartnerLogo key={`${partner.name}-${i}`} name={partner.name} logo={partner.logo} />
        ))}
      </div>
    </div>
  );
}

function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-20 w-[120px] flex-none items-center justify-center md:w-[160px]">
      <img
        src={logo}
        alt={name}
        className="max-h-14 w-full object-contain opacity-65 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}
