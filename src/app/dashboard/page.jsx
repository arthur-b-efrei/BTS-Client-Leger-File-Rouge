"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const authToken = document.cookie.includes("auth_token"); // Vérifie le cookie

    if (!authToken) {
      router.replace("/signin"); // Redirige et empêche le retour arrière
    }
  }, [router]);
}
