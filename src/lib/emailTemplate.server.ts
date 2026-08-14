function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderConfirmationEmail({
  heading,
  body,
}: {
  heading: string;
  body: string;
}): string {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F4EDDC;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EDDC;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1B2A5E;padding:28px 32px;">
                <span style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">FED 2026</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;color:#1B2A5E;font-size:24px;font-weight:600;">${escapeHtml(heading)}</h1>
                <p style="margin:0;color:#1B2A5E;opacity:0.75;font-size:15px;line-height:1.7;">${escapeHtml(body)}</p>
                <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(27,42,94,0.1);">
                  <p style="margin:0;color:#1B2A5E;opacity:0.6;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;">
                    IITM Research Park · Chennai · 24 August 2026
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}
