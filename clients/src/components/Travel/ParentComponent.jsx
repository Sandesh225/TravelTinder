import React, { useState } from "react";
import TravelPreferencesSetupModal from "./TravelPreferencesSetupModal";

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTravelPreferences, setHasTravelPreferences] = useState(false); // Update this state based on your logic

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Set Travel Preferences</button>
      {isModalOpen && (
        <TravelPreferencesSetupModal
          onClose={handleCloseModal}
          hasTravelPreferences={hasTravelPreferences}
        />
      )}
    </div>
  );
};

export default ParentComponent;
