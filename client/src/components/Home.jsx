import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwipeCard from "./Match/SwipeCard";

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white px-4">
      <div className="max-w-2xl text-center">
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-wide mb-6 drop-shadow-lg">
          Welcome to <span className="text-red-400">TravelTinder</span>
        </h1>

        {/* Greeting or Prompt to Log in */}
        {isAuthenticated ? (
          <p className="text-2xl sm:text-3xl mt-4">
            Hello,{" "}
            <span className="font-semibold text-red-300">
              {user?.data?.username}
            </span>
            !
          </p>
        ) : (
          <p className="text-xl sm:text-2xl mt-4">
            Please{" "}
            <Link
              to="/login"
              className="underline hover:text-blue-300 transition-colors duration-300"
            >
              Login
            </Link>{" "}
            or{" "}
            <Link
              to="/register"
              className="underline hover:text-blue-300 transition-colors duration-300"
            >
              Register
            </Link>{" "}
            to find your next travel companion!
          </p>
        )}
      </div>

      {/* Call to Action Button */}
      <div className="mt-10">
        <Link
          to="/swipe"
          className="inline-block px-10 py-4 bg-white text-blue-500 font-semibold text-lg rounded-full shadow-lg hover:bg-blue-200 transition duration-300"
        >
          Explore Travel Matches
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-6 space-x-4">
        <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
      </div>
    </section>
  );
};

export default Home;
