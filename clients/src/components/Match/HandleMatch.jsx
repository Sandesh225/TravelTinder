import React from "react";
import { useHandleMatchMutation } from "../../slices/userApiSlice";

const HandleMatch = ({ matchId }) => {
  const [handleMatch] = useHandleMatchMutation();

  const handleAccept = async () => {
    await handleMatch({ matchId, status: "accepted" });
  };

  const handleReject = async () => {
    await handleMatch({ matchId, status: "rejected" });
  };

  return (
    <div>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default HandleMatch;
