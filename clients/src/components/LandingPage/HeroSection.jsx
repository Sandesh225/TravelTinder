import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Connect with Like-Minded Travel Enthusiasts
        </h2>
        <p className="text-lg mb-8">
          Swipe, match, and embark on exciting adventures with new friends.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200"
        >
          Find Your Travel Buddy
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
