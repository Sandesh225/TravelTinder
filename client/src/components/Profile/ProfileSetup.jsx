import React, { useState } from "react";
import { useUpdateProfileMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const ProfileSetup = () => {
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({ bio, age, location, gender, interests }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bio" className="block text-sm font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="interests" className="block text-sm font-medium">
          Interests
        </label>
        <input
          type="text"
          id="interests"
          placeholder="e.g., Traveling, Hiking"
          value={interests.join(", ")}
          onChange={(e) =>
            setInterests(e.target.value.split(",").map((i) => i.trim()))
          }
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
};

export default ProfileSetup;
