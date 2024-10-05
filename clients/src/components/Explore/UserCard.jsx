import React from "react";
import LikeButton from "./LikeButton";

const UserCard = ({ profile }) => {
  const user = profile?.user; // Add null check for user

  if (!user) {
    // If user is null or undefined, return null to skip rendering this card
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-64 flex-shrink-0">
      <img
        src={profile.photos?.[0]?.url || "/default-profile.png"}
        alt={user.username || "Profile picture"}
        className="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold text-center">
        {user.username || "Anonymous"}
      </h2>
      <p className="text-center text-gray-600">Age: {profile.age || "N/A"}</p>
      <p className="text-center text-gray-600">
        {profile.bio || "No bio available"}
      </p>
      <LikeButton user2Id={user._id} />
    </div>
  );
};

export default UserCard;
