"use client";

import { MealEntry } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeeklyChartProps {
  meals: MealEntry[];
  goalCalories: number;
}

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });
}

export function WeeklyChart({ meals, goalCalories }: WeeklyChartProps) {
  const days = getLast7Days();

  const data = days.map((day) => {
    const start = day.getTime();
    const end = start + 24 * 60 * 60 * 1000 - 1;
    const consumed = meals
      .filter((m) => {
        const t = new Date(m.loggedAt).getTime();
        return t >= start && t <= end;
      })
      .reduce((s, m) => s + m.calories, 0);

    return {
      day: day.toLocaleDateString("en-US", { weekday: "short" }),
      consumed,
    };
  });

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-3">Last 7 days</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v) => [`${v} cal`, "Consumed"]} />
          <ReferenceLine y={goalCalories} stroke="#10b981" strokeDasharray="4 2" label={{ value: "Goal", fontSize: 10, fill: "#10b981" }} />
          <Bar dataKey="consumed" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
