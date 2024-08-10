import { ApiResponse } from "../middlewares/ApiResponse.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Profile } from "../models/profile.model.js";
import { ApiError } from "../middlewares/ApiError.js"; // Assuming you have an ApiError class

const createProfile = asyncHandler(async (req, res, next) => {
  const { bio, age, location, gender, interests } = req.body;

  // Ensure all required fields are provided
  if (!bio || !location || !age || !gender || !interests) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if req.user is defined
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "User not authenticated");
  }

  // Create a new profile
  const profile = await Profile.create({
    bio,
    age,
    location,
    gender,
    interests,
    user: req.user._id, // Ensure req.user._id exists
  });

  // Return a success response
  res.status(201).json(new ApiResponse(201, { profile }, "Profile created successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  const { bio, location, gender, interests } = req.body;

  // Ensure all required fields are provided
  if (!bio || !location || !gender || !interests) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if profileId is provided
  if (!profileId) {
    throw new ApiError(400, "Profile ID is required");
  }

  // Update the profile
  const updates = { bio, location, gender, interests };
  const updatedProfile = await Profile.findByIdAndUpdate(profileId, updates, {
    new: true,
    runValidators: true,
  });

  // Check if profile was found and updated
  if (!updatedProfile) {
    throw new ApiError(404, "Profile not found");
  }

  // Return a success response
  return res.status(200).json(new ApiResponse(200, updatedProfile, "Profile updated successfully"));
});




const getProfile= asyncHandler(async (req, res, next) => {
  const profile=await Profile.findOne({user:req.user._id});
  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }
  res.status(200).json(new ApiResponse(200, { profile }, "Profile fetched successfully"));
});




export { createProfile, updateProfile,getProfile };
