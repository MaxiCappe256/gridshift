import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Obtenemos el token de las cookies
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // RUTAS PROTEGIDAS
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/clients");

  // Si intenta entrar a una ruta protegida y NO hay token
  if (isProtectedRoute && !token) {
    // En lugar de un 307 directo, redirigimos al home
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Si YA tiene token y está en el login, mandalo al dashboard
  if (token && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // El matcher debe incluir las rutas que querés proteger
  matcher: ["/", "/dashboard/:path*", "/clients/:path*"],
};
