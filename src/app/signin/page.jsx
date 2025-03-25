"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

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
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text(); // Lire la réponse en texte pour débogage
      console.log('Response Text:', text); // Afficher la réponse brute dans la console

      // Réessayer de récupérer les données JSON après avoir lu le texte
      const data = JSON.parse(text); // Utiliser JSON.parse au lieu de response.json() si vous avez déjà lu le texte

      if (response.ok) {
        // Sauvegarder les informations de l'utilisateur dans localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(data.user)); // Sauvegarder l'utilisateur
        localStorage.setItem('user_id', data.user.id); // Sauvegarder l'user_id

        router.push('/inventory'); // Rediriger vers la page de profil
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Une erreur est survenue : ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-6xl font-extrabold tracking-tight mb-6">Se connecter</h1>
      
      <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-md w-80">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded bg-white text-black placeholder-gray-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded bg-white text-black placeholder-gray-800"
        />
        <button 
          type="submit"
          className="w-full bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-bold transition-all duration-300"
        >
          Valider
        </button>
      </form>

      <h2 className="mt-4">
        <Link href="/" className="w-full bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-bold transition-all duration-300">
          Retour
        </Link>
      </h2>
    </div>
  );
};

export default SigninPage;
