import { Router } from "express";
import { createNotification, getUserNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to create a new notification
router.route("/").post(verifyJWT, createNotification);

// Route to get all notifications for the authenticated user
router.route("/").get(verifyJWT, getUserNotifications);

// Route to mark a specific notification as read
router.route("/:notificationId/read").patch(verifyJWT, markNotificationAsRead);

export default router;
