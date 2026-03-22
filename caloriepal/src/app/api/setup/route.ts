import { prisma } from "@/lib/prisma";
import { calculateTDEE } from "@/lib/tdee";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { age, sex, heightCm, weightKg, activityLevel } = body;

  const { tdee, goalCalories } = calculateTDEE({
    age: Number(age),
    sex,
    heightCm: Number(heightCm),
    weightKg: Number(weightKg),
    activityLevel,
  });

  const profile = await prisma.userProfile.upsert({
    where: { id: 1 },
    update: { age: Number(age), sex, heightCm: Number(heightCm), weightKg: Number(weightKg), activityLevel, tdee, goalCalories },
    create: { id: 1, age: Number(age), sex, heightCm: Number(heightCm), weightKg: Number(weightKg), activityLevel, tdee, goalCalories },
  });

  return NextResponse.json(profile);
}
