"use client";

import { MealEntry } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface MealListProps {
  meals: MealEntry[];
  onDelete: (id: number) => void;
}

export function MealList({ meals, onDelete }: MealListProps) {
  const total = meals.reduce((sum, m) => sum + m.calories, 0);

  if (meals.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-4">No meals logged today yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {meals.map((meal) => (
        <div key={meal.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-900">{meal.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(meal.loggedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">{meal.calories} cal</span>
            <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => onDelete(meal.id)}>
              ×
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between pt-2 font-semibold text-sm">
        <span>Total today</span>
        <span className="text-emerald-700">{total} cal</span>
      </div>
    </div>
  );
}
