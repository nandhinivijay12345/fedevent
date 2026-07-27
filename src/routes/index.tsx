import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { InvitationGate } from "@/components/InvitationGate";
import { HeroCountdown } from "@/components/HeroCountdown";

import { AnimatedSections } from "@/components/AnimatedSections";
import { WhyFED } from "@/components/WhyFED";
import { Voices } from "@/components/Voices";
import { ForStudents } from "@/components/ForStudents";
import { GlobalSummit } from "@/components/GlobalSummit";
import { ReasonsCarousel } from "@/components/ReasonsCarousel";
import { HostedBy } from "@/components/HostedBy";
import { FinalCTA } from "@/components/FinalCTA";


import hero from "@/assets/hero-panel.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Future of Education 2026 — Edition 04 · IIT Madras" },
      {
        name: "description",
        content:
          "India's largest gathering of educators, innovators and changemakers. One day. One stage. One conversation shaping what comes next. 24 August · IIT Madras.",
      },
      { property: "og:title", content: "Future of Education 2026 — Edition 04" },
      {
        property: "og:description",
        content:
          "One day. One stage. One conversation shaping what comes next. 24 August · IIT Madras.",
      },
      { property: "og:image", content: hero },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});



function Home() {
  return (
    <div id="top" className="bg-white text-navy">
      <InvitationGate />
      <Nav />
      <Hero />
      <AnimatedSections />
      <WhyFED />
      <Voices />
      <ReasonsCarousel />
      <ForStudents />
      <GlobalSummit />
      <HostedBy />
      <FinalCTA />
      <Footer />
    </div>
  );
}





/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section data-hero className="relative flex h-screen w-full flex-col bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col px-8 pt-28 lg:pt-32">
        <div className="grid flex-1 grid-cols-1 items-center gap-10 pb-28 lg:grid-cols-[42fr_58fr] lg:gap-14 lg:pb-32">
          {/* LEFT — content */}
          <div className="relative flex flex-col justify-center">
            {/* Dotted globe motif */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[18%] top-[4%] hidden h-[480px] w-[480px] opacity-[0.22] lg:block"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(27,42,94,0.35) 1.2px, transparent 1.3px)",
                backgroundSize: "18px 18px",
                WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 70%)",
                maskImage: "radial-gradient(circle at center, black 45%, transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="fade-up h-[2px] w-8 bg-[#D62828]" style={{ animationDelay: "40ms" }} />
              <div
                className="fade-up mt-6 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase text-[#1B2A5E]"
                style={{ animationDelay: "120ms", letterSpacing: "0.22em" }}
              >
                <span>Edition 04</span>
                <span className="inline-block h-[4px] w-[4px] rounded-full bg-[#D62828]" />
                <span>24 Aug 2026</span>
                <span className="inline-block h-[4px] w-[4px] rounded-full bg-[#D62828]" />
                <span>IITM Research Park, Chennai</span>
              </div>

              <div className="fade-up mt-8 h-[2px] w-6 bg-[#D62828]" style={{ animationDelay: "180ms" }} />
              <h1 className="mt-4 font-serif font-medium leading-[1.08] tracking-[-0.03em] text-[#1B2A5E]">
                <span className="line-mask block">
                  <span
                    style={{ animationDelay: "220ms", fontSize: "clamp(2.5rem, 4.3vw, 3.5rem)" }}
                    className="block"
                  >
                    India's Largest International Education{" "}
                    <span className="italic text-[#D62828]">Summit.</span>
                  </span>
                </span>
              </h1>

              <p
                className="fade-up mt-7 max-w-[480px] text-[18px] leading-[1.55] text-[#1B2A5E]/70"
                style={{ animationDelay: "620ms" }}
              >
                1,000+ leaders. Eight global voices. India's Top 100 Schools crowned — on one stage in Chennai.
              </p>

              <div
                className="fade-up mt-9 flex flex-wrap items-center gap-6"
                style={{ animationDelay: "780ms" }}
              >
                <Link
                  to="/confirm"
                  className="inline-flex items-center justify-center rounded-full bg-[#D62828] px-8 py-4 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#b71f1f] hover:shadow-[0_18px_40px_-16px_rgba(214,40,40,0.6)]"
                >
                  Confirm Your Attendance
                </Link>

                <a
                  href="#why-fed"
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold tracking-wide text-[#1B2A5E]"
                >
                  The Experience
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>

              <div className="fade-up mt-8" style={{ animationDelay: "900ms" }}>
                <HeroCountdown />
              </div>
            </div>
          </div>

          {/* RIGHT — contained image card */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full" style={{ maxWidth: 640 }}>
              <div
                className="fade-up relative overflow-hidden rounded-[16px] shadow-[0_40px_80px_-40px_rgba(20,44,115,0.35)]"
                style={{ animationDelay: "260ms", aspectRatio: "6 / 5", maxHeight: 560 }}
              >
                <img
                  src={hero}
                  alt="FED 2024 — Third Edition"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "42% center" }}
                />
              </div>
              {/* Attendee chip — overlaps bottom-left corner */}
              <div
                className="absolute rounded-[10px] border-l-[3px] border-[#D62828] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(20,44,115,0.35)]"
                style={{ bottom: -24, left: -24 }}
              >
                <div className="font-serif text-[24px] font-medium leading-none text-[#1B2A5E]">1,000+</div>
                <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1B2A5E]/70">
                  Attendees · 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}










/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="bg-[#0E1734]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-8 py-14 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-[15px] font-semibold text-white">FED</span>
          <span className="text-[13px] text-white/65">Future of Education · Edition 04</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/70">
          <a href="#why-fed" className="hover:text-white">Why FED</a>
          <a href="#voices" className="hover:text-white">Voices</a>
          <a href="#reasons" className="hover:text-white">Reasons</a>
          <a href="#global" className="hover:text-white">Global Reach</a>
        </nav>

        <div className="flex items-center gap-6 text-[12px] text-white/60">
          <span>Presented by American World School</span>
          <span className="h-3 w-px bg-white/20" />
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
