// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("fooddeliverytoken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/restaurant", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/restaurant/dashboard/:path*"],
};
