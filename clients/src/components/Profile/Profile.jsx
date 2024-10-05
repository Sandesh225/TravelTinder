import React from "react";
import { useGetMyProfileQuery } from "../../features/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { data: profile, isLoading, error } = useGetMyProfileQuery();
  const navigate = useNavigate();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    toast.error("Failed to load profile");
    return <div>Error loading profile. Please try again.</div>;
  }

  // If no profile exists, show a message and offer to set up a profile
  if (!profile) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          No Profile Found
        </h2>
        <p>You have not set up a profile yet.</p>
        <button
          onClick={() => navigate("/profile-setup")}
          className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Set Up Profile
        </button>
      </div>
    );
  }

  // Display profile details if profile exists
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Bio: </span>
        <p>{profile.data.bio}</p>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Age: </span>
        <p>{profile.data.age}</p>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Gender: </span>
        <p>{profile.data.gender}</p>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Interests: </span>
        <p>
          {profile.data.interests?.length
            ? profile.data.interests.join(", ")
            : "No interests listed"}
        </p>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Location: </span>
        <p>{profile.data.location}</p>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Avatar: </span>
        <img
          src={profile.data.avatar}
          alt="Profile Avatar"
          className="w-32 h-32 object-cover rounded-full"
        />
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Travel Images: </span>
        <div className="flex gap-4">
          {profile.data.travelImages?.length ? (
            profile.data.travelImages.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Travel Image ${idx + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No travel images uploaded</p>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/profile-setup")}
        className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
