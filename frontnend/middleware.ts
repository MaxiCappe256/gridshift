import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Usar nextUrl para obtener el pathname sin errores de tipos
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // RUTAS PROTEGIDAS
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/clients");

  // Si no hay token y quiere entrar a una ruta protegida
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si hay token e intenta ir al login (página raíz)
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Evitamos que el middleware corra en archivos estáticos o internos de Next
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
