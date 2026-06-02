import { prisma } from "../../configs/db.js";
import { BadRequestError, NotFoundError } from "../../utils/apiError.js";

export const getInvitationByToken = async (token) => {
  const invitation = await prisma.clinicInvitation.findUnique({
    where: {
      token,
    },
    include: {
      subscriptionPlan: true,
    },
  });

  if (!invitation) {
    throw new NotFoundError("Invitation not found");
  }

  if (invitation.expiresAt < new Date()) {
    throw new BadRequestError("Invitation has expired");
  }

  if (invitation.status !== "PENDING") {
    throw new BadRequestError("Invitation is no longer valid");
  }

  return {
    email: invitation.email,
    subscriptionPlan: {
      id: invitation.subscriptionPlan.id,
      name: invitation.subscriptionPlan.name,
    },
    customTrialDays:
      invitation.customTrialDays ?? invitation.subscriptionPlan.trialDays,
    doctorLimit:
      invitation.doctorLimit ?? invitation.subscriptionPlan.doctorLimit,
    customMonthlyPrice:
      invitation.customMonthlyPrice ?? invitation.subscriptionPlan.monthlyPrice,
  };
};
