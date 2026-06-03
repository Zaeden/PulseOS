import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.email(),
});

export const verifyOtpSchema = z.object({
  email: z.email(),
  otp: z.string().length(6),
});
