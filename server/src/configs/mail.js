import nodemailer from "nodemailer";
import { config } from "./env.js";

const transporter = await nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GOOGLE_APP_EMAIL,
    pass: config.GOOGLE_APP_PASSWORD,
  },
});

await transporter.verify();

console.log("SMTP Ready");

export default transporter;
