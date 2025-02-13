"use client";

import DashboardLayout from '../components/DashboardLayout';

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Inventaire</h1>
        {/* Ajoutez ici le contenu spécifique à la page de l'inventaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exemple de carte d'inventaire */}
          <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Produit 1</h2>
            <p className="text-gray-400">Description du produit 1</p>
            <p className="text-gray-300 mt-2">Quantité: 100</p>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Produit 2</h2>
            <p className="text-gray-400">Description du produit 2</p>
            <p className="text-gray-300 mt-2">Quantité: 50</p>
          </div>
          {/* Ajoutez d'autres cartes d'inventaire selon vos besoins */}
        </div>
      </div>
    </DashboardLayout>
  );
}
