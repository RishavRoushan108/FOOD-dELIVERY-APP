import mongoose from "mongoose";
import { stringify } from "postcss";

const ordersSchema = await mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    restro_id: { type: mongoose.Schema.Types.ObjectId },
    status: {
      type: stringify,
      required: true,
      default: "Order Confirmed",
    },
    food_id: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    deliveryboy_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const ordersModel =
  mongoose.models.orders || mongoose.model("orders", ordersSchema);

export default ordersModel;
