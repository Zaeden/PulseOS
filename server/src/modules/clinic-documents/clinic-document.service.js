import { prisma } from "../../configs/db.js";
import {
  deleteFile,
  uploadFile,
} from "../../services/cloudinary/cloudinary.service.js";
import { BadRequestError, NotFoundError } from "../../utils/apiError.js";

export const uploadClinicDocument = async ({ clinicId, file, payload }) => {
  const clinic = await prisma.clinic.findUnique({
    where: {
      id: clinicId,
    },
  });

  if (!clinic) {
    throw new NotFoundError("Clinic does not exists");
  }

  if (clinic.onboardingStatus !== "IN_PROGRESS") {
    throw new BadRequestError("Clinic onboarding is not editable");
  }

  if (!file) {
    throw new BadRequestError("Document file is required");
  }

  // check if clinic document exists or not in the table
  const isDocumentExisting = await prisma.clinicDocument.findFirst({
    where: {
      clinicId,
      type: payload.type,
    },
  });

  // Upload new file
  const uploadedFile = await uploadFile({
    fileBuffer: file.buffer,
    folder: `pulseos/clinics/${clinicId}`,
    fileName: payload.type.toLowerCase(),
    resourceType: "auto",
  });

  let clinicDocument;

  if (isDocumentExisting) {
    clinicDocument = await prisma.clinicDocument.update({
      where: {
        id: existingDocument.id,
      },
      data: {
        customLabel: payload.customLabel,
        fileName: file.originalname,
        fileUrl: uploadedFile.fileUrl,
        cloudinaryPublicId: uploadedFile.storageKey,
        mimeType: file.mimetype,
        sizeInBytes: file.size,
        status: "PENDING",
      },
    });

    if (existingDocument.cloudinaryPublicId) {
      await deleteFile(existingDocument.cloudinaryPublicId);
    }
  } else {
    // Create a new clinic document in table
    clinicDocument = await prisma.clinicDocument.create({
      data: {
        clinicId,
        type: payload.type,
        customLabel: payload.customLabel,
        fileName: file.originalname,
        fileUrl: uploadedFile.fileUrl,
        cloudinaryPublicId: uploadedFile.storageKey,
        mimeType: file.mimetype,
        sizeInBytes: file.size,
        status: "PENDING",
      },
    });
  }

  return {
    documentId: clinicDocument.id,
    type: clinicDocument.type,
    fileUrl: clinicDocument.fileUrl,
    status: clinicDocument.status,
  };
};
