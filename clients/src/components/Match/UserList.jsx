import React, { useEffect } from "react";
import { useFindMatchesQuery } from "../../features/apiSlice";
import UserCard from "./UserCard";

const UserList = () => {
  const { data: matches, error, isLoading } = useFindMatchesQuery();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {matches?.data?.matches?.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
