import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    photos: [
      {
        url: String,
      },
    ],
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


const Profile = mongoose.model('Profile', profileSchema);
export { Profile };
