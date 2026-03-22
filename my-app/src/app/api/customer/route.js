import userModel from "@/app/lib/userModel";
import mongoose from "mongoose";
const { NextResponse } = require("next/server");
import jwt from "jsonwebtoken";
// import { getAuthUser } from "@/app/function/backendmiddleware";
const { MONGO_URL } = process.env;
import bcrypt from "bcrypt";

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

// export async function GET() {
//   try {
//     const decoded = await getAuthUser();
//     await connectDB();
//     const data = await restaurantModel.find({ emailId: decoded.emailId });
//     return NextResponse.json({ result: data });
//   } catch (err) {
//     return NextResponse.json({ success: false });
//   }
// }

export async function POST(request) {
  try {
    let payload = await request.json();
    await connectDB();
    const { emailId, password, name, city, login } = payload;
    let result;
    let success = false;
    if (login) {
      result = await userModel.findOne({
        emailId,
      });
      let ispasswordcorrect = await bcrypt.compare(password, result.password);
      if (!ispasswordcorrect) {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 },
        );
      }
      success = true;
    } else {
      const bcryptpassword = await bcrypt.hash(payload.password, 10);
      payload.password = bcryptpassword;
      const restaurant = new userModel(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }
    const token = jwt.sign(
      { id: result._id, emailId: result.emailId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    const response = NextResponse.json({ success, result }, { status: 200 });

    response.cookies.set("fooddeliverytoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { error: "Failed to resturant registration", success: false },
      { status: 500 },
    );
  }
}
