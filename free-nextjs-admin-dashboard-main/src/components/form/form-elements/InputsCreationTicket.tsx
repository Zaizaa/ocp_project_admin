"use client";
import React, { useEffect, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Select from "../Select";
import { ChevronDownIcon } from "@/icons";
import ComponentCard from "@/components/common/ComponentCard";
import axios from "axios";

interface Props {
  titre: string;
  setTitre: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  installation: string;
  setInstallation: (v: string) => void;
}

interface Option {
  value: string;
  label: string;
}

const options_Type: Option[] = [
  { value: "Technique", label: "Technique" },
  { value: "Mécanique", label: "Mécanique" },
  { value: "logiciel", label: "Développement" },
];

export default function InputsCreationTicket({
  titre,
  setTitre,
  type,
  setType,
  description,
  setDescription,
  installation,
  setInstallation,
}: Props) {
  const [installations, setInstallations] = useState<Option[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/installations")
      .then((response) => {
        const formattedOptions: Option[] = response.data.map((inst: any) => ({
          value: inst.idInstallation, // id comme valeur
          label: inst.nomInstallation, // nom affiché
        }));
        setInstallations(formattedOptions);
      })
      .catch(() => {
        setInstallations([]);
      });
  }, []);

  return (
    <ComponentCard title="Déclaration du ticket">
      <div className="space-y-6">
        {/* Champ titre */}
        <div>
          <Label>Titre</Label>
          <Input value={titre} onChange={(e) => setTitre(e.target.value)} />
        </div>

        {/* Sélecteur de type */}
        <div>
          <Label>Sélectionner le type du ticket</Label>
          <div className="relative">
            <Select
              options={options_Type}
              placeholder="Select an option"
              onChange={(val) => setType(val)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <TextArea
            rows={4}
            placeholder="Enter your description"
            value={description}
            onChange={(val) => setDescription(val)}
          />
        </div>

        {/* Sélecteur d’installation */}
        <div>
          <Label>Sélectionner l&apos;installation</Label>
          <div className="relative">
            <Select
              options={installations}
              placeholder="Select an option"
              onChange={(val) => setInstallation(val)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
