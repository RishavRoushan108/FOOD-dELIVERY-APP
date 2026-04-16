import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("fooddeliverytoken")?.value;
  const { pathname } = req.nextUrl;

  // 1. If user is trying to access protected routes WITHOUT a token
  if (!token) {
    // Add all routes you want to protect here
    if (
      pathname.startsWith("/restaurant/user") ||
      pathname.startsWith("/restaurant/hotel") ||
      pathname.startsWith("/restaurant/deliverypartner")
    ) {
      // Redirect them to the login page (or main restaurant page)
      return NextResponse.redirect(new URL("/restaurant", req.url));
    }
  }

  return NextResponse.next();
}

// The matcher controls WHICH pages the middleware runs on
export const config = {
  matcher: [
    "/restaurant/user/:path*",
    "/restaurant/hotel/:path*",
    "/restaurant/deliverypartner/:path*",
  ],
};
