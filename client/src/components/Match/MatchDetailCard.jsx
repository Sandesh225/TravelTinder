import React from "react";
import TravelPreferenceCard from "../Travel/TravelPreferenceCard"; // Reuse the travel preferences card

const MatchDetailCard = ({ match }) => {
  const { user1, user2, status, matchedOn } = match;

  // Determine which user is the match, depending on the logged-in user
  const matchedUser = user1?._id !== "LOGGED_IN_USER_ID" ? user1 : user2; // Replace with actual logged-in user logic

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="text-center mb-4">
        <img
          src={matchedUser?.photos?.[0]?.url || "/default-profile.png"}
          alt={matchedUser?.bio || "Profile picture"}
          className="w-32 h-32 mx-auto rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold">
          {matchedUser?.username || "Anonymous User"}
        </h2>
        <p className="text-gray-600 mb-4">
          {matchedUser?.bio || "No bio available"}
        </p>
        <p className="text-gray-700 mb-4">
          Matched on: {new Date(matchedOn).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4">Status: {status}</p>
      </div>

      {/* Travel Preferences */}
      <TravelPreferenceCard preferences={matchedUser?.travelPreferences} />
    </div>
  );
};

export default MatchDetailCard;
