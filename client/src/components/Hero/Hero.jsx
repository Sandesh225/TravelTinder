import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-xl mb-8">Your journey begins here. Join us today.</p>
      <Link to="/register" className="bg-blue-600 px-6 py-3 rounded text-xl">
        Get Started
      </Link>
    </div>
  );
}

export default Hero;
