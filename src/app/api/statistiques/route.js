import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = new PrismaClient();

  try {
    // Nombre total de produits
    const totalProduits = await prisma.product.count();

    // Valeur totale du stock
    const stockProducts = await prisma.product.findMany();
    const valeurStockTotal = stockProducts.reduce((total, product) =>
      total + (Number(product.price) * product.stock_quantity), 0);

    // Chiffre d'affaires (total des ventes)
    const ventesTotales = await prisma.sale.findMany();
    const chiffreAffaires = ventesTotales.reduce((total, vente) =>
      total + (Number(vente.sales_price) * vente.quantity), 0);

    // Historique des ventes avec détails du produit et de l'utilisateur
    const historiqueVentes = await prisma.sale.findMany({
      take: 10,
      orderBy: { sale_date: 'desc' },
      include: {
        product: true,  // Inclure les détails du produit
        user: true      // Inclure les détails de l'utilisateur
      }
    });

    // Nombre de ventes et achats
    const nombreVentes = ventesTotales.length;
    const achats = await prisma.purchase.findMany();
    const nombreAchats = achats.length;

    // Historique des achats avec détails du produit et de l'utilisateur
    const historiqueAchats = await prisma.purchase.findMany({
      take: 10,
      orderBy: { purchase_date: 'desc' },
      include: {
        product: true,  // Inclure les détails du produit
        user: true      // Inclure les détails de l'utilisateur
      }
    });

    // Calcul des coûts d'achat
    const coutAchats = achats.reduce((total, achat) => {
      const produit = stockProducts.find(p => p.product_id === achat.product_id);
      return total + (produit ? Number(produit.price) * achat.quantity : 0);
    }, 0);

    // Bénéfices (Chiffre d'affaires - Coût des achats)
    const benefices = chiffreAffaires - coutAchats;

    // Marge (Bénéfices / Chiffre d'affaires * 100)
    const marge = chiffreAffaires > 0
      ? ((benefices / chiffreAffaires) * 100)
      : 0;

    return NextResponse.json({
      totalProduits,
      valeurStockTotal,
      chiffreAffaires,
      benefices,
      marge,
      nombreVentes,
      nombreAchats,
      historiqueVentes,
      historiqueAchats
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques", error);
    return NextResponse.json({
      totalProduits: 0,
      valeurStockTotal: 0,
      chiffreAffaires: 0,
      benefices: 0,
      marge: 0,
      nombreVentes: 0,
      nombreAchats: 0,
      historiqueVentes: [],
      historiqueAchats: []
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
