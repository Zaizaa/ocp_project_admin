'use client';
import { useState } from "react";
import Link from "next/link";

// Données exemple
const tickets = [
  {
    id: 1,
    numero: "TCK-001",
    titre: "Problème réseau",
    statut: "En attente",
    dateCreation: "2025-08-01",
    dateResolution: "2025-08-05",
  },
  {
    id: 2,
    numero: "TCK-002",
    titre: "Ordinateur ne démarre pas",
    statut: "En cours",
    dateCreation: "2025-08-02",
    dateResolution: "2025-08-06",
  },
  {
    id: 3,
    numero: "TCK-003",
    titre: "Erreur logiciel",
    statut: "Résolu",
    dateCreation: "2025-07-30",
    dateResolution: "2025-08-03",
  },
];

const statuts = ["Tous", "En attente", "En cours", "Résolu", "Rejeté"];

export default function TicketListPage() {
  const [filtre, setFiltre] = useState("Tous");

  const ticketsFiltres =
    filtre === "Tous"
      ? tickets
      : tickets.filter((t) => t.statut === filtre);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800"> Liste des tickets</h1>

      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {statuts.map((statut) => (
          <button
            key={statut}
            onClick={() => setFiltre(statut)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filtre === statut
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {statut}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-5 py-3">N°</th>
              <th className="px-5 py-3">Titre</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3">Création</th>
              <th className="px-5 py-3">Résolution</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {ticketsFiltres.length > 0 ? (
              ticketsFiltres.map((ticket) => (
                <tr key={ticket.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-5 py-3">{ticket.numero}</td>
                  <td className="px-5 py-3">{ticket.titre}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.statut === "Résolu"
                          ? "bg-green-100 text-green-700"
                          : ticket.statut === "En cours"
                          ? "bg-yellow-100 text-yellow-700"
                          : ticket.statut === "En attente"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {ticket.statut}
                    </span>
                  </td>
                  <td className="px-5 py-3">{ticket.dateCreation}</td>
                  <td className="px-5 py-3">{ticket.dateResolution}</td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/ticket/${ticket.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-gray-500 py-6 text-base"
                >
                  Aucun ticket trouvé pour ce statut.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
