import React, { useState } from "react";
import {
  useGetNearbyUsersQuery,
  useSwipeUserMutation,
  useGetPendingMatchesQuery,
  useUnmatchUserMutation,
} from "../../features/apiSlice";
import { toast } from "react-toastify";

const SwipePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: nearbyUsers, isLoading: loadingUsers } = useGetNearbyUsersQuery(
    { location: "your-location" }
  );
  const [swipeUser] = useSwipeUserMutation();
  const { data: pendingMatches } = useGetPendingMatchesQuery();
  const [unmatchUser] = useUnmatchUserMutation();

  const handleSwipe = async (targetUserId, direction) => {
    try {
      const response = await swipeUser({
        targetUserId,
        swipeDirection: direction,
      });
      if (response.data?.match) {
        toast.success("It's a match!");
      } else {
        toast.info("Swipe recorded!");
      }
    } catch (err) {
      toast.error("Failed to swipe!");
    }
  };

  const handleUnmatch = async (matchId) => {
    try {
      await unmatchUser({ matchId });
      toast.success("Unmatched successfully");
    } catch (err) {
      toast.error("Failed to unmatch!");
    }
  };

  if (loadingUsers) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center mb-6">Swipe Users</h2>
      {nearbyUsers && nearbyUsers.length > 0 ? (
        nearbyUsers.map((user, index) => (
          <div
            key={user._id}
            className={`swipe-card ${index === currentIndex ? "active" : ""}`}
          >
            <h3 className="text-xl font-bold">{user.username}</h3>
            <p className="text-gray-700">{user.bio}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleSwipe(user._id, "Left")}
                className="bg-red-500 px-4 py-2 text-white rounded-full"
              >
                Left
              </button>
              <button
                onClick={() => handleSwipe(user._id, "Right")}
                className="bg-green-500 px-4 py-2 text-white rounded-full"
              >
                Right
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No users found nearby</p>
      )}

      <h2 className="text-3xl mt-8">Pending Matches</h2>
      {pendingMatches && pendingMatches.length > 0 ? (
        pendingMatches.map((match) => (
          <div key={match._id} className="pending-match mt-4">
            <h4>{match.user1.username} swiped right on you</h4>
            <button
              onClick={() => handleUnmatch(match._id)}
              className="mt-2 bg-red-500 px-4 py-2 text-white rounded-full"
            >
              Unmatch
            </button>
          </div>
        ))
      ) : (
        <p>No pending matches</p>
      )}
    </div>
  );
};

export default SwipePage;
