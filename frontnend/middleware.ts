import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Ignorar peticiones de prefetched o datos internos para evitar el rebote instantáneo
  if (searchParams.has("_rsc")) {
    return NextResponse.next();
  }

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/clients");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
