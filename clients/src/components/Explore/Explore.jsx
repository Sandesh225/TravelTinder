import React, { useState } from "react";
import {
  useGetAllProfilesForExploreQuery,
  useSwipeUserMutation,
} from "../../features/apiSlice";
import { toast } from "react-toastify";
import SwipeableViews from "react-swipeable-views";

const Explore = () => {
  const { data: profiles, isLoading } = useGetAllProfilesForExploreQuery();
  const [swipeUser] = useSwipeUserMutation();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <div>Loading profiles...</div>;
  }

  const handleSwipe = async (direction, userId) => {
    try {
      const response = await swipeUser({
        targetUserId: userId,
        swipeDirection: direction,
      }).unwrap();

      if (response.match) {
        toast.success("It's a match!");
      } else {
        toast.info("Swipe recorded!");
      }
    } catch (err) {
      toast.error("Failed to swipe!");
    }
  };

  const handleLeftSwipe = (userId) => {
    handleSwipe("Left", userId);
  };

  const handleRightSwipe = (userId) => {
    handleSwipe("Right", userId);
  };

  return (
    <div className="explore-page min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="max-w-lg w-full">
        {profiles && profiles.length > 0 ? (
          <SwipeableViews
            index={currentIndex}
            onChangeIndex={(index) => setCurrentIndex(index)}
            onSwitching={(index, type) => {
              if (type === "end") {
                setCurrentIndex(index);
              }
            }}
            enableMouseEvents
          >
            {profiles.map((profile) => (
              <div
                key={profile._id}
                className="p-6 bg-white shadow-lg rounded-lg mb-4"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={profile.avatar || "/default-avatar.png"}
                    alt={profile.user.username}
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {profile.user.username}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {profile.age} years old
                  </p>
                  <p className="text-gray-500 text-center">{profile.bio}</p>
                </div>
                <div className="mt-4 flex justify-around">
                  <button
                    onClick={() => handleLeftSwipe(profile._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => handleRightSwipe(profile._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-full"
                  >
                    Like
                  </button>
                </div>
              </div>
            ))}
          </SwipeableViews>
        ) : (
          <div>No profiles available</div>
        )}
      </div>
    </div>
  );
};

export default Explore;
