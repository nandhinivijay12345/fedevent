import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { SuccessBlock } from "@/components/Modal";
import { NominationFields } from "@/components/FormFields";
import { useNominateForm } from "@/hooks/useNominateForm";
import { FormPageShell } from "./confirm";

export const Route = createFileRoute("/nominate")({
  head: () => ({
    meta: [
      { title: "Nominate Your School — India's Top 100 · FED 2026" },
      { name: "description", content: "Nominate a school for India's Top 100, crowned live at FED 2026." },
    ],
  }),
  component: NominatePage,
});

function NominatePage() {
  const form = useNominateForm();

  return (
    <div className="bg-white text-navy">
      <Nav />
      <FormPageShell
        eyebrow="Top 100 Nomination"
        title="Nominate a school for India's Top 100"
        lede="India's most inspiring schools will be crowned on the FED main stage. Tell us who deserves the light — and why."
      >
        {form.done ? (
          <SuccessBlock
            title="Nomination received."
            body="Our team will verify the details against our records and be in touch."
          />
        ) : (
          <NominationFields {...form} />
        )}
      </FormPageShell>
    </div>
  );
}
