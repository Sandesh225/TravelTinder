import React from "react";
import { useHandleMatchMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const MatchButton = ({ matchId }) => {
  const [handleMatch, { isLoading }] = useHandleMatchMutation();

  const sendMatchRequest = async () => {
    try {
      await handleMatch({ matchId, status: "accepted" }).unwrap();
      toast.success("Match request sent!");
    } catch (error) {
      toast.error("Failed to send match request.");
    }
  };

  return (
    <button
      onClick={sendMatchRequest}
      disabled={isLoading}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
    >
      {isLoading ? "Sending..." : "Like"}
    </button>
  );
};

export default MatchButton;
