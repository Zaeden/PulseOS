/*
  Warnings:

  - The values [TAX_CERTIFICATE] on the enum `ClinicDocumentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClinicDocumentType_new" AS ENUM ('REGISTRATION_CERTIFICATE', 'GST_CERTIFICATE', 'PAN_CARD', 'ADDRESS_PROOF', 'OWNER_ID_PROOF', 'MEDICAL_LICENSE', 'NABH_ACCREDITATION', 'WASTE_DISPOSAL_CERTIFICATE', 'SALES_TAX_RECEIPT', 'OTHER');
ALTER TABLE "clinic_documents" ALTER COLUMN "type" TYPE "ClinicDocumentType_new" USING ("type"::text::"ClinicDocumentType_new");
ALTER TYPE "ClinicDocumentType" RENAME TO "ClinicDocumentType_old";
ALTER TYPE "ClinicDocumentType_new" RENAME TO "ClinicDocumentType";
DROP TYPE "public"."ClinicDocumentType_old";
COMMIT;
