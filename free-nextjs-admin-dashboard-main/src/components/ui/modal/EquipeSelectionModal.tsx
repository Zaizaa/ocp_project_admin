"use client";
import React, { useState } from "react";
import Button from "../button/Button";
import { Modal } from "./index"; // ton modal personnalisé

interface EquipeSelectionModalProps {
  Ticket: {
    id: number;
    type: string;
    gravite: string;
    localisation: string;
    equipe?: string;
  };
  onEquipeSelected: (equipe: string) => void;
}

const equipes = ["Équipe Alpha", "Équipe Beta", "Équipe Gamma", "Équipe Delta"];

export default function EquipeSelectionModal({
  Ticket,
  onEquipeSelected,
}: EquipeSelectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (equipe: string) => {
    onEquipeSelected(equipe);
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        {Ticket.equipe ? "Modifier équipe" : "Choisir équipe"}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4">
          Affecter une équipe pour l’Ticket #{Ticket.id}
        </h2>

        <div className="mb-3 text-sm text-gray-600">
          <p>Type : {Ticket.type}</p>
          <p>Gravité : {Ticket.gravite}</p>
          <p>Localisation : {Ticket.localisation}</p>
        </div>

        <div className="max-h-48 overflow-y-auto border rounded p-2 space-y-2">
          {equipes.map((equipe) => (
            <Button
              key={equipe}
              variant="outline"
              className="justify-start w-full"
              onClick={() => handleSelect(equipe)}
            >
              {equipe}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-right">
          <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
        </div>
      </Modal>
    </div>
  );
}
