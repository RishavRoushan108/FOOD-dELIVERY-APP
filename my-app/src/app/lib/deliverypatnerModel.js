import mongoose from "mongoose";

const deliverypatnerSchema = await mongoose.Schema(
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
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const deliverypatnerModel =
  mongoose.models.deliverypatner ||
  mongoose.model("deliverypatner", deliverypatnerSchema);

export default deliverypatnerModel;
