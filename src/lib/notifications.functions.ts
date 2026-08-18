import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const sendSchoolAwardEmailSchema = z.object({
  to: z.string().email(),
  recipientName: z.string().min(1),
  schoolName: z.string().min(1),
  studentPasses: z.number().int().min(0),
  teacherPasses: z.number().int().min(0),
});

export const sendSchoolAwardEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendSchoolAwardEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      console.error(
        "[Resend] Missing RESEND_FROM_EMAIL environment variable — skipping school award email.",
      );
      return { sent: false };
    }

    try {
      const { resend } = await import("@/integrations/resend/client.server");
      const { renderSchoolAwardEmail } = await import("@/lib/emailTemplate.server");

      const { error } = await resend.emails.send({
        from: `Future of Education <${fromEmail}>`,
        to: data.to,
        subject: "You're a Top 100 School — Future of Education 2026",
        html: renderSchoolAwardEmail({
          recipientName: data.recipientName,
          schoolName: data.schoolName,
          studentPasses: data.studentPasses,
          teacherPasses: data.teacherPasses,
        }),
      });
      if (error) throw error;
      return { sent: true };
    } catch (err) {
      console.error("[Resend] Failed to send school award email:", err);
      return { sent: false };
    }
  });

const sendCollegeAwardEmailSchema = z.object({
  to: z.string().email(),
  recipientName: z.string().min(1),
  recipientDesignation: z.string().min(1),
  institutionName: z.string().min(1),
  studentPasses: z.number().int().min(0),
  facultyPasses: z.number().int().min(0),
});

export const sendCollegeAwardEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendCollegeAwardEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      console.error(
        "[Resend] Missing RESEND_FROM_EMAIL environment variable — skipping college award email.",
      );
      return { sent: false };
    }

    try {
      const { resend } = await import("@/integrations/resend/client.server");
      const { renderCollegeAwardEmail } = await import("@/lib/emailTemplate.server");

      const { error } = await resend.emails.send({
        from: `Future of Education <${fromEmail}>`,
        to: data.to,
        subject: "You're a Future of Education Award Recipient — Edition 4",
        html: renderCollegeAwardEmail({
          recipientName: data.recipientName,
          recipientDesignation: data.recipientDesignation,
          institutionName: data.institutionName,
          studentPasses: data.studentPasses,
          facultyPasses: data.facultyPasses,
        }),
      });
      if (error) throw error;
      return { sent: true };
    } catch (err) {
      console.error("[Resend] Failed to send college award email:", err);
      return { sent: false };
    }
  });

const sendOrganizationAwardEmailSchema = z.object({
  to: z.string().email(),
  fillerName: z.string().min(1),
  recipientName: z.string().min(1),
  recipientDesignation: z.string().min(1),
  organizationName: z.string().min(1),
  teamPasses: z.number().int().min(0),
});

export const sendOrganizationAwardEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendOrganizationAwardEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      console.error(
        "[Resend] Missing RESEND_FROM_EMAIL environment variable — skipping organization award email.",
      );
      return { sent: false };
    }

    try {
      const { resend } = await import("@/integrations/resend/client.server");
      const { renderOrganizationAwardEmail } = await import("@/lib/emailTemplate.server");

      const { error } = await resend.emails.send({
        from: `Future of Education <${fromEmail}>`,
        to: data.to,
        subject: "You're a Future of Education Award Recipient — Edition 4",
        html: renderOrganizationAwardEmail({
          fillerName: data.fillerName,
          recipientName: data.recipientName,
          recipientDesignation: data.recipientDesignation,
          organizationName: data.organizationName,
          teamPasses: data.teamPasses,
        }),
      });
      if (error) throw error;
      return { sent: true };
    } catch (err) {
      console.error("[Resend] Failed to send organization award email:", err);
      return { sent: false };
    }
  });

const sendIndividualAwardEmailSchema = z.object({
  to: z.string().email(),
  recipientName: z.string().min(1),
  organisation: z.string().min(1),
  guestPasses: z.number().int().min(0),
});

export const sendIndividualAwardEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendIndividualAwardEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      console.error(
        "[Resend] Missing RESEND_FROM_EMAIL environment variable — skipping individual award email.",
      );
      return { sent: false };
    }

    try {
      const { resend } = await import("@/integrations/resend/client.server");
      const { renderIndividualAwardEmail } = await import("@/lib/emailTemplate.server");

      const { error } = await resend.emails.send({
        from: `Future of Education <${fromEmail}>`,
        to: data.to,
        subject: "You're an Educator of the Year — Future of Education 2026",
        html: renderIndividualAwardEmail({
          recipientName: data.recipientName,
          organisation: data.organisation,
          guestPasses: data.guestPasses,
        }),
      });
      if (error) throw error;
      return { sent: true };
    } catch (err) {
      console.error("[Resend] Failed to send individual award email:", err);
      return { sent: false };
    }
  });

const sendAttendeeEmailSchema = z.object({
  to: z.string().email(),
  name: z.string().min(1),
  guestCount: z.number().int().min(0),
});

export const sendAttendeeEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendAttendeeEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail) {
      console.error(
        "[Resend] Missing RESEND_FROM_EMAIL environment variable — skipping attendee email.",
      );
      return { sent: false };
    }

    try {
      const { resend } = await import("@/integrations/resend/client.server");
      const { renderAttendeeEmail } = await import("@/lib/emailTemplate.server");

      const { error } = await resend.emails.send({
        from: `Future of Education <${fromEmail}>`,
        to: data.to,
        subject: "You're registered for Future of Education 2026",
        html: renderAttendeeEmail({ name: data.name, guestCount: data.guestCount }),
      });
      if (error) throw error;
      return { sent: true };
    } catch (err) {
      console.error("[Resend] Failed to send attendee email:", err);
      return { sent: false };
    }
  });
