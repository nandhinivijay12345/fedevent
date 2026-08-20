import { useEffect, useRef, useState, type ReactNode } from "react";
import { LineField, LineSelect, PhoneField, Stepper, SubmitPill, TextAreaField } from "./Modal";
import { SignaturePad } from "./SignaturePad";
import type { InstitutionTrack, useInstitutionAwardForm } from "@/hooks/useInstitutionAwardForm";
import type { useIndividualAwardForm } from "@/hooks/useIndividualAwardForm";
import type { useParticipationForm } from "@/hooks/useParticipationForm";

export const BOARD_AFFILIATIONS = ["CBSE", "ICSE", "IB", "State Board", "International", "Other"];
export const SCHOOL_TYPES = ["K-12 (Full)", "K-5 / Primary Only", "6-12 / Secondary Only", "Pre-K Only", "Other"];
export const INDIVIDUAL_ROLES = ["Educator", "Entrepreneur", "Policy Maker", "Innovator", "Researcher", "Student", "Other"];
export const VISITOR_TYPES = ["Parent / Guardian", "Student", "Educator", "Industry Professional", "Media", "General Public", "Other"];
export const ORGANIZATION_TYPES = ["Corporate", "Startup", "NGO / Non-Profit", "Government / PSU", "Other"];
export const ORGANIZATION_INDUSTRIES = ["Education", "Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Other"];
export const UNIVERSITY_AFFILIATIONS = ["Autonomous", "State University", "Central University", "Deemed University", "Private University", "Other"];
export const INSTITUTION_TYPES = ["Engineering & Technology", "Arts & Science", "Medical", "Management", "Multi-Disciplinary", "Other"];

type InstitutionCopy = {
  profileLabel: string;
  entityLabel: string;
  categoryLabel?: string;
  categoryOptions?: string[];
  typeLabel: string;
  typeOptions: string[];
  strengthLabel: string;
  accreditationsPlaceholder: string;
  emailLabel: string;
  recipientPrompt: string;
  primaryPassesLabel: string;
  primaryPassesMax: number;
  secondaryPassesLabel: string;
  secondaryPassesMax: number;
  hasSecondaryPasses: boolean;
  authorisedLabel: string;
};

export const INSTITUTION_COPY: Record<InstitutionTrack, InstitutionCopy> = {
  school: {
    profileLabel: "School Profile",
    entityLabel: "School Name",
    categoryLabel: "Board / Curriculum Affiliation",
    categoryOptions: BOARD_AFFILIATIONS,
    typeLabel: "School Type",
    typeOptions: SCHOOL_TYPES,
    strengthLabel: "Total Student Strength",
    accreditationsPlaceholder: "e.g. prior AIAASC/WASC recognition, ISO certification, government awards",
    emailLabel: "Official School Email",
    recipientPrompt: "Who will be receiving the award on behalf of your school?",
    primaryPassesLabel: "Student Passes",
    primaryPassesMax: 150,
    secondaryPassesLabel: "Teacher & Staff Passes",
    secondaryPassesMax: 20,
    hasSecondaryPasses: true,
    authorisedLabel: "I confirm I am authorised to represent this school.",
  },
  organization: {
    profileLabel: "Organization Profile",
    entityLabel: "Organization Name",
    categoryLabel: "Industry",
    categoryOptions: ORGANIZATION_INDUSTRIES,
    typeLabel: "Organization Type",
    typeOptions: ORGANIZATION_TYPES,
    strengthLabel: "Total Team Strength",
    accreditationsPlaceholder: "e.g. ISO certification, CSR recognitions, industry awards",
    emailLabel: "Official Organization Email",
    recipientPrompt: "Who will be receiving the award on behalf of your organization?",
    primaryPassesLabel: "Team Passes",
    primaryPassesMax: 5,
    secondaryPassesLabel: "Guest Passes",
    secondaryPassesMax: 20,
    hasSecondaryPasses: false,
    authorisedLabel: "I confirm I am authorised to represent this organization.",
  },
  college: {
    profileLabel: "College / University Profile",
    entityLabel: "College / University Name",
    categoryLabel: "University Affiliation",
    categoryOptions: UNIVERSITY_AFFILIATIONS,
    typeLabel: "Institution Type",
    typeOptions: INSTITUTION_TYPES,
    strengthLabel: "Total Student Strength",
    accreditationsPlaceholder: "e.g. NAAC, NBA, UGC recognitions",
    emailLabel: "Official Institution Email",
    recipientPrompt: "Who will be receiving the award on behalf of your institution?",
    primaryPassesLabel: "Student Passes",
    primaryPassesMax: 150,
    secondaryPassesLabel: "Faculty & Staff Passes",
    secondaryPassesMax: 20,
    hasSecondaryPasses: true,
    authorisedLabel: "I confirm I am authorised to represent this institution.",
  },
};

