import { prisma } from "../../configs/db.js";
import crypto from "crypto";
import { BadRequestError, NotFoundError } from "../../utils/apiError.js";
import { sendEmail } from "../../services/email/email.service.js";
import { config } from "../../configs/env.js";
import { clinicInvitationTemplate } from "../../services/email/templates/clinic-invitation.template.js";

export const createClinicInvitation = async (payload, inviterId) => {
  const { email, hasTrial, customTrialDays, doctorLimit } = payload;

  // Check if an invitation with the same email already exists and is still pending.
  const existingInvitation = await prisma.clinicInvitation.findFirst({
    where: {
      email,
      status: "PENDING",
    },
  });

  if (existingInvitation) {
    throw new BadRequestError(
      "A pending invitation already exists for this email",
    );
  }

  // Check if a clinic with the same email already exists.
  const existingClinic = await prisma.clinic.findUnique({
    where: {
      email,
    },
  });

  if (existingClinic) {
    throw new BadRequestError("Clinic already exists");
  }

  const token = crypto.randomUUID();

  // Create a new invitation for clinic.
  const invitation = await prisma.clinicInvitation.create({
    data: {
      email,
      token,
      customTrialDays: hasTrial ? customTrialDays : null,
      doctorLimit: hasTrial ? doctorLimit : null,
      invitedBy: inviterId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // Send an email to the clinic with the onboarding link containing the token.

  const onboardingUrl = `${config.CLIENT_URL}/onboarding/${token}`;

  await sendEmail({
    to: email,
    subject: "You're invited to join PulseOS",
    html: clinicInvitationTemplate(onboardingUrl),
  });

  return {
    id: invitation.id,
    email: invitation.email,
    status: invitation.status,
  };
};
