"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const COLORS = ["#22c55e", "#eab308", "#3b82f6", "#8b5cf6", "#f97316"];

type TicketTypeData = {
  type: string;
  percentage: number;
};

export const TicketsParTypes = () => {
  const [data, setData] = useState<TicketTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "http://localhost:8080/api/tickets/percentage-by-type"
        );
        setData(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6
      dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        Tickets par type
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
              data={data}
              dataKey="percentage"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name} (${(percent ? percent * 100 : 0).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
