import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <Link to="/terms" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </Link>
        </div>
        <p className="text-gray-400">
          &copy; 2024 TravelTinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
