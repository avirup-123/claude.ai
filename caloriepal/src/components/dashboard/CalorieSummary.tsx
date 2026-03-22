"use client";

interface CalorieSummaryProps {
  consumed: number;
  goal: number;
}

export function CalorieSummary({ consumed, goal }: CalorieSummaryProps) {
  const remaining = goal - consumed;
  const over = remaining < 0;
  const pct = Math.min((consumed / goal) * 100, 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-3xl font-bold text-gray-900">{consumed}</p>
          <p className="text-xs text-gray-500">calories consumed</p>
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold ${over ? "text-red-500" : "text-emerald-600"}`}>
            {over ? `${Math.abs(remaining)} over` : remaining}
          </p>
          <p className="text-xs text-gray-500">{over ? "over goal" : "remaining"}</p>
        </div>
      </div>

      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${over ? "bg-red-400" : "bg-emerald-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 text-center">Daily goal: {goal} cal</p>
    </div>
  );
}
