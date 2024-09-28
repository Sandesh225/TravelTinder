import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">TravelTinder</h1>
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
