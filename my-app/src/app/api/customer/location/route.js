import mongoose from "mongoose";
import restaurantModel from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";
const { MONGO_URL } = process.env;

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function GET() {
  try {
    await connectDB();
    let data = await restaurantModel.find();
    data = data.map((item) => item.city);
    data = [...new Set(data.map((item) => item))];
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, err }, { status: 500 });
  }
}
