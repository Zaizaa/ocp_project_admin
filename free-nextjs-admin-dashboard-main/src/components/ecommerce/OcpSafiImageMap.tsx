"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Installation {
  name: string;
  location: string;
  incidents: number;
  x: string;
  y: string;
}

// Définition des régions sur la carte (en pourcentage)
const REGION_COORDS: Record<
  string,
  { xMin: number; xMax: number; yMin: number; yMax: number }
> = {
  "Zone Nord": { xMin: 20, xMax: 80, yMin: 35, yMax: 45 }, // <-- zone nord descendue
  "Zone Sud": { xMin: 20, xMax: 80, yMin: 75, yMax: 95 },
  "Zone Ouest": { xMin: 5, xMax: 30, yMin: 30, yMax: 70 },
  "Zone Est": { xMin: 70, xMax: 95, yMin: 30, yMax: 70 },
  Centre: { xMin: 35, xMax: 65, yMin: 35, yMax: 65 },
};

function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRegionCoords(location: string) {
  // Par défaut, placer au centre si la localisation n'est pas reconnue
  return REGION_COORDS[location] || REGION_COORDS["Centre"];
}

// Fonction de hash déterministe à partir du nom et de la localisation
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Génère une position déterministe dans la région
function getDeterministicPosition(name: string, location: string) {
  const region = getRegionCoords(location);
  const hash = hashString(name + location);
  // Utilise le hash pour générer un nombre entre 0 et 1
  const rand1 = (hash % 1000) / 1000;
  const rand2 = ((hash >> 3) % 1000) / 1000;
  const x = region.xMin + (region.xMax - region.xMin) * rand1;
  const y = region.yMin + (region.yMax - region.yMin) * rand2;
  return { x: `${x}%`, y: `${y}%` };
}

export default function OcpSafiImageMap() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [selected, setSelected] = useState<Installation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstallations = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "http://localhost:8080/api/tickets/count-by-installation-location"
        );
        // res.data est un tableau de tableaux : [[name, location, incidents], ...]
        const mapped: Installation[] = res.data.map(
          ([name, location, incidents]: [string, string, number]) => {
            const pos = getDeterministicPosition(name, location);
            return {
              name,
              location,
              incidents,
              x: pos.x,
              y: pos.y,
            };
          }
        );
        setInstallations(mapped);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchInstallations();
  }, []);

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
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-white/70 dark:bg-gray-900/70 z-10">
            Chargement...
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-white/70 dark:bg-gray-900/70 z-10">
            {error}
          </div>
        ) : (
          installations.map((inst, idx) => (
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
              title={`${inst.name} (${inst.location})`}
            ></div>
          ))
        )}

        {/* Popup info */}
        {selected && (
          <div
            className="absolute bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg border border-gray-300 dark:border-gray-700 text-sm w-48 z-20"
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
