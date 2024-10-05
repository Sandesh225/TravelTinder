import React from "react";
import { useParams } from "react-router-dom";
import { useGetProfileByIdQuery } from "../../features/apiSlice"; // Import the new hook
import Spinner from "../Layout/Spinner";
import TravelPreferenceCard from "./../Travel/TravelPreferenceCard";

const ProfileDetail = () => {
  const { id } = useParams(); // Extract the profile ID from the URL
  const { data: profileData, error, isLoading } = useGetProfileByIdQuery(id); // Fetch profile data using ID

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-center text-red-500">Error loading profile</p>;

  const profile = profileData?.data;
  const travelPreferences = profile.travelPreferences || {};

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Profile Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Profile Picture */}
        <img
          src={profile?.photos?.[0]?.url || "/default-profile.png"} // Show default picture if not available
          alt={profile?.bio || "Profile picture"}
          className="w-32 h-32 mx-auto rounded-full mb-4"
        />

        {/* Username */}
        <h2 className="text-2xl font-bold mb-2">
          {profile?.user?.username || "Anonymous User"}{" "}
          {/* Fallback to "Anonymous User" */}
        </h2>

        {/* Bio */}
        <p className="text-gray-600 mb-4">
          {profile?.bio?.trim() ? profile.bio : "No bio available"}{" "}
          {/* Fallback to "No bio available" if bio not present */}
        </p>

        {/* Age */}
        <p className="text-gray-700 mb-4">
          {profile?.age !== undefined && profile?.age !== null
            ? `Age: ${profile.age}`
            : "Age: Not specified"}{" "}
          {/* Fallback for missing age */}
        </p>

        {/* Gender */}
        <p className="text-gray-700 mb-4">
          {profile?.gender
            ? `Gender: ${profile.gender}`
            : "Gender: Not specified"}{" "}
          {/* Fallback for missing gender */}
        </p>

        {/* Location */}
        <p className="text-gray-700 mb-4">
          {profile?.location?.trim()
            ? `Location: ${profile.location}`
            : "Location: Not specified"}{" "}
          {/* Fallback for missing location */}
        </p>

        {/* Interests */}
        <p className="text-gray-700 mb-4">
          {profile?.interests?.length > 0
            ? `Interests: ${profile.interests.join(", ")}`
            : "Interests: Not specified"}
        </p>
      </div>
      <div className="max-w-lg mx-auto">
        {/* Display travel preferences */}
        <TravelPreferenceCard preferences={travelPreferences} />
      </div>
    </div>
  );
};

export default ProfileDetail;
