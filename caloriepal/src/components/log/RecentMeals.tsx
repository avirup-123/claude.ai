"use client";

import { MealEntry } from "@/lib/types";

interface RecentMealsProps {
  meals: MealEntry[];
  onSelect: (meal: { name: string; calories: number }) => void;
}

export function RecentMeals({ meals, onSelect }: RecentMealsProps) {
  if (meals.length === 0) return null;

  return (
    <div>
      <p className="text-xs text-gray-500 mb-2 font-medium">Quick add (recent meals)</p>
      <div className="flex flex-wrap gap-2">
        {meals.map((meal) => (
          <button
            key={meal.id}
            onClick={() => onSelect({ name: meal.name, calories: meal.calories })}
            className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-full text-xs transition-colors"
          >
            {meal.name} · {meal.calories} cal
          </button>
        ))}
      </div>
    </div>
  );
}
