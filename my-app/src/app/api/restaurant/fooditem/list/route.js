import { NextResponse } from "next/server";
import mongoose from "mongoose";
import fooditemModel from "@/app/lib/fooditemModel";
const { MONGO_URL } = process.env;
import { getAuthUser } from "@/app/function/backendmiddleware";

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function GET(request) {
  try {
    const decoded = await getAuthUser();
    await connectDB();
    let success = false;
    const result = await fooditemModel.find({ restro_id: decoded.id });
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, err }, { status: 500 });
  }
}
