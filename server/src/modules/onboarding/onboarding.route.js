import { Router } from "express";
import * as OnboardingController from "./onboarding.controller.js";

const onboardingRouter = Router();

onboardingRouter.get("/:token", OnboardingController.getInvitationByToken);

export default onboardingRouter;
