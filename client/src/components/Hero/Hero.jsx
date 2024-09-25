import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url('/images/hero-background.jpg')` }}
    >
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-white text-center p-8">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Perfect Travel Match
        </h1>
        <p className="text-xl mb-6">
          Connect with travel enthusiasts, share experiences, and embark on
          unforgettable adventures.
        </p>
        <div className="space-x-4">
          <Link
            to="/explore"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Explore Profiles
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
