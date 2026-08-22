import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { SuccessBlock, SegmentedToggle } from "@/components/Modal";
import { ClosedNotice } from "@/components/ClosedNotice";
import { InstitutionAwardFields, IndividualAwardFields } from "@/components/FormFields";
import { useInstitutionAwardForm, type InstitutionTrack } from "@/hooks/useInstitutionAwardForm";
import { useIndividualAwardForm } from "@/hooks/useIndividualAwardForm";
import { REGISTRATIONS_CLOSED } from "@/lib/registration";
import confirmStage from "@/assets/confirm-stage.jpg";
import confirmStageCollage from "@/assets/confirm-stage-collage.png";

type AwardTrack = "individual" | InstitutionTrack;

const TRACK_OPTIONS: { value: AwardTrack; label: string }[] = [
  { value: "individual", label: "Educator Of The Year Award" },
  { value: "school", label: "Top 100 Schools" },
  { value: "organization", label: "Organizations of Excellence" },
  { value: "college", label: "Top 25 Colleges" },
];

const TRACK_DESCRIPTIONS: Record<AwardTrack, string> = {
  individual:
    "Recognising educators whose work quietly shapes classrooms, and the minds of young learners who carry it forward long after.",
  school: "Honouring schools that build for what's next in curriculum, culture, and courage.",
  organization:
    "For organizations setting a standard others are still catching up to — proof that excellence is a practice, not a claim.",
  college: "Celebrating the colleges and universities pushing higher education past its own edges.",
};

export const Route = createFileRoute("/confirm")({
  head: () => ({
    meta: [
      { title: "Awardee Registration — FED 2026" },
      {
        name: "description",
        content:
          "Register for the Individual, School, Organization, or College/University Award at FED 2026 · 24 August · IITM Research Park, Chennai.",
      },
      { property: "og:title", content: "Awardee Registration — FED 2026" },
      {
        property: "og:description",
        content:
          "Register for the Individual, School, Organization, or College/University Award at FED 2026 · 24 August · IITM Research Park, Chennai.",
      },
      { property: "og:image", content: confirmStageCollage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: confirmStageCollage },
    ],
  }),
  component: ConfirmPage,
});

