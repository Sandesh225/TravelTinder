import React from "react";

import UserList from "./Match/UserList";
import MatchRequests from "./Match/MatchRequest";

const TinderLikePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Tinder-like Match Page
      </h1>
      <UserList />
      <MatchRequests />
    </div>
  );
};

export default TinderLikePage;
