-- AlterEnum
ALTER TYPE "ClinicOnboardingStatus" ADD VALUE 'UNDER_REVIEW';

-- AlterTable
ALTER TABLE "clinic_documents" ADD COLUMN     "correction_comment" TEXT,
ADD COLUMN     "resubmitted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "clinic_invitations" ADD COLUMN     "custom_monthly_price" DECIMAL(10,2),
ADD COLUMN     "custom_trial_days" INTEGER,
ADD COLUMN     "doctor_limit" INTEGER;

-- AlterTable
ALTER TABLE "clinics" ADD COLUMN     "onboarding_submitted_at" TIMESTAMP(3),
ADD COLUMN     "reviewed_at" TIMESTAMP(3),
ADD COLUMN     "reviewed_by" UUID;

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
