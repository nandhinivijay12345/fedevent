import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { SuccessBlock } from "@/components/Modal";
import { ParticipationFields } from "@/components/FormFields";
import { useParticipationForm } from "@/hooks/useParticipationForm";
import { FormPageShell } from "./confirm";

export const Route = createFileRoute("/participate")({
  head: () => ({
    meta: [
      { title: "Attendee Registration — FED 2026" },
      { name: "description", content: "Register to attend FED 2026 as a visitor · 24 August · IITM Research Park, Chennai." },
    ],
  }),
  component: ParticipatePage,
});

function ParticipatePage() {
  const form = useParticipationForm();

  return (
    <div className="bg-white text-navy">
      <Nav />
      <FormPageShell
        eyebrow="Attendee Registration"
        title="Join us on August 24"
        lede="Come see the future of education in action. Register as a visitor and we'll have your pass ready at the door."
        deadline="Registration and confirmation close August 20, 2026"
      >
        {form.done ? (
          <SuccessBlock
            title="You're on the list."
            body="A confirmation will land in your inbox within one working day."
          />
        ) : (
          <ParticipationFields {...form} />
        )}
      </FormPageShell>
    </div>
  );
}
