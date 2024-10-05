// src/components/Matching/MatchesList.jsx
import React from "react";

const MatchesList = ({ matches }) => {
  if (!matches.length) {
    return <p className="text-center text-gray-500">No matches yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {matches.map((match) => (
        <div
          key={match.id}
          className="bg-white shadow-lg rounded-lg p-4 text-center"
        >
          <img
            src={match.profilePicture}
            alt={match.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-bold">{match.name}</h3>
          <p className="text-gray-600">{match.location}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchesList;
