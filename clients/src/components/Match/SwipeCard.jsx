// src/components/Matching/SwipeCard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  useSwipeRightMutation,
  useSwipeLeftMutation,
} from "../../features/apiSlice";

const SwipeCard = ({ user, onSwipe }) => {
  const [swipeRight] = useSwipeRightMutation();
  const [swipeLeft] = useSwipeLeftMutation();

  const handleSwipeRight = async () => {
    try {
      await swipeRight(user._id).unwrap(); // Use _id to reference user
      onSwipe("right", user);
    } catch (error) {
      console.error("Error swiping right:", error);
    }
  };

  const handleSwipeLeft = async () => {
    try {
      await swipeLeft(user._id).unwrap();
      onSwipe("left", user);
    } catch (error) {
      console.error("Error swiping left:", error);
    }
  };

  return (
    <motion.div
      className="relative bg-white shadow-lg rounded-lg p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <img
        src={user.profilePicture}
        alt="Profile"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-bold mb-2">{user.username}</h3>
      <p className="text-gray-600 mb-2">{user.location}</p>
      <p className="text-gray-700">{user.travelPreferences.destinations}</p>

      {/* Swipe buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSwipeLeft}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Pass
        </button>
        <button
          onClick={handleSwipeRight}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Like
        </button>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
