// Importation des polices Geist et Geist_Mono depuis Google Fonts via le système optimisé de Next.js
// Importation des styles globaux définis dans le fichier globals.css
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Déclaration de la police Geist (sans-serif) avec le sous-ensemble latin
// La police est associée à une variable CSS personnalisée pour pouvoir l'utiliser dans Tailwind
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

// Déclaration de la police Geist_Mono (monospace) avec les mêmes options
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Métadonnées globales de l'application (titre, description, configuration du viewport)
// Ces données seront automatiquement insérées dans le <head> de chaque page
export const metadata = {
  title: "Inventary - Gestion de stock",
  description: "Application de gestion d'inventaire moderne et efficace",
  viewport: "width=device-width, initial-scale=1",
};

// Composant principal de layout utilisé par toutes les pages de l'application (App Router)
// Il définit la structure HTML globale
export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}