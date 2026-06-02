import { BadRequestError } from "../utils/apiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new BadRequestError(
          result.error.issues.map((issue) => issue.message).join(", "),
        ),
      );
    }

    req.validatedBody = result.data;

    next();
  };
};

export default validate;
