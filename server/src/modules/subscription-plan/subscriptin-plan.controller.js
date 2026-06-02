import STATUS_CODES from "../../constants/statusCode.js";
import ApiResponse from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";
import * as subscriptionPlanService from "./subscription-plan.service.js";

export const getSubscriptionPlans = asyncHandler(async (req, res) => {
  const subscriptionPlans =
    await subscriptionPlanService.getSubscriptionPlans();

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        true,
        "Subscription plans retrieved successfully",
        subscriptionPlans,
      ),
    );
});
