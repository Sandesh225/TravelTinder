import React, { useState, useEffect } from "react";
import { useGetTravelPreferencesQuery } from "../../features/apiSlice";
import TravelPreferenceCard from "./../Travel/TravelPreferenceCard";

import Spinner from "../Layout/Spinner"; // Use this for loading state
import TravelPreferenceForm from "./../Travel/TravelPreferenceForm";

const ProfilePage = () => {
  const {
    data: preferencesData,
    error,
    isLoading,
  } = useGetTravelPreferencesQuery();
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [initialPreferences, setInitialPreferences] = useState(null);

  useEffect(() => {
    if (preferencesData) {
      setInitialPreferences(preferencesData);
    }
  }, [preferencesData]);

  const handleEditClick = () => {
    setShowForm(!showForm);
  };

  if (isLoading) return <Spinner />; // Show loading state
  if (error) return <p className="text-red-500">Error loading preferences</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>

      {/* Show the travel preferences card */}
      {initialPreferences ? (
        <div className="mb-8">
          <TravelPreferenceCard preferences={initialPreferences} />
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "Edit Preferences"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No travel preferences found.
        </p>
      )}

      {/* Show the form for editing preferences */}
      {showForm && (
        <div className="mt-8">
          <TravelPreferenceForm initialPreferences={initialPreferences} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
