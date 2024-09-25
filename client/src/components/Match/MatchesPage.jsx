import React from "react";
import {
  useGetMatchesQuery,
  useHandleMatchMutation,
} from "../../features/apiSlice";
import Spinner from "../Layout/Spinner";
import { toast } from "react-toastify";

const MatchesPage = () => {
  const { data: matchesData, error, isLoading } = useGetMatchesQuery();
  const [handleMatch] = useHandleMatchMutation();

  const handleDecision = async (matchId, status) => {
    try {
      await handleMatch({ matchId, status });
      toast.success(`Match ${status} successfully!`);
    } catch (error) {
      toast.error(`Error ${status} match`);
    }
  };

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-center text-red-500">Error loading matches</p>;

  const matches = matchesData?.data || [];

  return (
    <section className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Matches</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.length === 0 ? (
          <p className="text-center text-gray-500">No matches found.</p>
        ) : (
          matches.map((match) => (
            <div
              key={match._id}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <img
                src={match.user2.photos?.[0]?.url || "/default-profile.png"}
                alt={match.user2.username || "Profile picture"}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h2 className="text-2xl font-bold">
                {match.user2.username || "Anonymous"}
              </h2>
              <p className="text-gray-600">
                {match.user2.bio || "No bio available"}
              </p>

              <div className="mt-4">
                {/* Accept or Reject match buttons */}
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
                  onClick={() => handleDecision(match._id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => handleDecision(match._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MatchesPage;
