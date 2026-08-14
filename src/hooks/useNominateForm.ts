import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { sendConfirmationEmail } from "@/lib/notifications.functions";

export type NominateFormState = {
  school_name: string;
  city: string;
  your_name: string;
  designation: string;
  email: string;
  phone_country_code: string;
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
    phone_country_code: "+91",
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
        phone: f.phone.trim() ? `${f.phone_country_code.trim()} ${f.phone.trim()}`.trim() : null,
        reason: f.reason,
        link: f.link || null,
        authorised: f.authorised,
      });
      if (insertError) throw insertError;
      void sendConfirmationEmail({
        data: {
          to: f.email,
          subject: "We've received your Top 100 nomination — FED 2026",
          heading: "Nomination received.",
          body: `Thanks, ${f.your_name}. We've received your nomination for ${f.school_name}. Our team will verify the details against our records and follow up if we need anything else.`,
        },
      }).catch(() => {});
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
