import React, { useState } from "react";
import {
  useGetTravelPreferenceQuery,
  useUpdateTravelPreferenceMutation,
} from "../../features/apiSlice";
import { useNavigate } from "react-router-dom";

const EditTravelPreference = () => {
  const { data: travelPreference, isLoading } = useGetTravelPreferenceQuery();
  const [updateTravelPreference] = useUpdateTravelPreferenceMutation();
  const [formData, setFormData] = useState({
    preferredDestinations: travelPreference?.preferredDestinations || [],
    preferredGroupSize: travelPreference?.preferredGroupSize || "",
    budgetRange: travelPreference?.budgetRange || { min: 0, max: 0 },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTravelPreference(formData).unwrap();
      navigate("/travel-preferences");
    } catch (err) {
      console.error("Failed to update travel preferences", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Preferred Destinations"
        value={formData.preferredDestinations}
        onChange={(e) =>
          setFormData({
            ...formData,
            preferredDestinations: e.target.value.split(","),
          })
        }
      />
      <input
        type="text"
        placeholder="Preferred Group Size"
        value={formData.preferredGroupSize}
        onChange={(e) =>
          setFormData({ ...formData, preferredGroupSize: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Min Budget"
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
        placeholder="Max Budget"
        value={formData.budgetRange.max}
        onChange={(e) =>
          setFormData({
            ...formData,
            budgetRange: { ...formData.budgetRange, max: e.target.value },
          })
        }
      />
      <button type="submit">Update Travel Preferences</button>
    </form>
  );
};

export default EditTravelPreference;
