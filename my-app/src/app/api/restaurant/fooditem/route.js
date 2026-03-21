import { NextResponse } from "next/server";
import mongoose from "mongoose";
const { MONGO_URL } = process.env;
import fooditemModel from "@/app/lib/fooditemModel";
import { getAuthUser } from "@/app/function/backendmiddleware";
import restaurantModel from "@/app/lib/restaurantModel";
const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function POST(request) {
  try {
    const payload = await request.json();
    await connectDB();
    const decoded = await getAuthUser();
    const user = await restaurantModel.findOne({ emailId: decoded.emailId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 },
      );
    }
    const fooditem = new fooditemModel({
      ...payload,
      restro_id: user._id,
    });
    const result = await fooditem.save();
    if (result) {
      return NextResponse.json({ result, success: true }, { status: 200 });
    } else {
      throw new Error("result is false");
    }
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { error: "Failed to add food item", success: false },
      { status: 500 },
    );
  }
}
