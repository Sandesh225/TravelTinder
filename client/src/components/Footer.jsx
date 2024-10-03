import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-6">
      <div className="container mx-auto text-center">
        {/* Branding */}
        <h2 className="text-2xl font-bold mb-4">TravelTinder</h2>
        <p className="text-sm mb-6">
          Connecting you to the world’s best travel destinations.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © 2024 TravelTinder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
