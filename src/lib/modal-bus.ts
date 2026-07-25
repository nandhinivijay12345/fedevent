// Simple global modal bus — dispatch a window event to open either modal
export type ModalKind = "confirm" | "nominate";

export function openModal(kind: ModalKind) {
  window.dispatchEvent(new CustomEvent<ModalKind>("fed:open-modal", { detail: kind }));
}

export const MODAL_EVENT = "fed:open-modal";
