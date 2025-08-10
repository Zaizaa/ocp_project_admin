"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart() {
  const data = [12, 8, 15, 6, 10, 9]; // adapte ces valeurs selon tes stats réelles
  // Trouver min et max
  const min = Math.min(...data);
  const max = Math.max(...data);

  // Définir les couleurs : min = vert foncé, max = rouge, autres = verts
  const colors = data.map((val) =>
    val === max
      ? "#228B22" // rouge pour le max
      : val === min
      ? "#ADFF2F" // vert foncé pour le min
      : "#98FB98" // vert clair pour les autres
  );

  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 220,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
        borderRadiusApplication: "end",
        distributed: true, // chaque barre sa couleur
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["#fff"] },
    xaxis: {
      categories: [
        "Site A",
        "Usine B",
        "Station C",
        "Dépôt D",
        "Site E",
        "Plateforme F",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#059669", fontWeight: 600 } },
    },
    legend: { show: false },
    yaxis: {
      title: {
        offsetX: -10,
        style: { color: "#059669", fontWeight: 600 },
      },
      labels: { style: { colors: "#059669" } },
    },
    grid: {
      yaxis: { lines: { show: true } }, // ✅ just show lines
      borderColor: "#bbf7d0",           // ✅ set color here
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: true },
      y: { formatter: (val: number) => `${val} incidents` },
      theme: "light",
    },
  };

  const series = [
    {
      name: "Incidents",
      data,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Incidents par installation industrielle
        </h3>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-green-700 rounded-lg hover:bg-green-100 hover:text-green-900 dark:text-green-300 dark:hover:bg-green-900/20 dark:hover:text-green-200"
            >
              Voir plus
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-green-700 rounded-lg hover:bg-green-100 hover:text-green-900 dark:text-green-300 dark:hover:bg-green-900/20 dark:hover:text-green-200"
            >
              Supprimer
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <div className="w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={220}
          />
        </div>
      </div>
    </div>
  );
}
