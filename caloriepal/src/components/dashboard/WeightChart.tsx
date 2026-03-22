"use client";

import { WeightEntry } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

interface WeightChartProps {
  entries: WeightEntry[];
}

export function WeightChart({ entries }: WeightChartProps) {
  const data = entries.slice(-30).map((e) => ({
    date: new Date(e.loggedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: e.weightKg,
  }));

  if (data.length === 0) {
    return (
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Weight trend</p>
        <p className="text-xs text-gray-400 text-center py-6">Log your weight to see the trend.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-3">Weight trend</p>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
          <Tooltip formatter={(v) => [`${v} kg`, "Weight"]} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#10b981"
            strokeWidth={2}
            dot={<Dot r={3} fill="#10b981" />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
