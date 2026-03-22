"use client";

import { useCallback, useEffect, useState } from "react";
import { MealEntry } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { MealForm } from "@/components/log/MealForm";
import { RecentMeals } from "@/components/log/RecentMeals";
import { MealList } from "@/components/log/MealList";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function LogPage() {
  const [todayMeals, setTodayMeals] = useState<MealEntry[]>([]);
  const [recentMeals, setRecentMeals] = useState<MealEntry[]>([]);
  const [prefill, setPrefill] = useState<{ name: string; calories: number } | null>(null);

  const fetchMeals = useCallback(async () => {
    const [today, recent] = await Promise.all([
      fetch(`/api/meals?date=${todayStr()}`).then((r) => r.json()),
      fetch("/api/meals").then((r) => r.json()),
    ]);
    setTodayMeals(today);
    setRecentMeals(recent);
  }, []);

  useEffect(() => { fetchMeals(); }, [fetchMeals]);

  async function handleDelete(id: number) {
    await fetch(`/api/meals/${id}`, { method: "DELETE" });
    fetchMeals();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Log a Meal</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Card>
          <MealForm
            key={prefill ? `${prefill.name}-${prefill.calories}` : "empty"}
            onLogged={() => { setPrefill(null); fetchMeals(); }}
            prefill={prefill}
          />
        </Card>

        <RecentMeals meals={recentMeals} onSelect={setPrefill} />

        <Card>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Today&apos;s Meals</h2>
          <MealList meals={todayMeals} onDelete={handleDelete} />
        </Card>
      </div>
    </main>
  );
}
