"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
} from "recharts";

const data = [
  { equipe: "Équipe A", ticketsAssignes: 50, ticketsEnCours: 10, ticketsResolus: 30 },
  { equipe: "Équipe B", ticketsAssignes: 30, ticketsEnCours: 5, ticketsResolus: 20 },
  { equipe: "Équipe C", ticketsAssignes: 40, ticketsEnCours: 8, ticketsResolus: 25 },
  { equipe: "Équipe D", ticketsAssignes: 20, ticketsEnCours: 12, ticketsResolus: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#eab308"];

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color, margin: 0 }}>
            {entry.name} : {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


export const StatsEquipes = () => (
  <div
    className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6
    dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <h3 className="font-bold text-gray-800 dark:text-white mb-4">
      Statistiques des équipes
    </h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis
          dataKey="equipe"
          stroke="#8884d8"
          tick={{ fill: "gray", fontWeight: "bold" }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="ticketsAssignes"
          fill={COLORS[0]}
          barSize={20}
          name="Tickets assignés"
        />
        <Bar
          dataKey="ticketsEnCours"
          fill={COLORS[1]}
          barSize={20}
          name="Tickets en cours"
        />
        <Bar
          dataKey="ticketsResolus"
          fill={COLORS[2]}
          barSize={20}
          name="Tickets résolus"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
