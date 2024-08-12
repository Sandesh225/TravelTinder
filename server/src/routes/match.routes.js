import { Router } from "express";
import { createMatch, deleteMatch, getUserMatches, updateMatchStatus } from "../controllers/match.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to create a new match
router.route("/").post(verifyJWT, createMatch);

// Route to get all matches for the authenticated user
router.route("/").get(verifyJWT, getUserMatches);

// Route to update the status of a specific match
router.route("/:matchId").patch(verifyJWT, updateMatchStatus);
router.route("/:matchId").patch(verifyJWT, deleteMatch );

export default router;
