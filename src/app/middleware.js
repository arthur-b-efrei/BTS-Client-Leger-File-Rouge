import { NextResponse } from 'next/server';
import { parseCookies } from 'nookies'; // Librairie pour manipuler les cookies

export function middleware(req) {
  const cookies = parseCookies(req); // Récupère les cookies
  const token = cookies.token; // Supposons que ton token d'authentification est stocké dans un cookie appelé "token"

  // Pages protégées, nécessite une authentification
  const protectedPaths = ['/profile', '/inventory', '/purchases', '/sales', '/statistics'];

  // Si l'utilisateur tente d'accéder à une page protégée sans token, rediriger vers la page de connexion
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL('/signin', req.url)); // Rediriger vers /signin si non authentifié
  }

  return NextResponse.next(); // Sinon, continuer normalement
}
