import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProfileMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const navigate = useNavigate();

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
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formState.age || formState.age <= 0) {
      toast.error("Please enter a valid age.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await createProfile({
        ...formState,
        userId: user?._id,
      }).unwrap();
      toast.success(response?.message || "Profile created successfully!");
      navigate("/profile"); // Redirect to profile page after successful creation
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create profile.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Set Up Your Profile</h1>
      <h2 className="text-xl mb-6">Welcome, {user?.username}!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Age</label>
          <input
            name="age"
            type="number"
            value={formState.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
            min="1"
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            name="location"
            type="text"
            value={formState.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formState.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
            disabled={isLoading}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Interests</label>
          <input
            name="interests"
            type="text"
            value={formState.interests}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="E.g., Traveling, Hiking"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          disabled={isLoading}
          aria-label="Save Profile"
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
