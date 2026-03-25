import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    restro_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "restroOwner",
    },
    status: {
      type: String,
      required: true,
      default: "Order Confirmed",
    },
    food_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItem",
        required: true,
      },
    ],
    deliveryboy_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    price: {
      totalfoodcost: { type: Number },
      distancecost: { type: Number },
      tax: { type: Number },
      total: { type: Number },
    },
  },
  { timestamps: true },
);

const ordersModel =
  mongoose.models.order || mongoose.model("order", ordersSchema);

export default ordersModel;
