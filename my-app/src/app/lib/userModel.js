import mongoose from "mongoose";

const userSchema = await mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
      },
      lon: {
        type: Number,
      },
    },
  },
  { timestamps: true },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
