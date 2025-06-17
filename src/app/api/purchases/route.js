import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Récupérer les données envoyées dans la requête
    const { productName, quantity, price, user_id } = await req.json();
    console.log('Données reçues:', { productName, quantity, price, user_id });

    // Validation des données reçues
    if (!productName || !quantity || !price) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs sont requis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convertir les valeurs en nombres
    const numericQuantity = parseInt(quantity, 10);
    const numericPrice = parseFloat(price);

    // Vérifier si le produit existe déjà
    let product = await prisma.product.findFirst({
      where: { name: productName }
    });

    // Si le produit n'existe pas, on le crée
    if (!product) {
      product = await prisma.product.create({
        data: {
          name: productName,
          price: numericPrice,
          stock_quantity: 0, // On initialise à 0 car c'est un achat
        }
      });
    }

    // Créer l'achat
    const purchase = await prisma.purchase.create({
      data: {
        product_id: product.product_id,
        quantity: numericQuantity,
        user_id: user_id || 1, // Si pas d'utilisateur, on utilise un ID par défaut
      }
    });

    // Mettre à jour le stock
    await prisma.stock.create({
      data: {
        product_id: product.product_id,
        quantity: numericQuantity,
        user_id: user_id || 1, // Si pas d'utilisateur, on utilise un ID par défaut
      }
    });

    // Mettre à jour la quantité en stock du produit
    await prisma.product.update({
      where: { product_id: product.product_id },
      data: {
        stock_quantity: {
          increment: numericQuantity
        }
      }
    });

    // Enregistrer l'action dans l'historique
    if (user_id) {
      await prisma.history.create({
        data: {
          action: `Achat de ${numericQuantity} ${productName}`,
          user_id: user_id
        }
      });
    }

    // Si tout va bien, renvoyer un message de succès
    return new Response(
      JSON.stringify({ 
        message: 'Achat enregistré avec succès.',
        product: product,
        purchase: purchase
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'achat :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur lors de l\'enregistrement de l\'achat', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
}