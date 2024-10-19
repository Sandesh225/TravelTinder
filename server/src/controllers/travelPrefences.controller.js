import { asyncHandler } from '../middlewares/asyncHandler.js';
import { TravelPreference } from '../models/travelPreference.model.js';
import { Match } from '../models/match.model.js';
import { ApiError } from '../middlewares/ApiError.js';
import { ApiResponse } from '../middlewares/ApiResponse.js';
import { sendNotification } from '../utils/notificationService.js';
import { logger } from '../utils/logger.js'; // Import logger

// Create travel preferences for the authenticated user
const createTravelPreference = asyncHandler(async (req, res) => {
  const { preferredDestinations, travelDates, preferredGroupSize, budgetRange, activities, travelMedium } = req.body;

  // Validate required fields
  if (!preferredDestinations || !travelDates || !preferredGroupSize || !budgetRange || !activities || !travelMedium) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if the user already has travel preferences
  const existingPreference = await TravelPreference.findOne({ user: req.user._id });
  if (existingPreference) {
    throw new ApiError(400, 'Travel preferences for this user already exist');
  }

  // Create new travel preferences
  const travelPreference = new TravelPreference({
    user: req.user._id,
    preferredDestinations,
    travelDates,
    preferredGroupSize,
    budgetRange,
    activities,
    travelMedium,
  });

  await travelPreference.save();
  logger.info(`User ${req.user._id} created travel preferences`);

  res.status(201).json(new ApiResponse(201, { travelPreference }, 'Travel preferences created successfully'));
});

// Get travel preferences for the authenticated user
const getTravelPreference = asyncHandler(async (req, res) => {
  const travelPreference = await TravelPreference.findOne({ user: req.user._id }).lean();

  if (!travelPreference) {
    throw new ApiError(404, 'No travel preferences found for this user');
  }

  logger.info(`User ${req.user._id} fetched their travel preferences`);
  res.status(200).json(new ApiResponse(200, { travelPreference }, 'Travel preferences fetched successfully'));
});

// Update travel preferences for the authenticated user
const updateTravelPreference = asyncHandler(async (req, res) => {
  const { preferredDestinations, travelDates, preferredGroupSize, budgetRange, activities, travelMedium } = req.body;

  const travelPreference = await TravelPreference.findOneAndUpdate(
    { user: req.user._id },
    { preferredDestinations, travelDates, preferredGroupSize, budgetRange, activities, travelMedium },
    { new: true, runValidators: true }
  ).lean();

  if (!travelPreference) {
    throw new ApiError(404, 'Travel preferences not found');
  }

  logger.info(`User ${req.user._id} updated their travel preferences`);
  res.status(200).json(new ApiResponse(200, { travelPreference }, 'Travel preferences updated successfully'));
});

// Delete travel preferences for the authenticated user
const deleteTravelPreference = asyncHandler(async (req, res) => {
  const travelPreference = await TravelPreference.findOneAndDelete({ user: req.user._id });

  if (!travelPreference) {
    throw new ApiError(404, 'Travel preferences not found');
  }

  logger.info(`User ${req.user._id} deleted their travel preferences`);
  res.status(200).json(new ApiResponse(200, null, 'Travel preferences deleted successfully'));
});

// Get all travel preferences (Admin-only)
const getAllTravelPreferences = asyncHandler(async (req, res) => {
  const travelPreferences = await TravelPreference.find().populate('user', '-password -refreshToken').lean();

  if (!travelPreferences || travelPreferences.length === 0) {
    throw new ApiError(404, 'No travel preferences found');
  }

  logger.info(`Admin fetched all travel preferences`);
  res.status(200).json(new ApiResponse(200, { travelPreferences }, 'All travel preferences fetched successfully'));
});

// Matching algorithm based on overlapping preferences
const findMatches = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  // Fetch the travel preferences of the authenticated user
  const currentUserPreference = await TravelPreference.findOne({ user: currentUserId }).lean();
  if (!currentUserPreference) {
    throw new ApiError(404, 'You must set your travel preferences to find matches');
  }

  // Define matching criteria based on destinations, dates, activities, and budget
  const matchingCriteria = {
    user: { $ne: currentUserId }, // Exclude the current user from matches
    preferredDestinations: { $in: currentUserPreference.preferredDestinations },
    "travelDates.start": { $lte: currentUserPreference.travelDates.end }, 
    "travelDates.end": { $gte: currentUserPreference.travelDates.start }, 
    activities: { $in: currentUserPreference.activities },
    "budgetRange.min": { $lte: currentUserPreference.budgetRange.max }, 
    "budgetRange.max": { $gte: currentUserPreference.budgetRange.min },
  };

  // Fetch potential matches
  const potentialMatches = await TravelPreference.find(matchingCriteria)
    .populate('user', 'username email')
    .lean();

  if (!potentialMatches || potentialMatches.length === 0) {
    throw new ApiError(404, 'No matches found based on your preferences');
  }

  logger.info(`User ${currentUserId} found ${potentialMatches.length} matches`);
  res.status(200).json(new ApiResponse(200, { matches: potentialMatches }, 'Matches found successfully'));
});

// Handle swipe right action
const swipeRight = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.targetUserId;

  const currentUserPreference = await TravelPreference.findOne({ user: currentUserId });
  if (!currentUserPreference) {
    throw new ApiError(400, 'You must set your travel preferences to swipe.');
  }

  const targetUserPreference = await TravelPreference.findOne({ user: targetUserId });
  if (!targetUserPreference) {
    throw new ApiError(404, 'Target user travel preferences not found.');
  }

  let match = await Match.findOne({
    $or: [
      { user1: currentUserId, user2: targetUserId },
      { user1: targetUserId, user2: currentUserId },
    ],
  });

  if (!match) {
    match = new Match({
      user1: currentUserId,
      user2: targetUserId,
      status: 'Pending',
    });
  }

  if (match.user1.equals(currentUserId)) {
    match.user1SwipeRight = true;
  } else {
    match.user2SwipeRight = true;
  }

  await match.save();

  logger.info(`User ${currentUserId} swiped right on user ${targetUserId}`);

  if (match.user1SwipeRight && match.user2SwipeRight) {
    return res.redirect(`/confirm-match/${match._id}`);
  }

  res.status(200).json(new ApiResponse(200, { match }, 'Swipe recorded successfully'));
});

// Confirm match when both users swipe right
const confirmMatch = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const matchId = req.params.matchId;

  const match = await Match.findById(matchId);
  if (!match) {
    throw new ApiError(404, 'Match not found.');
  }

  if (!match.user1.equals(currentUserId) && !match.user2.equals(currentUserId)) {
    throw new ApiError(403, 'You are not part of this match.');
  }

  if (!match.user1SwipeRight || !match.user2SwipeRight) {
    throw new ApiError(400, 'Match cannot be confirmed until both users swipe right.');
  }

  match.status = 'Matched';
  await match.save();

  await sendNotification(match.user1, 'You have a new match!');
  await sendNotification(match.user2, 'You have a new match!');

  logger.info(`Match confirmed between user ${match.user1} and user ${match.user2}`);
  res.status(200).json(new ApiResponse(200, { match }, 'Match confirmed successfully'));
});

export {
  createTravelPreference,
  getTravelPreference,
  updateTravelPreference,
  deleteTravelPreference,
  getAllTravelPreferences,
  findMatches,
  swipeRight,
  confirmMatch,
};
