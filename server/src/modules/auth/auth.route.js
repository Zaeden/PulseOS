import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { sendOtpSchema, verifyOtpSchema } from "./auth.dto.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/send-otp", validate(sendOtpSchema), AuthController.sendOtp);

authRouter.post(
  "/verify-otp",
  validate(verifyOtpSchema),
  AuthController.verifyOtp,
);

authRouter.get("/me", authenticate, AuthController.me);

authRouter.post("/refresh-token", AuthController.refreshToken);

authRouter.post("/logout", AuthController.logout);

export default authRouter;
