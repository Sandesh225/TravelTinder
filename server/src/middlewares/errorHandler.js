import { ApiError } from './ApiError.js';
import { ApiResponse } from './ApiResponse.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";
  let errors = [];

  if (err instanceof mongoose.Error.ValidationError) {
    errors = Object.values(err.errors).map(error => error.message);
    statusCode = 400;
    message = "Validation Error";
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token";
  } else if (err instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Token expired";
  } else if (err instanceof ApiError) {
    errors = err.errors || [];
    statusCode = err.statusCode;
  } else if (err.code === 11000) {
    // Handle duplicate key errors (e.g., unique constraints)
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field}: "${err.keyValue[field]}". Please use another value!`;
    statusCode = 400;
  } else if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = "Bad JSON format";
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);  // Log detailed error in development
    }
  }

  res.status(statusCode).json(new ApiResponse(statusCode, null, message, errors));
};

export { errorHandler };
