import { useRef, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import type { SignatureHandle } from "@/components/SignaturePad";

export type ConfirmAttendanceFormState = {
  confirmation_code: string;
  school_name: string;
  your_name: string;
  designation: string;
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
    your_name: "",
    designation: "",
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
  ) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^FED-\d{4}$/.test(f.confirmation_code)) {
      return setError("Confirmation code must match pattern FED-XXXX.");
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
        your_name: f.your_name,
        designation: f.designation,
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

  return { f, set, sig, error, loading, done, submit, reset };
}
