'use client';
import { useState } from "react";

export default function CreateTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Réseau");
  const [priority, setPriority] = useState("Faible");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Ticket créé :\nTitre : ${title}\nDescription : ${description}\nCatégorie : ${category}\nPriorité : ${priority}`
    );
    setTitle("");
    setDescription("");
    setCategory("Réseau");
    setPriority("Faible");
  };

  return (
    <div className="px-6 py-8 w-full">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Créer un ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Connexion lente"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez brièvement..."
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="Réseau">Réseau</option>
                <option value="Matériel">Matériel</option>
                <option value="Logiciel">Logiciel</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Priorité
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
