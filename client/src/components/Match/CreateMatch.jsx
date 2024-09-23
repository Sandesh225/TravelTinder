import React, { useState } from "react";
import { useCreateMatchMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const CreateMatch = () => {
  const [userId, setUserId] = useState("");
  const [createMatch] = useCreateMatchMutation();

  const handleCreateMatch = async () => {
    try {
      await createMatch({ userId });
      toast.success("Match created successfully!");
    } catch (error) {
      toast.error("Failed to create match");
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
      <button onClick={handleCreateMatch}>Create Match</button>
    </div>
  );
};

export default CreateMatch;
