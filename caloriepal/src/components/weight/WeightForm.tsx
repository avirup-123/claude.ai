"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface WeightFormProps {
  onLogged: () => void;
}

export function WeightForm({ onLogged }: WeightFormProps) {
  const [weightKg, setWeightKg] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!weightKg) return;
    setLoading(true);
    await fetch("/api/weight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weightKg: Number(weightKg), loggedAt: date }),
    });
    setWeightKg("");
    setLoading(false);
    onLogged();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        label="Weight (kg)"
        type="number"
        min={20}
        max={500}
        step="0.1"
        placeholder="e.g. 75.5"
        value={weightKg}
        onChange={(e) => setWeightKg(e.target.value)}
        required
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading || !weightKg}>
        {loading ? "Saving…" : "Log Weight"}
      </Button>
    </form>
  );
}
