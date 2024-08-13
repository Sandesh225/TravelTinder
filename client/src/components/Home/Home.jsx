import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-4">Welcome back, {user.username}!</p>
    </div>
  );
}

export default Home;
