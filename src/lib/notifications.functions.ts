import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const sendConfirmationEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  heading: z.string().min(1),
  body: z.string().min(1),
});

export const sendConfirmationEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendConfirmationEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      console.error(
        "[Resend] Missing RESEND_FROM_EMAIL environment variable — skipping confirmation email.",
      );
      return { sent: false };
    }

    try {
      const { resend } = await import("@/integrations/resend/client.server");
      const { renderConfirmationEmail } = await import("@/lib/emailTemplate.server");

      const { error } = await resend.emails.send({
        from: `FED 2026 <${fromEmail}>`,
        to: data.to,
        subject: data.subject,
        html: renderConfirmationEmail({ heading: data.heading, body: data.body }),
      });
      if (error) throw error;
      return { sent: true };
    } catch (err) {
      console.error("[Resend] Failed to send confirmation email:", err);
      return { sent: false };
    }
  });
