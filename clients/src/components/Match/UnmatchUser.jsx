// src/components/UnmatchUser.js
import React from "react";
import { useUnmatchUserMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const UnmatchUser = ({ matchId }) => {
  const [unmatchUser, { isLoading }] = useUnmatchUserMutation();

  const handleUnmatch = async () => {
    try {
      await unmatchUser(matchId).unwrap();
      toast.success("You have unmatched successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to unmatch");
    }
  };

  return (
    <button
      onClick={handleUnmatch}
      disabled={isLoading}
      className="btn btn-warning"
    >
      Unmatch
    </button>
  );
};

export default UnmatchUser;
