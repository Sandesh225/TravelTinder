import express from 'express';
import {
  createMatch,
  getUserMatches,
  updateMatchStatus,
  deleteMatch,
  getAllMatches,
} from '../controllers/match.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/auth.middleware.js'; // For admin-only routes

const router = express.Router();

// Protected routes (require authentication via JWT)

// Create a new match between two users
router.post('/', verifyJWT, createMatch);

// Get all matches for the authenticated user
router.get('/', verifyJWT, getUserMatches);

// Update match status (Matched or Rejected)
router.put('/:matchId', verifyJWT, updateMatchStatus);

// Delete a match (admin-only route)
router.delete('/:matchId', verifyJWT, requireRole('admin'), deleteMatch);

// Admin-only route: Get all matches (for moderation or analytics)
router.get('/admin/matches', verifyJWT, requireRole('admin'), getAllMatches);

export default router;
