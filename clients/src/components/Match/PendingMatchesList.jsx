// src/components/PendingMatches.js
import React from "react";
import { useGetPendingMatchesQuery } from "../../features/apiSlice";

const PendingMatches = () => {
  const {
    data: pendingMatches,
    isLoading,
    error,
  } = useGetPendingMatchesQuery();

  if (isLoading) return <p>Loading pending matches...</p>;
  if (error) return <p>Error loading pending matches: {error.message}</p>;

  return (
    <div className="pending-matches">
      <h2>Pending Matches</h2>
      {pendingMatches?.length > 0 ? (
        <ul>
          {pendingMatches.map((match) => (
            <li key={match._id}>
              <div>
                <p>{match.user1.username} swiped right on you!</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending matches found</p>
      )}
    </div>
  );
};

export default PendingMatches;
