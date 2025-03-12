import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Données reçues:", body);
    const { email, password } = body;

    // Vérification si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Veuillez fournir un email et un mot de passe' },
        { status: 400 }
      );
    }

    // Recherche de l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    // Comparaison du mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Supprimer le mot de passe de la réponse
    const { password: _, ...userWithoutPassword } = user;

    // Retourner les données utilisateur sans mot de passe
    return NextResponse.json(
      { message: 'Connexion réussie', user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
