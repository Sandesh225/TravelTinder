import React, { useState } from "react";
import { useUpdateTravelPreferenceMutation } from "../../app/features/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateTravelPreferencesForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
    preferredDestinations: initialData?.preferredDestinations.join(", ") || "",
    startDate: initialData?.travelDates?.start || "",
    endDate: initialData?.travelDates?.end || "",
    groupSize: initialData?.preferredGroupSize || "Solo",
    minBudget: initialData?.budgetRange?.min || 0,
    maxBudget: initialData?.budgetRange?.max || "",
    activities: initialData?.activities.join(", ") || "",
    travelMedium: initialData?.travelMedium || "Car",
  });

  const [updateTravelPreference] = useUpdateTravelPreferenceMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        preferredDestinations: formData.preferredDestinations
          .split(",")
          .map((dest) => dest.trim()),
        travelDates: { start: formData.startDate, end: formData.endDate },
        preferredGroupSize: formData.groupSize,
        budgetRange: { min: formData.minBudget, max: formData.maxBudget },
        activities: formData.activities
          .split(",")
          .map((activity) => activity.trim()),
        travelMedium: formData.travelMedium,
      };

      await updateTravelPreference(updateData).unwrap();
      toast.success("Travel preferences updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to update travel preferences.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 shadow-md rounded bg-white space-y-4"
    >
      <h3 className="text-xl font-bold mb-4">Update Travel Preferences</h3>

      {/* Preferred Destinations */}
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="preferredDestinations"
        >
          Preferred Destinations (comma-separated)
        </label>
        <input
          id="preferredDestinations"
          name="preferredDestinations"
          type="text"
          value={formData.preferredDestinations}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter preferred destinations"
        />
      </div>

      {/* Travel Dates */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="startDate">
          Start Date
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="endDate">
          End Date
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Group Size */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="groupSize">
          Group Size
        </label>
        <select
          id="groupSize"
          name="groupSize"
          value={formData.groupSize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Solo">Solo</option>
          <option value="Couple">Couple</option>
          <option value="Group">Group</option>
        </select>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="minBudget">
          Minimum Budget
        </label>
        <input
          id="minBudget"
          name="minBudget"
          type="number"
          value={formData.minBudget}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="maxBudget">
          Maximum Budget
        </label>
        <input
          id="maxBudget"
          name="maxBudget"
          type="number"
          value={formData.maxBudget}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Activities */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="activities">
          Activities (comma-separated)
        </label>
        <input
          id="activities"
          name="activities"
          type="text"
          value={formData.activities}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter activities"
        />
      </div>

      {/* Travel Medium */}
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="travelMedium"
        >
          Travel Medium
        </label>
        <select
          id="travelMedium"
          name="travelMedium"
          value={formData.travelMedium}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Car">Car</option>
          <option value="Plane">Plane</option>
          <option value="Train">Train</option>
          <option value="Boat">Boat</option>
          <option value="Bus">Bus</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Preferences
      </button>
    </form>
  );
};

export default UpdateTravelPreferencesForm;
