"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ComponentCard from "@/components/common/ComponentCard";
import BasicTableOneHistorique from "@/components/tables/TableSuiviTicket";
import AppHeader from "@/layout/AppHeader-declarant";

export default function HistoriqueTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tickets")
      .then((response) => {
        setTickets(response.data);
        setFilteredTickets(response.data);
      })
      .catch(() => {
        setTickets([]);
        setFilteredTickets([]);
      });
  }, []);

  const handleSearch = (query: string) => {
  const q = query.toLowerCase();
  const result = tickets.filter((t: any) => {
    const titre = t.titre ?? "";
    const number = t.number ?? "";
    return titre.toLowerCase().includes(q) || number.toLowerCase().includes(q);
  });
  setFilteredTickets(result);
};


  return (
    <div className="space-y-6">
      {/* Passer handleSearch au header */}
      <AppHeader onSearch={handleSearch} />
      <ComponentCard title="suivi des tickets">
        <BasicTableOneHistorique tickets={filteredTickets} />
      </ComponentCard>
    </div>
  );
}
