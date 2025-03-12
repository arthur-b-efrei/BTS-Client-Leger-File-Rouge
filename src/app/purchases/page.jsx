"use client"; // Indique que ce composant est un client React

import Layout from '../components/Layout';
import { useState } from 'react';

export default function PurchasesPage() {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    reference: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Achat enregistré avec succès !');
        setFormData({ productName: '', quantity: '', reference: '', price: '' });
      } else {
        alert('Erreur lors de l\'enregistrement de l\'achat');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <Layout>
      <hr className="border-t border-gray-300" />
      <h1 className="text-3xl font-bold mb-4 mt-3 text-center">Gestion des Achats</h1>
      <hr className="border-t border-gray-300" />
      <div className="bg-black shadow-md rounded-lg p-6 w-full overflow-x-hidden">
        <form className="space-y-0" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-white">Produit</label>
            <input
              type="text"
              name="productName"
              className="w-full p-2 border rounded text-black"
              placeholder="Nom du produit"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Quantité</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-2 border rounded text-black"
              placeholder="Quantité achetée"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Référence</label>
            <input
              type="number"
              name="reference"
              className="w-full p-2 border rounded text-black"
              placeholder="Référence du produit"
              value={formData.reference}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Prix</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full p-2 border rounded text-black"
              placeholder="Prix du produit"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enregistrer l'Achat
          </button>
        </form>
      </div>
    </Layout>
  );
}
