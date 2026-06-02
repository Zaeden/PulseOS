import { Router } from "express";
import authRouter from "../../modules/auth/auth.route.js";
import superAdminRouter from "../../modules/super-admin/super-admin.route.js";
import subscriptionPlanRouter from "../../modules/subscription-plan/subscription-plan.route.js";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/super-admin", superAdminRouter);
v1Router.use("/subscription-plans", subscriptionPlanRouter);

export default v1Router;
