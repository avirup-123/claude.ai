"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calculateTDEE, ActivityLevel } from "@/lib/tdee";

const ACTIVITY_OPTIONS = [
  { value: "sedentary", label: "Sedentary (desk job, no exercise)" },
  { value: "lightly_active", label: "Lightly Active (1-3 days/week)" },
  { value: "moderately_active", label: "Moderately Active (3-5 days/week)" },
  { value: "very_active", label: "Very Active (6-7 days/week)" },
  { value: "extra_active", label: "Extra Active (physical job or 2×/day)" },
];

const SEX_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export function SetupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: "",
    sex: "",
    heightCm: "",
    weightKg: "",
    activityLevel: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const allFilled = Object.values(form).every((v) => v !== "");

  const preview = allFilled
    ? calculateTDEE({
        age: Number(form.age),
        sex: form.sex as "male" | "female",
        heightCm: Number(form.heightCm),
        weightKg: Number(form.weightKg),
        activityLevel: form.activityLevel as ActivityLevel,
      })
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full mx-auto">
      <Input label="Age" type="number" min={10} max={120} value={form.age} onChange={(e) => set("age", e.target.value)} required />
      <Select label="Sex" options={SEX_OPTIONS} value={form.sex} onChange={(e) => set("sex", e.target.value)} required />
      <Input label="Height (cm)" type="number" min={50} max={300} value={form.heightCm} onChange={(e) => set("heightCm", e.target.value)} required />
      <Input label="Current Weight (kg)" type="number" min={20} max={500} step="0.1" value={form.weightKg} onChange={(e) => set("weightKg", e.target.value)} required />
      <Select label="Activity Level" options={ACTIVITY_OPTIONS} value={form.activityLevel} onChange={(e) => set("activityLevel", e.target.value)} required />

      {preview && (
        <Card className="bg-emerald-50 border-emerald-200">
          <p className="text-sm text-emerald-700 font-medium">Your estimated targets</p>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-600">TDEE</span>
            <span className="font-semibold">{preview.tdee} cal/day</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Daily goal (−500)</span>
            <span className="font-semibold text-emerald-700">{preview.goalCalories} cal/day</span>
          </div>
        </Card>
      )}

      <Button type="submit" disabled={loading || !allFilled} className="mt-2">
        {loading ? "Saving…" : "Save & Go to Dashboard"}
      </Button>
    </form>
  );
}
