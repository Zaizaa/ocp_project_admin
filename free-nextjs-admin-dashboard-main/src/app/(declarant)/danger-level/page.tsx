'use client';
import { useState } from "react";

export default function DangerLevelPage() {
  const [niveau, setNiveau] = useState("Faible");
  const [description, setDescription] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmation(true);
    setDescription("");
    setNiveau("Faible");
    setTimeout(() => setConfirmation(false), 4000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">🚨 Déclenchement d’un niveau de danger</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Choix du niveau</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="niveau"
                value="Faible"
                checked={niveau === "Faible"}
                onChange={() => setNiveau("Faible")}
              />
              <span className="ml-2">🟢 Faible</span>
            </label>
            <label>
              <input
                type="radio"
                name="niveau"
                value="Modéré"
                checked={niveau === "Modéré"}
                onChange={() => setNiveau("Modéré")}
              />
              <span className="ml-2">🟠 Modéré</span>
            </label>
            <label>
              <input
                type="radio"
                name="niveau"
                value="Élevé"
                checked={niveau === "Élevé"}
                onChange={() => setNiveau("Élevé")}
              />
              <span className="ml-2">🔴 Élevé</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Description rapide du danger</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Déclencher alerte
        </button>
        {confirmation && (
          <div className="mt-4 text-green-600 font-semibold">
            ✅ Alerte envoyée avec succès !
          </div>
        )}
      </form>
    </div>
  );
}