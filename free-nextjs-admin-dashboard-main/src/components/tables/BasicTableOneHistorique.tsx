import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

interface Ticket {
  id: number;
  numero: string;
  titre: string;
  description: string;
  categorie: string;
  priorite: string;
  localisation: string;
  statut: string;
  dateCreation: string;
}

const tableData: Ticket[] = [
  {
    id: 1,
    numero: "TCK-001",
    titre: "Problème réseau",
    description: "Impossible de se connecter à Internet.",
    categorie: "Réseau",
    priorite: "Haute",
    localisation: "Usine 1",
    statut: "Résolu",
    dateCreation: "2025-08-01",
  },
  {
    id: 2,
    numero: "TCK-002",
    titre: "Erreur logiciel",
    description: "Erreur lors du lancement de l'application.",
    categorie: "Logiciel",
    priorite: "Moyenne",
    localisation: "Usine 2",
    statut: "Rejeté",
    dateCreation: "2025-08-02",
  },
];

const statuts = ["Tous", "Résolu", "Rejeté"];
const priorites = ["Toutes", "Haute", "Moyenne", "Faible"];

export default function BasicTableOne() {
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtrePriorite, setFiltrePriorite] = useState("Toutes");

  const ticketsFiltres = tableData.filter(
    (t) =>
      (filtreStatut === "Tous" || t.statut === filtreStatut) &&
      (filtrePriorite === "Toutes" || t.priorite === filtrePriorite)
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="mr-2 font-medium text-gray-700 dark:text-gray-300">Statut :</label>
          <select
            value={filtreStatut}
            onChange={e => setFiltreStatut(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-900 dark:text-white"
          >
            {statuts.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium text-gray-700 dark:text-gray-300">Priorité :</label>
          <select
            value={filtrePriorite}
            onChange={e => setFiltrePriorite(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-900 dark:text-white"
          >
            {priorites.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[902px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Numero</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Titre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">description</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">categorie</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">priorité</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">localisation</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Statut</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">date de création</TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {ticketsFiltres.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {order.numero}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.titre}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.description}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.categorie}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.priorite === "Haute"
                          ? "error"
                          : order.priorite === "Moyenne"
                          ? "warning"
                          : "success"
                      }
                    >
                      {order.priorite}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.localisation}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.statut === "Résolu"
                          ? "success"
                          : order.statut === "Rejeté"
                          ? "error"
                          : "warning"
                      }
                    >
                      {order.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.dateCreation}</TableCell>
                </TableRow>
              ))}
              {ticketsFiltres.length === 0 && (
                <TableRow>
                  <TableCell className="text-center py-6 text-gray-400">
                    Aucun ticket trouvé pour ce filtre.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
