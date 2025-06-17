  "use client";

  import Layout from '../components/Layout';
  import { useState, useEffect } from 'react';

  export default function Statistiques() {
    const [stats, setStats] = useState({
      totalProduits: 0,
      valeurStockTotal: 0,
      chiffreAffaires: 0,
      benefices: 0,
      marge: 0,
      nombreVentes: 0,
      nombreAchats: 0,
      historiqueVentes: [],
      historiqueAchats: []
    });

    useEffect(() => {
      async function fetchStatistiques() {
        try {
          const response = await fetch('/api/statistiques');
          const data = await response.json();
          setStats(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des statistiques", error);
        }
      }

      // Fetch immédiat
      fetchStatistiques();

      // Mise à jour périodique toutes les minutes
      const intervalId = setInterval(fetchStatistiques, 60000);

      // Nettoyage de l'intervalle lors du démontage du composant
      return () => clearInterval(intervalId);
    }, []);

    return (
      <Layout>
        <hr className='border-t border-gray-300'/>
        <h1 className="bg-black text-3xl font-bold mb-4 mt-3 text-center">Statistiques</h1>
        <hr className='border-t border-gray-300'/>

        <div className="grid md:grid-cols-2  gap-4 p-2 w-full">
          {/* Statistiques Principales */}
          <div className="bg-black shadow-md rounded-lg p-6 w-full overflow-x-hidden">
            <h2 className="text-2xl font-bold mb-4">Vue d&apos;Ensemble</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Nombre de Produits</span>
                <span>{stats.totalProduits}</span>
              </div>
              <div className="flex justify-between">
                <span>Valeur Totale du Stock</span>
                <span>{typeof stats.valeurStockTotal === 'number' ? stats.valeurStockTotal.toFixed(2) : '0.00'} €</span>
              </div>
              <div className="flex justify-between">
                <span>Chiffre d&apos;Affaires</span>
                <span>{typeof stats.chiffreAffaires === 'number' ? stats.chiffreAffaires.toFixed(2) : '0.00'} €</span>
              </div>
              <div className="flex justify-between">
                <span>Bénéfices</span>
                <span>{typeof stats.benefices === 'number' ? stats.benefices.toFixed(2) : '0.00'} €</span>
              </div>
              <div className="flex justify-between">
                <span>Marge</span>
                <span>{typeof stats.marge === 'number' ? stats.marge.toFixed(2) : '0.00'} %</span>
              </div>
            </div>
          </div>

          {/* Historiques */}
          <div className="space-y-2">
            <div className="bg-black p-2 rounded-lg text-white w-full">
              <h2 className="text-2xl font-bold mb-4">Historique des Ventes</h2>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left">Produit</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                      <th>Utilisateur</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.historiqueVentes.map((vente, index) => (
                      <tr key={index} className="border-b border-white">
                        <td>{vente.product?.name || 'Produit supprimé'}</td>
                        <td className="text-center">{vente.quantity}</td>
                        <td className="text-center">
                          {vente.sales_price
                            ? Number(vente.sales_price).toFixed(2)
                            : '0.00'} €
                        </td>
                        <td className="text-center">
                          {vente.user?.pseudo || 'Utilisateur inconnu'}
                        </td>
                        <td className="text-center">
                          {new Date(vente.sale_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-black p-6 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Historique des Achats</h2>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left">Produit</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                      <th>Utilisateur</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.historiqueAchats.map((achat, index) => (
                      <tr key={index} className="border-b border-white">
                        <td>{achat.product?.name || 'Produit supprimé'}</td>
                        <td className="text-center">{achat.quantity}</td>
                        <td className="text-center">
                          {achat.product?.price
                            ? Number(achat.product.price).toFixed(2)
                            : '0.00'} €
                        </td>
                        <td className="text-center">
                          {achat.user?.pseudo || 'Utilisateur inconnu'}
                        </td>
                        <td className="text-center">
                          {new Date(achat.purchase_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
