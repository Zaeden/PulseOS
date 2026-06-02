import { Router } from "express";
import * as subscriptionPlanController from "./subscription-plan.controller.js";

const subscriptionPlanRouter = Router();

subscriptionPlanRouter.get(
  "/",
  subscriptionPlanController.getSubscriptionPlans,
);

export default subscriptionPlanRouter;
