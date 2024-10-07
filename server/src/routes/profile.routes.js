import express from "express";
import {
  upsertProfile,
  getMyProfile,
  getUserProfile,
  getNearbyUsers,
  deleteProfile,
  getAllProfilesForMatching,
  
  getAllUserProfiles,
} from "../controllers/profile.controller.js";
import { verifySession } from "../middlewares/auth.middleware.js"; // Middleware for session verification
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Create or update a profile (requires session)
router.post("/upsert", verifySession, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'travelImage', maxCount: 5 }
]), upsertProfile);

// Get the current user's profile (requires session)
router.get("/me", verifySession, getMyProfile);

// Get a specific user's profile by userId
router.get("/:userId", verifySession, getUserProfile);

// Get nearby users for matching based on location (requires session)
router.get("/nearby", verifySession, getNearbyUsers);

// Get all profiles for matching with optional filters (requires session)
router.get("/match", verifySession, getAllProfilesForMatching);

// Delete the authenticated user's profile (requires session)
router.delete("/me", verifySession, deleteProfile);
router.get('/explore', verifySession, getAllUserProfiles);
export default router;
