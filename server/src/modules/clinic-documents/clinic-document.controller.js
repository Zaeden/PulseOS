import { asyncHandler } from "../../utils/asyncHandler.js";

export const uploadClinicDocument = asyncHandler(async (req, res) => {
  const { clinicId } = req.params;
  const file = req.file;
});
