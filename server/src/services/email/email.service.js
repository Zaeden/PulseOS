import { config } from "../../configs/env.js";
import transporter from "../../configs/mail.js";

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: config.GOOGLE_APP_EMAIL,
    to,
    subject,
    html,
  });
};
