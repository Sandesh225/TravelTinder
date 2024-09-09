import React, { useState, useEffect } from "react";
import { useGetAllProfilesQuery } from "../../features/apiSlice";
import { toast } from "react-toastify";
import "./Explore.css"; // Add custom styles here

const Explore = () => {
  const { data, isLoading, isError } = useGetAllProfilesQuery();

  // Extract the profiles from the response
  const profiles = data?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("Profiles data:", profiles);
    if (isError) {
      toast.error("Failed to load profiles.");
    }
  }, [profiles, isError]);

  const handleScrollLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < profiles.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="explore-container">
      <button className="scroll-button left" onClick={handleScrollLeft}>
        &lt;
      </button>
      {profiles.length > 0 ? (
        <div className="profile-card">
          <img
            src={
              profiles[currentIndex].photos[0] || "/path/to/default-image.jpg"
            }
            alt={profiles[currentIndex].user.username}
            className="profile-photo"
          />
          <h2>{profiles[currentIndex].user.username}</h2>
          <p>
            <strong>Age:</strong> {profiles[currentIndex].age}
          </p>
          <p>
            <strong>Location:</strong> {profiles[currentIndex].location}
          </p>
          <p>
            <strong>Gender:</strong> {profiles[currentIndex].gender}
          </p>
          <p>
            <strong>Interests:</strong>{" "}
            {profiles[currentIndex].interests.join(", ")}
          </p>
          <p>
            <strong>Bio:</strong> {profiles[currentIndex].bio}
          </p>
        </div>
      ) : (
        <p>No profiles available.</p>
      )}
      <button className="scroll-button right" onClick={handleScrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default Explore;
