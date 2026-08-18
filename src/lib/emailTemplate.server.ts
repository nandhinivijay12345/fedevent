export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderCollegeAwardEmail({
  recipientName,
  recipientDesignation,
  institutionName,
  studentPasses,
  facultyPasses,
}: {
  recipientName: string;
  recipientDesignation: string;
  institutionName: string;
  studentPasses: number;
  facultyPasses: number;
}): string {
  const name = escapeHtml(recipientName);
  const designation = escapeHtml(recipientDesignation);
  const institution = escapeHtml(institutionName);
  const p = (html: string) =>
    `<p style="margin:0 0 16px;color:#1B2A5E;opacity:0.8;font-size:15px;line-height:1.7;">${html}</p>`;

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F4EDDC;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EDDC;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1B2A5E;padding:28px 32px;">
                <span style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Future of Education &mdash; Edition 4</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 20px;color:#1B2A5E;font-size:15px;line-height:1.7;">Dear ${name},</p>

                <h1 style="margin:0 0 20px;color:#1B2A5E;font-size:22px;line-height:1.4;font-weight:600;">Congratulations on being recognised among the institutions shaping the future of education!</h1>

                ${p(`We are proud to celebrate <strong>${institution}</strong> as an award recipient at the Future of Education Conference &ndash; Edition 4.`)}

                ${p(`This recognition is a celebration of institutions that are not simply responding to the changing world, but are <strong>reimagining what education can be</strong> &mdash; through bold leadership, meaningful innovation, and an unwavering commitment to their learners.`)}

                ${p(`Your institution's work has earned its place among a distinguished community being recognised for their contribution to the future of education.`)}

                <h2 style="margin:28px 0 16px;color:#1B2A5E;font-size:17px;font-weight:600;">We look forward to celebrating you at Future of Education 2026</h2>

                ${p(`Your registration is confirmed for the conference, with:`)}

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;background-color:#F4EDDC;border-radius:10px;">
                  <tr>
                    <td style="padding:16px 20px;color:#1B2A5E;font-size:14px;line-height:1.9;">
                      <strong>Student Passes:</strong> ${studentPasses}<br/>
                      <strong>Faculty Passes:</strong> ${facultyPasses}
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;">
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128197; <strong>Date:</strong> August 24, 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128336; <strong>Time:</strong> 10:00 AM &ndash; 6:00 PM</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128205; <strong>Venue:</strong> D7 Auditorium, IIT Madras Research Park, Chennai</td>
                  </tr>
                </table>

                ${p(`The <strong>Award Recipient</strong>, ${name}, ${designation}, will receive a <strong>VIP Badge</strong> and have access to <strong>designated VIP seating</strong> during the conference and award ceremony.`)}

                ${p(`Your faculty will receive their badges on arrival, and our team will look after them through the day.`)}

                ${p(`The award will be presented during the conference, bringing together over 1,000 educators, institutional leaders, policymakers, entrepreneurs and education innovators from across the ecosystem, with 10+ speakers travelling in from across the world. The conference is presented by American World School and co-convened with the Western Association of Schools and Colleges (WASC) and the American International Accreditation Association of Schools and Colleges (AIAASC).`)}

                ${p(`It will be a day of <strong>ideas, conversations, recognition, and celebration</strong> &mdash; and we are delighted that your institution will be part of it.`)}

                ${p(`We look forward to welcoming you and your team and celebrating this achievement with you.`)}

                ${p(`Congratulations once again. We look forward to seeing your institution take its place on the Future of Education stage.`)}

                ${p(`For anything you need before the day, we are reachable on +91 82206 06367.`)}

                <p style="margin:0;color:#1B2A5E;font-size:15px;line-height:1.6;">
                  Warm regards,<br/>
                  <strong>Nandhini Vijay</strong><br/>
                  Director of Communications<br/>
                  Future of Education &ndash; Edition 4<br/>
                  American World School
                </p>

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

export function renderOrganizationAwardEmail({
  fillerName,
  recipientName,
  recipientDesignation,
  organizationName,
  teamPasses,
}: {
  fillerName: string;
  recipientName: string;
  recipientDesignation: string;
  organizationName: string;
  teamPasses: number;
}): string {
  const filler = escapeHtml(fillerName);
  const recipient = escapeHtml(recipientName);
  const designation = escapeHtml(recipientDesignation);
  const organization = escapeHtml(organizationName);
  const p = (html: string) =>
    `<p style="margin:0 0 16px;color:#1B2A5E;opacity:0.8;font-size:15px;line-height:1.7;">${html}</p>`;

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F4EDDC;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EDDC;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1B2A5E;padding:28px 32px;">
                <span style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Future of Education &mdash; Edition 4</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 20px;color:#1B2A5E;font-size:15px;line-height:1.7;">Dear ${filler},</p>

                <h1 style="margin:0 0 20px;color:#1B2A5E;font-size:22px;line-height:1.4;font-weight:600;">Congratulations on being recognised among the organisations shaping the future of education!</h1>

                ${p(`We are proud to celebrate <strong>${organization}</strong> as an award recipient at the Future of Education Conference &ndash; Edition 4.`)}

                ${p(`This recognition is a celebration of organisations that are not simply serving the education sector, but are <strong>reimagining what education can be</strong> &mdash; through bold thinking, meaningful innovation, and a genuine commitment to the learners at the end of it all.`)}

                ${p(`Your organisation's work has earned its place among a distinguished community being recognised for their contribution to the future of education.`)}

                <h2 style="margin:28px 0 16px;color:#1B2A5E;font-size:17px;font-weight:600;">We look forward to celebrating you at Future of Education 2026</h2>

                ${p(`Your registration is confirmed for the conference, with:`)}

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;background-color:#F4EDDC;border-radius:10px;">
                  <tr>
                    <td style="padding:16px 20px;color:#1B2A5E;font-size:14px;line-height:1.9;">
                      <strong>Team Passes:</strong> ${teamPasses}
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;">
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128197; <strong>Date:</strong> August 24, 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128336; <strong>Time:</strong> 10:00 AM &ndash; 6:00 PM</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128205; <strong>Venue:</strong> D7 Auditorium, IIT Madras Research Park, Chennai</td>
                  </tr>
                </table>

                ${p(`The <strong>Award Recipient</strong>, ${recipient}, ${designation}, will receive a <strong>VIP Badge</strong> and have access to <strong>designated VIP seating</strong> during the conference and award ceremony.`)}

                ${p(`The award will be presented during the conference, bringing together over 1,000 educators, institutional leaders, policymakers, entrepreneurs and education innovators from across the ecosystem, with 10+ speakers travelling in from across the world. The conference is presented by American World School and co-convened with the Western Association of Schools and Colleges (WASC) and the American International Accreditation Association of Schools and Colleges (AIAASC).`)}

                ${p(`It will be a day of <strong>ideas, conversations, recognition, and celebration</strong> &mdash; and we are delighted that your organisation will be part of it.`)}

                ${p(`We look forward to welcoming you and your team and celebrating this achievement with you.`)}

                ${p(`Congratulations once again. We look forward to seeing <strong>${organization}</strong> take its place on the Future of Education stage.`)}

                ${p(`For anything you need before the day, we are reachable on +91 82206 06367.`)}

                <p style="margin:0;color:#1B2A5E;font-size:15px;line-height:1.6;">
                  Warm regards,<br/>
                  <strong>Nandhini Vijay</strong><br/>
                  Director of Communications<br/>
                  Future of Education &ndash; Edition 4<br/>
                  American World School
                </p>

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

export function renderIndividualAwardEmail({
  recipientName,
  organisation,
  guestPasses,
}: {
  recipientName: string;
  organisation: string;
  guestPasses: number;
}): string {
  const name = escapeHtml(recipientName);
  const org = escapeHtml(organisation);
  const p = (html: string) =>
    `<p style="margin:0 0 16px;color:#1B2A5E;opacity:0.8;font-size:15px;line-height:1.7;">${html}</p>`;

  const guestParagraph =
    guestPasses === 0
      ? ""
      : guestPasses === 1
        ? p(
            `Your <strong>Guest Pass</strong> is confirmed, so that someone who has been part of your journey can be in the room to see you recognised.`,
          )
        : p(
            `Your <strong>${guestPasses} Guest Passes</strong> are confirmed, so that the people who have been part of your journey can be in the room to see you recognised.`,
          );

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F4EDDC;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EDDC;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1B2A5E;padding:28px 32px;">
                <span style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Future of Education &mdash; Edition 4</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 20px;color:#1B2A5E;font-size:15px;line-height:1.7;">Dear ${name},</p>

                <h1 style="margin:0 0 20px;color:#1B2A5E;font-size:22px;line-height:1.4;font-weight:600;">Congratulations on being recognised as an Educator of the Year at the Future of Education Conference &mdash; Edition 4.</h1>

                ${p(`We are proud to celebrate you as a recipient of this award, presented to the individuals whose work is quietly and consistently changing what education can be.`)}

                ${p(`This recognition is not given for titles held or years served. It is given for the difference made &mdash; for the leadership, the conviction, and the care that shape learners long after they leave the room. Your work at <strong>${org}</strong> has earned its place among a distinguished community of educators being honoured this year.`)}

                <h2 style="margin:28px 0 16px;color:#1B2A5E;font-size:17px;font-weight:600;">We look forward to celebrating you at Future of Education 2026</h2>

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;">
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128197; <strong>Date:</strong> August 24, 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128336; <strong>Time:</strong> 10:00 AM &ndash; 6:00 PM</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128205; <strong>Venue:</strong> D7 Auditorium, IIT Madras Research Park, Chennai</td>
                  </tr>
                </table>

                ${p(`As an <strong>Award Recipient</strong>, you will receive a <strong>VIP Badge</strong> with access to designated VIP seating through the conference and the award ceremony.`)}

                ${guestParagraph}

                ${p(`The award will be presented during the conference, before a gathering of over 1,000 educators, school leaders, policymakers and founders, with 10+ speakers from across the world and the leadership of 100+ schools being honoured among India's Top 100. Presented by American World School and co-convened with the Western Association of Schools and Colleges (WASC) and the American International Accreditation Association of Schools and Colleges (AIAASC).`)}

                ${p(`It will be a day of <strong>ideas, conversations, recognition, and celebration</strong> &mdash; and we are delighted that you will be part of it.`)}

                ${p(`Congratulations once again. We look forward to seeing you take your place on the Future of Education stage.`)}

                ${p(`For anything you need before the day, we are reachable on +91 82206 06367.`)}

                <p style="margin:0;color:#1B2A5E;font-size:15px;line-height:1.6;">
                  Warm regards,<br/>
                  <strong>Nandhini Vijay</strong><br/>
                  Director of Communications<br/>
                  Future of Education &ndash; Edition 4<br/>
                  American World School
                </p>

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

export function renderAttendeeEmail({
  name,
  guestCount,
}: {
  name: string;
  guestCount: number;
}): string {
  const safeName = escapeHtml(name);
  const p = (html: string) =>
    `<p style="margin:0 0 16px;color:#1B2A5E;opacity:0.8;font-size:15px;line-height:1.7;">${html}</p>`;

  const totalSeats = guestCount + 1;
  const seatsLine =
    guestCount === 0
      ? `<strong>Seats confirmed: 1</strong> &mdash; just for you.`
      : guestCount === 1
        ? `<strong>Seats confirmed: 2</strong> &mdash; one for you and one for your guest.`
        : `<strong>Seats confirmed: ${totalSeats}</strong> &mdash; one for you and ${guestCount} for your guests.`;

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F4EDDC;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EDDC;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1B2A5E;padding:28px 32px;">
                <span style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Future of Education &mdash; Edition 4</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 20px;color:#1B2A5E;font-size:15px;line-height:1.7;">Dear ${safeName},</p>

                ${p(`Thank you for registering for the Future of Education Conference &mdash; Edition 4. Your seat is confirmed as an attendee.`)}

                ${p(`We are delighted that you will be joining us on August 24, and we are glad you chose to spend the day with us.`)}

                <h2 style="margin:28px 0 16px;color:#1B2A5E;font-size:17px;font-weight:600;">Your registration</h2>

                ${p(seatsLine)}

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;">
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128197; <strong>Date:</strong> August 24, 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128336; <strong>Time:</strong> 10:00 AM &ndash; 6:00 PM</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128205; <strong>Venue:</strong> D7 Auditorium, IIT Madras Research Park, Chennai</td>
                  </tr>
                </table>

                ${p(`Badges will be ready for collection on arrival. Do come a little ahead of time, so that registration is done with before the opening session.`)}

                ${p(`The day brings together over 1,000 educators, school leaders, policymakers and founders, with 10+ speakers travelling in from across the world and the leadership of 100+ schools recognised among India's Top 100. The conference is presented by American World School and co-convened with the Western Association of Schools and Colleges (WASC) and the American International Accreditation Association of Schools and Colleges (AIAASC).`)}

                ${p(`It will be a day of <strong>ideas, conversations, recognition and celebration</strong> &mdash; and we are delighted that you will be part of it.`)}

                ${p(`For anything you need before the day, we are reachable on +91 82206 06367.`)}

                ${p(`We look forward to welcoming you.`)}

                <p style="margin:0;color:#1B2A5E;font-size:15px;line-height:1.6;">
                  Warm regards,<br/>
                  <strong>Nandhini Vijay</strong><br/>
                  Director of Communications<br/>
                  Future of Education &ndash; Edition 4<br/>
                  American World School
                </p>

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

export function renderSchoolAwardEmail({
  recipientName,
  schoolName,
  studentPasses,
  teacherPasses,
}: {
  recipientName: string;
  schoolName: string;
  studentPasses: number;
  teacherPasses: number;
}): string {
  const name = escapeHtml(recipientName);
  const school = escapeHtml(schoolName);
  const p = (html: string) =>
    `<p style="margin:0 0 16px;color:#1B2A5E;opacity:0.8;font-size:15px;line-height:1.7;">${html}</p>`;

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F4EDDC;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4EDDC;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#1B2A5E;padding:28px 32px;">
                <span style="color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Future of Education &mdash; Edition 4</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 20px;color:#1B2A5E;font-size:15px;line-height:1.7;">Dear ${name},</p>

                <h1 style="margin:0 0 20px;color:#1B2A5E;font-size:22px;line-height:1.4;font-weight:600;">Congratulations on being recognised as one of the Top 100 Schools shaping the future of education!</h1>

                ${p(`We are proud to celebrate <strong>${school}</strong> as a recipient of the <strong>Top 100 Schools Award</strong> at the <strong>Future of Education Conference &ndash; Edition 4</strong>.`)}

                ${p(`This recognition is a celebration of schools that are not simply responding to the changing world, but are <strong>reimagining what education can be</strong> &mdash; through bold leadership, meaningful innovation, and an unwavering commitment to their learners.`)}

                ${p(`Your school's work has earned its place among a distinguished community of institutions being recognised for their contribution to the future of education.`)}

                <h2 style="margin:28px 0 16px;color:#1B2A5E;font-size:17px;font-weight:600;">We look forward to celebrating you at Future of Education 2026</h2>

                ${p(`Your registration is confirmed for the conference, with:`)}

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;background-color:#F4EDDC;border-radius:10px;">
                  <tr>
                    <td style="padding:16px 20px;color:#1B2A5E;font-size:14px;line-height:1.9;">
                      <strong>Student Passes:</strong> ${studentPasses}<br/>
                      <strong>Teacher Passes:</strong> ${teacherPasses}
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;">
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128197; <strong>Date:</strong> August 24, 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128341; <strong>Time:</strong> 10:00 AM onwards</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;color:#1B2A5E;font-size:14px;">&#128205; <strong>Venue:</strong> D7 Auditorium, IIT Madras Research Park, Chennai</td>
                  </tr>
                </table>

                ${p(`The <strong>Award Recipient</strong> will receive a <strong>VIP Badge</strong> and have access to <strong>designated VIP seating</strong> during the conference and award ceremony.`)}

                ${p(`Your students and teachers will receive their respective badges and be seated in the <strong>designated student and teacher seating areas</strong> according to the conference seating arrangement.`)}

                ${p(`The award will be presented during the conference, bringing together school leaders, educators, policymakers, entrepreneurs, and education innovators from across the ecosystem.`)}

                ${p(`It will be a day of <strong>ideas, conversations, recognition, and celebration</strong> &mdash; and we are delighted that your school will be part of it.`)}

                ${p(`We look forward to welcoming you and your team and celebrating this important achievement with you.`)}

                <p style="margin:0 0 24px;color:#1B2A5E;font-size:15px;line-height:1.7;font-style:italic;">Congratulations once again on being named among the Top 100 Schools. We look forward to seeing your school take its place on the Future of Education stage.</p>

                <p style="margin:0;color:#1B2A5E;font-size:15px;line-height:1.6;">
                  Warm regards,<br/>
                  <strong>Nandhini Vijay</strong><br/>
                  Director<br/>
                  Future of Education &ndash; Edition 4
                </p>

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
