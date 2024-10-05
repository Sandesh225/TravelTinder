// src/components/Dashboard/PreferencesForm.jsx
import React, { useState, useEffect } from "react";

const PreferencesForm = ({ userPreferences, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    destinations: "",
    startDate: "",
    endDate: "",
    groupSize: "",
    budgetMin: "",
    budgetMax: "",
    activities: "",
  });

  useEffect(() => {
    if (userPreferences) {
      setFormData({
        destinations: userPreferences.destinations || "",
        startDate: userPreferences.dates?.start || "",
        endDate: userPreferences.dates?.end || "",
        groupSize: userPreferences.groupSize || "",
        budgetMin: userPreferences.budget?.min || "",
        budgetMax: userPreferences.budget?.max || "",
        activities: userPreferences.activities?.join(", ") || "",
      });
    }
  }, [userPreferences]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      activities: formData.activities
        .split(",")
        .map((activity) => activity.trim()),
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-6">Edit Travel Preferences</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Destinations</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            value={formData.destinations}
            onChange={(e) =>
              setFormData({ ...formData, destinations: e.target.value })
            }
            placeholder="Enter destinations"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Travel Dates</label>
          <div className="flex space-x-4">
            <input
              type="date"
              className="mt-1 block w-1/2 px-4 py-2 border rounded-lg"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
            <input
              type="date"
              className="mt-1 block w-1/2 px-4 py-2 border rounded-lg"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Group Size</label>
          <input
            type="number"
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            value={formData.groupSize}
            onChange={(e) =>
              setFormData({ ...formData, groupSize: e.target.value })
            }
            placeholder="Enter group size"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Budget Range</label>
          <div className="flex space-x-4">
            <input
              type="number"
              className="mt-1 block w-1/2 px-4 py-2 border rounded-lg"
              value={formData.budgetMin}
              onChange={(e) =>
                setFormData({ ...formData, budgetMin: e.target.value })
              }
              placeholder="Min budget"
            />
            <input
              type="number"
              className="mt-1 block w-1/2 px-4 py-2 border rounded-lg"
              value={formData.budgetMax}
              onChange={(e) =>
                setFormData({ ...formData, budgetMax: e.target.value })
              }
              placeholder="Max budget"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Activities</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg"
            value={formData.activities}
            onChange={(e) =>
              setFormData({ ...formData, activities: e.target.value })
            }
            placeholder="Enter activities (comma separated)"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save Preferences
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;
