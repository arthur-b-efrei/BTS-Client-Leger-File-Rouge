'use client';

import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Ventes() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerms, setSearchTerms] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Add setSearchTerms when typing in the product name
    if (name === 'productName') {
      setSearchTerms(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation des données
    if (!formData.productName || !formData.quantity || !formData.price) {
      setError('Tous les champs sont requis');
      setLoading(false);
      return;
    }

    // Récupérer le user_id depuis le localStorage
    let userId = null;
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        userId = user && user[0] ? user[0] : null;
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données utilisateur:", err);
    }

    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: formData.productName,
          quantity: formData.quantity,
          price: formData.price,
          user_id: userId,
          searchTerms: searchTerms, // Include searchTerms in the request body
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Vente enregistrée avec succès !');
        setFormData({ productName: '', quantity: '', price: '' });
        setSearchTerms(''); // Reset search terms after successful submission
      } else {
        setError(data.error || 'Erreur lors de l\'enregistrement de la vente');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <hr className="border-t border-gray-300" />
      <h1 className="text-3xl font-bold mb-4 mt-3 text-center">Gestion des Ventes</h1>
      <hr className="border-t border-gray-300" />
      <div className="bg-black shadow-md rounded-lg p-6 w-full overflow-x-hidden">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-white">Produit</label>
            <input
              type="text"
              name="productName"
              className="w-full p-2 border rounded text-black"
              placeholder="Nom du produit"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Quantité</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-2 border rounded text-black"
              placeholder="Quantité vendue"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Prix de vente</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full p-2 border rounded text-black"
              placeholder="Prix de vente du produit"
              value={formData.price}
              onChange={handleChange}
              min="0.01"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-white disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Enregistrement en cours...' : 'Enregistrer la Vente'}
          </button>
        </form>
      </div>
    </Layout>
  );
}