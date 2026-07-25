import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import img1 from "@/assets/students-parliament-2.jpg.asset.json";
import img2 from "@/assets/chennai-podium.jpg.asset.json";
import img3 from "@/assets/front-row-2.jpg.asset.json";


gsap.registerPlugin(ScrollTrigger);

type Row = {
  eyebrow: string;
  heading: string;
  underlineWord: string;
  body: string;
  underlineInBody?: string;
  cta?: { label: string; href: string; pill?: boolean };
  image: string;
  imageObjectPosition?: string;
  alt: string;
  imageSide: "left" | "right";
};

const ROWS: Row[] = [
  {
    eyebrow: "The India Challenge",
    heading: "Pitch here. Present in Parliament.",
    underlineWord: "Parliament",
    body: "The India Challenge — with Kidspreneur, the Peter Jones Foundation and American World School — puts student founders on FED's main stage. Winners take their ideas to the British Parliament.",
    cta: { label: "Enter the India Challenge", href: "https://www.kidspreneur.org", pill: true },
    image: img1.url,
    imageObjectPosition: "center 15%",
    alt: "Students at the British Parliament",
    imageSide: "left",
  },
  {
    eyebrow: "Global Network",
    heading: "Meet the world without leaving Chennai.",
    underlineWord: "",
    body: "University presidents, accreditation heads, founders and policymakers — the people most students only read about, within reach.",
    underlineInBody: "within reach.",
    cta: { label: "See who's coming", href: "#voices" },
    image: img2.url,
    alt: "Student pitching on stage",
    imageSide: "right",
  },
  {
    eyebrow: "The Front Row",
    heading: "See what's next before anyone else.",
    underlineWord: "before anyone else.",
    body: "AI in classrooms, startups launching live, the ideas that will shape your next decade — happening around you, not at you.",
    cta: { label: "Front row seats", href: "#reasons" },
    image: img3.url,
    alt: "Front row experience",
    imageSide: "left",
  },
];

const underlineClass =
  "underline decoration-[#D62828] decoration-2 underline-offset-[6px]";

function renderWithUnderline(text: string, word: string) {
  if (!word) return text;
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className={underlineClass}>{word}</span>
      {text.slice(idx + word.length)}
    </>
  );
}

export function ForStudents() {
  return (
    <section id="students" className="w-full bg-white">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="py-24 md:py-28">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
            For Students
          </div>
          <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#1B2A5E]">
            This stage is yours too<span className="text-[#D62828]">.</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[18px] leading-[1.6] text-[#1B2A5E]/70">
            FED isn't a summit you watch. It's one you take part in.
          </p>
        </div>

        <div>
          {ROWS.map((r, i) => (
            <CheckerRow key={i} row={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckerRow({ row }: { row: Row }) {
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrap = imgWrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tween = gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 1.28,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const imageEl = (
    <div
      ref={imgWrapRef}
      className="relative w-full overflow-hidden aspect-[4/3] md:aspect-auto md:h-full md:min-h-[420px]"
    >
      <img
        ref={imgRef}
        src={row.image}
        alt={row.alt}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ objectPosition: row.imageObjectPosition ?? "center" }}
      />
    </div>
  );

  const contentEl = (
    <div className="flex w-full items-center justify-center bg-white">
      <div className="w-full max-w-[560px] p-10 md:p-[72px]">
        <Reveal delay={0}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
            {row.eyebrow}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h3 className="mt-6 max-w-[20ch] font-serif text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#1B2A5E]">
            {renderWithUnderline(row.heading, row.underlineWord)}
          </h3>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.65] text-[#1B2A5E]/75">
            {row.underlineInBody
              ? renderWithUnderline(row.body, row.underlineInBody)
              : row.body}
          </p>
        </Reveal>

        {row.cta?.label && (
          <Reveal delay={420}>
            <div className="mt-10">
              {row.cta.pill ? (
                <a
                  href={row.cta.href}
                  target={row.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D62828] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#b71f1f]"
                >
                  {row.cta.label}
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <a
                  href={row.cta.href}
                  {...(row.cta.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1B2A5E]"
                >
                  <span className="border-b border-[#1B2A5E] pb-1 transition-colors group-hover:border-[#D62828] group-hover:text-[#D62828]">
                    {row.cta.label}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#D62828]"
                  >
                    →
                  </span>
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 md:h-[85vh]">
      {row.imageSide === "left" ? (
        <>
          {imageEl}
          {contentEl}
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">{contentEl}</div>
          <div className="order-1 md:order-2">{imageEl}</div>
        </>
      )}
    </div>
  );
}
