import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie'; // Lib pour manipuler les cookies

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
  }

  // Créer un token d'authentification (ici un token simple pour exemple)
  const token = 'someRandomGeneratedToken';

  // Ajouter le token dans un cookie
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Utiliser le cookie sécurisé en production
    maxAge: 60 * 60 * 24, // Expire dans 24h
    path: '/',
  });

  // Réponse avec le cookie
  const response = NextResponse.json({ message: 'Connexion réussie' });
  response.headers.set('Set-Cookie', cookie); // Ajouter le cookie à la réponse

  return response;
}
