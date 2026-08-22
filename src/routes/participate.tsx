import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { SuccessBlock } from "@/components/Modal";
import { ClosedNotice } from "@/components/ClosedNotice";
import { ParticipationFields } from "@/components/FormFields";
import { useParticipationForm } from "@/hooks/useParticipationForm";
import { REGISTRATIONS_CLOSED } from "@/lib/registration";
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
        {REGISTRATIONS_CLOSED ? (
          <ClosedNotice />
        ) : form.done ? (
          <SuccessBlock
            title="See you on the stage!"
            body="Your spot is locked in and confirmation is on its way to your inbox. Need anything before August 24? Reach us at +91 82206 06367."
          />
        ) : (
          <ParticipationFields {...form} />
        )}
      </FormPageShell>
    </div>
  );
}
