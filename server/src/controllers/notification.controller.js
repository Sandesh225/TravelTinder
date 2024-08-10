import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";

// Create a new notification
const createNotification = asyncHandler(async (req, res) => {
  const { user, type, content } = req.body;

  // Validate input
  if (!user || !type || !content) {
    throw new ApiError(400, "User, type, and content are required");
  }

  // Create a new notification
  const notification = await Notification.create({ user, type, content });

  res.status(201).json(new ApiResponse(201, { notification }, "Notification created successfully"));
});

// Get all notifications for a user
const getUserNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id; 
  const notifications = await Notification.find({ user: userId });

  res.status(200).json(new ApiResponse(200, { notifications }, "User notifications fetched successfully"));
});

// Mark notification as read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  // Find and update the notification
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true, runValidators: true }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  res.status(200).json(new ApiResponse(200, { notification }, "Notification marked as read"));
});

export { createNotification, getUserNotifications, markNotificationAsRead };
