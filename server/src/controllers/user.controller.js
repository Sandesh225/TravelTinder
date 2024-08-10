import { asyncHandler } from "../middlewares/asyncHandler.js";
import { User } from "../models/user.model.js";
import {ApiError} from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";


// Utility function to generate access and refresh tokens
const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens",true,error.stack);
  }
};

// Register User Controller
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate request body
  if ([username, email, password].some(field => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Create new user
  const user = await User.create({ username, email, password });

  // Fetch user without password and refreshToken
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  
  

  // Send response
  res.status(201).json(new ApiResponse(201, { user: createdUser }, "User Registered Successfully"));
});







const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});



const getUserProfile=asyncHandler(async(req,res,next)=>{
  const userId=req.user.id;
const userProfile=await User.findById(userId).populate("Profile TravelPreferences");
 if (!userProfile){
  throw new ApiError(404, "User profile not found");
 }
 res.status(200).json(new ApiResponse(200, {user:userProfile},"User profile fetched successfully"))
})










export { registerUser,generateAccessandRefreshToken,loginUser, getUserProfile};
