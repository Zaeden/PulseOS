import jwt from "jsonwebtoken";
import { config } from "../configs/env.js";
import { UnauthorizedError } from "./apiError.js";

export const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

export const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Access token has expired");
    }
    throw new UnauthorizedError(`Invalid access token: ${error.message}`);
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Refresh token has expired");
    }
    throw new UnauthorizedError(`Invalid refresh token: ${error.message}`);
  }
};

export const generateTokenPair = (payload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
  };
};