function ConfirmPage() {
  const [track, setTrack] = useState<AwardTrack>("school");
  const individualForm = useIndividualAwardForm();
  const schoolForm = useInstitutionAwardForm("school");
  const organizationForm = useInstitutionAwardForm("organization");
  const collegeForm = useInstitutionAwardForm("college");
  const done =
    track === "individual"
      ? individualForm.done
      : track === "school"
        ? schoolForm.done
        : track === "organization"
          ? organizationForm.done
          : collegeForm.done;

  return (
    <div className="bg-white text-navy">
      <Nav />
      <main className="relative w-full bg-white">
        {/* ───── Awardee Registration hero ───── */}
        <section className="relative w-full bg-white pt-20 pb-16 md:pt-24 md:pb-20 lg:pb-0">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col px-6 md:px-10 lg:h-[85vh]">
            <div className="grid grid-cols-1 gap-10 lg:h-full lg:grid-cols-[38fr_62fr] lg:items-center lg:gap-20">
              {/* LEFT — text */}
              <div className="flex flex-col justify-center">
                <Link
                  to="/"
                  className="fade-up inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70 transition-colors hover:text-[#D62828]"
                  style={{ animationDelay: "40ms" }}
                >
                  <span aria-hidden>←</span> Back to FED 2026
                </Link>

                <div className="fade-up mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]" style={{ animationDelay: "120ms" }}>
                  Awardee Registration · By Invitation Only
                </div>

                <h1
                  className="fade-up mt-4 font-serif font-medium leading-[1.05] tracking-[-0.02em] text-[#1B2A5E]"
                  style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", animationDelay: "180ms" }}
                >
                  Reserve Your Seat<span className="text-[#D62828]">.</span>
                </h1>

                <p className="fade-up mt-5 max-w-[460px] text-[18px] leading-[1.7] text-[#1B2A5E]/70" style={{ animationDelay: "240ms" }}>
                  A private registration for award nominees — individuals, schools, organizations in education, and colleges or universities. Once you're confirmed, our team will be in touch with arrival details and your on-stage moment.
                </p>

                <div
                  className="fade-up mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B2A5E]"
                  style={{ animationDelay: "300ms" }}
                >
                  IITM Research Park Chennai | August 24 | 10AM Onwards
                </div>

                <p className="fade-up mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D62828]" style={{ animationDelay: "360ms" }}>
                  {REGISTRATIONS_CLOSED
                    ? "Registration and confirmation are now closed"
                    : "Registration and confirmation close August 20, 2026"}
                </p>

                {!REGISTRATIONS_CLOSED && (
                  <div className="fade-up mt-7" style={{ animationDelay: "420ms" }}>
                    <a
                      href="#registration-form"
                      className="inline-flex items-center justify-center rounded-full bg-[#D62828] px-8 py-4 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#b71f1f] hover:shadow-[0_18px_40px_-16px_rgba(214,40,40,0.6)]"
                    >
                      Begin Registration
                    </a>
                  </div>
                )}
              </div>

              {/* RIGHT — photo */}
              <div
                className="fade-up relative aspect-[6/5] w-full overflow-hidden rounded-[16px]"
                style={{ animationDelay: "160ms" }}
              >
                <img
                  src={confirmStageCollage}
                  alt="FED 2026 highlights — main stage, a student speaker, and awardee moments"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ───── Registration form ───── */}
        <section id="registration-form" className="relative w-full overflow-hidden bg-white py-20 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[16%] top-[4%] h-[640px] w-[640px] opacity-[0.28]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(27,42,94,0.35) 1.2px, transparent 1.3px)",
              backgroundSize: "18px 18px",
              WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 70%)",
              maskImage: "radial-gradient(circle at center, black 45%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-[1320px] px-6 md:px-10">
            {!REGISTRATIONS_CLOSED && !done && (
              <div className="mb-12 text-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70">
                  Award Category
                </div>
                <SegmentedToggle
                  className="mx-auto mt-4 max-w-[1120px]"
                  value={track}
                  onChange={(v) => setTrack(v as AwardTrack)}
                  options={TRACK_OPTIONS}
                />
              </div>
            )}

            <div className="relative overflow-hidden rounded-[28px] border border-[#1B2A5E]/10 bg-white p-8 shadow-[0_50px_120px_-50px_rgba(20,44,115,0.4)] md:p-14 lg:p-16">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#D62828] via-[#D62828] to-[#F4EDDC]" />

              <div className="mx-auto max-w-[960px]">
                {REGISTRATIONS_CLOSED ? (
                  <ClosedNotice />
                ) : (
                  <>
                  {!done && (
                    <div className="mb-12">
                      <div className="flex items-center gap-3">
                        <span className="h-[2px] w-6 bg-[#D62828]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70">
                          {TRACK_OPTIONS.find((o) => o.value === track)?.label}
                        </span>
                      </div>
                      <p className="mt-4 max-w-[640px] font-serif text-[19px] leading-[1.5] tracking-[-0.01em] text-[#1B2A5E]">
                        {TRACK_DESCRIPTIONS[track]}
                      </p>
                      <div className="mt-8 h-px w-full bg-[#1B2A5E]/10" />
                    </div>
                  )}
                  {track === "individual" ? (
                    individualForm.done ? (
                      <SuccessBlock
                        title="See you on the stage!"
                        body="Your spot is locked in and confirmation is on its way to your inbox. Need anything before August 24? Reach us at +91 82206 06367."
                      />
                    ) : (
                      <IndividualAwardFields {...individualForm} />
                    )
                  ) : track === "school" ? (
                    schoolForm.done ? (
                      <SuccessBlock
                        title="See you on the stage!"
                        body="Your spot is locked in and confirmation is on its way to your inbox. Need anything before August 24? Reach us at +91 82206 06367."
                      />
                    ) : (
                      <InstitutionAwardFields track="school" {...schoolForm} />
                    )
                  ) : track === "organization" ? (
                    organizationForm.done ? (
                      <SuccessBlock
                        title="See you on the stage!"
                        body="Your spot is locked in and confirmation is on its way to your inbox. Need anything before August 24? Reach us at +91 82206 06367."
                      />
                    ) : (
                      <InstitutionAwardFields track="organization" {...organizationForm} />
                    )
                  ) : collegeForm.done ? (
                    <SuccessBlock
                      title="See you on the stage!"
                      body="Your spot is locked in and confirmation is on its way to your inbox. Need anything before August 24? Reach us at +91 82206 06367."
                    />
                  ) : (
                    <InstitutionAwardFields track="college" {...collegeForm} />
                  )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function FormPageShell({
  eyebrow,
  title,
  lede,
  deadline,
  accent = true,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  deadline?: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full overflow-hidden bg-white">
      {/* Dotted globe motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[6%] h-[720px] w-[720px] opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,42,94,0.35) 1.2px, transparent 1.3px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 70%)",
          maskImage: "radial-gradient(circle at center, black 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-none grid-cols-1 gap-12 px-8 pt-[128px] pb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-16 lg:gap-24 lg:px-24 xl:px-32">
        {/* LEFT — editorial hero */}
        <div className="flex flex-col justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70 transition-colors hover:text-[#D62828]"
            >
              <span aria-hidden>←</span> Back to FED 2026
            </Link>

            <div className="mt-14 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
              {eyebrow}
            </div>
            <img
              src={confirmStage}
              alt="FED 2026 stage"
              className="mt-8 aspect-[16/7] w-full rounded-2xl object-cover"
            />
            <h1
              className="mt-6 font-serif font-medium leading-[1.02] tracking-[-0.02em] text-[#1B2A5E]"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)" }}
            >
              {title}
              <span className="text-[#D62828]">.</span>
            </h1>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.7] text-[#1B2A5E]/70 md:text-[18px]">
              {lede}
            </p>

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B2A5E]">
              <span className="flex items-center gap-2">
                <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#D62828]" />
                Edition 04
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#D62828]" />
                24 Aug 2026
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#D62828]" />
                IITM Research Park · Chennai
              </span>
            </div>

            {deadline && (
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#D62828]">
                {deadline}
              </p>
            )}
          </div>

        </div>

        {/* RIGHT — form card */}
        <div className="relative">
          <div className="relative rounded-[24px] border border-[#1B2A5E]/10 bg-white p-8 shadow-[0_40px_100px_-50px_rgba(20,44,115,0.35)] md:p-12">
            {accent && <span className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-[#D62828]" />}
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
