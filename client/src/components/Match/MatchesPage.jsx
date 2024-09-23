import React, { useState } from "react";
import {
  useGetMatchesQuery,
  useUpdateMatchStatusMutation,
  useDeleteMatchMutation,
} from "../../features/apiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const MatchesPage = () => {
  const { data: matches, error, isLoading } = useGetMatchesQuery();
  const [updateMatchStatus] = useUpdateMatchStatusMutation();
  const [deleteMatch] = useDeleteMatchMutation();
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>Error loading matches</div>;
  }

  const handleMatchStatus = async (matchId, status) => {
    try {
      await updateMatchStatus({ matchId, status });
      toast.success(`Match ${status} successfully!`);
    } catch (error) {
      toast.error("Failed to update match status");
    }
  };

  const handleDeleteMatch = async (matchId) => {
    try {
      await deleteMatch(matchId);
      toast.success("Match deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete match");
    }
  };

  return (
    <div className="matches-page">
      <h1>Your Matches</h1>
      {matches?.length ? (
        matches.map((match) => (
          <div key={match._id} className="match-item">
            <p>Matched with: {match.user.name}</p>
            <p>Status: {match.status}</p>
            <button onClick={() => handleMatchStatus(match._id, "Accepted")}>
              Accept
            </button>
            <button onClick={() => handleMatchStatus(match._id, "Rejected")}>
              Reject
            </button>
            <button onClick={() => handleDeleteMatch(match._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchesPage;
