// src/components/SwipeRight.js
import React, { useState } from "react";
import { useSwipeRightMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const SwipeRight = () => {
  const [targetUserId, setTargetUserId] = useState("");
  const [swipeRight] = useSwipeRightMutation();

  const handleSwipe = async () => {
    try {
      await swipeRight(targetUserId).unwrap();
      toast.success("Swipe recorded successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Swipe failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Swipe Right on a User
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700">Target User ID</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </label>

      <button
        onClick={handleSwipe}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        Swipe Right
      </button>
    </div>
  );
};

export default SwipeRight;
