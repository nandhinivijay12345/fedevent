import { ConfirmAttendanceFields, NominationFields } from "./FormFields";
import { Modal, ModalHeader, SuccessBlock } from "./Modal";
import { useConfirmAttendanceForm } from "@/hooks/useConfirmAttendanceForm";
import { useNominateForm } from "@/hooks/useNominateForm";

export function ConfirmAttendanceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const form = useConfirmAttendanceForm();

  const handleClose = () => {
    onClose();
    setTimeout(form.reset, 300);
  };

  return (
    <Modal open={open} onClose={handleClose} labelledBy="confirm-title">
      <ModalHeader
        id="confirm-title"
        eyebrow="Confirm Attendance"
        title="Reserve your seats for August 24."
      />
      {form.done ? (
        <SuccessBlock title="See you on August 24." />
      ) : (
        <ConfirmAttendanceFields {...form} />
      )}
    </Modal>
  );
}

export function NominateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const form = useNominateForm();

  const handleClose = () => {
    onClose();
    setTimeout(form.reset, 300);
  };

  return (
    <Modal open={open} onClose={handleClose} labelledBy="nominate-title">
      <ModalHeader
        id="nominate-title"
        eyebrow="Top 100 Nomination"
        title="Nominate a school for India's Top 100."
      />
      {form.done ? (
        <SuccessBlock
          title="Nomination received."
          body="Our team will verify the details against our records."
        />
      ) : (
        <NominationFields {...form} />
      )}
    </Modal>
  );
}
