import React from "react";
import { useGetMatchesQuery } from "../../slices/userApiSlice";

const Matches = () => {
  const { data: matches, isLoading, error } = useGetMatchesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading matches</div>;

  return (
    <div>
      <h1>Your Matches</h1>
      {matches.map((match) => (
        <div key={match.id}>
          <p>{match.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Matches;
