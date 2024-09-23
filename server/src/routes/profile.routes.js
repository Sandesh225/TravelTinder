import express from 'express';
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById, // Import the new controller method
} from '../controllers/profile.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/auth.middleware.js'; // For admin-only routes

const router = express.Router();

// Protected routes (requires JWT authentication)
router.post('/', verifyJWT, createProfile);
router.get('/me', verifyJWT, getProfile);   // Get the authenticated user's profile
router.put('/me', verifyJWT, updateProfile);
router.delete('/me', verifyJWT, deleteProfile);

// New route to get profile by ID (public access)
router.get('/:id', getProfileById); // Allow fetching any profile by its ID

// Admin-only route
router.get('/', verifyJWT,  getAllProfiles);

export default router;
