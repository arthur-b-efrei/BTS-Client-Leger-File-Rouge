import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt"; // Utilisation de next-auth ou un autre mécanisme de gestion des tokens

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Récupérer le token d'authentification (par exemple JWT)
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    // Récupérer l'utilisateur à partir du token (on suppose que le token contient l'ID de l'utilisateur)
    const userId = token.userId; // Ou une autre propriété selon ton token

    try {
      const user = await prisma.user.findUnique({
        where: {
          user_id: userId,
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
