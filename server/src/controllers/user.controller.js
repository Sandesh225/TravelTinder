import { asyncHandler } from "../middlewares/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import bcrypt from "bcryptjs";
import { logger } from "../utils/logger.js"; // Custom logger utility
import { validateUserRegistration, validateLogin, validatePasswordChange, validateUserUpdate } from "../validations/userValidation.js"; // Import validation functions
import { Profile } from "../models/profile.model.js";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Validate inputs using custom validation (could be Joi or express-validator)
  const { error } = validateUserRegistration(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  // Check if user exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Create new user
  const user = new User({ email, username: username.toLowerCase(), password });
  await user.save();

  // Save session
  req.session.user = { id: user._id, username: user.username };

  const createdUser = await User.findById(user._id).select("-password").lean();
  logger.info(`New user registered: ${createdUser.username}`);

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  const { error } = validateLogin(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.isPasswordCorrect(password))) {
    logger.warn(`Failed login attempt for ${email}`);
    throw new ApiError(401, "Invalid credentials");
  }

  // Save session
  req.session.user = { id: user._id, username: user.username };

  const loggedInUser = await User.findById(user._id).select("-password").lean();
  logger.info(`User logged in: ${loggedInUser.username}`);

  return res.status(200).json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error(`Error destroying session: ${err.message}`);
      throw new ApiError(500, "Logout failed");
    }
    res.clearCookie("connect.sid");
    logger.info("User logged out");
    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
  });
});

// Change Password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Validate inputs
  const { error } = validatePasswordChange(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!user || !(await user.isPasswordCorrect(oldPassword))) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save({ validateBeforeSave: false });

  logger.info(`Password changed for user: ${user.username}`);
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(401, "Not authenticated");
  }

  const user = await User.findById(req.session.user.id).select("-password").lean();
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// Update User Info
const updateUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  // Validate inputs
  const { error } = validateUserUpdate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
    _id: { $ne: req.session.user.id },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already in use by another user");
  }

  const user = await User.findByIdAndUpdate(
    req.session.user.id,
    { $set: { username: username.trim(), email: email.toLowerCase() } },
    { new: true }
  ).select("-password");

  logger.info(`User updated: ${user.username}`);
  return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new ApiError(404, "User not found");

  logger.info(`User deleted: ${userId}`);
  return res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
      // Fetch all users excluding the password field
      const users = await User.find().select("-password").lean() || []; // Ensure users is an array
      console.log("Fetched users:", users); // Log the fetched users

      // Check if users is an array before proceeding
      if (!Array.isArray(users)) {
          throw new Error("Users is not an array"); // Custom error message for debugging
      }

      // Manually populate the profiles after fetching users
      for (const user of users) {
          const profile = await Profile.findOne({ user: user._id }).select('bio age gender').lean(); // Ensure to convert to plain object
          user.profile = profile || {}; // Fallback to an empty object if no profile found
      }

      // Check if any users were found
      if (users.length === 0) {
          return res.status(404).json(new ApiResponse(404, null, "No users found"));
      }

      return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
      console.error("Error fetching users:", error.message); // Log the error message for debugging
      return res.status(500).json(new ApiResponse(500, null, "Error fetching users"));
  }
});


export {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getAllUsers,
  logoutUser,
  changeCurrentPassword,
};
