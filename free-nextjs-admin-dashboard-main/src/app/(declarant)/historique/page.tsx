'use client';
import React from "react";

const ticketsHistorique = [
  {
    id: 1,
    numero: "TCK-003",
    titre: "Erreur logiciel",
    dateCreation: "2025-07-30",
    dateCloture: "2025-08-03",
    statutFinal: "Résolu",
    commentaire: "Mise à jour du logiciel effectuée.",
  },
  {
    id: 2,
    numero: "TCK-004",
    titre: "Problème imprimante",
    dateCreation: "2025-07-28",
    dateCloture: "2025-07-29",
    statutFinal: "Rejeté",
    commentaire: "Problème non couvert par le support.",
  },
];

export default function HistoriqueTicketsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
           Historique des tickets
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">N°</th>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Création</th>
                <th className="px-4 py-3">Clôture</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {ticketsHistorique.length > 0 ? (
                ticketsHistorique.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{ticket.numero}</td>
                    <td className="px-4 py-3">{ticket.titre}</td>
                    <td className="px-4 py-3">{ticket.dateCreation}</td>
                    <td className="px-4 py-3">{ticket.dateCloture}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          ticket.statutFinal === "Résolu"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {ticket.statutFinal}
                      </span>
                    </td>
                    <td className="px-4 py-3">{ticket.commentaire || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Aucun ticket résolu ou rejeté.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
