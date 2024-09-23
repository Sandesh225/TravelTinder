import React from "react";
import { useGetMatchesQuery } from "../../features/apiSlice"; // Hook to get user matches
import Spinner from "../Layout/Spinner";
import MatchDetailCard from "./MatchDetailCard";

const MatchList = () => {
  const { data: matchesData, error, isLoading } = useGetMatchesQuery(); // Fetch matches

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-center text-red-500">Error loading matches</p>;

  const matches = matchesData?.data || [];

  return (
    <section className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Matches</h1>
      {matches.length === 0 ? (
        <p className="text-center">You have no matches yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <MatchDetailCard key={match._id} match={match} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MatchList;
