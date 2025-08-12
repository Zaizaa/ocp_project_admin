"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Technique", value: 45 },
  { name: "Maintenance", value: 25 },
  { name: "Electrique", value: 15 },
  { name: "Autre", value: 10 },
  { name: "Informatique", value: 5 },
];

const COLORS = ["#22c55e", "#eab308", "#3b82f6", "#8b5cf6", "#f97316"];

export const TicketsParTypes = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6
    dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
      Tickets par type
    </h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
