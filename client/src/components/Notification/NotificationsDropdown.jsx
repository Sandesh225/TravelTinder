import React, { useState } from "react";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../features/apiSlice";
import Spinner from "../Layout/Spinner";

const NotificationsDropdown = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-blue-300 transition duration-300"
      >
        <i className="fas fa-bell"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-20">
          <h3 className="p-4 font-bold text-lg border-b">Notifications</h3>
          <ul>
            {isLoading ? (
              <li className="p-4 text-gray-500">Loading...</li>
            ) : notifications?.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification._id} className="p-4 hover:bg-gray-100">
                  <p>{notification.content}</p>
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Mark as Read
                  </button>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
