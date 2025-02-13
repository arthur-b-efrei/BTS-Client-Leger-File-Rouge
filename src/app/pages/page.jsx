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

export default function Page() {
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
      <nav className="bg-[#0a0a0a] border-b border-gray-800 fixed w-full z-30 top-0">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-[#005bb5] transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <Link href="/" className="ml-4 text-xl font-bold">INVENTARY</Link>
          </div>
          <div className="flex items-center space-x-4 ml-10"> {/* Ajustez ml-10 pour un positionnement plus à gauche */}
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <Link href="/profile" className="text-sm font-medium">NOM PRENOM</Link>
            </div>
            <button className="p-2 rounded-md hover:bg-[#005bb5] transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quick Stats Cards */}
              <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-400">Produits en stock</p>
                    <p className="text-2xl font-semibold">NB</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-400">Ventes du jour</p>
                    <p className="text-2xl font-semibold">NB</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-400">Achats en attente</p>
                    <p className="text-2xl font-semibold">NB</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart2 className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-400">CA du mois</p>
                    <p className="text-2xl font-semibold">NB€</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-8 bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Bienvenue sur votre tableau de bord</h2>
              <p className="text-gray-400">
                Gérez votre inventaire, suivez vos ventes et vos achats, et consultez vos statistiques en temps réel.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
