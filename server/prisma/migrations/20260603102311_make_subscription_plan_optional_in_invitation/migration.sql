-- DropForeignKey
ALTER TABLE "clinic_invitations" DROP CONSTRAINT "clinic_invitations_subscription_plan_id_fkey";

-- AlterTable
ALTER TABLE "clinic_invitations" ALTER COLUMN "subscription_plan_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clinic_invitations" ADD CONSTRAINT "clinic_invitations_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "subscription_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
