import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/function/backendmiddleware";
import restaurantModel from "@/app/lib/restaurantModel";
const { MONGO_URL } = process.env;
import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function PATCH(request) {
  try {
    const decoded = await getAuthUser();
    await connectDB();
    const { city, location } = await request.json();
    const result = await restaurantModel.findOneAndUpdate(
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

export async function GET() {
  const result = "yes i am the correct route";
  return NextResponse.json({ success: true, result }, { status: 200 });
}
