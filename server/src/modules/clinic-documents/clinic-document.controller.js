import STATUS_CODES from "../../constants/statusCode.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as ClinicDocumentService from "./clinic-document.service.js";
import ApiResponse from "../../utils/apiResponse.js";

export const uploadClinicDocument = asyncHandler(async (req, res) => {
  const { clinicId } = req.params;
  const file = req.file;
  const payload = req.validatedBody;

  const clinicDocument = await ClinicDocumentService.uploadClinicDocument({
    clinicId,
    file,
    payload,
  });

  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(true, "Document uploaded successfully", clinicDocument),
    );
});
