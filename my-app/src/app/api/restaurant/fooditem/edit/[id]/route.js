import fooditemModel from "@/app/lib/fooditemModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const { MONGO_URL } = process.env;
import { getAuthUser } from "@/app/function/backendmiddleware";
const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function GET(Request, { params }) {
  let success = false;
  try {
    connectDB();
    const { id } = await params;
    const decoded = await getAuthUser();
    const result = await fooditemModel.findOne({
      _id: id,
      restro_id: decoded.id,
    });
    if (result) {
      success = true;
      return NextResponse.json({ result, success }, { status: 200 });
    } else {
      throw new Error("unable to get information about this food item");
    }
  } catch (err) {
    return NextResponse.json({ error: err, success }, { status: 500 });
  }
}

export async function PATCH(Request, { params }) {
  let success = false;
  try {
    const { id } = await params;
    const decoded = await getAuthUser();
    const body = await Request.json();
    const { foodItem, price, path, description } = body;
    connectDB();
    const result = await fooditemModel.updateOne(
      { _id: id, restro_id: decoded.id }, // filter
      { $set: { foodItem, price, path, description } }, // update
    );
    if (result.matchedCount > 0) {
      success = true;
      return NextResponse.json({ result, success }, { status: 200 });
    } else {
      throw new Error("unable to get information about this food item");
    }
  } catch (err) {
    return NextResponse.json({ error: err, success }, { status: 500 });
  }
}
