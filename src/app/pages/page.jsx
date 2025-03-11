import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
        <hr></hr>
        <h1 className="text-3xl font-bold mb-4 mt-3 text-center">Tableau de Bord</h1>
        <hr></hr>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Résumé des Stocks</h2>
            <p className="text-white-700">
              {/* Ajoutez ici un aperçu rapide des stocks */}
              Vue d'ensemble des stocks disponibles.
            </p>
          </div>
          <div className="bg-black text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Alertes</h2>
            <p>
              a
            </p>
          </div>
        </div>

        <div className="mt-8 bg-black text-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Rapport des Ventes, Achats et Stocks</h2>
          <p className="text-white-700">
            {/* Message de rapport */}
            Voici un résumé des ventes, achats et stocks pour la période actuelle :
          </p>
        </div>
    </Layout>
  );
}
