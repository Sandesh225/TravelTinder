import { asyncHandler } from "../middlewares/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";

// Utility function to generate access and refresh tokens
const generateAccessandRefreshToken=async(userId)=>{
  try {
    const user=await User.findById(userId);
    const accessToken=user.generateAccessToken();
    const refreshToken=user.generateRefreshToken();
    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false});
    return {accessToken,refreshToken};
  } catch (error) 
  {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    ); 
  }
}




const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    throw new ApiError(400, "Email, Username, and Password are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }


  const user = await User.create({ 
    username:username.toLowerCase(), 
    email,
     password });

  
 

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
  if (!createdUser) {
    throw new ApiError(500, "Error retrieving the registered user");
  }

  res.status(201).json(new ApiResponse(201, createdUser , "User Registered Successfully"));
});









// Login User Controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({
    email 
  });

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

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser,accessToken,refreshToken }, "User Logged In Successfully"));
});



const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, 
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});






const getUser = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(200, req.user, "User fetched successfully"));
});



const updateUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if email is already taken by another user
  const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
  if (existingUser) {
    throw new ApiError(409, 'Email is already in use by another user');
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { username: username.toLowerCase(), email: email.toLowerCase() },
    { new: true }
  ).select('-password');

  res.status(200).json(new ApiResponse(200, user, 'User updated successfully'));
});




const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});






const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Fetch all users and populate their profiles
    const users = await User.find()
      .select('-password') 
    if (users.length === 0) {
      throw new ApiError(404, "No users found");
    }

    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new ApiError(500, "Something went wrong while fetching users");
  }
});



export {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  logoutUser
};
