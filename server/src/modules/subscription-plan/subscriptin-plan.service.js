import { prisma } from "../../configs/db.js";

export const getSubscriptionPlans = async () => {
  const plans = await prisma.subscriptionPlan.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      monthlyPrice: true,
      doctorLimit: true,
      trialDays: true,
    },
  });

  return plans;
};
