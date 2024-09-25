import React, { useState } from "react";
import { useCreateMatchMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const CreateMatch = () => {
  const [userId, setUserId] = useState("");
  const [createMatch] = useCreateMatchMutation();

  const handleMatchUpdate = async (matchId, status) => {
    try {
      await updateMatchStatus({ matchId, status });
      toast.success("Match updated successfully!");
    } catch (error) {
      toast.error("Error updating match status");
    }
  };

  return (
    <div>
      <h1>Create a Match</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID to match with"
      />
      <button onClick={handleMatchUpdate}>Create Match</button>
    </div>
  );
};

export default CreateMatch;
