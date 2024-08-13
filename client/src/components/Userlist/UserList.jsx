import React from "react";
import { useFetchAllUsersQuery } from "../../features/apiSlice";

function UserList() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold">User List</h1>
      <ul className="mt-6">
        {users.map((user) => (
          <li key={user.id} className="mb-4">
            <div className="bg-gray-100 p-4 rounded shadow">
              <p className="font-semibold">Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
