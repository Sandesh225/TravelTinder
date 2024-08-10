
import mongoose  from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  bio: {
      type: String,
  },
  age: {
      type: Number,
      required: true,
  },
  gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
  },
  interests:{
type:String
  },
  photos: [{
      url: String,
  }],
  location: {
      type: String,
      required: true,
  },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export {Profile}