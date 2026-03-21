import restaurantModel from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const { MONGO_URL } = process.env;

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function GET(request) {
  try {
    await connectDB();
    let queryParams = request.nextUrl.searchParams;
    let filter = {};
    if (queryParams.get("city")) {
      filter.city = queryParams.get("city");
    }
    if (queryParams.get("name")) {
      filter.name = {
        $regex: queryParams.get("name"),
        $options: "i",
      };
    }
    const result = await restaurantModel.find(filter);
    if (result) {
      return NextResponse.json({ success: true, result }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ success: true, err }, { status: 500 });
  }
}
