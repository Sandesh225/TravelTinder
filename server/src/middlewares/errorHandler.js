import { ApiError } from './ApiError.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ApiResponse } from './ApiResponse.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";
  let errors = [];

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    errors = Object.values(err.errors).map(e => e.message);
    statusCode = 400;
    message = "Validation Error";
  }

  // Handle invalid MongoDB ObjectId (CastError)
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle JWT errors
  else if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = err instanceof jwt.TokenExpiredError ? "Token expired" : "Invalid token";
  }

  // Handle custom ApiErrors
  else if (err instanceof ApiError) {
    errors = err.errors || [];
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle Mongoose duplicate key error (unique constraint violations)
  else if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field}: "${err.keyValue[field]}". Please use another value!`;
    statusCode = 400;
  }

  // Handle malformed JSON in request body
  else if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = "Bad JSON format";
  }

  // Log errors only in production environment to avoid unnecessary log clutter
  if (process.env.NODE_ENV === 'production') {
    logger.error({
      message,
      statusCode,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
      user: req.user ? req.user._id : "Unauthenticated"
    });
  }

  // Log errors in development environment for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error(err); // Log the full error to the console
  }

  // Send the formatted error response to the client
  res.status(statusCode).json(new ApiResponse(statusCode, null, message, errors));
};

export { errorHandler };
