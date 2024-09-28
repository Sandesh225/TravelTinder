// src/components/Dashboard/ProfileCard.jsx
import React from "react";

const ProfileCard = ({ user, onEditPreferences }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <div className="flex items-center">
        <img
          src={user.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
          <p className="text-gray-600">{user.bio || "No bio available"}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Travel Preferences</h3>
        <ul className="text-gray-600">
          <li>
            <strong>Destinations:</strong>{" "}
            {user.travelPreferences.destinations || "Not set"}
          </li>
          <li>
            <strong>Travel Dates:</strong> {user.travelPreferences.dates?.start}{" "}
            - {user.travelPreferences.dates?.end}
          </li>
          <li>
            <strong>Group Size:</strong>{" "}
            {user.travelPreferences.groupSize || "Not set"}
          </li>
          <li>
            <strong>Budget Range:</strong> ${user.travelPreferences.budget?.min}{" "}
            - ${user.travelPreferences.budget?.max}
          </li>
          <li>
            <strong>Activities:</strong>{" "}
            {user.travelPreferences.activities?.join(", ") || "Not set"}
          </li>
        </ul>
        <button
          onClick={onEditPreferences}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Edit Preferences
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
