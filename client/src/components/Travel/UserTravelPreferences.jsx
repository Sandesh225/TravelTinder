import React, { useEffect } from "react";
import { useGetTravelPreferenceQuery } from "../../app/features/apiSlice";
import { toast } from "react-toastify";

const UserTravelPreferences = () => {
  const { data, error, isLoading } = useGetTravelPreferenceQuery();

  useEffect(() => {
    if (error) {
      console.error("Error fetching travel preferences:", error);
      toast.error("Error fetching travel preferences.");
    }
  }, [error]);

  useEffect(() => {
    console.log("Travel Preference Data:", data); // Debugging log
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center py-10">
          <div className="loader"></div>
          <p className="text-lg font-medium">Loading travel preferences...</p>
        </div>
      </div>
    );
  }

  // Check if data is available and structured as expected
  if (
    error ||
    !data ||
    !data.success ||
    !data.data ||
    !data.data.travelPreference
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold text-red-500">
            No travel preferences found.
          </h1>
        </div>
      </div>
    );
  }

  const { travelPreference } = data.data; // Access travelPreference from data.data

  return (
    <div className="container mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Travel Preferences
      </h2>
      <ul className="space-y-4">
        <li className="flex justify-between py-2 border-b border-gray-200">
          <strong>Preferred Destinations:</strong>
          <span>{travelPreference.preferredDestinations.join(", ")}</span>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <strong>Travel Dates:</strong>
          <span>
            {new Date(travelPreference.travelDates.start).toLocaleDateString()}{" "}
            - {new Date(travelPreference.travelDates.end).toLocaleDateString()}
          </span>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <strong>Group Size:</strong>
          <span>{travelPreference.preferredGroupSize}</span>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <strong>Budget Range:</strong>
          <span>
            ${travelPreference.budgetRange.min} - $
            {travelPreference.budgetRange.max}
          </span>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <strong>Activities:</strong>
          <span>{travelPreference.activities.join(", ")}</span>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <strong>Travel Medium:</strong>
          <span>{travelPreference.travelMedium}</span>
        </li>
      </ul>
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
          Edit Preferences
        </button>
      </div>
    </div>
  );
};

export default UserTravelPreferences;
