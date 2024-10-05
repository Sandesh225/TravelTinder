import React from "react";
import { useGetTravelPreferenceQuery } from "../../slices/userApiSlice";

const TravelPreference = () => {
  const {
    data: travelPreference,
    isLoading,
    error,
  } = useGetTravelPreferenceQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading travel preferences</div>;

  return (
    <div>
      <h1>Travel Preferences</h1>
      <p>
        Preferred Destinations:{" "}
        {travelPreference.preferredDestinations.join(", ")}
      </p>
      <p>Group Size: {travelPreference.preferredGroupSize}</p>
      <p>
        Budget Range: {travelPreference.budgetRange.min} -{" "}
        {travelPreference.budgetRange.max}
      </p>
    </div>
  );
};

export default TravelPreference;
