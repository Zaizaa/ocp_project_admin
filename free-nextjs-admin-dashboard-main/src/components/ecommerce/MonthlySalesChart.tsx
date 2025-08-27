"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState, useEffect } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import axios from "axios";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart() {
  const [data, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "http://localhost:8080/api/tickets/count-by-installation"
        );
        // res.data est un tableau de tableaux : [[nom, count], ...]
        const names = res.data.map((item: [string, number]) => item[0]);
        const counts = res.data.map((item: [string, number]) => item[1]);
        setCategories(names);
        setData(counts);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Trouver min et max
  const min = data.length ? Math.min(...data) : 0;
  const max = data.length ? Math.max(...data) : 0;

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
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["#fff"] },
    xaxis: {
      categories,
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
      yaxis: { lines: { show: true } },
      borderColor: "#bbf7d0",
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
          {loading ? (
            <div className="text-center text-gray-400">Chargement...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={220}
            />
          )}
        </div>
      </div>
    </div>
  );
}