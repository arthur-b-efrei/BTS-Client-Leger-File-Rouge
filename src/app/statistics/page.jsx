import Layout from '../components/Layout';

export default function Statistiques() {
  return (
    <Layout>
      <hr/>
      <h1 className="bg-black text-3xl font-bold mb-4 mt-3 text-white">Statistiques</h1>
      <hr/>
      <div className="flex flex-col items-center space-y-6 p-4">
        <div className="w-full max-w-md">
          <label className="block text-base font-semibold mb-2 text-white">Historique des ventes</label>
          <select className="w-full p-2 border rounded bg-white cursor-not-allowed text-white" disabled>
            <option value="">Sélectionnez une vente</option>
            {/* Options dynamiques ici */}
          </select>
        </div>

        <div className="w-full max-w-md">
          <label className="block text-base font-semibold mb-2 text-white">Historique des achats</label>
          <select className="w-full p-2 border rounded bg-white cursor-not-allowed text-white" disabled>
            <option value="">Sélectionnez un achat</option>
            {/* Options dynamiques ici */}
          </select>
        </div>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-base font-semibold mb-2 text-white">Nombre de produits dans l'inventaire</label>
            <p>1</p>
          </div>
          <div>
            <label className="block text-base font-semibold mb-2 text-white">Prix total des produits</label>
            50000€
          </div>
        </div>
      </div>
    </Layout>
  );
}
