"use client";

import { useCallback, useEffect, useState } from "react";
import { WeightEntry } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { WeightForm } from "@/components/weight/WeightForm";
import { WeightList } from "@/components/weight/WeightList";

export default function WeightPage() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);

  const fetchEntries = useCallback(async () => {
    const data = await fetch("/api/weight").then((r) => r.json());
    setEntries(data);
  }, []);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Weight Log</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Card>
          <WeightForm onLogged={fetchEntries} />
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Entries</h2>
          <WeightList entries={entries} />
        </Card>
      </div>
    </main>
  );
}
