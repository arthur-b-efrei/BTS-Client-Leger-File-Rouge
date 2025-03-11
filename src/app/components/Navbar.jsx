"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/inventory", label: "Inventaire" },
    { href: "/purchases", label: "Achats" },
    { href: "/sales", label: "Ventes" },
    { href: "/statistics", label: "Statistiques" },
    {href: "/profile", label: "Profile"}
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.replace("/signin"); // Redirige vers signin et empêche le retour en arrière
      } else {
        alert("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      alert("Une erreur est survenue : " + error.message);
    }
  };

  return (
    <nav className="bg-black text-white w-screen px-6 py-5">
      <div className="flex justify-between items-center w-full">
      <Link href="/pages" className="text-3xl font-extrabold tracking-tight text-white">
          Inventary
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-500 ease-in-out
                ${
                  pathname === item.href
                    ? "bg-white text-black scale-105 shadow-lg"
                    : "hover: bg-black text-white hover:text-white bg-black hover:scale-105"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
