export const clinicInvitationTemplate = (onboardingUrl) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clinic Invitation</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc; color: #333333;-webkit-font-smoothing: antialiased;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 40px 0 20px 0; background-color: #0f172a;">
          <!-- Header/Brand Logo area -->
          <span style="font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff;">PULSEOS</span>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0 10px;">
          <!-- Main Card Container -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; margin-top: -20px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
            <tr>
              <td style="padding: 40px 30px;">
                <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #1e293b; line-height: 30px;">You're invited to join PulseOS</h1>
                <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #64748b;">Hello,</p>
                <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 24px; color: #64748b;">You've been invited to join PulseOS. Click the button below to get started with setting up your clinic account and exploring our features.</p>               
                <!-- Call-to-Action Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
                    <tr>
                        <td align="center">
                            <a href="${onboardingUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 600; text-decoration: none; display: inline-block;">Get Started</a>
                        </td>
                    </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
        <tr>
            <td align="center" style="padding: 30px 0 40px 0;">

                <!-- Footer Branding -->
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} PulseOS Inc. All rights reserved.</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">123 Innovation Way, Tech District</p>
            </td>
        </tr>
    </table>
  </body>
  </html>
  `;
};
