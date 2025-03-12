"use client";

import React, { createContext, useState, useContext } from "react";

// Créer un contexte utilisateur
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Fournisseur du contexte utilisateur
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction pour mettre à jour les informations de l'utilisateur
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
