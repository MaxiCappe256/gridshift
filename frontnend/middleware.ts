import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Usamos nextUrl para evitar el error de 'pathname'
  const { pathname } = request.nextUrl;

  // 2. Intentamos agarrar el valor del token
  const token = request.cookies.get("token")?.value;

  // DEBUG: Esto lo vas a ver en la terminal de Vercel (Runtime Logs)
  console.log(`Ruta: ${pathname} | ¿Tiene Token?: ${!!token}`);

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/clients");

  // Si es ruta protegida y NO hay token -> Al login (página raíz)
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si ya hay token y está en el login -> Al dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Este matcher evita que el middleware corra en archivos de sistema
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
