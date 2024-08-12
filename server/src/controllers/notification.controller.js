import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../middlewares/ApiError.js";
import { ApiResponse } from "../middlewares/ApiResponse.js";

// Create a new notification
const createNotification = asyncHandler(async (req, res) => {
  const { user, type, content } = req.body;

  if (!user || !type || !content) throw new ApiError(400, "User, type, and content are required");

  const notification = await Notification.create({ user, type, content });

  res.status(201).json(new ApiResponse(201, { notification }, "Notification created successfully"));
});

// Get all notifications for a user
const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id });
  if (!notifications || notifications.length === 0) throw new ApiError(404, "No notifications found");

  res.status(200).json(new ApiResponse(200, { notifications }, "Notifications fetched successfully"));
});

// Mark a notification as read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    { _id: req.params.notificationId, user: req.user.id },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new ApiError(404, "Notification not found");

  res.status(200).json(new ApiResponse(200, { notification }, "Notification marked as read"));
});

// Delete a notification
const deleteNotification = asyncHandler(async (req, res) => {
  const deletedNotification = await Notification.findByIdAndDelete({ _id: req.params.notificationId, user: req.user.id });
  if (!deletedNotification) throw new ApiError(404, "Notification not found");

  res.status(200).json(new ApiResponse(200, null, "Notification deleted successfully"));
});

export { createNotification, getUserNotifications, markNotificationAsRead, deleteNotification };
