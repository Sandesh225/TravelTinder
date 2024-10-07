import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Default salt rounds to 12 if not provided
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username cannot exceed 50 characters"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please provide a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    travelPreferences: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPreference",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  // Proceed if password is modified or newly created
  if (!this.isModified("password")) return next();
  
  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware for proper error handling
  }
});

// Method to compare entered password with the hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Ensure that we do not return sensitive fields when converting user to JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Exclude password
  delete user.__v;      // Exclude MongoDB version key
  return user;
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
export { User };
