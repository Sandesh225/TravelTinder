import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} from "../../features/apiSlice";

const Profile = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    data: profileResponse,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  const [formState, setFormState] = useState({
    bio: "",
    age: "",
    location: "",
    gender: "",
    interests: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Please log in to access this page.");
    } else if (profileResponse?.data) {
      const profile = profileResponse.data;
      setFormState({
        bio: profile.bio || "",
        age: profile.age || "",
        location: profile.location || "",
        gender: profile.gender || "",
        interests: profile.interests || "",
      });
    }
  }, [isAuthenticated, navigate, profileResponse]);

  useEffect(() => {
    if (user?.username) {
      // Double-check the user data once it's available
      setFormState((prevState) => ({
        ...prevState,
        user: user.username || prevState.user,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { bio, age, location, gender, interests } = formState;
    if (!bio || !age || !location || !gender || !interests) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await updateProfile(formState).unwrap();
      toast.success(response?.message || "Profile updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfile().unwrap();
      toast.success("Profile deleted successfully!");
      navigate("/profile-setup");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {error?.data?.message || "Profile not found."}
          </span>
        </div>
        <div className="mt-4">
          <Link to="/profile-setup" className="text-blue-600 hover:underline">
            Set up your profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">User Details</h2>
        <p className="mt-2">
          <strong>Username:</strong> {user?.username || "N/A"}
        </p>
        <p className="mt-2">
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
      </div>

      {profileResponse?.data ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Profile Information</h2>
            <p className="mt-2">
              <strong>Bio:</strong> {formState.bio}
            </p>
            <p className="mt-2">
              <strong>Age:</strong> {formState.age}
            </p>
            <p className="mt-2">
              <strong>Location:</strong> {formState.location}
            </p>
            <p className="mt-2">
              <strong>Gender:</strong> {formState.gender}
            </p>
            <p className="mt-2">
              <strong>Interests:</strong> {formState.interests}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <textarea
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              placeholder="Update your bio..."
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
            <input
              name="age"
              type="number"
              value={formState.age}
              onChange={handleChange}
              placeholder="Update your age"
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
            <input
              name="location"
              value={formState.location}
              onChange={handleChange}
              placeholder="Update your location"
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
            <select
              name="gender"
              value={formState.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="interests"
              value={formState.interests}
              onChange={handleChange}
              placeholder="Update your interests"
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Update Profile
            </button>
          </form>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 mt-4"
          >
            Delete Profile
          </button>
        </>
      ) : (
        <div className="text-center mt-10">
          <p>No profile found. Would you like to set up your profile?</p>
          <Link
            to="/profile-setup"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Set up your profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
