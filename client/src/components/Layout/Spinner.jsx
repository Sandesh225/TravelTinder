// src/components/Layout/Spinner.jsx
import React from "react";

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <p>Loading...</p>
  </div>
);

export default Spinner;
