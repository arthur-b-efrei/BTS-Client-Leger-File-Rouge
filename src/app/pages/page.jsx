"use client";

import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export default function Home() {
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
    async function fetchData() {
      try {
        const response = await fetch('/api/statistiques');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <hr />
      <h1 className="text-3xl font-bold mb-4 mt-3 text-center">Tableau de Bord</h1>
      <hr />
      <div className="grid grid-cols-1 gap-6 p-4 w-full text-center">
        {/* Résumé des Stocks */}
        <div className="bg-black text-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Résumé des Stocks</h2>
          <p className="text-white">
            Nombre total de produits : {stats.totalProduits}
          </p>
          <p className="text-white">
            Valeur totale du stock : {typeof stats.valeurStockTotal === 'number' ? stats.valeurStockTotal.toFixed(2) : '0.00'} €
          </p>
        </div>

        {/* Rapport des Ventes, Achats et Stocks */}
        <div className="bg-black text-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Rapport des Ventes, Achats et Stocks</h2>
          <p className="text-white">
            Chiffre d'affaires : {typeof stats.chiffreAffaires === 'number' ? stats.chiffreAffaires.toFixed(2) : '0.00'} €
          </p>
          <p className="text-white">
            Bénéfices : {typeof stats.benefices === 'number' ? stats.benefices.toFixed(2) : '0.00'} €
          </p>
          <p className="text-white">
            Marge : {typeof stats.marge === 'number' ? stats.marge.toFixed(2) : '0.00'} %
          </p>
          <p className="text-white">
            Nombre de ventes : {stats.nombreVentes}
          </p>
          <p className="text-white">
            Nombre d'achats : {stats.nombreAchats}
          </p>
        </div>
      </div>
    </Layout>
  );
}
