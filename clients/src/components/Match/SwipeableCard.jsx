import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useGetAllProfilesForMatchingQuery } from "../../features/apiSlice"; // Correct hook for fetching all profiles

const SwipeableCard = () => {
  // Fetch profiles with default filters (or empty filters if not provided)
  const { data: profiles, isLoading } = useGetAllProfilesForMatchingQuery({});

  const [currentIndex, setCurrentIndex] = useState(profiles?.length - 1); // Track the index of the current user

  const handleSwipe = (direction, profileId) => {
    console.log(`You swiped ${direction} on ${profileId}`);
    // Handle swipe logic here
  };

  const handleCardLeftScreen = (profileId) => {
    console.log(`${profileId} left the screen`);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  if (isLoading) {
    return <p>Loading profiles...</p>;
  }

  if (!profiles || profiles.length === 0) {
    return <p>No profiles available.</p>;
  }

  return (
    <div className="swipeable-container flex justify-center items-center">
      {profiles.map((profile, index) => (
        <TinderCard
          className="swipeable-card absolute"
          key={profile._id}
          onSwipe={(dir) => handleSwipe(dir, profile._id)}
          onCardLeftScreen={() => handleCardLeftScreen(profile._id)}
        >
          <div
            className="w-80 h-96 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            style={{
              backgroundImage: `url(${profile.avatar})`,
              backgroundSize: "cover",
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-black to-transparent absolute top-0 left-0 rounded-lg opacity-75"></div>
            <div className="relative z-10 text-center text-white">
              <h3 className="text-xl font-bold">{profile.user.username}</h3>
              <p className="text-sm mt-2">{profile.age} years old</p>
              <p className="text-xs mt-4">{profile.bio}</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeableCard;
