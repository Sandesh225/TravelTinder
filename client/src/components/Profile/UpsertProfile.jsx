// src/components/UpsertProfile.js
import React, { useState } from "react";
import { useUpsertProfileMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const UpsertProfile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    age: "",
    gender: "",
    interests: "",
    location: {
      coordinates: "",
      city: "",
    },
  });
  const [avatar, setAvatar] = useState(null);
  const [travelImage, setTravelImage] = useState([]);
  const [upsertProfile, { isLoading }] = useUpsertProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("bio", formData.bio);
    form.append("age", formData.age);
    form.append("gender", formData.gender);
    form.append("interests", formData.interests);
    form.append("avatar", avatar);
    travelImage.forEach((file, i) => form.append(`travelImage[${i}]`, file));
    form.append("location[coordinates]", formData.location.coordinates);
    form.append("location[city]", formData.location.city);

    try {
      await upsertProfile(form).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create or Update Profile
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700">Bio</span>
        <textarea
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Enter a short bio"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Age</span>
        <input
          type="number"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Gender</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Interests</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.interests}
          onChange={(e) =>
            setFormData({ ...formData, interests: e.target.value })
          }
          placeholder="Enter interests (comma-separated)"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Location (Coordinates)</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.location.coordinates}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: { ...formData.location, coordinates: e.target.value },
            })
          }
          placeholder="Enter location coordinates (latitude, longitude)"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">City</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.location.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: { ...formData.location, city: e.target.value },
            })
          }
          placeholder="Enter city name"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Avatar</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Travel Images</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setTravelImage([...e.target.files])}
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        {isLoading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default UpsertProfile;
