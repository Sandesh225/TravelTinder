// src/pages/Matching.jsx
import React, { useState } from "react";
import SwipeCard from "./SwipeCard";
import MatchesList from "./MatchesList";
import {
  useGetMatchesQuery,
  useGetUsersForSwipeQuery,
} from "../../features/apiSlice";

const Matching = () => {
  const {
    data: usersToSwipe,
    error: swipeError,
    isLoading: swipeLoading,
  } = useGetUsersForSwipeQuery();
  const {
    data: matches,
    error: matchError,
    isLoading: matchLoading,
  } = useGetMatchesQuery();
  const [swipedUsers, setSwipedUsers] = useState([]);

  const handleSwipe = (direction, user) => {
    setSwipedUsers((prev) => [...prev, user]);
  };

  if (swipeLoading || matchLoading) return <p>Loading...</p>;
  if (swipeError || matchError) return <p>Error loading data.</p>;

  const remainingUsers = usersToSwipe.filter(
    (user) => !swipedUsers.includes(user)
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Find Your Travel Buddy</h1>

      {/* Swipe section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Swipe Users</h2>
        {remainingUsers.length > 0 ? (
          <SwipeCard user={remainingUsers[0]} onSwipe={handleSwipe} />
        ) : (
          <p>No more users to swipe on.</p>
        )}
      </div>

      {/* Matches section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Matches</h2>
        <MatchesList matches={matches} />
      </div>
    </div>
  );
};

export default Matching;
