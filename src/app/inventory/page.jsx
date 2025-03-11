import Layout from '../components/Layout';

export default function Inventaire() {
  return (
    <Layout>
      <hr></hr>
      <h1 className="bg-black text-3xl font-bold mb-4 mt-3 text-white">Gestion de l'Inventaire</h1>
      <hr></hr>
      <div className="bg-black shadow-md rounded-lg p-6">
        <table className="w-full border-collapse text-white bg-black">
          <thead>
            <tr className="bg-black">
              <th className="border border-gray-700 p-2">Produit</th>
              <th className="border border-gray-700 p-2">Quantité en Stock</th>
              <th className="border border-gray-700 p-2">Prix</th>
              <th className="border border-gray-700 p-2">Référence</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Exemple de ligne, à remplacer par des données dynamiques */}
            <tr className="bg-black">
              <th className="border border-gray-700 p-2">Produi</th>
              <th className="border border-gray-700 p-2">50</th>
              <th className="border border-gray-700 p-2">10€</th>
              <th className="border border-gray-700 p-2">1605856210</th>
              <th className="border border-gray-700 p-2">
                <button className="bg-blue-700 text-white px-2 py-1 rounded mr-2 hover:bg-blue-800">
                  Éditer
                </button>
                <button className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800">
                  Supprimer
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
