import { ApiError } from './ApiError.js'; // Custom error handling class
import { logger } from '../utils/logger.js'; // Logger for logging activities
import { User } from '../models/user.model.js'; // Import the User model

// Middleware to verify session and check if the user is authenticated
export const verifySession = async (req, res, next) => {
  try {
    // Check if the session exists and contains user information
    if (!req.session || !req.session.user) {
      logger.warn('Unauthorized access attempt: No session');
      throw new ApiError(401, 'Unauthorized: No session found');
    }

    // Fetch the user from the database and exclude the password field
    const user = await User.findById(req.session.user.id).select('-password');
    if (!user) {
      logger.warn(`User not found for session ID: ${req.session.user.id}`);
      throw new ApiError(404, 'Unauthorized: User not found');
    }

    // Attach user to the request object for use in subsequent middleware/controllers
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Session verification error: ${error.message}`);
    next(error); // Forward error to global error handler
  }
};

// Middleware to require a specific role (e.g., 'admin', 'user')
export const requireRole = (role) => {
  return (req, res, next) => {
    try {
      // Ensure the user is authenticated and has the required role
      if (!req.user || req.user.role !== role) {
        logger.warn(`User ${req.user?.username || 'unknown'} attempted to access a ${role}-protected route.`);
        throw new ApiError(403, 'Forbidden: Insufficient permissions');
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      logger.error(`Role verification error: ${error.message}`);
      next(error); // Forward error to global error handler
    }
  };
};
