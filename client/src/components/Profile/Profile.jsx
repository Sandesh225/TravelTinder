import React from "react";
import { useGetProfileQuery } from "../../slices/userApiSlice";

const Profile = () => {
  const { data: profile, error, isLoading } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div>
      <h1>{profile.username}'s Profile</h1>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
};

export default Profile;
