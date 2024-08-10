
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Match } from "../models/match.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";


const createMatch = asyncHandler(async (req, res) => {
const {user1,user2}=req.body;
if (!user1 || !user2) {
  throw new ApiError(400, "Both user1 and user2 are required");
}
const match=await Match.create({
  user1,user2
})
res.status(201).json(new ApiResponse(201, { match }, "Match created successfully"));
});

const getUserMatches = asyncHandler(async (req, res) => {
  const userId = req.user.id; 

  // Find all matches involving the user
  const matches = await Match.find({
    $or: [{ user1: userId }, { user2: userId }],
  }).populate('user1', 'username').populate('user2', 'username');

  res.status(200).json(new ApiResponse(200, { matches }, "User matches fetched successfully"));
});


const updateMatchStatus = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const { status } = req.body;

  if (!status || !['Pending', 'Matched', 'Rejected'].includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  // Find and update the match
  const match = await Match.findByIdAndUpdate(
    matchId,
    { status },
    { new: true, runValidators: true }
  );

  if (!match) {
    throw new ApiError(404, "Match not found");
  }

  res.status(200).json(new ApiResponse(200, { match }, "Match status updated successfully"));
});

export { createMatch, getUserMatches, updateMatchStatus };