import React from "react";
import { useGetAllProfilesQuery } from "../../slices/userApiSlice";

const ProfileList = () => {
  const {
    data: profiles,
    error,
    isLoading,
  } = useGetAllProfilesQuery({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profiles</div>;

  return (
    <div>
      <h1>Profiles</h1>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
