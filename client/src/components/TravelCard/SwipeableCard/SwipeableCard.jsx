// src/components/ProfileExplorer.js

import React from "react";
import { useGetAllProfilesForExploreQuery } from "../../../app/features/apiSlice";
import TinderCard from "react-tinder-card";
import "./style.css"; // Optional: You can create a CSS file for custom styles

const SwipeableCard = () => {
  const {
    data: profiles,
    isLoading,
    isError,
  } = useGetAllProfilesForExploreQuery();

  const handleSwipe = (profile, direction) => {
    // Handle swipe action (e.g., update state, call an API to record the swipe, etc.)
    console.log(`Swiped ${direction} on ${profile.user.username}`);
    // You can call an API here to record the swipe action
  };

  if (isLoading) {
    return <div>Loading profiles...</div>;
  }

  if (isError) {
    return <div>Error fetching profiles</div>;
  }

  return (
    <div className="swipeable-card-container flex justify-center items-center">
      {profiles.map((profile) => (
        <TinderCard
          key={profile._id}
          onSwipe={(dir) => handleSwipe(profile, dir)}
          preventSwipe={["up", "down"]} // Prevent up and down swipes if not needed
        >
          <div className="profile-card">
            <img
              src={profile.avatar}
              alt={`${profile.user.username}'s avatar`}
              className="avatar"
            />
            <h3 className="username">{profile.user.username}</h3>
            <p className="bio">Age: {profile.age}</p>
            <p className="bio">Gender: {profile.gender}</p>
            <p className="bio">{profile.bio}</p>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeableCard;
