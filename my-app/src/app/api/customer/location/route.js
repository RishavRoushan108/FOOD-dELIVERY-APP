import mongoose from "mongoose";
import restaurantModel from "@/app/lib/restaurantModel";
import { getAuthUser } from "@/app/function/backendmiddleware";
import { NextResponse } from "next/server";
import userModel from "@/app/lib/userModel";
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

export async function PATCH(request) {
  try {
    const decoded = await getAuthUser();
    await connectDB();
    const { city, location } = await request.json();
    const result = await userModel.findOneAndUpdate(
      { emailId: decoded.emailId },
      {
        city,
        location: {
          lat: location.lat,
          lon: location.lon,
        },
      },
      { new: true },
    );
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to add food item", success: false },
      { status: 500 },
    );
  }
}
