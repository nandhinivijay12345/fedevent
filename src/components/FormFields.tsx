import { LineField, LineSelect, Stepper, SubmitPill } from "./Modal";
import { SignaturePad } from "./SignaturePad";
import type { useConfirmAttendanceForm } from "@/hooks/useConfirmAttendanceForm";
import type { useNominateForm } from "@/hooks/useNominateForm";

export const DESIGNATIONS = ["Principal", "Correspondent", "Director", "Coordinator", "Other"];

type ConfirmAttendanceFieldsProps = Pick<
  ReturnType<typeof useConfirmAttendanceForm>,
  "f" | "set" | "sig" | "error" | "loading" | "submit"
>;

export function ConfirmAttendanceFields({
  f,
  set,
  sig,
  error,
  loading,
  submit,
}: ConfirmAttendanceFieldsProps) {
  return (
    <form onSubmit={submit} className="space-y-6">
      <LineField
        label="Confirmation Code"
        name="confirmation_code"
        required
        placeholder="FED-XXXX"
        helper="Shared with your school during the invitation call."
        value={f.confirmation_code}
        onChange={(v) => set("confirmation_code", v.toUpperCase())}
      />
      <LineField label="School Name" name="school_name" required value={f.school_name} onChange={(v) => set("school_name", v)} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="Your Name" name="your_name" required value={f.your_name} onChange={(v) => set("your_name", v)} />
        <LineSelect label="Designation" required value={f.designation} onChange={(v) => set("designation", v)} options={DESIGNATIONS} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineField label="Official School Email" name="email" type="email" inputMode="email" required value={f.email} onChange={(v) => set("email", v)} />
        <LineField label="Phone" name="phone" type="tel" inputMode="tel" required value={f.phone} onChange={(v) => set("phone", v)} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Stepper label="Student Passes" required min={0} max={50} value={f.student_passes} onChange={(v) => set("student_passes", v)} />
        <Stepper label="Teacher & Staff Passes" required min={0} max={20} value={f.staff_passes} onChange={(v) => set("staff_passes", v)} />
      </div>
      <SignaturePad onRegister={(h) => (sig.current = h)} />
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
      <SubmitPill loading={loading}>Confirm Attendance</SubmitPill>
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
