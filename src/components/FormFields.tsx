import { useEffect, useRef, useState, type ReactNode } from "react";
import { LineField, LineSelect, Stepper, SubmitPill, TextAreaField } from "./Modal";
import { SignaturePad } from "./SignaturePad";
import type { useConfirmAttendanceForm } from "@/hooks/useConfirmAttendanceForm";
import type { useNominateForm } from "@/hooks/useNominateForm";

export const DESIGNATIONS = ["Principal", "Correspondent", "Director", "Coordinator", "Other"];
export const BOARD_AFFILIATIONS = ["CBSE", "ICSE", "IB", "State Board", "International", "Other"];
export const SCHOOL_TYPES = ["K-12 (Full)", "K-5 / Primary Only", "6-12 / Secondary Only", "Pre-K Only", "Other"];

const CHAPTERS = [
  { n: "01", label: "Verification" },
  { n: "02", label: "School Profile" },
  { n: "03", label: "Your Details" },
  { n: "04", label: "Award Recipient" },
  { n: "05", label: "Attendance" },
  { n: "06", label: "Confirmation" },
] as const;

function Chapter({
  n,
  label,
  innerRef,
  children,
}: {
  n: string;
  label: string;
  innerRef: (el: HTMLElement | null) => void;
  children: ReactNode;
}) {
  return (
    <section ref={innerRef}>
      <div className="flex items-baseline gap-2.5">
        <span className="font-serif text-[15px] font-semibold text-[#D62828]">{n}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70">
          {label}
        </span>
      </div>
      <div className="mt-3 h-px w-full bg-[#1B2A5E]/10" />
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

type ConfirmAttendanceFieldsProps = Pick<
  ReturnType<typeof useConfirmAttendanceForm>,
  "f" | "set" | "setSameAsFiller" | "sig" | "error" | "loading" | "submit"
>;

export function ConfirmAttendanceFields({
  f,
  set,
  setSameAsFiller,
  sig,
  error,
  loading,
  submit,
}: ConfirmAttendanceFieldsProps) {
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [c1, c2, c3, c4, c5, c6] = CHAPTERS;

  useEffect(() => {
    const els = chapterRefs.current.filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = chapterRefs.current.filter((el): el is HTMLElement => el !== null);
    const container = sectionsRef.current;
    if (!els.length || !container) return;
    const measure = () => {
      const containerTop = container.getBoundingClientRect().top;
      setOffsets(els.map((el) => el.getBoundingClientRect().top - containerTop));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <form onSubmit={submit} className="relative md:pl-12">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 md:block">
        <div className="relative mx-auto h-full w-px bg-[#1B2A5E]/10">
          {CHAPTERS.map((c, i) => (
            <span
              key={c.n}
              className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-300 ${
                i <= active ? "bg-[#D62828]" : "bg-[#1B2A5E]/15"
              }`}
              style={{
                top: offsets[i] !== undefined ? `${offsets[i]}px` : `${(i / (CHAPTERS.length - 1)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div ref={sectionsRef} className="space-y-12">
        <Chapter n={c1.n} label={c1.label} innerRef={(el) => (chapterRefs.current[0] = el)}>
          <LineField
            label="Confirmation Code"
            name="confirmation_code"
            required
            placeholder="FED-XXXX"
            helper="Shared with your school during the invitation call."
            value={f.confirmation_code}
            onChange={(v) => set("confirmation_code", v.toUpperCase())}
          />
        </Chapter>

        <Chapter n={c2.n} label={c2.label} innerRef={(el) => (chapterRefs.current[1] = el)}>
          <LineField label="School Name" name="school_name" required value={f.school_name} onChange={(v) => set("school_name", v)} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField
              label="Founding Year"
              name="founding_year"
              required
              placeholder="e.g. 1998"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              value={f.founding_year}
              onChange={(v) => set("founding_year", v.replace(/\D/g, "").slice(0, 4))}
            />
            <LineField
              label="Total Student Strength"
              name="total_student_strength"
              type="number"
              required
              inputMode="numeric"
              value={f.total_student_strength}
              onChange={(v) => set("total_student_strength", v.replace(/\D/g, ""))}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineSelect
              label="Board / Curriculum Affiliation"
              required
              value={f.board_affiliation}
              onChange={(v) => set("board_affiliation", v)}
              options={BOARD_AFFILIATIONS}
            />
            <LineSelect
              label="School Type"
              required
              value={f.school_type}
              onChange={(v) => set("school_type", v)}
              options={SCHOOL_TYPES}
            />
          </div>
          {f.school_type === "Other" && (
            <LineField
              label="Please specify"
              name="school_type_other"
              required
              value={f.school_type_other}
              onChange={(v) => set("school_type_other", v)}
            />
          )}
          <TextAreaField
            label="Accreditations or Affiliations Held"
            maxLength={150}
            rows={3}
            placeholder="e.g. prior AIAASC/WASC recognition, ISO certification, government awards"
            value={f.accreditations}
            onChange={(v) => set("accreditations", v)}
          />
          <TextAreaField
            label="Standout Milestone"
            required
            maxLength={150}
            rows={3}
            helper="One achievement we can celebrate on stage."
            value={f.standout_milestone}
            onChange={(v) => set("standout_milestone", v)}
          />
          <TextAreaField
            label="Vision"
            required
            maxLength={200}
            rows={3}
            value={f.vision}
            onChange={(v) => set("vision", v)}
          />
          <TextAreaField
            label="Mission"
            required
            maxLength={200}
            rows={3}
            value={f.mission}
            onChange={(v) => set("mission", v)}
          />
        </Chapter>

        <Chapter n={c3.n} label={c3.label} innerRef={(el) => (chapterRefs.current[2] = el)}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label="Your Name" name="your_name" required value={f.your_name} onChange={(v) => set("your_name", v)} />
            <LineSelect label="Designation" required value={f.designation} onChange={(v) => set("designation", v)} options={DESIGNATIONS} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label="Official School Email" name="email" type="email" inputMode="email" required value={f.email} onChange={(v) => set("email", v)} />
            <LineField label="Phone" name="phone" type="tel" inputMode="tel" required value={f.phone} onChange={(v) => set("phone", v)} />
          </div>
        </Chapter>

        <Chapter n={c4.n} label={c4.label} innerRef={(el) => (chapterRefs.current[3] = el)}>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70">
              Who will be receiving the award on behalf of your school?
            </div>
            <label className="mt-3 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={f.award_recipient_same_as_filler}
                onChange={(e) => setSameAsFiller(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#D62828]"
              />
              <span className="text-[13px] leading-[1.5] text-[#1B2A5E]/80">
                Same as the person filling out this form
              </span>
            </label>
            {!f.award_recipient_same_as_filler && (
              <div className="mt-4 space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <LineField
                    label="Name of Recipient"
                    name="award_recipient_name"
                    required
                    value={f.award_recipient_name}
                    onChange={(v) => set("award_recipient_name", v)}
                  />
                  <LineSelect
                    label="Their Designation"
                    required
                    value={f.award_recipient_designation}
                    onChange={(v) => set("award_recipient_designation", v)}
                    options={DESIGNATIONS}
                  />
                </div>
                <LineField
                  label="Direct Phone Number"
                  name="award_recipient_phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={f.award_recipient_phone}
                  onChange={(v) => set("award_recipient_phone", v)}
                />
              </div>
            )}
          </div>
        </Chapter>

        <Chapter n={c5.n} label={c5.label} innerRef={(el) => (chapterRefs.current[4] = el)}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Stepper label="Student Passes" required min={0} max={50} value={f.student_passes} onChange={(v) => set("student_passes", v)} />
            <Stepper label="Teacher & Staff Passes" required min={0} max={20} value={f.staff_passes} onChange={(v) => set("staff_passes", v)} />
          </div>
        </Chapter>

        <Chapter n={c6.n} label={c6.label} innerRef={(el) => (chapterRefs.current[5] = el)}>
          <SignaturePad onRegister={(h) => (sig.current = h)} />
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={f.authorised}
              onChange={(e) => set("authorised", e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#D62828]"
            />
            <span className="text-[13px] leading-[1.5] text-[#1B2A5E]/80">
              I confirm I am authorised to represent this school.
            </span>
          </label>
          {error && <p className="text-[12px] text-[#D62828]">{error}</p>}
          <SubmitPill loading={loading}>Confirm Attendance</SubmitPill>
        </Chapter>
      </div>
    </form>
  );
}

type NominationFieldsProps = Pick<
  ReturnType<typeof useNominateForm>,
  "f" | "set" | "error" | "loading" | "submit"
>;

export function NominationFields({ f, set, error, loading, submit }: NominationFieldsProps) {
  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="School Name" name="school_name" required value={f.school_name} onChange={(v) => set("school_name", v)} />
        <LineField label="City" name="city" required value={f.city} onChange={(v) => set("city", v)} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="Your Name" name="your_name" required value={f.your_name} onChange={(v) => set("your_name", v)} />
        <LineSelect label="Designation" required value={f.designation} onChange={(v) => set("designation", v)} options={DESIGNATIONS} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="Official Email" name="email" type="email" inputMode="email" required value={f.email} onChange={(v) => set("email", v)} />
        <LineField label="Phone" name="phone" type="tel" inputMode="tel" value={f.phone} onChange={(v) => set("phone", v)} />
      </div>
      <div>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
            Why does this school belong in India's Top 100? <span className="text-[#D62828]">*</span>
          </span>
          <textarea
            required
            maxLength={300}
            rows={4}
            value={f.reason}
            onChange={(e) => set("reason", e.target.value)}
            className="mt-2 block w-full resize-none border-0 border-b border-[#1B2A5E]/20 bg-transparent px-0 py-2 text-[15px] text-[#1B2A5E] outline-none focus:border-[#1B2A5E] focus:ring-0"
          />
          <div className="mt-1 text-right text-[11px] text-[#1B2A5E]/50 tabular-nums">
            {f.reason.length} / 300
          </div>
        </label>
      </div>
      <LineField
        label="Website or achievement link"
        name="link"
        type="url"
        placeholder="https://"
        value={f.link}
        onChange={(v) => set("link", v)}
      />
      <label className="flex cursor-pointer items-start gap-3 pt-2">
        <input
          type="checkbox"
          checked={f.authorised}
          onChange={(e) => set("authorised", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#D62828]"
        />
        <span className="text-[13px] leading-[1.5] text-[#1B2A5E]/80">
          I confirm I am authorised to represent this school.
        </span>
      </label>
      {error && <p className="text-[12px] text-[#D62828]">{error}</p>}
      <SubmitPill loading={loading}>Submit Nomination</SubmitPill>
    </form>
  );
}
