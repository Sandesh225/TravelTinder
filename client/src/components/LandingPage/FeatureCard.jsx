import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
