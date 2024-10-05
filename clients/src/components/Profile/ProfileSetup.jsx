import React, { useState } from "react";
import {
  useUpsertProfileMutation,
  useGetMyProfileQuery,
} from "../../features/apiSlice";
import { toast } from "react-toastify";

const ProfileSetup = () => {
  const { data: profile, isLoading: loadingProfile } = useGetMyProfileQuery();
  const [upsertProfile, { isLoading }] = useUpsertProfileMutation();

  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    age: profile?.age || "",
    gender: profile?.gender || "",
    interests: profile?.interests || "",
    location: profile?.location || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [travelImage, setTravelImage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("bio", formData.bio);
    form.append("age", formData.age);
    form.append("gender", formData.gender);
    form.append("interests", formData.interests);
    form.append("location", formData.location);
    if (avatar) form.append("avatar", avatar);

    // Append travel images
    travelImage.forEach((file, i) => form.append(`travelImage[${i}]`, file));

    try {
      await upsertProfile(form).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create or Update Profile
      </h2>

      {loadingProfile ? (
        <p>Loading profile...</p>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block mb-4">
            <span className="text-gray-700">Bio</span>
            <textarea
              name="bio"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Enter a short bio"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Age</span>
            <input
              type="number"
              name="age"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              value={formData.age}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Gender</span>
            <select
              name="gender"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Interests</span>
            <input
              type="text"
              name="interests"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="Enter interests (comma-separated)"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Location</span>
            <input
              type="text"
              name="location"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter city or location"
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
      )}
    </div>
  );
};

export default ProfileSetup;
