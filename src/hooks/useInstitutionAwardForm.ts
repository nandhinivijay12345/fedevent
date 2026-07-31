import { useRef, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import type { SignatureHandle } from "@/components/SignaturePad";

export type InstitutionTrack = "school" | "organization" | "college";

export const INSTITUTION_TRACK_TABLES: Record<InstitutionTrack, string> = {
  school: "confirmations",
  organization: "organization_award_registrations",
  college: "college_award_registrations",
};

const TRACK_COLUMNS: Record<
  InstitutionTrack,
  {
    entity_name: string;
    category?: string;
    type_field: string;
    type_field_other: string;
    total_strength: string;
    primary_passes: string;
    secondary_passes: string;
  }
> = {
  school: {
    entity_name: "school_name",
    category: "board_affiliation",
    type_field: "school_type",
    type_field_other: "school_type_other",
    total_strength: "total_student_strength",
    primary_passes: "student_passes",
    secondary_passes: "staff_passes",
  },
  organization: {
    entity_name: "organization_name",
    category: "industry",
    type_field: "organization_type",
    type_field_other: "organization_type_other",
    total_strength: "total_team_strength",
    primary_passes: "team_passes",
    secondary_passes: "guest_passes",
  },
  college: {
    entity_name: "institution_name",
    category: "affiliation",
    type_field: "institution_type",
    type_field_other: "institution_type_other",
    total_strength: "total_student_strength",
    primary_passes: "student_passes",
    secondary_passes: "staff_passes",
  },
};

export type InstitutionFormState = {
  entity_name: string;
  website: string;
  founding_year: string;
  category: string;
  type_field: string;
  type_field_other: string;
  total_strength: string;
  accreditations: string;
  vision: string;
  mission: string;
  your_name: string;
  designation: string;
  award_recipient_same_as_filler: boolean;
  award_recipient_name: string;
  award_recipient_designation: string;
  award_recipient_phone_country_code: string;
  award_recipient_phone: string;
  email: string;
  phone_country_code: string;
  phone: string;
  primary_passes: number;
  secondary_passes: number;
  authorised: boolean;
};

const EMPTY_STATE: InstitutionFormState = {
  entity_name: "",
  website: "",
  founding_year: "",
  category: "",
  type_field: "",
  type_field_other: "",
  total_strength: "",
  accreditations: "",
  vision: "",
  mission: "",
  your_name: "",
  designation: "",
  award_recipient_same_as_filler: false,
  award_recipient_name: "",
  award_recipient_designation: "",
  award_recipient_phone_country_code: "+91",
  award_recipient_phone: "",
  email: "",
  phone_country_code: "+91",
  phone: "",
  primary_passes: 0,
  secondary_passes: 0,
  authorised: false,
};

export function useInstitutionAwardForm(track: InstitutionTrack) {
  const [f, setF] = useState<InstitutionFormState>(EMPTY_STATE);
  const sig = useRef<SignatureHandle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof InstitutionFormState>(
    k: K,
    v: InstitutionFormState[K],
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
        if (k === "phone_country_code") next.award_recipient_phone_country_code = v as string;
      }
      return next;
    });

  const setSameAsFiller = (checked: boolean) =>
    setF((p) => ({
      ...p,
      award_recipient_same_as_filler: checked,
      award_recipient_name: checked ? p.your_name : "",
      award_recipient_designation: checked ? p.designation : "",
      award_recipient_phone_country_code: checked ? p.phone_country_code : "+91",
      award_recipient_phone: checked ? p.phone : "",
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[0-9]{4}$/.test(f.founding_year)) {
      return setError("Enter a valid 4-digit founding year.");
    }
    if (f.type_field === "Other" && !f.type_field_other.trim()) {
      return setError("Please specify.");
    }
    if (track !== "organization" && !f.accreditations.trim()) {
      return setError("Please enter your accreditations or affiliations.");
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
        const path = `${track}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
        const { error: uploadError } = await supabase.storage
          .from("signatures")
          .upload(path, blob, { contentType: "image/png" });
        if (uploadError) throw uploadError;
        signature_url = supabase.storage.from("signatures").getPublicUrl(path).data.publicUrl;
      }

      const cols = TRACK_COLUMNS[track];
      const payload = {
        [cols.entity_name]: f.entity_name,
        website: f.website,
        founding_year: parseInt(f.founding_year, 10),
        ...(cols.category ? { [cols.category]: f.category } : {}),
        [cols.type_field]: f.type_field,
        [cols.type_field_other]: f.type_field === "Other" ? f.type_field_other.trim() : null,
        [cols.total_strength]: parseInt(f.total_strength, 10),
        accreditations: f.accreditations.trim(),
        vision: f.vision,
        mission: f.mission,
        your_name: f.your_name,
        designation: f.designation,
        award_recipient_name: f.award_recipient_name,
        award_recipient_designation: f.award_recipient_designation,
        award_recipient_phone: `${f.award_recipient_phone_country_code.trim()} ${f.award_recipient_phone.trim()}`.trim(),
        email: f.email,
        phone: `${f.phone_country_code.trim()} ${f.phone.trim()}`.trim(),
        [cols.primary_passes]: f.primary_passes,
        [cols.secondary_passes]: f.secondary_passes,
        signature_url,
        authorised: f.authorised,
      };

      const { error: insertError } = await supabase
        .from(INSTITUTION_TRACK_TABLES[track] as "confirmations")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(payload as any);
      if (insertError) throw insertError;
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setF(EMPTY_STATE);
    setError(null);
    setDone(false);
  };

  return { f, set, setSameAsFiller, sig, error, loading, done, submit, reset };
}
