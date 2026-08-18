import { useEffect, useState } from "react";
import { ConfirmAttendanceModal } from "./FormModals";
import { MODAL_EVENT, type ModalKind } from "@/lib/modal-bus";

export function ModalRoot() {
  const [open, setOpen] = useState<ModalKind | null>(null);
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<ModalKind>;
      setOpen(ce.detail);
    };
    window.addEventListener(MODAL_EVENT, handler);
    return () => window.removeEventListener(MODAL_EVENT, handler);
  }, []);
  return <ConfirmAttendanceModal open={open === "confirm"} onClose={() => setOpen(null)} />;
}
