// middlewares/errorHandler.js
import { ApiError } from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    status: "error",
    message: err.isOperational ? err.message : "Internal Server Error",
  };

  console.error(`[${new Date().toISOString()}] Error: ${err.message}`, {
    statusCode,
    stack: err.stack,
  });

  res.status(statusCode).json(response);
};

export { errorHandler };
