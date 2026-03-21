import { NextResponse } from "next/server";
import mongoose from "mongoose";
const { MONGO_URL } = process.env;
import restaurantModel from "@/app/lib/restaurantModel";
import fooditemModel from "@/app/lib/fooditemModel";

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const hoteldetail = await restaurantModel.findById(id);
    if (hoteldetail) {
      let foodlist = [];
      foodlist = await fooditemModel.find({ restro_id: id });
      return NextResponse.json(
        { success: true, hoteldetail, foodlist },
        { status: 200 },
      );
    } else {
      throw new Error("no hotel of this name found");
    }
  } catch (err) {
    return NextResponse.json({ success: false, err }, { status: 500 });
  }
}
