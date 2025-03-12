"use client";

import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export default function Inventaire() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('/api/stock');
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du stock");
        }
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchStock();
  }, []);

  return (
    <Layout>
      <hr className="border-t border-gray-300" />
      <h1 className="text-3xl font-bold mb-4 mt-3 text-center">Inventaire</h1>
      <hr className="border-t border-gray-300" />
      <div className="bg-black shadow-md rounded-lg p-6 w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-400 px-4 py-2">Produit</th>
              <th className="border border-gray-400 px-4 py-2">Quantité</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <tr key={index} className="text-white">
                  <td className="border border-gray-400 px-4 py-2">{stock.product.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{stock.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-white py-4">
                  Aucun stock disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
