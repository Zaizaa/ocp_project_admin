"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

type GraviteData = {
  gravite: string;
  percentage: number;
};

export default function IncidentCharts() {
  const [pieData, setPieData] = useState<GraviteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:8080/api/tickets/percentage-by-gravite");
        setPieData(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pour l'affichage, on met la première lettre en majuscule
  const formatLabel = (label: string) =>
    label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <div className="rounded-xl border p-4 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Incidents par gravité
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Chargement...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        ) : (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              paddingAngle={3}
              dataKey="percentage"
              nameKey="gravite"
              label={({ percent }) =>
                percent !== undefined
                  ? `${(percent * 100).toFixed(0)}%`
                  : ""
              }
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>

      {/* Légende personnalisée */}
      <div className="flex justify-around mt-4 text-sm">
        {pieData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="text-gray-800 dark:text-white/90">
              {formatLabel(entry.gravite)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
