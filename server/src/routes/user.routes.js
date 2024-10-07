import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getAllUsers,
  logoutUser,
  changeCurrentPassword,
} from "../controllers/user.controller.js";

import { verifySession, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);       // Register a new user
router.post("/login", loginUser);             // Log in a user

// Protected routes (Require session-based authentication)
router.post("/logout", verifySession, logoutUser);  // Log out the current user
router.get("/me", verifySession, getCurrentUser);   // Get details of the current logged-in user
router.put("/me", verifySession, updateUser);       // Update current user's information
router.put("/me/password", verifySession, changeCurrentPassword); // Change current user's password

// Admin-protected routes (Require both authentication and admin role)
router.delete("/:id", verifySession, requireRole("admin"), deleteUser); // Delete a user (admin only)
router.get("/", verifySession,  getAllUsers);      // Get all users (admin only)

export default router;
