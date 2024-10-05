import React, { useState } from "react";
import { useCreateTravelPreferenceMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const TravelPreferencesSetupModal = ({ onClose, hasTravelPreferences }) => {
  const [preferredDestinations, setPreferredDestinations] = useState("");
  const [travelDates, setTravelDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [preferredGroupSize, setPreferredGroupSize] = useState("");
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 0 });
  const [activities, setActivities] = useState("");
  const [travelMedium, setTravelMedium] = useState("");

  const navigate = useNavigate();
  const [createTravelPreference, { isLoading, error }] =
    useCreateTravelPreferenceMutation();

  const handleTravelPreferencesSetup = async (e) => {
    e.preventDefault();
    try {
      await createTravelPreference({
        preferredDestinations,
        travelDates,
        preferredGroupSize,
        budgetRange,
        activities,
        travelMedium,
      }).unwrap();
      toast.success("Travel preferences saved successfully!");
      onClose(); // Close the modal
      navigate("/profile"); // Navigate to the profile section after saving
    } catch (err) {
      toast.error(err.data.message || "Failed to save travel preferences.");
    }
  };

  const handleSkipPreferences = () => {
    toast.info("You have skipped setting up travel preferences.");
    onClose(); // Close the modal
    navigate("/profile"); // Navigate to the profile section
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-orange-500">
          Set Up Your Travel Preferences
        </h2>
        <button
          onClick={onClose} // Close button functionality
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <form className="mt-6" onSubmit={handleTravelPreferencesSetup}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Preferred Destinations
            </label>
            <input
              type="text"
              value={preferredDestinations}
              onChange={(e) => setPreferredDestinations(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Travel Dates</label>
            <div className="flex justify-between">
              <DatePicker
                selected={travelDates.start}
                onChange={(date) =>
                  setTravelDates({ ...travelDates, start: date })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mr-2"
              />
              <DatePicker
                selected={travelDates.end}
                onChange={(date) =>
                  setTravelDates({ ...travelDates, end: date })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Preferred Group Size</label>
            <input
              type="number"
              value={preferredGroupSize}
              onChange={(e) => setPreferredGroupSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Budget Range</label>
            <input
              type="number"
              placeholder="Min"
              value={budgetRange.min}
              onChange={(e) =>
                setBudgetRange({ ...budgetRange, min: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={budgetRange.max}
              onChange={(e) =>
                setBudgetRange({ ...budgetRange, max: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Activities</label>
            <input
              type="text"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Travel Medium</label>
            <input
              type="text"
              value={travelMedium}
              onChange={(e) => setTravelMedium(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className={`bg-orange-500 text-white px-4 py-2 rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Save Preferences
            </button>
            {hasTravelPreferences && (
              <button
                type="button"
                onClick={handleSkipPreferences}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Skip
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelPreferencesSetupModal;
