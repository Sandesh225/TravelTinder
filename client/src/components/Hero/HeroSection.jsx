import React from "react";

const HeroSection = () => {
  return (
    <section className="pt-12 bg-blue-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Your Next Travel Adventure
          </h1>
          <p className="max-w-2xl mx-auto px-6 text-lg text-gray-600">
            Swipe through exciting destinations and meet like-minded travelers
            who share your passion for exploration.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row sm:justify-center sm:space-x-5">
            <a
              href="/explore"
              className="mb-3 sm:mb-0 inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-200"
            >
              Start Swiping
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-200 border-2 border-blue-600"
            >
              Explore Destinations
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white mt-8">
        <div className="relative mx-auto">
          <div className="lg:max-w-4xl lg:mx-auto">
            <img
              className="px-4 md:px-8 rounded-lg"
              src="hero-img.webp"
              alt="Travel Adventure"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
