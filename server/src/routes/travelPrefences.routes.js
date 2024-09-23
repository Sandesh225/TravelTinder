import express from 'express';
import {
  createOrUpdateTravelPreference,
  getTravelPreference,
  deleteTravelPreference,
  getAllTravelPreferences,
} from '../controllers/travelPrefences.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/auth.middleware.js'; // For admin-only routes

const router = express.Router();

// Protected routes (require authentication via JWT)

// Create or update travel preferences for the authenticated user
router.post('/', verifyJWT, createOrUpdateTravelPreference);

// Get travel preferences for the authenticated user
router.get('/me', verifyJWT, getTravelPreference);

// Delete travel preferences for the authenticated user
router.delete('/me', verifyJWT, deleteTravelPreference);

// Admin-only route: Get all travel preferences
router.get('/', verifyJWT, requireRole('admin'), getAllTravelPreferences);

export default router;
