'use client';
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import BasicTableOneHistorique from "@/components/tables/BasicTableOneHistorique";


export default function HistoriqueTicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch(() => setTickets([]));
  }, []);

  return (
    <div className="space-y-6">
      <ComponentCard title="suivi des tickets">
        <BasicTableOneHistorique tickets={tickets} />
      </ComponentCard>
    </div>
  );
}



