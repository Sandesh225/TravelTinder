import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Indexed to speed up user-based queries
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [300, 'Bio cannot exceed 300 characters'],
      set: (v) => v.trim(), // Sanitize bio input
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Age must be at least 18'], // Ensure the user is at least 18 years old
      max: [100, 'Age must be at most 100'], // Set an upper limit for age
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Limit possible gender values
      required: [true, 'Gender is required'],
    },
    interests: {
      type: [String],
      required: [true, 'At least one interest is required'],
      default: [],
      validate: {
        validator: function (v) {
          return v.length > 0 && v.every((interest) => interest.trim() !== ''); // Ensure each interest is a non-empty string
        },
        message: 'Each interest must be a non-empty string.',
      },
      set: (interests) => interests.map((interest) => interest.trim()), // Trim spaces in interests
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v); // Allow common image formats (e.g., .gif added)
        },
        message: 'Invalid avatar URL format. Must be a valid image URL (jpg, jpeg, png, gif).',
      },
    },
    travelImage: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v); // Optional travel image with valid URL format
        },
        message: 'Invalid travel image URL format. Must be a valid image URL (jpg, jpeg, png, gif).',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true, // Ensure no extra spaces in the location
    },
  },
  { timestamps: true }
);

// Virtual to check if the profile is "complete" (has a bio, interests, and at least one photo)
profileSchema.virtual('isComplete').get(function () {
  return this.bio && this.interests.length > 0 && this.avatar;
});

// Method to format the profile data before sending it in the response
profileSchema.methods.toJSON = function () {
  const profile = this.toObject();
  profile.isComplete = this.isComplete;
  return profile;
};

// Create the Profile model
const Profile = mongoose.model('Profile', profileSchema);

export {Profile};
