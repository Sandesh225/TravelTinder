// src/pages/Dashboard.jsx
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import PreferencesForm from "./PreferencesForm";

const userMockData = {
  username: "johndoe",
  bio: "Travel lover and adventure seeker.",
  profilePicture: "",
  travelPreferences: {
    destinations: "Bali, Paris",
    dates: { start: "2024-01-01", end: "2024-01-10" },
    groupSize: 4,
    budget: { min: 1000, max: 5000 },
    activities: ["hiking", "sightseeing", "food tasting"],
  },
};

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userMockData);

  const handleSavePreferences = (updatedPreferences) => {
    setUser({ ...user, travelPreferences: updatedPreferences });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {!isEditing ? (
        <ProfileCard user={user} onEditPreferences={() => setIsEditing(true)} />
      ) : (
        <PreferencesForm
          userPreferences={user.travelPreferences}
          onSave={handleSavePreferences}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
