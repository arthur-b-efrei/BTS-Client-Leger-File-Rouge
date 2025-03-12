import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Données reçues pour l'achat :", body);

    const { productName, quantity, reference, price } = body;

    // Vérification des champs obligatoires
    if (!productName || !quantity || !reference || !price) {
      console.error("Données manquantes :", { productName, quantity, reference, price });
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    // Vérifie si le produit existe déjà
    let product = await prisma.product.findFirst({
      where: { name: productName },
    });

    // Si le produit n'existe pas, le créer
    if (!product) {
      product = await prisma.product.create({
        data: {
          name: productName,
          description: "Produit ajouté via achat",
          price: parseFloat(price),
          stock_quantity: 0, // On met à 0 pour le moment
        },
      });
      console.log("Produit créé :", product);
    }

    // Enregistrement de l'achat
    const purchase = await prisma.purchase.create({
      data: {
        product_id: product.product_id,
        quantity: parseInt(quantity),
        user_id: 1, // À remplacer par l'ID de l'utilisateur connecté
      },
    });

    console.log("Achat enregistré :", purchase);

    return NextResponse.json(
      { message: "Achat enregistré avec succès.", purchase },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'achat :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement de l'achat" },
      { status: 500 }
    );
  }
}
