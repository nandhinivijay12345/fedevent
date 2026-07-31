import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export type ParticipationFormState = {
  full_name: string;
  visitor_type: string;
  visitor_type_other: string;
  designation: string;
  organisation: string;
  city: string;
  email: string;
  phone_country_code: string;
  phone: string;
  guest_count: number;
  note: string;
  updates_opt_in: boolean;
};

export function useParticipationForm() {
  const [f, setF] = useState<ParticipationFormState>({
    full_name: "",
    visitor_type: "",
    visitor_type_other: "",
    designation: "",
    organisation: "",
    city: "",
    email: "",
    phone_country_code: "+91",
    phone: "",
    guest_count: 0,
    note: "",
    updates_opt_in: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof ParticipationFormState>(k: K, v: ParticipationFormState[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!f.visitor_type) {
      return setError("Please let us know who's visiting.");
    }
    if (f.visitor_type === "Other" && !f.visitor_type_other.trim()) {
      return setError("Please specify.");
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      return setError("Enter a valid email address.");
    }
    setLoading(true);
    try {
      const { error: insertError } = await supabase.from("participations").insert({
        full_name: f.full_name,
        visitor_type: f.visitor_type,
        visitor_type_other: f.visitor_type === "Other" ? f.visitor_type_other.trim() : null,
        designation: f.designation,
        organisation: f.organisation.trim() || null,
        city: f.city,
        email: f.email,
        phone: `${f.phone_country_code.trim()} ${f.phone.trim()}`.trim(),
        guest_count: f.guest_count,
        note: f.note.trim() || null,
        updates_opt_in: f.updates_opt_in,
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

  return { f, set, error, loading, done, submit, reset };
}
