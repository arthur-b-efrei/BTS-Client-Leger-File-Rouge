'use client';

import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Inventaire() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fonction pour charger les produits depuis l'API
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventory');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      
      const data = await response.json();
      setProducts(data);
      setError('');
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger les produits. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits au chargement du composant
  useEffect(() => {
    loadProducts();
  }, []);

  // Fonction pour supprimer un produit
  const handleDelete = async (productId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const response = await fetch('/api/inventory', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Recharger les produits après la suppression
      loadProducts();
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de la suppression du produit');
    }
  };

  // Fonction pour éditer un produit
  const handleEdit = (productId) => {
    router.push(`/edit-product/${productId}`);
  };

  // Fonction pour filtrer les produits
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let compareA = a[sortBy];
    let compareB = b[sortBy];

    // Gestion spécifique pour les valeurs numériques
    if (sortBy === 'price' || sortBy === 'stock_quantity') {
      compareA = parseFloat(compareA);
      compareB = parseFloat(compareB);
    } else {
      compareA = compareA?.toString().toLowerCase() || '';
      compareB = compareB?.toString().toLowerCase() || '';
    }

    if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
    if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Fonction pour changer le tri
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Générer l'icône de tri
  const getSortIcon = (column) => {
    if (sortBy !== column) return '⇅';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <Layout>
      <hr className="border-t border-gray-300" />
      <h1 className="text-3xl font-bold mb-4 mt-3 text-center">Gestion de l'Inventaire</h1>
      <hr className="border-t border-gray-300" />
      
      {/* Barre de recherche centrée */}
      <div className="my-4 flex justify-center">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full text-black"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-black shadow-md rounded-lg p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center py-4 text-white">Chargement...</div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-4 text-white">
            {searchTerm ? "Aucun produit ne correspond à votre recherche" : "Aucun produit dans l'inventaire"}
          </div>
        ) : (
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="bg-gray-900">
                <th 
                  className="text-black bg-white border border-black p-2 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Produit {getSortIcon('name')}
                </th>
                <th 
                  className="text-black bg-white border border-black p-2 cursor-pointer"
                  onClick={() => handleSort('stock_quantity')}
                >
                  Quantité en Stock {getSortIcon('stock_quantity')}
                </th>
                <th 
                  className="text-black bg-white border border-black p-2 cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  Prix {getSortIcon('price')}
                </th>
                <th 
                  className="text-black bg-white border border-white p-2 cursor-pointer"
                  onClick={() => handleSort('product_id')}
                >
                  Référence {getSortIcon('product_id')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.product_id} className="hover:bg-white">
                  <td className="border border-white p-2 text-center">{product.name}</td>
                  <td className="border border-white p-2 text-center">
                    <span className={product.stock_quantity <= 10 ? 'text-red-500' : ''}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="border border-white p-2 text-center">
                    {parseFloat(product.price).toFixed(2)}€
                  </td>
                  <td className="border border-white p-2 text-center">{product.product_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}