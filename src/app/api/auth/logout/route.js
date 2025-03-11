import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  // Supprimer le cookie "token"
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Sécuriser en production
    expires: new Date(0), // Expirer immédiatement
    path: '/',
  });

  const response = NextResponse.json({ message: 'Déconnexion réussie' });
  response.headers.set('Set-Cookie', cookie); // Supprimer le cookie en envoyant une réponse

  return response;
}
