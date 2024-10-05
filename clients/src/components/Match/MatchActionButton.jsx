import React from "react";
import { useHandleMatchMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const MatchActionButton = ({ matchId }) => {
  const [handleMatch, { isLoading }] = useHandleMatchMutation();

  const acceptMatch = async () => {
    try {
      await handleMatch({ matchId, status: "accepted" }).unwrap();
      toast.success("Match accepted!");
    } catch (error) {
      toast.error("Failed to accept match.");
    }
  };

  const rejectMatch = async () => {
    try {
      await handleMatch({ matchId, status: "rejected" }).unwrap();
      toast.success("Match rejected.");
    } catch (error) {
      toast.error("Failed to reject match.");
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={acceptMatch}
        disabled={isLoading}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        {isLoading ? "Processing..." : "Accept"}
      </button>
      <button
        onClick={rejectMatch}
        disabled={isLoading}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        {isLoading ? "Processing..." : "Reject"}
      </button>
    </div>
  );
};

export default MatchActionButton;
