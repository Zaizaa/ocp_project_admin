"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import {
  BoxIconLine,
  GroupIcon,
} from "@/icons"; // adapt icon names to your set

export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6">

      {/* Tickets déclarés */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <BoxIconLine className="text-green-700 size-6" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Total des Tickets declarees</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              100
            </h4>
          </div>
        </div>
      </div>

      {/* Equipes techniques */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <GroupIcon className="text-green-700 size-6" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Équipes techniques</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              235
            </h4>
          </div>
        </div>
      </div>

      {/* Installations industrielles */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
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


      {/* Alertes IA */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <GroupIcon className="text-green-700 size-6" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Alertes IA</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              12
            </h4>
          </div>
        </div>
      </div>

    </div>
  );
};