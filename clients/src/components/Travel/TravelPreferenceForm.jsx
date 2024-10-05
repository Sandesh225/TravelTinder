// src/components/TravelPreferenceForm.js
import React, { useState, useEffect } from "react";
import {
  useCreateTravelPreferenceMutation,
  useGetTravelPreferenceQuery,
  useUpdateTravelPreferenceMutation,
} from "../../features/apiSlice";
import { toast } from "react-toastify";

const TravelPreferenceForm = () => {
  const [formData, setFormData] = useState({
    preferredDestinations: "",
    travelDates: { start: "", end: "" },
    preferredGroupSize: "",
    budgetRange: { min: "", max: "" },
    activities: "",
    travelMedium: "",
  });

  const { data: travelPreference, isLoading: loadingTravelPref } =
    useGetTravelPreferenceQuery();
  const [createTravelPreference] = useCreateTravelPreferenceMutation();
  const [updateTravelPreference] = useUpdateTravelPreferenceMutation();

  useEffect(() => {
    if (travelPreference) {
      setFormData(travelPreference.travelPreference);
    }
  }, [travelPreference]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (travelPreference) {
        await updateTravelPreference(formData).unwrap();
        toast.success("Travel preferences updated successfully");
      } else {
        await createTravelPreference(formData).unwrap();
        toast.success("Travel preferences created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save travel preferences");
    }
  };

  if (loadingTravelPref) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        {travelPreference ? "Update" : "Create"} Travel Preferences
      </h2>

      {/* Preferred Destinations */}
      <label className="block mb-4">
        <span className="text-gray-700">Preferred Destinations</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.preferredDestinations}
          onChange={(e) =>
            setFormData({ ...formData, preferredDestinations: e.target.value })
          }
        />
      </label>

      {/* Travel Dates */}
      <label className="block mb-4">
        <span className="text-gray-700">Travel Dates (Start - End)</span>
        <input
          type="date"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.travelDates.start}
          onChange={(e) =>
            setFormData({
              ...formData,
              travelDates: { ...formData.travelDates, start: e.target.value },
            })
          }
        />
        <input
          type="date"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.travelDates.end}
          onChange={(e) =>
            setFormData({
              ...formData,
              travelDates: { ...formData.travelDates, end: e.target.value },
            })
          }
        />
      </label>

      {/* Preferred Group Size */}
      <label className="block mb-4">
        <span className="text-gray-700">Preferred Group Size</span>
        <input
          type="number"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.preferredGroupSize}
          onChange={(e) =>
            setFormData({ ...formData, preferredGroupSize: e.target.value })
          }
        />
      </label>

      {/* Budget Range */}
      <label className="block mb-4">
        <span className="text-gray-700">Budget Range (Min - Max)</span>
        <input
          type="number"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.budgetRange.min}
          onChange={(e) =>
            setFormData({
              ...formData,
              budgetRange: { ...formData.budgetRange, min: e.target.value },
            })
          }
        />
        <input
          type="number"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.budgetRange.max}
          onChange={(e) =>
            setFormData({
              ...formData,
              budgetRange: { ...formData.budgetRange, max: e.target.value },
            })
          }
        />
      </label>

      {/* Activities */}
      <label className="block mb-4">
        <span className="text-gray-700">Activities</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.activities}
          onChange={(e) =>
            setFormData({ ...formData, activities: e.target.value })
          }
        />
      </label>

      {/* Travel Medium */}
      <label className="block mb-4">
        <span className="text-gray-700">Travel Medium</span>
        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border rounded-lg"
          value={formData.travelMedium}
          onChange={(e) =>
            setFormData({ ...formData, travelMedium: e.target.value })
          }
        />
      </label>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        {travelPreference ? "Update Preferences" : "Create Preferences"}
      </button>
    </form>
  );
};

export default TravelPreferenceForm;
