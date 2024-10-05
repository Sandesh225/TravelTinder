import React, { useState } from "react";
import { useCreateTravelPreferenceMutation } from "../../app/features/apiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const TravelPreferencesForm = () => {
  const [formData, setFormData] = useState({
    preferredDestinations: "",
    startDate: "",
    endDate: "",
    groupSize: "Solo",
    minBudget: 0,
    maxBudget: "",
    activities: "",
    travelMedium: "Car",
  });

  const [createTravelPreference, { isLoading }] =
    useCreateTravelPreferenceMutation();
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
      await createTravelPreference({
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
      }).unwrap();

      toast.success("Travel preferences submitted successfully!");
      navigate("/travel-preference");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit travel preferences");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center font-[sans-serif] p-4 m-8">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_rgba(195,169,50,0.5)] p-8 relative mt-12 bg-white rounded-lg">
        <h3 className="text-xl font-bold text-orange-500 mb-8 text-center">
          Submit Your Travel Preferences
        </h3>

        {/* Travel Preferences Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Preferred Destinations */}
          <input
            name="preferredDestinations"
            type="text"
            placeholder="Preferred Destinations (comma-separated)"
            value={formData.preferredDestinations}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          {/* Travel Dates */}
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          {/* Group Size */}
          <select
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Solo">Solo</option>
            <option value="Couple">Couple</option>
            <option value="Family">Family</option>
            <option value="Group">Group</option>
          </select>

          {/* Budget Range */}
          <input
            name="minBudget"
            type="number"
            placeholder="Minimum Budget"
            value={formData.minBudget}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            min="0"
            required
          />
          <input
            name="maxBudget"
            type="number"
            placeholder="Maximum Budget"
            value={formData.maxBudget}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            min="0"
          />

          {/* Activities */}
          <input
            name="activities"
            type="text"
            placeholder="Activities (comma-separated)"
            value={formData.activities}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          {/* Travel Medium */}
          <select
            name="travelMedium"
            value={formData.travelMedium}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Car">Car</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
            <option value="Boat">Boat</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-orange-500 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-600 ${
              isLoading && "cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Preferences"}
          </button>
        </form>

        <Link
          to="/travel-preference"
          className="text-center block mt-4 text-blue-500 hover:underline"
        >
          View Your Preferences
        </Link>
      </div>
    </div>
  );
};

export default TravelPreferencesForm;
