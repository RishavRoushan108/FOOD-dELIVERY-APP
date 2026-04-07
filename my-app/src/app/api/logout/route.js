import mongoose from "mongoose";
const { NextResponse } = require("next/server");
import { cookies } from "next/headers";
const { MONGO_URL } = process.env;

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

export async function POST() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    cookieStore.set("fooddeliverytoken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    return NextResponse.json({ message: "logout sucessful" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 400 });
  }
}
