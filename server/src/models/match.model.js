import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Indexing for faster lookups
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Indexing for faster lookups
  },
  user1SwipeStatus: {
    type: String,
    enum: ['Left', 'Right'], // Left = not interested, Right = interested
    required: true,
    default: 'Left', // Default to 'Left' (no interest) until user swipes
  },
  user2SwipeStatus: {
    type: String,
    enum: ['Left', 'Right'], // Left = not interested, Right = interested
    required: true,
    default: 'Left', // Default to 'Left' (no interest) until user swipes
  },
  matchedOn: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'Matched', 'Rejected'],
    default: 'Pending',
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

matchSchema.index({ user1: 1, user2: 1 }, { unique: true });
matchSchema.index({ user2: 1, user1: 1 }, { unique: true });


matchSchema.virtual('isMutual').get(function () {
  return this.user1SwipeStatus === 'Right' && this.user2SwipeStatus === 'Right';
});

// Middleware to prevent matching the same user with themselves
matchSchema.pre('save', async function (next) {
  if (this.user1.equals(this.user2)) {
    throw new Error("User cannot match with themselves");
  }
  


  

  // If both users have swiped right, update the match status to 'Matched' and set matchedOn date
  if (this.user1SwipeStatus === 'Right' && this.user2SwipeStatus === 'Right') {
    this.status = 'Matched';
    if (!this.matchedOn) {
      this.matchedOn = Date.now(); 
    }
  } else if (this.user1SwipeStatus === 'Left' || this.user2SwipeStatus === 'Left') {
    this.status = 'Rejected'; // If either user swipes left, set status to Rejected
  }

  next();
});



const Match = mongoose.model('Match', matchSchema);
export { Match };
