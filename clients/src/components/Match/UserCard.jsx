import React from "react";
import MatchButton from "./MatchButton";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold">{user.username}</h2>
      <p>{user.bio}</p>
      <MatchButton matchId={user._id} />
    </div>
  );
};

export default UserCard;
