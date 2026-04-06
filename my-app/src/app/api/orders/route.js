import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/function/backendmiddleware";
import ordersModel from "@/app/lib/ordersModel";
import userModel from "@/app/lib/userModel";
import restaurantModel from "@/app/lib/restaurantModel";
const { MONGO_URL } = process.env;
const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function POST(request) {
  try {
    const decoded = await getAuthUser();
    if (!decoded) throw new Error("Unauthorized");
    await connectDB();
    const payload = await request.json();
    console.log(payload);
    const user = await userModel.findOne({ emailId: decoded.emailId });
    if (user && user._id == payload.userId) {
      // create new order
      const res = new ordersModel(payload);
      await res.save();
      return NextResponse.json({
        success: true,
        message: "order placed successfully",
      });
    }
    throw new Error("you are unauthorised");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const decoded = await getAuthUser();
    if (!decoded) throw new Error("Unauthorized");
    await connectDB();
    // if customer
    let user = await userModel.findOne({ emailId: decoded.emailId });
    // if restroowner
    // if (!user) {
    //   user = await restaurantModel.findOne({ emailId: decoded.emailId });
    // }
    if (user) {
      const orderlist = await ordersModel
        .find({ userId: user._id })
        .populate({
          path: "userId",
          select: "-password",
        })
        .populate({
          path: "restro_id",
          select: "-password",
        })
        .populate("food_id");
      return NextResponse.json({ success: true, orderlist });
    }
    throw new Error("your orderlist donot exist");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
