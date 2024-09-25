import React from "react";
import { Link } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../features/apiSlice";

const Home = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-8">
        Welcome to Travel Tinder
      </h1>
      <h2 className="text-3xl font-bold mb-6">
        Welcome, {user?.data.username}!
      </h2>
      <p className="text-lg">You are logged in.</p>
      <p className="text-lg md:text-xl text-center mb-12 text-gray-600">
        Find your perfect travel companion and explore the world together.
      </p>

      {/* Grid Layout for features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card: Connect with Travelers */}
        <FeatureCard
          title="Connect with Travelers"
          description="Meet like-minded travelers, share your experiences, and plan your next adventure."
          link="/profiles"
          linkText="Find Travelers"
          bgColor="bg-blue-600"
          hoverBgColor="hover:bg-blue-700"
        />

        {/* Card: Create Your Profile */}
        <FeatureCard
          title="Create Your Profile"
          description="Showcase your travel interests and preferences to attract the perfect travel buddy."
          link="/profile-setup"
          linkText="Set Up Profile"
          bgColor="bg-green-600"
          hoverBgColor="hover:bg-green-700"
        />

        {/* Card: Explore Destinations */}
        <FeatureCard
          title="Explore Destinations"
          description="Discover popular travel destinations and plan your trips with ease."
          link="/destinations"
          linkText="Explore Now"
          bgColor="bg-purple-600"
          hoverBgColor="hover:bg-purple-700"
        />
      </div>
    </div>
  );
};

// Reusable FeatureCard component
const FeatureCard = ({
  title,
  description,
  link,
  linkText,
  bgColor,
  hoverBgColor,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{description}</p>
      <Link
        to={link}
        className={`${bgColor} ${hoverBgColor} text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out`}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default Home;
