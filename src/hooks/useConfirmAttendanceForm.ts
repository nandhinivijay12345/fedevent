import { useRef, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import type { SignatureHandle } from "@/components/SignaturePad";

export type ConfirmAttendanceFormState = {
  confirmation_code: string;
  school_name: string;
  founding_year: string;
  board_affiliation: string;
  school_type: string;
  school_type_other: string;
  total_student_strength: string;
  accreditations: string;
  standout_milestone: string;
  vision: string;
  mission: string;
  your_name: string;
  designation: string;
  award_recipient_same_as_filler: boolean;
  award_recipient_name: string;
  award_recipient_designation: string;
  award_recipient_phone: string;
  email: string;
  phone: string;
  student_passes: number;
  staff_passes: number;
  authorised: boolean;
};

export function useConfirmAttendanceForm() {
  const [f, setF] = useState<ConfirmAttendanceFormState>({
    confirmation_code: "",
    school_name: "",
    founding_year: "",
    board_affiliation: "",
    school_type: "",
    school_type_other: "",
    total_student_strength: "",
    accreditations: "",
    standout_milestone: "",
    vision: "",
    mission: "",
    your_name: "",
    designation: "",
    award_recipient_same_as_filler: false,
    award_recipient_name: "",
    award_recipient_designation: "",
    award_recipient_phone: "",
    email: "",
    phone: "",
    student_passes: 0,
    staff_passes: 0,
    authorised: false,
  });
  const sig = useRef<SignatureHandle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof ConfirmAttendanceFormState>(
    k: K,
    v: ConfirmAttendanceFormState[K],
  ) =>
    setF((p) => {
      const next = { ...p, [k]: v };
      // Keep the hidden award-recipient fields mirrored to the filler's own
      // details while "same as filler" is checked, so the copy stays fresh
      // even if the filler edits their name/designation/phone afterwards.
      if (next.award_recipient_same_as_filler) {
        if (k === "your_name") next.award_recipient_name = v as string;
        if (k === "designation") next.award_recipient_designation = v as string;
        if (k === "phone") next.award_recipient_phone = v as string;
      }
      return next;
    });

  const setSameAsFiller = (checked: boolean) =>
    setF((p) => ({
      ...p,
      award_recipient_same_as_filler: checked,
      award_recipient_name: checked ? p.your_name : "",
      award_recipient_designation: checked ? p.designation : "",
      award_recipient_phone: checked ? p.phone : "",
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^FED-\d{4}$/.test(f.confirmation_code)) {
      return setError("Confirmation code must match pattern FED-XXXX.");
    }
    if (!/^[0-9]{4}$/.test(f.founding_year)) {
      return setError("Enter a valid 4-digit founding year.");
    }
    if (f.school_type === "Other" && !f.school_type_other.trim()) {
      return setError("Please specify the school type.");
    }
    if (!f.award_recipient_same_as_filler) {
      if (!f.award_recipient_name.trim()) {
        return setError("Please enter the name of the award recipient.");
      }
      if (!f.award_recipient_designation) {
        return setError("Please select the award recipient's designation.");
      }
      if (!f.award_recipient_phone.trim()) {
        return setError("Please enter the award recipient's phone number.");
      }
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      return setError("Enter a valid email address.");
    }
    if (!f.authorised) {
      return setError("Please confirm authorisation.");
    }
    if (!sig.current || sig.current.isEmpty()) {
      return setError("Please add your signature.");
    }
    setLoading(true);
    try {
      let signature_url: string | null = null;
      const blob = await sig.current.toBlob();
      if (blob) {
        const path = `${f.confirmation_code}-${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage
          .from("signatures")
          .upload(path, blob, { contentType: "image/png" });
        if (uploadError) throw uploadError;
        signature_url = supabase.storage.from("signatures").getPublicUrl(path).data.publicUrl;
      }

      const { error: insertError } = await supabase.from("confirmations").insert({
        confirmation_code: f.confirmation_code,
        school_name: f.school_name,
        founding_year: parseInt(f.founding_year, 10),
        board_affiliation: f.board_affiliation,
        school_type: f.school_type,
        school_type_other: f.school_type === "Other" ? f.school_type_other.trim() : null,
        total_student_strength: parseInt(f.total_student_strength, 10),
        accreditations: f.accreditations.trim() || null,
        standout_milestone: f.standout_milestone,
        vision: f.vision,
        mission: f.mission,
        your_name: f.your_name,
        designation: f.designation,
        award_recipient_name: f.award_recipient_name,
        award_recipient_designation: f.award_recipient_designation,
        award_recipient_phone: f.award_recipient_phone,
        email: f.email,
        phone: f.phone,
        student_passes: f.student_passes,
        staff_passes: f.staff_passes,
        signature_url,
        authorised: f.authorised,
      });
      if (insertError) throw insertError;
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDone(false);
    setError(null);
  };

  return { f, set, setSameAsFiller, sig, error, loading, done, submit, reset };
}
