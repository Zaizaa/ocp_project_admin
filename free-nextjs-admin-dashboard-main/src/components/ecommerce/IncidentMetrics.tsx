"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FacilityIcon,
  GroupIcon,
  TicketIcon,
  AlerteIAIcon,
} from "@/icons";

export const IncidentMetrics = () => {
  const [ticketType, setTicketType] = useState<"total" | "attente" | "encours" | "resolus" | "fermes">("total");

  // états pour les compteurs récupérés depuis le backend
  const [ticketStats, setTicketStats] = useState<{
    total: number;
    attente: number;
    encours: number;
    resolus: number;
    fermes: number;
  }>({
    total: 0,
    attente: 0,
    encours: 0,
    resolus: 0,
    fermes: 0,
  });

  const [equipesCount, setEquipesCount] = useState<number | null>(null);
  const [installationsCount, setInstallationsCount] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const api = axios.create({
      baseURL: "http://localhost:8080",
    });

    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Appel des 3 endpoints en parallèle
        const [ticketsRes, equipesRes, installationsRes] = await Promise.all([
          api.get("/api/tickets/count", { signal: controller.signal }),
          api.get("/api/equipes/count", { signal: controller.signal }),
          api.get("/installations/count", { signal: controller.signal }),
        ]);

        // Mapping des clés backend vers frontend
        const stats = ticketsRes.data;
        setTicketStats({
          total: Number(stats.total ?? 0),
          attente: Number(stats.ouvert ?? 0),
          encours: Number(stats.en_cours ?? 0),
          resolus: Number(stats.resolue ?? 0),
          fermes: Number(stats.ferme ?? 0),
        });
        setEquipesCount(Number(equipesRes.data));
        setInstallationsCount(Number(installationsRes.data));
      } catch (err) {
        if (axios.isCancel?.(err as any) || (err as any).name === "CanceledError") {
          return;
        }
        console.error("Erreur lors du chargement des métriques :", err as any);
        setError("Impossible de charger les métriques depuis le serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();

    return () => {
      controller.abort();
    };
  }, []);

  const ticketLabels = {
    total: "Tickets déclarés",
    attente: "Tickets ouverts",
    encours: "Tickets en cours",
    resolus: "Tickets résolus",
    fermes: "Tickets fermés",
  };

  const colorMap = {
    total: { bgBlock: "bg-green-50 dark:bg-green-900/30", hover: "hover:bg-green-100 dark:hover:bg-green-900/50", bgIcon: "bg-green-100 dark:bg-green-800", icon: "text-green-700 dark:text-green-300" },
    attente: { bgBlock: "bg-yellow-50 dark:bg-yellow-900/30", hover: "hover:bg-yellow-100 dark:hover:bg-yellow-900/50", bgIcon: "bg-yellow-100 dark:bg-yellow-800", icon: "text-yellow-700 dark:text-yellow-300" },
    encours: { bgBlock: "bg-blue-50 dark:bg-blue-900/30", hover: "hover:bg-blue-100 dark:hover:bg-blue-900/50", bgIcon: "bg-blue-100 dark:bg-blue-800", icon: "text-blue-700 dark:text-blue-300" },
    resolus: { bgBlock: "bg-purple-50 dark:bg-purple-900/30", hover: "hover:bg-purple-100 dark:hover:bg-purple-900/50", bgIcon: "bg-purple-100 dark:bg-purple-800", icon: "text-purple-700 dark:text-purple-300" },
    fermes: { bgBlock: "bg-gray-50 dark:bg-gray-900/30", hover: "hover:bg-gray-100 dark:hover:bg-gray-900/50", bgIcon: "bg-gray-100 dark:bg-gray-800", icon: "text-gray-700 dark:text-gray-300" },
  };

  return (
    <div>
      {/* Affiche une erreur user-friendly si besoin */}
      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {/* Tickets avec menu déroulant */}
        <div
          className={`rounded-2xl border border-gray-200 dark:border-gray-800 p-5 md:p-6 transition-all duration-300 cursor-pointer ${colorMap[ticketType].bgBlock} ${colorMap[ticketType].hover} hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[ticketType].bgIcon} transition-colors duration-300`}
            >
              <TicketIcon className={`${colorMap[ticketType].icon} size-6`} />
            </div>

            <select
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white/90 px-3 py-1 cursor-pointer shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value as "total" | "attente" | "encours" | "resolus" | "fermes")}
            >
              <option value="total">Total</option>
              <option value="attente">En Attente</option>
              <option value="encours">En Cours</option>
              <option value="resolus">Résolus</option>
              <option value="fermes">Fermés</option>
            </select>
          </div>

          <div className="mt-5">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              {ticketLabels[ticketType]}
            </span>
            <h4 className="mt-2 font-bold text-gray-900 text-title-sm dark:text-white/90">
              {loading ? (
                <span className="inline-block animate-pulse">...</span>
              ) : (
                ticketStats[ticketType]
              )}
            </h4>
          </div>
        </div>

        {/* Equipes */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5 md:p-6 hover:bg-green-50 dark:hover:bg-green-900/30 hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl">
            <GroupIcon className="text-green-700 dark:text-green-300 size-6" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Équipes techniques</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {loading ? <span className="inline-block animate-pulse">...</span> : (equipesCount ?? 0)}
              </h4>
            </div>
          </div>
        </div>

        {/* Installations */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5 md:p-6 hover:bg-green-50 dark:hover:bg-green-900/30 hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl">
            <FacilityIcon className="text-green-700 dark:text-green-300 size-6" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Installations industrielles</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {loading ? <span className="inline-block animate-pulse">...</span> : (installationsCount ?? 0)}
              </h4>
            </div>
          </div>
        </div>

        {/* Alertes IA (statique) */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5 md:p-6 hover:bg-green-50 dark:hover:bg-green-900/30 hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl">
            <AlerteIAIcon className="text-green-700 dark:text-green-300 size-6" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Alertes IA</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                12
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
