import React from "react";
import FeatureCard from "./FeatureCard";

const OverviewSection = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <h3 className="text-3xl font-bold text-center mb-8">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <FeatureCard
          title="Swipe"
          description="Swipe right if you're interested in traveling with someone or left if you want to pass."
        />
        <FeatureCard
          title="Match"
          description="When you and another traveler both swipe right, it’s a match! Start planning your trip together."
        />
        <FeatureCard
          title="Chat"
          description="Chat with your travel matches to share itineraries, plans, and travel tips before your journey."
        />
      </div>
    </section>
  );
};

export default OverviewSection;
