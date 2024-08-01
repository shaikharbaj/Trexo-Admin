import { NextResponse } from "next/server";

const privateRoutes = [
  '/dashboard',
  '/global-settings',
  '/industry'
];
const publicRoutes = [
  '/login',
  '/forgot-password'
];

export function middleware(request: any) {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname; // Check if there is any supported locale in the pathname
  const token = request.cookies.get("token")?.value;
  if (!token) {
    if (privateRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (publicRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    //"/((?!api|assets|.*\\..*|_next).*)",
    "/((?!api|assets|docs|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
  ],
};
