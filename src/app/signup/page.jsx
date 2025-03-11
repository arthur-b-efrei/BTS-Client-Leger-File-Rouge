"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import du router
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter(); // Initialisation du router

  const [formData, setFormData] = useState({
    pseudo: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthday: "",
    gender: "",
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/signin"); // Redirection après succès
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="SignupPage">
       <h1 className="text-6xl font-extrabold tracking-tight mb-6">S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="Prenom"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Nom de famille"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Sélectionner votre genre</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
        <button 
          type="submit"
          className="w-full bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-bold transition-all duration-300"
        >
          Valider
        </button>
      </form>
      <h2>
      <Link href="/" className="w-full bg-black text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-bold transition-all duration-300">
          Retour
        </Link>
      </h2>
    </div>
  );
};

export default SignupPage;
