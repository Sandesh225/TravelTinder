import React, { useState } from "react";
import { useCreateProfileMutation } from "./userApiSlice";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const [profileData, setProfileData] = useState({
    bio: "",
    age: "",
    gender: "",
    interests: "",
    photos: "",
  });

  const [createProfile, { isLoading }] = useCreateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...profileData,
        interests: profileData.interests.split(",").map((item) => item.trim()), // Split interests into array
        photos: profileData.photos
          .split(",")
          .map((item) => ({ url: item.trim() })), // Split photos into array
      };
      await createProfile(formattedData).unwrap();
      toast.success("Profile created successfully!");
    } catch (error) {
      toast.error("Failed to create profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>

      <label className="block mb-2 font-medium">Bio:</label>
      <input
        type="text"
        value={profileData.bio}
        onChange={(e) =>
          setProfileData({ ...profileData, bio: e.target.value })
        }
        placeholder="Enter bio"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-medium">Age:</label>
      <input
        type="number"
        value={profileData.age}
        onChange={(e) =>
          setProfileData({ ...profileData, age: e.target.value })
        }
        placeholder="Enter age"
        className="w-full p-2 border rounded mb-4"
        min="18"
        max="100"
        required
      />

      <label className="block mb-2 font-medium">Gender:</label>
      <select
        value={profileData.gender}
        onChange={(e) =>
          setProfileData({ ...profileData, gender: e.target.value })
        }
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label className="block mb-2 font-medium">
        Interests (comma-separated):
      </label>
      <input
        type="text"
        value={profileData.interests}
        onChange={(e) =>
          setProfileData({ ...profileData, interests: e.target.value })
        }
        placeholder="Enter interests (e.g., Traveling, Hiking, Cooking)"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-medium">
        Photos (comma-separated URLs):
      </label>
      <input
        type="text"
        value={profileData.photos}
        onChange={(e) =>
          setProfileData({ ...profileData, photos: e.target.value })
        }
        placeholder="Enter photo URLs (e.g., http://example.com/photo1.jpg)"
        className="w-full p-2 border rounded mb-4"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? "Creating..." : "Create Profile"}
      </button>
    </form>
  );
};

export default CreateProfile;
