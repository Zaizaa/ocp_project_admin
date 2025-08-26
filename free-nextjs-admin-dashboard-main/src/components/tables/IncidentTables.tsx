"use client";

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
import EquipeSelectionModal from "../ui/modal/EquipeSelectionModal";

interface Ticket {
  id: number;
  declarant: {
    image: string;
    name: string;
    role: "DECLARANT" | "CHEFEQUIPE" | "ADMIN";
  };
  titre: string;
  description: string;
  rapport: string;
  file?: string; // image jointe optionnelle
  type: string;
  gravite: string;
  localisation: string;
  dateCreation: string;
  statut: "Déclaré" | "En cours" | "Résolu";
  equipe?: string;
}

const initialTickets: Ticket[] = [
  {
    id: 101,
    declarant: {
      image: "/images/user/user-17.jpg",
      name: "Karim Benali",
      role: "DECLARANT",
    },
    titre: "Panne moteur",
    description: "Le moteur principal de la ligne est tombé en panne.",
    rapport: "Arrêt immédiat de la production.",
    file: "/images/incidents/incident-1.jpg",
    type: "Mécanique",
    gravite: "Critique",
    localisation: "Atelier A1",
    dateCreation: "2025-08-01",
    statut: "Déclaré",
    equipe: "",
  },
  {
    id: 102,
    declarant: {
      image: "/images/user/user-18.jpg",
      name: "Salma Ouhmani",
      role: "DECLARANT",
    },
    titre: "Court-circuit",
    description: "Un câble a provoqué une étincelle dans la zone électrique.",
    rapport: "Risque d’incendie contrôlé par l’équipe.",
    file: "/images/incidents/incident-2.jpg",
    type: "Électrique",
    gravite: "Moyenne",
    localisation: "Zone B4",
    dateCreation: "2025-08-03",
    statut: "En cours",
    equipe: "Équipe Alpha",
  },
  {
    id: 103,
    declarant: {
      image: "/images/user/user-19.jpg",
      name: "Youssef Ziani",
      role: "DECLARANT",
    },
    titre: "Fuite hydraulique",
    description: "Perte de pression dans le système hydraulique.",
    rapport: "Réparation effectuée et système redémarré.",
    file: "/images/incidents/incident-3.jpg",
    type: "Hydraulique",
    gravite: "Faible",
    localisation: "Poste C2",
    dateCreation: "2025-08-04",
    statut: "Résolu",
    equipe: "",
  },
];

export default function TicketTable() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleEquipeSelected = (ticketId: number, equipe: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, equipe } : ticket
      )
    );
    setSelectedTicket(null); // ferme le modal
  };

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1400px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">Déclarant</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">Titre</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Description</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Rapport</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Fichier à joindre</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Type</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Gravité</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Localisation</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Date</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Statut</TableCell>
                  <TableCell isHeader className="px-6 py-3 text-start text-theme-xs dark:text-white/90">Équipe</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    {/* Déclarant */}
                    <TableCell className="px-6 py-4 text-start">
                      <div className="flex items-center gap-3">
            
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{ticket.declarant.name}</span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{ticket.declarant.role}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Nouveau champs */}
                    <TableCell className="px-6 py-3 text-start text-theme-sm dark:text-gray-400">{ticket.titre}</TableCell>
                    <TableCell className="px-6 py-3 text-start text-theme-sm dark:text-gray-400">{ticket.description}</TableCell>
                     <TableCell>
                      {ticket.rapport ? (
                        <a
                          href={ticket.rapport}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          Voir PDF
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {ticket.file ? (
                        <Image
                          src={ticket.file}
                          alt="Incident"
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Aucun</span>
                      )}
                    </TableCell>

                    {/* Déjà existants */}
                    <TableCell>{ticket.type}</TableCell>
                    <TableCell>
                      <Badge
                        size="sm"
                        color={
                          ticket.gravite === "Faible"
                            ? "success"
                            : ticket.gravite === "Moyenne"
                            ? "warning"
                            : "error"
                        }
                      >
                        {ticket.gravite}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.localisation}</TableCell>
                    <TableCell>{ticket.dateCreation}</TableCell>
                    <TableCell>
                      <Badge
                        size="sm"
                        color={
                          ticket.statut === "Résolu"
                            ? "success"
                            : ticket.statut === "En cours"
                            ? "warning"
                            : "error"
                        }
                      >
                        {ticket.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          ticket.equipe ? "bg-orange-500" : "bg-green-500"
                        }`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        {ticket.equipe ? `Modifier (${ticket.equipe})` : "Assigner"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {selectedTicket && (
        <EquipeSelectionModal
          Ticket={selectedTicket}
          onEquipeSelected={(equipe) =>
            handleEquipeSelected(selectedTicket.id, equipe)
          }
        />
      )}
    </div>
  );
}
