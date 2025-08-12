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
  type: string;
  gravite: string;
  localisation: string;
  date: string;
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
    type: "Mécanique",
    gravite: "Critique",
    localisation: "Atelier A1",
    date: "2025-08-01",
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
    type: "Électrique",
    gravite: "Moyenne",
    localisation: "Zone B4",
    date: "2025-08-03",
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
    type: "Hydraulique",
    gravite: "Faible",
    localisation: "Poste C2",
    date: "2025-08-04",
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
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Déclarant
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Type
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Gravité
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Localisation
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Date
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Statut
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs dark:text-white/90">
                    Équipe
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={ticket.declarant.image}
                            alt={ticket.declarant.name}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {ticket.declarant.name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {ticket.declarant.role}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">{ticket.type}</TableCell>
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
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">{ticket.localisation}</TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">{ticket.date}</TableCell>
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
