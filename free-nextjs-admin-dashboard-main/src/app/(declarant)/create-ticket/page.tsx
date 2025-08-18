"use client";
import React, { useState } from "react";
import InputsCreationTicket from "@/components/form/form-elements/InputsCreationTicket";
import InputsCreationTicketTwo from "@/components/form/form-elements/InputsCreationTicketTwo";

export default function CreateTicketPage() {
  // États pour les champs
  const [titre, setTitre] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [installation, setInstallation] = useState(""); // <-- nouvel état
  const [ticketType, setTicketType] = useState("");      // <-- nouvel état
  const [gravite, setGravite] = useState("faible");
  const [file, setFile] = useState<string | "">("");

  const getNextTicketNumber = () => {
    // Récupère le dernier numéro depuis le localStorage
    const last = localStorage.getItem("lastTicketNumber");
    const next = last ? parseInt(last, 10) + 1 : 1;
    localStorage.setItem("lastTicketNumber", next.toString());
    // Formate sous TCKT-0001
    return `TCKT-${next.toString().padStart(4, "0")}`;
  };

  // Fonction pour soumettre le ticket
  const handleSubmit = async () => {
    const ticketNumber = getNextTicketNumber();
    const ticketData = {
      titre,
      type,
      ticketType,       // <-- envoyer la valeur du Select type
      description,
      installation,     // <-- envoyer la valeur du Select installation
      gravite,
      file,
      dateCreation: new Date().toISOString(),
      number: ticketNumber,
      statut: "Ouvert", 
    };

    try {
      const response = await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) throw new Error("Erreur serveur");

      alert(`Ticket ${ticketNumber} créé avec succès !`);
      // Reset
      setTitre("");
      setType("");
      setDescription("");
      setTicketType("");
      setInstallation("");
      setGravite("faible");
      setFile("");
    } catch (error) {
      alert("Erreur lors de la création du ticket");
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8080/uploads", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      // data.url contient l'URL de l'image stockée sur le serveur
      console.log("Image URL:", data.url);
      // Tu peux stocker data.url dans ton ticket (setFile(data.url))
    } else {
      alert("Erreur lors de l'upload");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="space-y-6">
        <InputsCreationTicket
          titre={titre}
          setTitre={setTitre}
          type={type}
          setType={setType}
          description={description}
          setDescription={setDescription}
          installation={installation}
          
          
        />
      </div>

      <div className="space-y-6">
        <InputsCreationTicketTwo
          gravite={gravite}
          setGravite={setGravite}
          file={file}
          
          handleFileUpload={handleFileUpload} // Passe la vraie fonction
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Créer le ticket
        </button>
      </div>
    </div>
  );
}
