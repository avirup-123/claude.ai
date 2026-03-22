"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface MealFormProps {
  onLogged: () => void;
  prefill?: { name: string; calories: number } | null;
}

export function MealForm({ onLogged, prefill }: MealFormProps) {
  const [name, setName] = useState(prefill?.name ?? "");
  const [calories, setCalories] = useState(prefill?.calories?.toString() ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !calories) return;
    setLoading(true);
    await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, calories: Number(calories) }),
    });
    setName("");
    setCalories("");
    setLoading(false);
    onLogged();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        label="Meal name"
        type="text"
        placeholder="e.g. Chicken rice bowl"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Calories"
        type="number"
        placeholder="e.g. 450"
        min={1}
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading || !name || !calories}>
        {loading ? "Logging…" : "Log Meal"}
      </Button>
    </form>
  );
}
