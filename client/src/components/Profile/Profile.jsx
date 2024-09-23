import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../features/apiSlice";

const Profile = ({ profile }) => {
  const [bio, setBio] = useState(profile?.bio || "");
  const [age, setAge] = useState(profile?.age || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [gender, setGender] = useState(profile?.gender || "");
  const [interests, setInterests] = useState(profile?.interests || []);
  const [photos, setPhotos] = useState(profile?.photos || []);
  const navigate = useNavigate();

  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = { bio, age, location, gender, interests, photos };
      await updateProfile(profileData).unwrap();
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-3xl font-bold mb-6">Set Up Your Profile</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Bio:
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Tell us about yourself"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Age:
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your age"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Gender:
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interests:
        </label>
        <input
          type="text"
          value={interests.join(", ")}
          onChange={(e) => setInterests(e.target.value.split(", "))}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your interests, separated by commas"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>
    </form>
  );
};

export default Profile;
