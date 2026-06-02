export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server Error";

  console.log(error);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
