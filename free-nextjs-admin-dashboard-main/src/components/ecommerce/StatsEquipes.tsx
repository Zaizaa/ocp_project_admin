"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#22c55e", "#3b82f6", "#eab308"];

type EquipeStats = {
  equipeId: number;
  equipeNom: string;
  totalTickets: number;
  nbEnCours: number;
  nbResolus: number;
};

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

export const StatsEquipes = () => {
  const [data, setData] = useState<EquipeStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "http://localhost:8080/api/equipes/statistiques"
        );
        setData(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des statistiques.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Adapter les clés pour le graphique
  const chartData = data.map((equipe) => ({
    equipe: equipe.equipeNom,
    ticketsAssignes: equipe.totalTickets,
    ticketsEnCours: equipe.nbEnCours,
    ticketsResolus: equipe.nbResolus,
  }));

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6
      dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <h3 className="font-bold text-gray-800 dark:text-white mb-4">
        Statistiques des équipes
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
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
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
        )}
      </ResponsiveContainer>
    </div>
  );
};
