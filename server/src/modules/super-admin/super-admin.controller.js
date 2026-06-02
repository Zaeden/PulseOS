import * as SuperAdminService from "./super-admin.service.js";
import STATUS_CODES from "../../constants/statusCode.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

export const createClinicInvitation = asyncHandler(async (req, res) => {
  const payload = req.validatedBody;

  const invitation = await SuperAdminService.createClinicInvitation(
    payload,
    req.user.sub,
  );

  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        true,
        "Clinic invitation created successfully",
        invitation,
      ),
    );
});
