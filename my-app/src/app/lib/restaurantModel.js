import mongoose from "mongoose";

const restaurantSchema = await mongoose.Schema(
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
    name: {
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

const restaurantModel =
  mongoose.models.restroOwner ||
  mongoose.model("restroOwner", restaurantSchema);

export default restaurantModel;
