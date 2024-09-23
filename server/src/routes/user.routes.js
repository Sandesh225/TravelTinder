import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getAllUsers,
  logoutUser,
  refreshAccessToken,
} from '../controllers/user.controller.js';
import { requireRole, verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', registerUser);  // Register a new user
router.post('/login', loginUser);        // Log in a user
router.post('/refresh-token', refreshAccessToken);  // Refresh access token

// Protected routes (require authentication)
router.post('/logout', verifyJWT, logoutUser);  // Log out a user
router.get('/me', verifyJWT, getCurrentUser);   // Get current authenticated user's profile
router.put('/me', verifyJWT, updateUser);       // Update current authenticated user's profile

// Admin-only routes (require 'admin' role)
router.delete('/:id', verifyJWT, requireRole('admin'), deleteUser);   // Delete user by ID
router.get('/', verifyJWT, requireRole('admin'), getAllUsers);        // Get all users (admin only)

export default router;
 