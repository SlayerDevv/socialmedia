import { NextResponse } from "next/server";
import { VerifyToken } from "./utils/VerifyToken";

export async function middleware(req) {
  const token = req.cookies.get("token");
  console.log("Token:", token);

  if (!token) {
      console.log("No token, redirecting to /login");
      if (req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
          return NextResponse.redirect(new URL("/login", req.url));
      }
  } else {
      const isValid = await VerifyToken(token.value);
      console.log("Token is valid:", isValid);
      if (!isValid) {
          console.log("Invalid token, redirecting to /login");
          if (req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
             // return NextResponse.redirect(new URL("/login", req.url));
          }
      } else {
          if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") {
              console.log("Already logged in, redirecting to /");
              return NextResponse.redirect(new URL("/", req.url));
          }
      }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/register", "/profile/:path*"], // Apply middleware to these routes
};
