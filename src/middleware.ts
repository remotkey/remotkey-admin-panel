import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./common/fetchers";
import { validateToken } from "./lib/validateToken";

export async function middleware(req: NextRequest) {
  const token = getToken();
  const isSignInPage = req.nextUrl.pathname === "/signin";
  const isHomePage = req.nextUrl.pathname === "/";
  if (token) {
    const isAuthenticated = await validateToken(token);
    console.log("isAuthenticated", isAuthenticated);
    if ((isAuthenticated && isSignInPage) || isHomePage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isAuthenticated) {
      return NextResponse.next();
    }

    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }

  if (!isSignInPage) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/property",
    "/dashboard",
    "/add-property",
    "/edit-property",
    "/signin",
  ],
};
