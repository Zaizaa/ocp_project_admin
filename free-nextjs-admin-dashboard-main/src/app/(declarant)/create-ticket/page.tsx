"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InputsCreationTicket from "@/components/form/form-elements/InputsCreationTicket";
import InputsCreationTicketTwo from "@/components/form/form-elements/InputsCreationTicketTwo";
import AppHeader from "@/layout/AppHeader-declarant";

export default function CreateTicketPage() {
  const [titre, setTitre] = useState("");
  const [type, setType] = useState("");
  const [statut, setStatut] = useState("Ouvert");
  const [description, setDescription] = useState("");
  const [installation, setInstallation] = useState("");
  const [gravite, setGravite] = useState("faible");
  const [file, setFile] = useState<File | null>(null); // fichier choisi


  const getNextTicketNumber = () => {
    const last = localStorage.getItem("lastTicketNumber");
    const next = last ? parseInt(last, 10) + 1 : 1;
    localStorage.setItem("lastTicketNumber", next.toString());
    return `TCKT-${next.toString().padStart(4, "0")}`;
  };

  

const handleSubmit = async () => {
  const ticketNumber = getNextTicketNumber();
  try {
    let fileUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      fileUrl = uploadRes.data.url;
    }

    const ticketData = {
      titre,
      type,
      gravite,
      description,
      file: fileUrl,
      statut,
      dateCreation: new Date().toISOString(),
      installation: {
        idInstallation: installation, // ⚡ doit être un ID (number)
      },
       number: ticketNumber,
    };

    console.log("ticketData envoyé :", ticketData);

    await axios.post("http://localhost:8080/api/tickets", ticketData);

    alert("Ticket créé avec succès !");
    // reset state...
  } catch (error) {
    alert("Erreur lors de la création du ticket");
    console.error(error);
  }
};


  return (
    <div><AppHeader  />
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
          setInstallation={setInstallation}
          
        />
      </div>

      <div className="space-y-6">
        <InputsCreationTicketTwo
          gravite={gravite}
          setGravite={setGravite}
          file={file}
          setFile={setFile}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Creer le ticket
        </button>
      </div>
    </div>
    </div>
  );
}
