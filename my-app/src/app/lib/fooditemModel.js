import mongoose from "mongoose";

const fooditemSchema = await mongoose.Schema(
  {
    foodItem: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    restro_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

const fooditemModel =
  mongoose.models.foodItem || mongoose.model("foodItem", fooditemSchema);

export default fooditemModel;
