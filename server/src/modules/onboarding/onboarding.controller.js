import STATUS_CODES from "../../constants/statusCode.js";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as OnboardingService from "./onboarding.service.js";

export const getInvitationByToken = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const result = await OnboardingService.getInvitationByToken(token);

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(true, "Invitation retrieved successfully", result));
});
