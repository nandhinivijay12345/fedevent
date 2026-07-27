import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { SuccessBlock } from "@/components/Modal";
import { ConfirmAttendanceFields } from "@/components/FormFields";
import { useConfirmAttendanceForm } from "@/hooks/useConfirmAttendanceForm";
import confirmStage from "@/assets/confirm-stage.jpg";

const CONTACT_EMAIL = "concierge@futureofeducation.in";

export const Route = createFileRoute("/confirm")({
  head: () => ({
    meta: [
      { title: "Confirm Your Attendance — FED 2026" },
      { name: "description", content: "Reserve your school's seats for FED 2026 · 24 August · IITM Research Park, Chennai." },
    ],
  }),
  component: ConfirmPage,
});

function ConfirmPage() {
  const form = useConfirmAttendanceForm();

  return (
    <div className="bg-white text-navy">
      <Nav />
      <main className="relative w-full bg-white">
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
          {/* LEFT — sticky on desktop, static on mobile; content always fully visible */}
          <div className="md:sticky md:top-24 md:self-start">
            <BackLink />
            <Eyebrow />
            <img
              src={confirmStage}
              alt="FED 2026 stage"
              className="mt-8 aspect-[16/7] w-full rounded-2xl object-cover"
            />
            <Headline />
            <Lede />
            <EditionChips className="mt-14" />
          </div>

          {/* RIGHT — form card */}
          <div className="relative">
            <div className="relative rounded-[24px] border border-[#1B2A5E]/10 bg-white p-8 shadow-[0_40px_100px_-50px_rgba(20,44,115,0.35)] md:p-12">
              {form.done ? (
                <SuccessBlock
                  title="See you on August 24."
                  body="A confirmation will land in your inbox within one working day."
                />
              ) : (
                <ConfirmAttendanceFields {...form} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70 transition-colors hover:text-[#D62828]"
    >
      <span aria-hidden>←</span> Back to FED 2026
    </Link>
  );
}

function Eyebrow() {
  return (
    <div className="mt-14 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
      Confirm Attendance
    </div>
  );
}

function Headline() {
  return (
    <h1
      className="mt-6 font-serif font-medium leading-[1.02] tracking-[-0.02em] text-[#1B2A5E]"
      style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)" }}
    >
      Reserve your seats for August 24<span className="text-[#D62828]">.</span>
    </h1>
  );
}

function Lede() {
  return (
    <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.7] text-[#1B2A5E]/70 md:text-[18px]">
      A private confirmation for invited schools. Once your seats are locked in, our team will be in touch with arrival details and your on-stage moments.
    </p>
  );
}

function EditionChips({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B2A5E] ${className}`}>
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
  );
}

export function FormPageShell({
  eyebrow,
  title,
  lede,
  accent = true,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
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
          </div>

          <div className="mt-16 border-t border-[#1B2A5E]/15 pt-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/60">
              Questions
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block font-serif text-[22px] leading-tight text-[#1B2A5E] transition-colors hover:text-[#D62828] md:text-[26px]"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3 max-w-[40ch] text-[13px] leading-[1.6] text-[#1B2A5E]/60">
              Our concierge team responds within one working day.
            </p>
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
