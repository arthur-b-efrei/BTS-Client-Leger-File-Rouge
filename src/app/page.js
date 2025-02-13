import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold mb-8">INVENTARY</h1>
      <div className="space-y-4">
        <Link 
          href="/signin" 
          className="block text-xl hover:text-blue-600 transition-colors"
        >
          Se connecter
        </Link>
        <Link 
          href="/signup" 
          className="block text-xl hover:text-blue-600 transition-colors"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
}