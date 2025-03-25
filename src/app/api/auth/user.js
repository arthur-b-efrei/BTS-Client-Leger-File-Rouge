import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Récupérer l'objet 'user' depuis localStorage côté client
    const user = JSON.parse(req.headers['x-user']); // Passe l'utilisateur depuis le client avec les headers

    if (!user || !user.user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const userId = user.user_id; // Utilise user.user_id ici

    try {
      const user = await prisma.user.findUnique({
        where: {
          user_id: userId, // Recherche de l'utilisateur dans la base de données avec user_id
        },
        select: {
          user_id: true,
          pseudo: true,
          first_name: true,
          last_name: true,
          email: true,
          birthday: true,
          gender: true,
          created_at: true,
          last_auth: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erreur de serveur" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
