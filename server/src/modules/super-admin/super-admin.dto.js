import z from "zod";

export const createClinicInvitationSchema = z.object({
  email: z.string().email(),
  subscriptionPlanId: z.uuid(),
  customTrialDays: z.number().int().positive().optional(),
  doctorLimit: z.number().int().positive().optional(),
  customMonthlyPrice: z.number().positive().optional(),
});
