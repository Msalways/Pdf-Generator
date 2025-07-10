import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err);

  // Set default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error: " + err.message;
  } else if (err.name === "NotFoundError") {
    statusCode = 404;
    message = "Resource Not Found";
  }

  // Send the error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default globalErrorHandler;
