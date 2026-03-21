import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fooddeliverytoken")?.value;
  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("INVALID_TOKEN");
  }
}
