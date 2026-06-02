import STATUS_CODES from "../constants/statusCode.js";
import ApiResponse from "../utils/apiResponse.js";

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json(
          new ApiResponse(
            false,
            "You don't have permission to access this resource",
          ),
        );
    }
    next();
  };
};
