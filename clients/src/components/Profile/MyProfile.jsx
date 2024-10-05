import React from "react";
import { useGetMyProfileQuery } from "../../features/apiSlice";

const MyProfile = () => {
  const { data: profile, isLoading, error } = useGetMyProfileQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load profile.</p>;

  return (
    <div className="profile">
      <img src={profile.avatar} alt={profile.user.username} />
      <h2>{profile.user.username}</h2>
      <p>{profile.bio}</p>
      <p>Age: {profile.age}</p>
      <p>Gender: {profile.gender}</p>
      <p>Interests: {profile.interests.join(", ")}</p>
    </div>
  );
};

export default MyProfile;
