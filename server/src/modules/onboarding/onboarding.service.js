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

export const createClinic = async (token, payload) => {
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

  if (invitation.clinicId) {
    throw new BadRequestError("Clinic already created for this invitation");
  }

  // generate a slug
  const slug = payload.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // ensure slug is unique
  const existingClinic = await prisma.clinic.findUnique({
    where: {
      slug,
    },
  });

  if (existingClinic) {
    throw new BadRequestError("A clinic with the same name already exists");
  }

  const clinic = await prisma.$transaction(async (tx) => {
    const clinic = await tx.clinic.create({
      data: {
        name: payload.name,
        slug,
        email: invitation.email,
        legalName: payload.legalName,
        phone: payload.phone,
        website: payload.website,
        registrationNumber: payload.registrationNumber,
        taxIdentifier: payload.taxIdentifier,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        postalCode: payload.postalCode,
        status: "PENDING",
        onboardingStatus: "IN_PROGRESS",
      },
    });

    await tx.clinicInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        clinicId: clinic.id,
      },
    });

    return clinic;
  });

  return {
    clinicId: clinic.id,
    onboardingStatus: "IN_PROGRESS",
  };
};
