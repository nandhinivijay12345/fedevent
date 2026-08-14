// Server-side Resend client for sending transactional emails.
// SECURITY: Only import this from server handlers, never from route files
// or *.functions.ts modules at the top level — those ship to the client bundle.
// Load inside server handlers: const { resend } = await import("@/integrations/resend/client.server");
import { Resend } from "resend";

function createResendClient() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    throw new Error(
      "Missing RESEND_API_KEY environment variable. Set it in .env.local for local dev, " +
        "and as a secret in your hosting provider for production.",
    );
  }

  return new Resend(RESEND_API_KEY);
}

let _resend: Resend | undefined;

export const resend = new Proxy({} as Resend, {
  get(_, prop, receiver) {
    if (!_resend) _resend = createResendClient();
    return Reflect.get(_resend, prop, receiver);
  },
});
