import express from 'express';
import {
  swipeUser,
  getMatches,
  unmatchUser,
  getPendingMatches
} from '../controllers/match.controller.js';
import { verifySession } from '../middlewares/auth.middleware.js'; // Middleware for session verification

const router = express.Router();

// Swipe on a user (requires session)
router.post('/swipe', verifySession, swipeUser);

// Get all matches for the current user (requires session)
router.get('/matches', verifySession, getMatches);

// Unmatch a user (requires session)
router.delete('/matches/:matchId', verifySession, unmatchUser);

// Get pending matches for the current user (requires session)
router.get('/matches/pending', verifySession, getPendingMatches);

export default router;
