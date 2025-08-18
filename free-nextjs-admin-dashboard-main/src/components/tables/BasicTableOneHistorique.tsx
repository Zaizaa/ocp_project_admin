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
  number: string;
  titre: string;
  description: string;
  type: string;
  gravite: string;
  file: string;
  statut: string;
  dateCreation: string;
}

interface Props {
  tickets: Ticket[];
}

const statuts = ["Tous", "Ouvert", "Résolu", "Rejeté"];
const priorites = ["Toutes", "haute", "moyenne", "faible","critique"];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    " " +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
}

export default function BasicTableOneHistorique({ tickets }: Props) {
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtrePriorite, setFiltrePriorite] = useState("Toutes");

  const ticketsFiltres = tickets.filter(
    (t) =>
      (filtreStatut === "Tous" || t.statut === filtreStatut) &&
      (filtrePriorite === "Toutes" || t.gravite === filtrePriorite)
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
          <Table className="table-fixed w-full">
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Numero</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Titre</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">description</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">categorie</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">priorité</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">File</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Statut</TableCell>
                <TableCell isHeader className="w-[110px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">date de création</TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {ticketsFiltres.map((order, idx) => (
                <TableRow key={order.id ?? order.number ?? idx}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {order.number}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.titre}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.description}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.type}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.gravite === "haute"
                          ? "error"
                          : order.gravite === "moyenne"
                          ? "warning"
                          : "success"
                      }
                    >
                      {order.gravite}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.file ? (
                      <Image
                        src={`http://localhost:8080/${order.file}`}
                        alt="file"
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                    ) : (
                      <span className="italic text-gray-400">Aucun fichier</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.statut === "Résolu"
                          ? "success"
                          : order.statut === "Ouvert"
                          ? "error"
                          : "warning"
                      }
                    >
                      {order.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{formatDate(order.dateCreation)}</TableCell>
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
