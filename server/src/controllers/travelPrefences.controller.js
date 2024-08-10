import { TravelPreference } from "../models/travelPreference.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// Create a new travel preference
const createTravelPreference = asyncHandler(async (req, res) => {
  const { preferredDestinations, travelMedium, activities, budgetRange, travelDates, preferredGroupSize } = req.body;

  // Validate required fields
  if (!preferredDestinations || !travelMedium || !activities || !budgetRange || !travelDates || !preferredGroupSize) {
    throw new ApiError(400, "All fields are required");
  }

  // Create a new travel preference
  const travelPreference = await TravelPreference.create({
    preferredDestinations,
    travelMedium,
    activities,
    budgetRange,
    travelDates,
    preferredGroupSize,
    user: req.user._id, // Associate with the authenticated user
  });

  res.status(201).json(new ApiResponse(201, { travelPreference }, "Travel preference created successfully"));
});

// Get all travel preferences for the authenticated user
const getTravelPreferences = asyncHandler(async (req, res) => {
  const preferences = await TravelPreference.find({ user: req.user._id });

  if (!preferences || preferences.length === 0) {
    throw new ApiError(404, "No travel preferences found");
  }

  res.status(200).json(new ApiResponse(200, { preferences }, "Travel preferences fetched successfully"));
});

// Update a specific travel preference by ID
const updateTravelPreference = asyncHandler(async (req, res) => {
  const { preferenceId } = req.params;
  const updates = req.body;

  const preference = await TravelPreference.findByIdAndUpdate(
    { _id: preferenceId, user: req.user._id },
    updates,
    { new: true, runValidators: true }
  );

  if (!preference) {
    throw new ApiError(404, "Travel preference not found");
  }

  res.status(200).json(new ApiResponse(200, { preference }, "Travel preference updated successfully"));
});

// Delete a specific travel preference by ID
const deleteTravelPreference = asyncHandler(async (req, res) => {
  const { preferenceId } = req.params;

  const deletedPreference = await TravelPreference.findByIdAndDelete({ _id: preferenceId, user: req.user._id });

  if (!deletedPreference) {
    throw new ApiError(404, "Travel preference not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Travel preference deleted successfully"));
});

export {
  createTravelPreference,
  getTravelPreferences,
  updateTravelPreference,
  deleteTravelPreference,
};
