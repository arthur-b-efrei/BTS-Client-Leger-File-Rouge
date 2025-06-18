"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/inventory", label: "Inventaire" },
    { href: "/purchases", label: "Achats" },
    { href: "/sales", label: "Ventes" },
    { href: "/statistics", label: "Statistiques" },
    { href: "/profile", label: "Profile" },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.replace("/signin");
      } else {
        alert("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      alert("Une erreur est survenue : " + error.message);
    }
  };

  return (
    <nav className="bg-black text-white w-screen px-6 py-5 z-40 relative">
      <div className="flex justify-between items-center w-full relative">
        <Link
          href="/pages"
          className="text-3xl font-extrabold tracking-tight text-white"
          onClick={() => setIsOpen(false)}
        >
          Inventary
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-500 ease-in-out
                ${
                  pathname === item.href
                    ? "bg-white text-black scale-105 shadow-lg"
                    : "hover:bg-black text-white hover:text-white hover:scale-105"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bouton déconnexion desktop */}
        <button
          onClick={handleLogout}
          className="hidden md:inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ml-4"
        >
          Déconnexion
        </button>

        {/* Burger menu button mobile */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="fill-current h-6 w-6" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29a1 1 0 10-1.42 1.42L10.83 12l-5.13 5.13a1 1 0 101.42 1.42L12 14.83l4.88 4.88a1 1 0 001.42-1.42L13.17 12l5.13-5.13z"
              />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-start pt-24 px-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                w-full max-w-xs text-center px-4 py-3 rounded-lg text-lg font-semibold mb-2
                transition duration-300 ease-in-out
                ${
                  pathname === item.href
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-800 hover:text-white"
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg w-full max-w-xs font-semibold mt-4"
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}
