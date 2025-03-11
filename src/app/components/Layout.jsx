"use client";

import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
    </div>
  );
}

