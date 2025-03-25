import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer tous les produits avec leur quantité en stock
    const products = await prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return new Response(
      JSON.stringify(products),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur lors de la récupération des produits', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(req) {
  try {
    const { productId } = await req.json();
    
    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'ID du produit requis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Supprimer le produit
    await prisma.product.delete({
      where: { product_id: parseInt(productId) }
    });

    return new Response(
      JSON.stringify({ message: 'Produit supprimé avec succès' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erreur serveur lors de la suppression du produit', 
        details: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}