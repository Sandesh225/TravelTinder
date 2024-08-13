import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js'; // Ensure the correct import path
import {
  createTravelPreference,
  getTravelPreferences,
  updateTravelPreference,
  deleteTravelPreference
} from '../controllers/travelPrefences.controller.js'; // Ensure the correct import path

const router = express.Router();

// Route to create a new travel preference
router.post('/create', verifyJWT, createTravelPreference);

// Route to get all travel preferences for the authenticated user
router.get('/', verifyJWT, getTravelPreferences);

// Route to update a specific travel preference by ID
router.put('/update/:preferenceId', verifyJWT, updateTravelPreference);

// Route to delete a specific travel preference by ID
router.delete('/delete/:preferenceId', verifyJWT, deleteTravelPreference);

export default router;
