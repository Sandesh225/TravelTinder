import mongoose from 'mongoose';

const travelPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    preferredDestinations: {
      type: [String],
      required: true,
    },
    travelDates: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
        validate: {
          validator: function (v) {
            return v > this.travelDates.start;
          },
          message: 'End date must be after start date',
        },
      },
    },
    preferredGroupSize: {
      type: String,
      enum: ['Solo', 'Couple', 'Group'],
      required: true,
    },
    budgetRange: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    activities: {
      type: [String],
      required: true,
    },
    travelMedium: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TravelPreference = mongoose.model('TravelPreference', travelPreferenceSchema);
export { TravelPreference };
