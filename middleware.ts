import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "en";
let locales = ["bn", "en", "ar"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: any) {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname; // Check if there is any supported locale in the pathname
  const token = request.cookies.get("token")?.value;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  // if (!token) {
  //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // } else if (url.pathname === "/login" || url.pathname === "/") {
  //   url.pathname = "/dashboard";
  //   return NextResponse.redirect(url);
  // }
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
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
