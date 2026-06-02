import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { createClinicInvitationSchema } from "./super-admin.dto.js";
import * as SuperAdminController from "./super-admin.controller.js";

const superAdminRouter = Router();

superAdminRouter.post(
  "/clinic-invitations",
  authenticate,
  authorize(["SUPER_ADMIN"]),
  validate(createClinicInvitationSchema),
  SuperAdminController.createClinicInvitation,
);

export default superAdminRouter;
