// src/components/FindMatches.jsx
import React, { useEffect } from "react";
import { useFindMatchesQuery } from "../../features/apiSlice";
import { toast } from "react-toastify";

const FindMatches = () => {
  const { data: matches, error, isLoading } = useFindMatchesQuery();

  // Move toast notifications to useEffect
  useEffect(() => {
    if (error) {
      toast.error("Failed to load matches");
    }
  }, [error]); // Only trigger when there's an error

  if (isLoading) return <p>Loading matches...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Travel Matches
      </h2>
      {matches?.length ? (
        <ul>
          {matches.map((match) => (
            <li key={match._id} className="mb-4">
              <span className="text-lg font-semibold">
                {match.user.username}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default FindMatches;
