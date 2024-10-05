// src/components/MatchList.js
import React from "react";
import { useGetMatchesQuery } from "../../features/apiSlice";

const MatchList = () => {
  const { data: matches, isLoading, error } = useGetMatchesQuery();

  if (isLoading) return <p>Loading matches...</p>;
  if (error) return <p>Error loading matches: {error.message}</p>;

  return (
    <div className="matches-list">
      <h2>Matches</h2>
      {matches?.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match._id}>
              <div>
                <p>
                  {match.user1.username} matched with {match.user2.username}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default MatchList;
