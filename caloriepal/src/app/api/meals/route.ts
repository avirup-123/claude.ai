import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const meals = await prisma.mealEntry.findMany({
      where: { loggedAt: { gte: start, lte: end } },
      orderBy: { loggedAt: "asc" },
    });
    return NextResponse.json(meals);
  }

  // Return last 20 distinct meal names for quick re-use
  const recent = await prisma.mealEntry.findMany({
    orderBy: { loggedAt: "desc" },
    take: 100,
  });

  const seen = new Set<string>();
  const unique: typeof recent = [];
  for (const meal of recent) {
    if (!seen.has(meal.name)) {
      seen.add(meal.name);
      unique.push(meal);
      if (unique.length === 20) break;
    }
  }

  return NextResponse.json(unique);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, calories } = body;

  const meal = await prisma.mealEntry.create({
    data: { name: String(name), calories: Number(calories) },
  });

  return NextResponse.json(meal, { status: 201 });
}
