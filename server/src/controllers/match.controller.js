
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Match } from "../models/match.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";
import { User } from "../models/user.model.js";


const createMatch = asyncHandler(async (req, res) => {
  const { matchedUserId } = req.body;

  if (!matchedUserId) throw new ApiError(400, "Matched user ID is required");

  const matchedUser = await User.findById(matchedUserId);
  if (!matchedUser) throw new ApiError(404, "Matched user not found");

  const existingMatch = await Match.findOne({ user: req.user._id, matchedUser: matchedUserId });
  if (existingMatch) throw new ApiError(409, "Match already exists");

  const match = await Match.create({ user: req.user._id, matchedUser: matchedUserId });

  res.status(201).json(new ApiResponse(201, { match }, "Match created successfully"));
});

const getUserMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find({ user: req.user._id }).populate("matchedUser", "-password -refreshToken");
  if (!matches || matches.length === 0) throw new ApiError(404, "No matches found");

  res.status(200).json(new ApiResponse(200, { matches }, "Matches fetched successfully"));
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


const deleteMatch = asyncHandler(async (req, res) => {
const deletedMatch=await Match.findByIdAndDelete({_id:req.params.matchId,user:req.user._id});
if (!deletedMatch) throw new ApiError(404, "Match not found");

  res.status(200).json(new ApiResponse(200, null, "Match deleted successfully"));
})

export { createMatch, getUserMatches, updateMatchStatus, deleteMatch};