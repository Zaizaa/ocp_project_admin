"use client";
import React, { useState } from "react";
import {
  BoxIconLine,
  GroupIcon,
} from "@/icons";

export const Mydash = () => {
  const [ticketType, setTicketType] = useState("total");

  const ticketStats: Record<string, number> = {
    total: 100,
    attente: 25,
    encours: 40,
    resolus: 35,
  };

  const ticketLabels: Record<string, string> = {
    total: "Tickets déclarés",
    attente: "Tickets en attente",
    encours: "Tickets en cours",
    resolus: "Tickets résolus",
  };

  const colorMap: Record<string, { bgBlock: string; hover: string; bgIcon: string; icon: string }> = {
    total: { bgBlock: "bg-green-50", hover: "hover:bg-green-100", bgIcon: "bg-green-100", icon: "text-green-700" },
    attente: { bgBlock: "bg-yellow-50", hover: "hover:bg-yellow-100", bgIcon: "bg-yellow-100", icon: "text-yellow-700" },
    encours: { bgBlock: "bg-blue-50", hover: "hover:bg-blue-100", bgIcon: "bg-blue-100", icon: "text-blue-700" },
    resolus: { bgBlock: "bg-purple-50", hover: "hover:bg-purple-100", bgIcon: "bg-purple-100", icon: "text-purple-700" },
  };

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 w-full">
      {/* Chaque bloc prendra la largeur disponible en responsive */}
      <div
        className={`flex-1 min-w-[220px] rounded-2xl border border-gray-200 p-5 md:p-6 transition-all duration-300 cursor-pointer ${colorMap[ticketType].bgBlock} ${colorMap[ticketType].hover} hover:shadow-md`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[ticketType].bgIcon} transition-colors duration-300`}
          >
            <BoxIconLine className={`${colorMap[ticketType].icon} size-6`} />
          </div>
          <select
            className="rounded-lg border border-gray-300 bg-white text-sm px-3 py-1 cursor-pointer shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
          >
            <option value="total">Total</option>
            <option value="attente">En attente</option>
            <option value="encours">En cours</option>
            <option value="resolus">Résolus</option>
          </select>
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-700">{ticketLabels[ticketType]}</span>
          <h4 className="mt-2 font-bold text-gray-900 text-title-sm">
            {ticketStats[ticketType]}
          </h4>
        </div>
      </div>

      <div className="flex-1 min-w-[220px] rounded-2xl border border-gray-200 bg-white p-5 md:p-6 hover:bg-green-50 hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <GroupIcon className="text-green-700 size-6" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Installations industrielles</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              14
            </h4>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-[220px] rounded-2xl border border-gray-200 bg-white p-5 md:p-6 hover:bg-green-50 hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <GroupIcon className="text-green-700 size-6" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">number of employees</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              12
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};