import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useGetAllUsersQuery } from "../../app/features/apiSlice"; // RTK Query
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // To display feedback to the user
import "react-toastify/dist/ReactToastify.css";

const SwipeCard = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery(); // Fetch users
  const { user: currentUser, isAuthenticated } = useSelector(
    (state) => state.auth
  ); // Auth state
  const [userIndex, setUserIndex] = useState(0); // Track current card index
  const [swipeDirection, setSwipeDirection] = useState(null); // Track the swipe direction

  // Handle swiping action
  const swiped = (direction, userName) => {
    setSwipeDirection(direction);
    if (direction === "right") {
      toast.success(`You liked ${userName}!`);
      // Handle logic for liking
    } else if (direction === "left") {
      toast.error(`You disliked ${userName}`);
      // Handle logic for disliking
    }
    setUserIndex((prevIndex) => prevIndex + 1); // Move to the next card
  };

  // Handle when the card leaves the screen
  const outOfFrame = (userName) => {
    console.log(`${userName} left the screen`);
  };

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-500">
        Error fetching users
      </div>
    );

  return (
    <div className="swipe-container flex justify-center items-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <div className="swipe-card w-full max-w-lg h-128 relative">
        {users.data && users.data.length > 0 ? (
          users.data.map((user, index) => (
            <TinderCard
              className={`absolute w-full h-full transform transition-transform ${
                swipeDirection === "right"
                  ? "hover:scale-105"
                  : swipeDirection === "left"
                  ? "hover:scale-95"
                  : ""
              }`}
              key={user._id}
              onSwipe={(dir) => swiped(dir, user.username)}
              onCardLeftScreen={() => outOfFrame(user.username)}
            >
              <div className="bg-white shadow-2xl rounded-lg p-6 flex flex-col justify-between h-full transition-transform duration-300 transform hover:shadow-lg">
                <img
                  src={user.profile?.picture || "default-profile.png"} // User's profile picture or default
                  alt={user.username}
                  className="w-full h-2/3 object-cover rounded-lg shadow-lg transition-opacity hover:opacity-90"
                />
                <div className="flex flex-col items-center text-center mt-4 space-y-2">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {user.username}
                  </h2>
                  <p className="text-gray-600">
                    {user.profile?.bio || "No bio available"}
                  </p>
                  <p className="text-gray-600">
                    {user.profile?.age || "N/A"} years old
                  </p>
                  <p className="text-gray-600">
                    {user.profile?.gender || "Not specified"}
                  </p>
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <div className="text-center text-white text-lg">
            No more users available.
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeCard;
