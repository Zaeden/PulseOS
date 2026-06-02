import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.email(),
  role: z.enum(["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "STAFF", "PATIENT"]),
});

export const verifyOtpSchema = z.object({
  email: z.email(),
  role: z.enum(["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "STAFF", "PATIENT"]),
  otp: z.string().length(6),
});
