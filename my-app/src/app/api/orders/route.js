import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/function/backendmiddleware";
import ordersModel from "@/app/lib/ordersModel";
const { MONGO_URL } = process.env;

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function POST(request) {
  try {
    if (!decoded) throw new Error("Unauthorized");
    const decoded = await getAuthUser();
    await connectDB();
    const payload = await request.json();
    let response;
    if (decoded._id == payload.userId) {
      // create new order
      const res = new ordersModel(payload);
      const result = await res.save();
      return NextResponse.json({
        success: true,
        message: "order placed successfully",
      });
    }
    throw new Error("you are not eligible ");
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
