"use client";

import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Récupérer le token d'authentification depuis localStorage (ou autre méthode)
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Utilisateur non authentifié.");
          return;
        }

        // Appel API pour récupérer les informations utilisateur
        const response = await fetch("/api/auth/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Envoi du token pour l'authentification
          },
        });

        if (!response.ok) {
          throw new Error("Erreur de récupération des données utilisateur.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-white">Chargement des données...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-center text-red-600">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <hr />
      <h1 className="bg-black text-3xl font-bold mb-4 mt-3 text-white">Profile</h1>
      <hr />
      <div className="bg-black text-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
        {user && (
          <div className="space-y-4">
            <p className="text-xl">
              <span className="font-semibold">Nom :</span> {user.first_name} {user.last_name}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Email :</span> {user.email}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Date de naissance :</span> {new Date(user.birthday).toLocaleDateString()}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Genre :</span> {user.gender}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
