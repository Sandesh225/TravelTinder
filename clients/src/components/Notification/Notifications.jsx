import React, { useEffect } from "react";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../features/apiSlice";
import { toast } from "react-toastify";

const Notifications = () => {
  const {
    data: notificationsData,
    error,
    isLoading,
  } = useGetNotificationsQuery();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId).unwrap();
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  if (isLoading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications</p>;

  const notifications = notificationsData?.data || [];

  return (
    <div className="notifications">
      <h2>Your Notifications</h2>
      {notifications.length === 0 && <p>No new notifications</p>}
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className={`notification ${notification.read ? "read" : "unread"}`}
          >
            <p>{notification.content}</p>
            {!notification.read && (
              <button onClick={() => handleMarkAsRead(notification._id)}>
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
