"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "Majeur", value: 8 },
  { name: "Mineur", value: 4 },
  { name: "Critique", value: 3 },
  { name: "Bloquant", value: 5 },
];

const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

export default function IncidentCharts() {
  return (
    <div className="rounded-xl border p-4 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Incidents par gravité
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            label={({ percent }) =>
              percent !== undefined
                ? `${(percent * 100).toFixed(0)}%`
                : ""
            }
            labelLine={false} // pas de ligne vers labels
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
      </ResponsiveContainer>

      {/* Légende personnalisée */}
      <div className="flex justify-around mt-4 text-sm">
        {pieData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <span className="text-gray-800 dark:text-white/90">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
