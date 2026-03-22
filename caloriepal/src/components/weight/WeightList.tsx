"use client";

import { WeightEntry } from "@/lib/types";

interface WeightListProps {
  entries: WeightEntry[];
}

export function WeightList({ entries }: WeightListProps) {
  const recent = [...entries].slice(-10).reverse();

  if (recent.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-4">No weight entries yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-100">
            <th className="pb-2 font-medium">Date</th>
            <th className="pb-2 font-medium text-right">Weight</th>
            <th className="pb-2 font-medium text-right">Change</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((entry, i) => {
            const prev = recent[i + 1];
            const delta = prev ? entry.weightKg - prev.weightKg : null;
            return (
              <tr key={entry.id} className="border-b border-gray-50 last:border-0">
                <td className="py-2 text-gray-700">
                  {new Date(entry.loggedAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                </td>
                <td className="py-2 text-right font-semibold">{entry.weightKg} kg</td>
                <td className="py-2 text-right">
                  {delta !== null ? (
                    <span className={delta < 0 ? "text-emerald-600" : delta > 0 ? "text-red-500" : "text-gray-400"}>
                      {delta > 0 ? "+" : ""}{delta.toFixed(1)} kg
                    </span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
