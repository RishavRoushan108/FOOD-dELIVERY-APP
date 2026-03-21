import mongoose from "mongoose";
const { MONGO_URL } = process.env;
import { getAuthUser } from "@/app/function/backendmiddleware";
import fooditemModel from "@/app/lib/fooditemModel";
import { NextResponse } from "next/server";

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function DELETE(request, { params }) {
  try {
    const decoded = await getAuthUser();
    const { id } = await params;
    console.log(id);
    await connectDB();
    let success = false;
    const isfooditem = await fooditemModel.findOne({ _id: id });
    if (isfooditem && isfooditem.restro_id.toString() === decoded.id) {
      const result = await fooditemModel.deleteOne({ _id: id });
      if (result) {
        success = true;
        return NextResponse.json({ result, success }, { status: 200 });
      } else {
        throw new Error("failed to delte food item from db");
      }
    } else {
      throw new Error("this food item donot exist ");
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete food item", success: false },
      { status: 500 },
    );
  }
}
