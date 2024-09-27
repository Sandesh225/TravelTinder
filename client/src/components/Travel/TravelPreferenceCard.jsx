import React from "react";

const TravelPreferenceCard = ({ preferences }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4">Travel Preferences</h2>

      <div className="space-y-4">
        {/* Preferred Destinations */}
        <p className="text-gray-700">
          <span className="font-medium">Destinations:</span>{" "}
          {preferences?.preferredDestinations || "Not specified"}
        </p>

        {/* Budget Range */}
        <p className="text-gray-700">
          <span className="font-medium">Budget:</span>{" "}
          {preferences?.budgetRange || "Not specified"}
        </p>

        {/* Group Size */}
        <p className="text-gray-700">
          <span className="font-medium">Group Size:</span>{" "}
          {preferences?.groupSize || "Not specified"}
        </p>

        {/* Travel Dates */}
        <p className="text-gray-700">
          <span className="font-medium">Travel Dates:</span>{" "}
          {preferences?.travelDates || "Not specified"}
        </p>

        {/* Preferred Activities */}
        <p className="text-gray-700">
          <span className="font-medium">Activities:</span>{" "}
          {preferences?.activities || "Not specified"}
        </p>

        {/* Travel Medium */}
        <p className="text-gray-700">
          <span className="font-medium">Travel Medium:</span>{" "}
          {preferences?.travelMedium || "Not specified"}
        </p>
      </div>
    </div>
  );
};

export default TravelPreferenceCard;
