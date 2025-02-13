"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Package,
  ShoppingCart,
  ShoppingBag,
  BarChart2,
  Menu as MenuIcon,
  LogOut,
  User
} from 'lucide-react';

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Inventaire',
      icon: <Package className="w-5 h-5" />,
      href: '/inventory'
    },
    {
      title: 'Ventes',
      icon: <ShoppingCart className="w-5 h-5" />,
      href: '/sales'
    },
    {
      title: 'Achats',
      icon: <ShoppingBag className="w-5 h-5" />,
      href: '/purchases'
    },
    {
      title: 'Statistiques',
      icon: <BarChart2 className="w-5 h-5" />,
      href: '/statistics'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Navigation Bar */}
      <nav className="bg-[#0a0a0a] border-b border-gray-800 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-[#005bb5] transition-colors"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <h1 className="ml-4 text-xl font-bold">INVENTARY</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">NOM PRENOM</span>
              </div>
              <button className="p-2 rounded-md hover:bg-[#005bb5] transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 h-full bg-[#0a0a0a] border-r border-gray-800 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <nav className="mt-8 space-y-2 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-[#005bb5]'
                    : 'hover:bg-[#005bb5]'
                }`}
              >
                <div>{item.icon}</div>
                {isSidebarOpen && (
                  <span className="font-medium">{item.title}</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          } p-8`}
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Profil</h1>
            {/* Ajoutez ici le contenu spécifique à la page du profil */}
          </div>
        </main>
      </div>
    </div>
  );
}
