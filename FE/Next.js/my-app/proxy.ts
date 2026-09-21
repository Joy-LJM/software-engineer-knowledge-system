import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
// specify paths where the Proxy applies, in this case all paths under /about/*
// the status code for the redirect is 307 (Temporary Redirect) by default, but you can specify a different status code if needed
export const config = {
  matcher: "/about/:path*",
};
