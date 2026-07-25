import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export type NominateFormState = {
  school_name: string;
  city: string;
  your_name: string;
  designation: string;
  email: string;
  phone: string;
  reason: string;
  link: string;
  authorised: boolean;
};

export function useNominateForm() {
  const [f, setF] = useState<NominateFormState>({
    school_name: "",
    city: "",
    your_name: "",
    designation: "",
    email: "",
    phone: "",
    reason: "",
    link: "",
    authorised: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof NominateFormState>(k: K, v: NominateFormState[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      return setError("Enter a valid email address.");
    }
    if (!f.reason.trim()) return setError("Please share why this school belongs.");
    if (f.reason.length > 300) return setError("Reason must be under 300 characters.");
    if (!f.authorised) return setError("Please confirm authorisation.");
    setLoading(true);
    try {
      const { error: insertError } = await supabase.from("nominations").insert({
        school_name: f.school_name,
        city: f.city,
        your_name: f.your_name,
        designation: f.designation,
        email: f.email,
        phone: f.phone || null,
        reason: f.reason,
        link: f.link || null,
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

  return { f, set, error, loading, done, submit, reset };
}
