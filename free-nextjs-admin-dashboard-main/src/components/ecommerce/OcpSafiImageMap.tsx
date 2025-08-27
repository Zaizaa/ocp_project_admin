"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Installation {
  name: string;
  location: string;
  incidents: number;
  x: string;
  y: string;
}

const installations: Installation[] = [
  { name: "Site A", location: "Zone Nord", incidents: 2, x: "30%", y: "40%" },
  { name: "Usine B", location: "Zone Est", incidents: 0, x: "60%", y: "50%" },
  { name: "Station C", location: "Zone Ouest", incidents: 5, x: "20%", y: "60%" },
  { name: "Dépot D", location: "Zone Sud", incidents: 1, x: "50%", y: "70%" },
  { name: "Site E", location: "Zone Centrale", incidents: 8, x: "45%", y: "45%" },
  { name: "Plateforme F", location: "Zone Port", incidents: 18, x: "80%", y: "45%" },
];

export default function OcpSafiImageMap() {
  const [selected, setSelected] = useState<Installation | null>(null);

  // Détermine la couleur selon le nombre d'incidents
  const getMarkerColor = (incidents: number) => {
    if (incidents > 5) return "bg-red-500"; // Rouge
    if (incidents <= 1) return "bg-yellow-400"; // Jaune
    return "bg-green-500"; // Vert
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      {/* Titre */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Répartition géographique des incidents - OCP Safi
      </h3>

      {/* Carte avec marqueurs */}
      <div
        className="relative w-full mx-auto rounded-lg overflow-hidden shadow"
        style={{ maxHeight: "450px" }}
      >
        {/* Image claire */}
        <Image
          src="/maps/ocp_safi_map.png"
          alt="Carte OCP Safi (clair)"
          width={800}
          height={600}
          className="w-full h-auto object-contain block dark:hidden"
        />

        {/* Image sombre */}
        <Image
          src="/maps/ocp_safi_map_dark.png"
          alt="Carte OCP Safi (sombre)"
          width={800}
          height={600}
          className="w-full h-auto object-contain hidden dark:block"
        />

        {/* Marqueurs */}
        {installations.map((inst, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(inst)}
            className={`absolute w-4 h-4 ${getMarkerColor(
              inst.incidents
            )} rounded-full cursor-pointer border-2 border-white shadow hover:scale-110 transition`}
            style={{
              top: inst.y,
              left: inst.x,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        ))}

        {/* Popup info */}
        {selected && (
          <div
            className="absolute bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg border border-gray-300 dark:border-gray-700 text-sm w-48"
            style={{
              top: selected.y,
              left: selected.x,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="font-bold text-gray-800 dark:text-white">
              {selected.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              📍 {selected.location}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              ⚠️ Incidents : {selected.incidents}
            </p>
            <button
              className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              onClick={() => setSelected(null)}
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
