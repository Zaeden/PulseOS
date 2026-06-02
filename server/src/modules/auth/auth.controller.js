import { generateOtp } from "../../utils/otp.js";
import client from "../../configs/redis.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as AuthService from "./auth.service.js";
import ApiResponse from "../../utils/apiResponse.js";
import STATUS_CODES from "../../constants/statusCode.js";
import { UnauthorizedError } from "../../utils/apiError.js";

export const sendOtp = asyncHandler(async (req, res) => {
  await AuthService.sendOtp(req.validatedBody);

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(true, "OTP sent successfully"));
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const result = await AuthService.verifyOtp(req.validatedBody);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(STATUS_CODES.OK).json(
    new ApiResponse(true, "OTP verified successfully", {
      user: {
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        role: result.user.role,
        clinicId: result.user.clinicId,
      },
    }),
  );
});

export const me = asyncHandler(async (req, res) => {
  const user = await AuthService.me(req.user.userId);

  return res.status(200).json(
    new ApiResponse(true, "Current user fetched", {
      user,
    }),
  );
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new UnauthorizedError("Unauthorized");
  }

  const result = await AuthService.refreshToken(refreshToken);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(true, 200, "Token refreshed successfully"));
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await AuthService.revokeRefreshToken(refreshToken);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(true, "Logged out successfully"));
});
