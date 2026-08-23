import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { SuccessBlock } from "@/components/Modal";
import { ClosedNotice } from "@/components/ClosedNotice";
import { ParticipationFields } from "@/components/FormFields";
import { useParticipationForm } from "@/hooks/useParticipationForm";
import { ATTENDEE_REGISTRATIONS_CLOSED } from "@/lib/registration";
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
        deadline={
          ATTENDEE_REGISTRATIONS_CLOSED
            ? "Registration and confirmation are now closed"
            : "Registration closes today, August 23 at 2:00 PM"
        }
      >
        {ATTENDEE_REGISTRATIONS_CLOSED ? (
          <ClosedNotice />
        ) : form.done ? (
          <SuccessBlock
            title="See you on the stage!"
            body="Your spot is locked in and confirmation is on its way to your inbox. Need anything before August 24? Reach us at +91 82206 06367."
          />
        ) : (
          <>
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[#D62828]/25 bg-[#D62828]/5 px-5 py-4">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#D62828]" />
              <p className="text-[13px] font-semibold leading-snug text-[#1B2A5E]">
                Registration closes today at 2:00 PM — get your pass now.
              </p>
            </div>
            <ParticipationFields {...form} />
          </>
        )}
      </FormPageShell>
    </div>
  );
}
