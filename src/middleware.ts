import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const requireAuth: string[] = [
  "/chat",
  "/api",
  "/reporting",
  "/unauthorized",
  "/persona",
  "/prompt"
  "/lida"
];
const requireAdmin: string[] = [
  "/reporting",
  "/persona" // Added to require admin privileges
];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
    });

    //check not logged in
    if (!token) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }

    if (requireAdmin.some((path) => pathname.startsWith(path))) {
      //check if not authorized
      if (!token.isAdmin) {
        const url = new URL(`/unauthorized`, request.url);
        return NextResponse.rewrite(url);
      }
    }
  }

  return res;
}

// note that middleware is not applied to api/auth as this is required to logon (i.e. requires anon access) - Update the matcher config to include the persona path
export const config = {
  matcher: [
    "/unauthorized/:path*",
    "/reporting/:path*",
    "/api/chat:path*",
    "/api/images:path*",
    "/chat/:path*",
    "/persona/:path*", // Added to match persona path
    "/lida/:path*", // Add the new path matcher here
  ],
};
