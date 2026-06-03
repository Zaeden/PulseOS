import { Router } from "express";
import * as OnboardingController from "./onboarding.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { clinicDetailsSchema } from "./onboarding.dto.js";

const onboardingRouter = Router();

onboardingRouter.get("/:token", OnboardingController.getInvitationByToken);

onboardingRouter.post(
  "/:token",
  validate(clinicDetailsSchema),
  OnboardingController.createClinic,
);

export default onboardingRouter;
