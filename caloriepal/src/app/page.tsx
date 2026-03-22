import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { CalorieSummary } from "@/components/dashboard/CalorieSummary";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { WeightChart } from "@/components/dashboard/WeightChart";

async function getData() {
  const profile = await prisma.userProfile.findUnique({ where: { id: 1 } });
  if (!profile) return null;

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [todayMeals, weekMeals, weightEntries] = await Promise.all([
    prisma.mealEntry.findMany({ where: { loggedAt: { gte: startOfDay, lte: endOfDay } } }),
    prisma.mealEntry.findMany({ where: { loggedAt: { gte: sevenDaysAgo } }, orderBy: { loggedAt: "asc" } }),
    prisma.weightEntry.findMany({ orderBy: { loggedAt: "asc" } }),
  ]);

  return { profile, todayMeals, weekMeals, weightEntries };
}

export default async function DashboardPage() {
  const data = await getData();

  if (!data) redirect("/setup");

  const { profile, todayMeals, weekMeals, weightEntries } = data;
  const consumed = todayMeals.reduce((sum, m) => sum + m.calories, 0);

  // Serialize dates to strings for client components
  const serializedWeekMeals = weekMeals.map((m) => ({ ...m, loggedAt: m.loggedAt.toISOString() }));
  const serializedWeightEntries = weightEntries.map((e) => ({ ...e, loggedAt: e.loggedAt.toISOString() }));

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-xs text-gray-400 mb-4">
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Card>
          <CalorieSummary consumed={consumed} goal={profile.goalCalories} />
        </Card>

        <Card>
          <WeeklyChart meals={serializedWeekMeals} goalCalories={profile.goalCalories} />
        </Card>

        <Card>
          <WeightChart entries={serializedWeightEntries} />
        </Card>

        <Card className="flex justify-between text-sm">
          <div>
            <p className="text-xs text-gray-500">TDEE</p>
            <p className="font-semibold">{Math.round(profile.tdee)} cal</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Daily goal</p>
            <p className="font-semibold text-emerald-700">{Math.round(profile.goalCalories)} cal</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Meals today</p>
            <p className="font-semibold">{todayMeals.length}</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
