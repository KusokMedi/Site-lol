import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGS = ["en", "ru", "lv", "uk", "zh", "es", "hi", "pt", "fr", "de", "ja", "ko"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match exactly /{lang} — single path segment, no trailing slash needed
  const segment = pathname.slice(1); // e.g. "lv" from "/lv"

  if (SUPPORTED_LANGS.includes(segment)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("lang", segment);
    return NextResponse.redirect(url, { status: 302 });
  }

  return NextResponse.next();
}

export const config = {
  // Run only on /{segment} paths, skip _next, api, static files
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
