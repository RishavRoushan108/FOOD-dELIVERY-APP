import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    restro_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
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
  mongoose.models.order || mongoose.model("order", ordersSchema);

export default ordersModel;
