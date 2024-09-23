import express from 'express';
import {
  createNotification,
  getNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  deleteNotification,
} from '../controllers/notification.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes are protected by JWT authentication middleware

// Create a new notification
router.post('/', verifyJWT, createNotification);

// Get all notifications for the authenticated user
router.get('/', verifyJWT, getNotifications);

// Get unread notifications for the authenticated user
router.get('/unread', verifyJWT, getUnreadNotifications);

// Mark a notification as read
router.put('/:notificationId/read', verifyJWT, markNotificationAsRead);

// Delete a notification
router.delete('/:notificationId', verifyJWT, deleteNotification);

export default router;
