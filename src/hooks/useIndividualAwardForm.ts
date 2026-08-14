import { useRef, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { sendConfirmationEmail } from "@/lib/notifications.functions";
import type { SignatureHandle } from "@/components/SignaturePad";

export type IndividualAwardFormState = {
  your_name: string;
  role: string;
  designation: string;
  organisation: string;
  email: string;
  phone_country_code: string;
  phone: string;
  bio: string;
  guest_passes: number;
  authorised: boolean;
};

export function useIndividualAwardForm() {
  const [f, setF] = useState<IndividualAwardFormState>({
    your_name: "",
    role: "",
    designation: "",
    organisation: "",
    email: "",
    phone_country_code: "+91",
    phone: "",
    bio: "",
    guest_passes: 0,
    authorised: false,
  });
  const sig = useRef<SignatureHandle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof IndividualAwardFormState>(
    k: K,
    v: IndividualAwardFormState[K],
  ) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!f.organisation.trim()) {
      return setError("Please enter your organization or school.");
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      return setError("Enter a valid email address.");
    }
    if (!f.authorised) {
      return setError("Please confirm the details above are accurate.");
    }
    if (!sig.current || sig.current.isEmpty()) {
      return setError("Please add your signature.");
    }
    setLoading(true);
    try {
      let signature_url: string | null = null;
      const blob = await sig.current.toBlob();
      if (blob) {
        const path = `individual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
        const { error: uploadError } = await supabase.storage
          .from("signatures")
          .upload(path, blob, { contentType: "image/png" });
        if (uploadError) throw uploadError;
        signature_url = supabase.storage.from("signatures").getPublicUrl(path).data.publicUrl;
      }

      const { error: insertError } = await supabase.from("individual_award_registrations").insert({
        your_name: f.your_name,
        role: f.role,
        designation: f.designation,
        organisation: f.organisation.trim(),
        email: f.email,
        phone: `${f.phone_country_code.trim()} ${f.phone.trim()}`.trim(),
        bio: f.bio,
        guest_passes: f.guest_passes,
        signature_url,
        authorised: f.authorised,
      });
      if (insertError) throw insertError;
      void sendConfirmationEmail({
        data: {
          to: f.email,
          subject: "You're confirmed for FED 2026",
          heading: "See you on the stage!",
          body: `Hi ${f.your_name}, your spot is locked in for August 24 at IITM Research Park, Chennai. We'll be in touch with arrival details and your on-stage moment soon. Need anything before then? Reach us at +91 82206 06367.`,
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

  return { f, set, sig, error, loading, done, submit, reset };
}
