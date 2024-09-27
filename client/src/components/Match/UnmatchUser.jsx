// src/components/UnmatchUser.js
import React, { useState } from "react";
import { useUnmatchUserMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const UnmatchUser = () => {
  const [matchId, setMatchId] = useState("");
  const [unmatchUser, { isLoading }] = useUnmatchUserMutation();

  const handleUnmatch = async () => {
    try {
      await unmatchUser(matchId).unwrap();
      toast.success("Successfully unmatched");
    } catch (err) {
      toast.error(err?.data?.message || "Unmatch failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Unmatch a User
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700">Match ID</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          placeholder="Enter Match ID"
        />
      </label>

      <button
        onClick={handleUnmatch}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
      >
        {isLoading ? "Unmatching..." : "Unmatch"}
      </button>
    </div>
  );
};

export default UnmatchUser;