function PassesContactNote() {
  return (
    <p className="text-[12px] leading-[1.6] text-[#1B2A5E]/60">
      Need more passes than the limit above? Call us directly at{" "}
      <a href="tel:+918220606367" className="font-semibold text-[#1B2A5E] hover:text-[#D62828]">
        +91 82206 06367
      </a>{" "}
      and our team will help.
    </p>
  );
}

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

type InstitutionAwardFieldsProps = Pick<
  ReturnType<typeof useInstitutionAwardForm>,
  "f" | "set" | "setSameAsFiller" | "sig" | "error" | "loading" | "submit"
> & { track: InstitutionTrack };

export function InstitutionAwardFields({
  track,
  f,
  set,
  setSameAsFiller,
  sig,
  error,
  loading,
  submit,
}: InstitutionAwardFieldsProps) {
  const copy = INSTITUTION_COPY[track];
  const chapters = [
    { n: "01", label: copy.profileLabel },
    { n: "02", label: "Your Details" },
    { n: "03", label: "Award Recipient" },
    { n: "04", label: "Attendance" },
    { n: "05", label: "Confirmation" },
  ] as const;

  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [c1, c2, c3, c4, c5] = chapters;

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
          {chapters.map((c, i) => (
            <span
              key={c.n}
              className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-300 ${
                i <= active ? "bg-[#D62828]" : "bg-[#1B2A5E]/15"
              }`}
              style={{
                top: offsets[i] !== undefined ? `${offsets[i]}px` : `${(i / (chapters.length - 1)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div ref={sectionsRef} className="space-y-12">
        <Chapter n={c1.n} label={c1.label} innerRef={(el) => (chapterRefs.current[0] = el)}>
          <LineField label={copy.entityLabel} name="entity_name" required value={f.entity_name} onChange={(v) => set("entity_name", v)} />
          <LineField
            label="Website"
            name="website"
            type="url"
            required
            placeholder="https://"
            value={f.website}
            onChange={(v) => set("website", v)}
          />
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
              label={copy.strengthLabel}
              name="total_strength"
              type="number"
              required
              inputMode="numeric"
              value={f.total_strength}
              onChange={(v) => set("total_strength", v.replace(/\D/g, ""))}
            />
          </div>
          <div className={`grid grid-cols-1 gap-8 ${copy.categoryLabel ? "md:grid-cols-2" : ""}`}>
            {copy.categoryLabel && copy.categoryOptions && (
              <LineSelect
                label={copy.categoryLabel}
                required
                value={f.category}
                onChange={(v) => set("category", v)}
                options={copy.categoryOptions}
              />
            )}
            <LineSelect
              label={copy.typeLabel}
              required
              value={f.type_field}
              onChange={(v) => set("type_field", v)}
              options={copy.typeOptions}
            />
          </div>
          {f.type_field === "Other" && (
            <LineField
              label="Please specify"
              name="type_field_other"
              required
              value={f.type_field_other}
              onChange={(v) => set("type_field_other", v)}
            />
          )}
          {track !== "organization" && (
            <TextAreaField
              label="Accreditations or Affiliations Held"
              required
              maxLength={150}
              rows={3}
              placeholder={copy.accreditationsPlaceholder}
              value={f.accreditations}
              onChange={(v) => set("accreditations", v)}
            />
          )}
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

        <Chapter n={c2.n} label={c2.label} innerRef={(el) => (chapterRefs.current[1] = el)}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label="Your Name" name="your_name" required value={f.your_name} onChange={(v) => set("your_name", v)} />
            <LineField label="Designation" name="designation" required value={f.designation} onChange={(v) => set("designation", v)} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label={copy.emailLabel} name="email" type="email" inputMode="email" required value={f.email} onChange={(v) => set("email", v)} />
            <PhoneField
              label="Phone"
              required
              codeValue={f.phone_country_code}
              onCodeChange={(v) => set("phone_country_code", v)}
              phoneValue={f.phone}
              onPhoneChange={(v) => set("phone", v)}
            />
          </div>
        </Chapter>

        <Chapter n={c3.n} label={c3.label} innerRef={(el) => (chapterRefs.current[2] = el)}>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70">
              {copy.recipientPrompt}
            </div>
            <label className="mt-3 flex cursor-pointer items-start gap-3 py-2 -my-2">
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
                  <LineField
                    label="Their Designation"
                    name="award_recipient_designation"
                    required
                    value={f.award_recipient_designation}
                    onChange={(v) => set("award_recipient_designation", v)}
                  />
                </div>
                <PhoneField
                  label="Direct Phone Number"
                  required
                  codeValue={f.award_recipient_phone_country_code}
                  onCodeChange={(v) => set("award_recipient_phone_country_code", v)}
                  phoneValue={f.award_recipient_phone}
                  onPhoneChange={(v) => set("award_recipient_phone", v)}
                />
              </div>
            )}
          </div>
        </Chapter>

        <Chapter n={c4.n} label={c4.label} innerRef={(el) => (chapterRefs.current[3] = el)}>
          <div className={`grid grid-cols-1 gap-8 ${copy.hasSecondaryPasses ? "md:grid-cols-2" : ""}`}>
            <Stepper label={copy.primaryPassesLabel} required min={0} max={copy.primaryPassesMax} value={f.primary_passes} onChange={(v) => set("primary_passes", v)} />
            {copy.hasSecondaryPasses && (
              <Stepper label={copy.secondaryPassesLabel} required min={0} max={copy.secondaryPassesMax} value={f.secondary_passes} onChange={(v) => set("secondary_passes", v)} />
            )}
          </div>
          <PassesContactNote />
        </Chapter>

        <Chapter n={c5.n} label={c5.label} innerRef={(el) => (chapterRefs.current[4] = el)}>
          <SignaturePad onRegister={(h) => (sig.current = h)} />
          <label className="flex cursor-pointer items-start gap-3 py-2 -my-2">
            <input
              type="checkbox"
              checked={f.authorised}
              onChange={(e) => set("authorised", e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#D62828]"
            />
            <span className="text-[13px] leading-[1.5] text-[#1B2A5E]/80">
              {copy.authorisedLabel}
            </span>
          </label>
          {error && <p className="text-[12px] text-[#D62828]">{error}</p>}
          <SubmitPill loading={loading}>Confirm Registration</SubmitPill>
        </Chapter>
      </div>
    </form>
  );
}

const INDIVIDUAL_CHAPTERS = [
  { n: "01", label: "Your Details" },
  { n: "02", label: "Achievement" },
  { n: "03", label: "Attendance" },
  { n: "04", label: "Confirmation" },
] as const;

type IndividualAwardFieldsProps = Pick<
  ReturnType<typeof useIndividualAwardForm>,
  "f" | "set" | "sig" | "error" | "loading" | "submit"
>;

export function IndividualAwardFields({
  f,
  set,
  sig,
  error,
  loading,
  submit,
}: IndividualAwardFieldsProps) {
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [c1, c2, c3, c4] = INDIVIDUAL_CHAPTERS;

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
          {INDIVIDUAL_CHAPTERS.map((c, i) => (
            <span
              key={c.n}
              className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-300 ${
                i <= active ? "bg-[#D62828]" : "bg-[#1B2A5E]/15"
              }`}
              style={{
                top: offsets[i] !== undefined ? `${offsets[i]}px` : `${(i / (INDIVIDUAL_CHAPTERS.length - 1)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div ref={sectionsRef} className="space-y-12">
        <Chapter n={c1.n} label={c1.label} innerRef={(el) => (chapterRefs.current[0] = el)}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label="Your Name" name="your_name" required value={f.your_name} onChange={(v) => set("your_name", v)} />
            <LineSelect label="Role" required value={f.role} onChange={(v) => set("role", v)} options={INDIVIDUAL_ROLES} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label="Designation" name="designation" required value={f.designation} onChange={(v) => set("designation", v)} />
            <LineField
              label="Organization / School"
              name="organisation"
              required
              helper="The company, school, or institution you're affiliated with."
              value={f.organisation}
              onChange={(v) => set("organisation", v)}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <LineField label="Email" name="email" type="email" inputMode="email" required value={f.email} onChange={(v) => set("email", v)} />
            <PhoneField
              label="Phone"
              required
              codeValue={f.phone_country_code}
              onCodeChange={(v) => set("phone_country_code", v)}
              phoneValue={f.phone}
              onPhoneChange={(v) => set("phone", v)}
            />
          </div>
        </Chapter>

        <Chapter n={c2.n} label={c2.label} innerRef={(el) => (chapterRefs.current[1] = el)}>
          <TextAreaField
            label="Short Bio"
            required
            maxLength={200}
            rows={3}
            helper="For the program note."
            value={f.bio}
            onChange={(v) => set("bio", v)}
          />
        </Chapter>

        <Chapter n={c3.n} label={c3.label} innerRef={(el) => (chapterRefs.current[2] = el)}>
          <Stepper label="Guest Passes" required min={0} max={2} value={f.guest_passes} onChange={(v) => set("guest_passes", v)} />
          <PassesContactNote />
        </Chapter>

        <Chapter n={c4.n} label={c4.label} innerRef={(el) => (chapterRefs.current[3] = el)}>
          <SignaturePad onRegister={(h) => (sig.current = h)} />
          <label className="flex cursor-pointer items-start gap-3 py-2 -my-2">
            <input
              type="checkbox"
              checked={f.authorised}
              onChange={(e) => set("authorised", e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#D62828]"
            />
            <span className="text-[13px] leading-[1.5] text-[#1B2A5E]/80">
              I confirm the details above are accurate and I am the nominee named above.
            </span>
          </label>
          {error && <p className="text-[12px] text-[#D62828]">{error}</p>}
          <SubmitPill loading={loading}>Confirm Registration</SubmitPill>
        </Chapter>
      </div>
    </form>
  );
}

type ParticipationFieldsProps = Pick<
  ReturnType<typeof useParticipationForm>,
  "f" | "set" | "error" | "loading" | "submit"
>;

export function ParticipationFields({ f, set, error, loading, submit }: ParticipationFieldsProps) {
  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="Full Name" name="full_name" required value={f.full_name} onChange={(v) => set("full_name", v)} />
        <LineField label="City" name="city" required value={f.city} onChange={(v) => set("city", v)} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineSelect label="I am a…" required value={f.visitor_type} onChange={(v) => set("visitor_type", v)} options={VISITOR_TYPES} />
        <LineField label="Designation" name="designation" required value={f.designation} onChange={(v) => set("designation", v)} />
      </div>
      {f.visitor_type === "Other" && (
        <LineField
          label="Please specify"
          name="visitor_type_other"
          required
          value={f.visitor_type_other}
          onChange={(v) => set("visitor_type_other", v)}
        />
      )}
      <LineField
        label="Organization / School"
        name="organisation"
        helper="Optional"
        value={f.organisation}
        onChange={(v) => set("organisation", v)}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="Email" name="email" type="email" inputMode="email" required value={f.email} onChange={(v) => set("email", v)} />
        <PhoneField
          label="Phone"
          required
          codeValue={f.phone_country_code}
          onCodeChange={(v) => set("phone_country_code", v)}
          phoneValue={f.phone}
          onPhoneChange={(v) => set("phone", v)}
        />
      </div>
      <Stepper
        label="Number of Guests"
        min={0}
        max={5}
        value={f.guest_count}
        onChange={(v) => set("guest_count", v)}
      />
      <TextAreaField
        label="Leave us a note"
        maxLength={300}
        rows={3}
        helper="Optional — questions, accessibility needs, or anything else you'd like us to know."
        value={f.note}
        onChange={(v) => set("note", v)}
      />
      <label className="flex cursor-pointer items-start gap-3 pt-2 pb-2 -mb-2">
        <input
          type="checkbox"
          checked={f.updates_opt_in}
          onChange={(e) => set("updates_opt_in", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#D62828]"
        />
        <span className="text-[13px] leading-[1.5] text-[#1B2A5E]/80">
          Send me updates about FED 2026.
        </span>
      </label>
      {error && <p className="text-[12px] text-[#D62828]">{error}</p>}
      <SubmitPill loading={loading}>Register to Attend</SubmitPill>
    </form>
  );
}
