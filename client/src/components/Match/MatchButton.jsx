// src/components/Match/MatchButton.jsx
import React from "react";
import {
  useCreateMatchMutation,
  useUpdateMatchStatusMutation,
} from "../../features/apiSlice";

const MatchButton = ({ user1Id, user2Id, matchId, status }) => {
  const [createMatch] = useCreateMatchMutation();
  const [updateMatchStatus] = useUpdateMatchStatusMutation();

  const handleMatchRequest = async () => {
    try {
      if (matchId) {
        // Update match status if the match exists
        await updateMatchStatus({ matchId, status: "Matched" });
      } else {
        // Create a new match
        await createMatch({ user1Id, user2Id });
      }
    } catch (error) {
      console.error("Error matching users", error);
    }
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      onClick={handleMatchRequest}
    >
      {matchId ? "Accept Match" : "Match"}
    </button>
  );
};

export default MatchButton;
