"use client";

import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer les informations utilisateur depuis localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      window.location.href = '/signin';
    }
  }, []);

  if (!user) {
    return <div>Chargement...</div>; // Afficher un message de chargement si les données ne sont pas encore chargées
  }

  return (
    <Layout>
      <hr />
      <h1 className="bg-black text-3xl font-bold mb-4 mt-3 text-white">Profile</h1>
      <hr />
      <div className="bg-black text-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
        <div className="space-y-4">
          <p className="text-xl"><span className="font-semibold">Nom :</span> {user.first_name} {user.last_name}</p>
          <p className="text-xl"><span className="font-semibold">Email :</span> {user.email}</p>
          <p className="text-xl"><span className="font-semibold">Date de naissance :</span> {new Date(user.birthday).toLocaleDateString()}</p>
          <p className="text-xl"><span className="font-semibold">Genre :</span> {user.gender}</p>
          <p className="text-xl"><span className="font-semibold">Date de création du compte :</span> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </Layout>
  );
}
