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

export default function DashboardLayout({ children }) {
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
      <nav className="bg-[#0a0a0a] border-b border-gray-800 fixed w-full z-0 top-0">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center ml-800">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-[#005bb5] transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <Link href="/" className="ml-4 text-xl font-bold">INVENTARY</Link>
          </div>
          <div className="flex items-center space-x-4 ml-20"> {/* Ajustez ml-20 pour un positionnement plus à gauche */}
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
          className={`fixed left-0 top-16 h-full bg-[#0a0a0a] border-r border-gray-800 transition-all duration-300 w-64 ml-100`}
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
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-[264px] p-8"> {/* 264px = 100px (offset) + 164px (sidebar width) */}
          {children}
        </main>
      </div>
    </div>
  );
}
