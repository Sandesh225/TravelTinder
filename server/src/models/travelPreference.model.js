
import mongoose from 'mongoose';
const travelPreferenceSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  preferredDestinations: [{
      type: String,
      required: true,
  }],
  travelDates: {
      start: Date,
      end: Date,
  },
  preferredGroupSize: {
      type: String,
      enum: ['Solo', 'Couple', 'Group'],
  },
  budgetRange: {
      min: Number,
      max: Number,
  },
  activities: [{
      type: String,
  }],
  travelMedium:{
    type:String
  }
}, { timestamps: true });
const TravelPreference = mongoose.model('TravelPreference', travelPreferenceSchema);

export {TravelPreference}