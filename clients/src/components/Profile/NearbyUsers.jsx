// src/components/NearbyUsers.js
import React, { useState } from "react";
import { useGetNearbyUsersQuery } from "../../features/apiSlice";
import { toast } from "react-toastify";

const NearbyUsers = () => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    distance: 50,
  });
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted

  const {
    data: nearbyUsers,
    error,
    isLoading,
  } = useGetNearbyUsersQuery(location, {
    skip: !submitted || !location.latitude || !location.longitude, // Prevent API call if form is incomplete
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location.latitude || !location.longitude) {
      toast.error("Please provide both latitude and longitude.");
      return;
    }

    setSubmitted(true); // Trigger the API call once the form is valid
  };

  if (isLoading) return <p>Loading nearby users...</p>;
  if (error) {
    toast.error("Failed to load nearby users");
    return <p>Error loading nearby users</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Nearby Users</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-4">
          <span className="text-gray-700">Latitude</span>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            value={location.latitude}
            onChange={(e) =>
              setLocation({ ...location, latitude: e.target.value })
            }
            placeholder="Enter latitude"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Longitude</span>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            value={location.longitude}
            onChange={(e) =>
              setLocation({ ...location, longitude: e.target.value })
            }
            placeholder="Enter longitude"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Distance (in km)</span>
          <input
            type="number"
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            value={location.distance}
            onChange={(e) =>
              setLocation({ ...location, distance: e.target.value })
            }
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Search Nearby Users
        </button>
      </form>

      {nearbyUsers?.length > 0 ? (
        <ul>
          {nearbyUsers.map((user) => (
            <li key={user._id} className="mb-4">
              <span>{user.user.username}</span> ({user.location.city})
            </li>
          ))}
        </ul>
      ) : (
        <p>No nearby users found.</p>
      )}
    </div>
  );
};

export default NearbyUsers;
