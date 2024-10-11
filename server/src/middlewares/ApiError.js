class ApiError extends Error {
  constructor(statusCode, message = "An error occurred", isOperational = true, stack = "", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.message = message;
    this.data = null;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };