import React from "react";
import { useGetMatchesQuery } from "../../features/apiSlice";
import MatchActionButton from "./MatchActionButton";

const MatchRequests = () => {
  const { data: matches, isLoading, error } = useGetMatchesQuery();

  if (isLoading) return <div>Loading match requests...</div>;
  if (error) return <div>Error loading match requests.</div>;

  const pendingMatches = matches?.data?.matches?.filter(
    (match) => match.status === "Pending"
  );

  return (
    <div>
      <h2 className="text-2xl font-bold">Match Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pendingMatches.length ? (
          pendingMatches.map((match) => (
            <div key={match._id} className="bg-white shadow-lg rounded-lg p-4">
              <h3>{match.user1.username} wants to match with you</h3>
              <MatchActionButton matchId={match._id} />
            </div>
          ))
        ) : (
          <p>No match requests available.</p>
        )}
      </div>
    </div>
  );
};

export default MatchRequests;
