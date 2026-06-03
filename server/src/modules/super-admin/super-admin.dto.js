import z from "zod";

export const createClinicInvitationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    hasTrial: z.boolean(),
    customTrialDays: z.number().int().positive().optional(),
    doctorLimit: z.number().int().positive().optional(),
  })
  .superRefine((data, ctx) => {
    // If trial is enabled
    if (data.hasTrial) {
      if (data.customTrialDays == null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customTrialDays"],
          message: "Trial days are required when trial is enabled",
        });
      }

      if (data.doctorLimit == null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["doctorLimit"],
          message: "Doctor limit is required when trial is enabled",
        });
      }
    }

    // If trial is disabled
    if (!data.hasTrial) {
      if (data.customTrialDays != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customTrialDays"],
          message: "Trial days should not be provided when trial is disabled",
        });
      }

      if (data.doctorLimit != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["doctorLimit"],
          message: "Doctor limit should not be provided when trial is disabled",
        });
      }
    }
  });
