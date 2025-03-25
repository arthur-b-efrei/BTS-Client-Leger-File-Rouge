import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Récupérer les données envoyées dans la requête
    const { productName, quantity, price, user_id } = await req.json();

    // Validation des données reçues
    if (!productName || !quantity || !price) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Convertir les valeurs en nombres
    const numericQuantity = parseInt(quantity, 10);
    const numericPrice = parseFloat(price);

    // Trouver le produit
    const product = await prisma.product.findFirst({
      where: { name: productName }
    });

    // Vérifier si le produit existe
    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé.' },
        { status: 404 }
      );
    }

    // Vérifier si le stock est suffisant
    if (product.stock_quantity < numericQuantity) {
      return NextResponse.json(
        { error: 'Stock insuffisant.' },
        { status: 400 }
      );
    }

    // Créer la vente
    const sale = await prisma.sale.create({
      data: {
        product_id: product.product_id,
        quantity: numericQuantity,
        sales_price: numericPrice, // Ajoutez cette ligne
        user_id: user_id || 1, // Si pas d'utilisateur, on utilise un ID par défaut
      }
    });

    // Créer une entrée dans le stock (mouvement de sortie)
    await prisma.stock.create({
      data: {
        product_id: product.product_id,
        quantity: -numericQuantity, // Négatif pour indiquer une sortie
        user_id: user_id || 1,
      }
    });

    // Mettre à jour la quantité en stock du produit
    await prisma.product.update({
      where: { product_id: product.product_id },
      data: {
        stock_quantity: {
          decrement: numericQuantity
        }
      }
    });

    // Enregistrer l'action dans l'historique
    if (user_id) {
      await prisma.history.create({
        data: {
          action: `Vente de ${numericQuantity} ${productName}`,
          user_id: user_id
        }
      });
    }

    // Si tout va bien, renvoyer un message de succès
    return NextResponse.json({
      message: 'Vente enregistrée avec succès.',
      product: product,
      sale: sale
    }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la vente :', error);
    return NextResponse.json(
      {
        error: 'Erreur serveur lors de l\'enregistrement de la vente',
        details: error.message
      },
      { status: 500 }
    );
  }
}
