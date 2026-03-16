import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Intentamos obtener todas las cookies para ver qué llega
  const allCookies = request.cookies.getAll();
  console.log("Cookies que llegan a Vercel:", allCookies);

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
