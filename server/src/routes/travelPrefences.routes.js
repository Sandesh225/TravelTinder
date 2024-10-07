import express from 'express';
import {
  createTravelPreference,
  getTravelPreference,
  updateTravelPreference,
  deleteTravelPreference,
  getAllTravelPreferences,
  findMatches,
  swipeRight,
  confirmMatch
} from '../controllers/travelPrefences.controller.js'
import { verifySession } from '../middlewares/auth.middleware.js'; // Middleware for session verification

const router = express.Router();

// Create or update travel preferences (requires session)
router.post('/preferences', verifySession, createTravelPreference);

// Get the current user's travel preferences (requires session)
router.get('/preferences/me', verifySession, getTravelPreference);

// Update the current user's travel preferences (requires session)
router.put('/preferences/me', verifySession, updateTravelPreference);

// Delete the current user's travel preferences (requires session)
router.delete('/preferences/me', verifySession, deleteTravelPreference);

// Get all travel preferences (Admin-only, requires session)
router.get('/preferences', verifySession, getAllTravelPreferences);

// Find matches based on travel preferences (requires session)
router.get('/preferences/match', verifySession, findMatches);

// Swipe right (requires session)
router.post('/preferences/swipe/:targetUserId', verifySession, swipeRight);

// Confirm match when both users swipe right (requires session)
router.get('/preferences/confirm-match/:matchId', verifySession, confirmMatch);

export default router;
