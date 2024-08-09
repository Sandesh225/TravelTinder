import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  matchedOn: {
      type: Date,
      default: Date.now,
  },
  status: {
      type: String,
      enum: ['Pending', 'Matched', 'Rejected'],
      default: 'Pending',
  },
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

export {Match}