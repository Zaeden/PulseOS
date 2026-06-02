import { UnauthorizedError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.js";

export const authenticate = asyncHandler((req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new UnauthorizedError("Authentication required");
  }

  const decoded = verifyAccessToken(accessToken);
  req.user = decoded;

  next();
});
