import z from "zod";

export const uploadClinicDocumentSchema = z.object({
  type: z.enum([
    "REGISTRATION_CERTIFICATE",
    "GST_CERTIFICATE",
    "PAN_CARD",
    "ADDRESS_PROOF",
    "OWNER_ID_PROOF",
    "MEDICAL_LICENSE",
    "NABH_ACCREDITATION",
    "WASTE_DISPOSAL_CERTIFICATE",
    "SALES_TAX_RECEIPT",
    "OTHER",
  ]),

  customLabel: z.string().optional(),
});
