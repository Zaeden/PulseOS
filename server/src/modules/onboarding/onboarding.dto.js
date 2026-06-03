import z from "zod";

export const clinicDetailsSchema = z.object({
  name: z.string().min(5, "Clinic name is required"),
  phone: z.string().regex(/^\d{10}$/),
  addressLine1: z.string().min(5, "Address line 1 is required"),
  city: z.string().min(3, "City is required"),
  state: z.string().min(3, "State is required"),
  country: z.string().min(3, "Country is required"),
  postalCode: z.string().min(6, "Postal code is required"),
  registrationNumber: z.string().min(3, "Registration number is required"),
  legalName: z.string().optional(),
  website: z.string().url("Invalid website URL").optional(),
  addressLine2: z.string().optional(),
  taxIdentifier: z.string().optional(),
});
