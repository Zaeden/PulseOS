export const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
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
                <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #1e293b; line-height: 30px;">Verify your identity</h1>
                <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #64748b;">Hello,</p>
                <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 24px; color: #64748b;">Use the following security verification code to complete your request. This passcode is valid for <strong>5 minutes</strong>.</p>
                
                <!-- Code Box Display -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <tr>
                    <td align="center" style="padding: 24px 10px; letter-spacing: 6px; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; color: #2563eb;">
                      ${otp}
                    </td>
                  </tr>
                </table>
                
                <!-- Security Notice -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1e293b;">Didn't request this?</p>
                      <p style="margin: 0; font-size: 13px; line-height: 20px; color: #94a3b8;">If you did not make this action, you can safely ignore this automated message. Someone may have typed your destination address by mistake.</p>
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
