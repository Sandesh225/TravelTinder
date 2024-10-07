import mongoose from 'mongoose';

const travelPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Indexed for faster lookups and matching
    },
    preferredDestinations: {
      type: [String],
      required: [true, 'Preferred destinations are required'],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'There must be at least one preferred destination.',
      },
    },
    travelDates: {
      start: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
          validator: function (v) {
            return v >= new Date(); // Ensures travel dates are in the future
          },
          message: 'Start date must be in the future',
        },
      },
      end: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
          validator: function (v) {
            return v > this.travelDates.start;
          },
          message: 'End date must be after the start date',
        },
      },
    },
    preferredGroupSize: {
      type: String,
      enum: ['Solo', 'Couple', 'Group'],
      required: [true, 'Preferred group size is required'],
    },
    budgetRange: {
      min: {
        type: Number,
        default: 0,
        min: [0, 'Minimum budget cannot be negative'],
      },
      max: {
        type: Number,
        required: [true, 'Maximum budget is required'],
        validate: {
          validator: function (v) {
            return v >= this.budgetRange.min;
          },
          message: 'Maximum budget must be greater than or equal to the minimum budget',
        },
      },
    },
    activities: {
      type: [String],
      required: [true, 'At least one activity is required'],
      default: [],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'There must be at least one preferred activity.',
      },
    },
    travelMedium: {
      type: String,
      enum: ['Car', 'Plane', 'Train', 'Boat', 'Bus'],
      required: [true, 'Travel medium is required'],
    },
  },
  { timestamps: true }
);

// Middleware to ensure that travel dates and budget are valid
travelPreferenceSchema.pre('save', function (next) {
  if (this.travelDates.end <= this.travelDates.start) {
    throw new Error('End date must be after the start date.');
  }
  if (this.budgetRange.max < this.budgetRange.min) {
    throw new Error('Maximum budget must be greater than or equal to the minimum budget.');
  }
  next();
});

// Export the TravelPreference model
const TravelPreference = mongoose.model('TravelPreference', travelPreferenceSchema);
export { TravelPreference };
