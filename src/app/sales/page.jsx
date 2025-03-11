import Layout from '../components/Layout';

export default function Ventes() {
  return (
    <Layout>
      <hr></hr>
      <h1 className="bg-black text-3xl font-bold mb-4 mt-3 text-white">Gestion des Ventes</h1>
      <hr></hr>
      <div className="bg-black shadow-md rounded-lg p-6">
        {/* Formulaire ou tableau pour enregistrer les ventes */}
        <form className="space-y-0">
          <div>
            <label className="block mb-2">Référence</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              placeholder="Quantité vendue"
            />
          </div>
          <div>
            <label className="block mb-2">Nom du produit</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              placeholder="Quantité vendue"
            />
          </div>
          <div>
            <label className="block mb-2">Quantités</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              placeholder="Quantité vendue"
            />
          </div>
          <div>
            <label className="block mb-2">Prix</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              placeholder="Prix"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enregistrer la Vente
          </button>
        </form>
      </div>
    </Layout>
  );
}