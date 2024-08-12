import { asyncHandler } from '../middlewares/asyncHandler.js';
import { Profile } from '../models/profile.model.js';
import { ApiError } from '../middlewares/ApiError.js';
import { ApiResponse } from '../middlewares/ApiResponse.js';
import { User } from '../models/user.model.js';



// Create Profile Controller
const createProfile = asyncHandler(async (req, res) => {
  const { bio, age, location, gender, interests, photos } = req.body;

  if (!bio || !age || !location || !gender || !interests) {
    throw new ApiError(400, 'All fields are required');
  }

  const userId = req.user?._id;

  // Check if the profile already exists
  const existingProfile = await Profile.findOne({ user: userId });
  if (existingProfile) {
    throw new ApiError(400, 'Profile already exists');
  }

  const profile = await Profile.create({
    user: userId,
    bio,
    age,
    location,
    gender,
    interests,
    photos,
  });

  res.status(201).json(new ApiResponse(201, { profile }, 'Profile Created Successfully'));
});

// Get the profile of the authenticated user
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate({
    path: 'user',
    select: '-password', 
  })
  
  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200,  profile , "Profile fetched successfully"));
});



const updateProfile = asyncHandler(async (req, res) => {
  
  const updatedProfile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!updatedProfile) {
    throw new ApiError(404, "Profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { profile: updatedProfile }, "Profile updated successfully"));
});

// Delete the profile of the authenticated user
const deleteProfile = asyncHandler(async (req, res) => {
  // Find and delete the profile
  const deletedProfile = await Profile.findOneAndDelete({ user: req.user._id });
  if (!deletedProfile) {
    throw new ApiError(404, "Profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Profile deleted successfully"));
});

const getAllProfile = asyncHandler(async (req, res) => {
  try {
    // Fetch all profiles and populate the 'user' field
    const profiles = await Profile.find()
      .populate({
        path: 'user',
        select: '-password',
      })
      .exec();

    if (!profiles || profiles.length === 0) {
      throw new ApiError(404, "No profiles found");
    }

    // Filter out profiles where user population failed (i.e., user is null)
    const validProfiles = profiles.filter(profile => profile.user);

    if (validProfiles.length === 0) {
      throw new ApiError(404, "No valid profiles found");
    }

    res.status(200).json(new ApiResponse(200, validProfiles, "Profiles fetched successfully"));
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new ApiError(500, "Something went wrong while fetching profiles");
  }
});


export { createProfile, getProfile, updateProfile, deleteProfile,getAllProfile };
