import { Router } from "express";
import authRouter from "../../modules/auth/auth.route.js";
import superAdminRouter from "../../modules/super-admin/superAdmin.route.js";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/super-admin", superAdminRouter);

export default v1Router;
