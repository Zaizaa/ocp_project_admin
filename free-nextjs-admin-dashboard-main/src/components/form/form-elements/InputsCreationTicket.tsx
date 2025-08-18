"use client";
import React from "react";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Select from "../Select";
import { ChevronDownIcon } from "@/icons";
import ComponentCard from "@/components/common/ComponentCard";

interface Props {
  titre: string;
  setTitre: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  
  installation: string;          // <-- nouveau
  setInstallation: (v: string) => void;
  setFile: (f: File | null) => void;
}

 const options_Type = [
    { value: "Technique", label: "Technique" },
    { value: "Mécanique", label: "Mécanique" },
    { value: "logiciel", label: "Development" },
  ];
   const options_Installation = [
    { value: "usine1", label: "usine1" },
    { value: "Usine2", label: "Usine2" },
    { value: "Usine3", label: "Development" },
  ];

   const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

export default function InputsCreationTicket({
  titre,
  setTitre,
  type,
  setType,
  description,
  setDescription,
  setInstallation,
}: Props) {
  return (
     <ComponentCard title="déclaration du ticket">
    <div className="space-y-6">
      <div>
        <Label>Titre</Label>
        <Input value={titre} onChange={(e) => setTitre(e.target.value)} />
      </div>

  


        <Label>selectionner le type du ticket</Label>
          <div className="relative">
            <Select
    options={options_Type}
    placeholder="Select an option"

    onChange={(val) => setType(val)}  // <-- setter pour state
    className="dark:bg-dark-900"
  />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>


      <div>
        <Label>Description</Label>
       <TextArea
        rows={4}
        placeholder="Enter your description"
        value={description}
        onChange={(val) => setDescription(val)}
      />

      </div>
      <Label>selectionner l'installation</Label>
          <div className="relative">
           <Select
  options={options_Installation}
  placeholder="Select an option"
               
  onChange={(val) => setInstallation(val)} // <-- setter pour state
  className="dark:bg-dark-900"
/>
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDownIcon />
          </span>
        </div>

      
    </div>
    </ComponentCard>
  );
}
