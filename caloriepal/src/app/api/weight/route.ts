import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const entries = await prisma.weightEntry.findMany({
    orderBy: { loggedAt: "asc" },
  });
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { weightKg, loggedAt } = body;

  const entry = await prisma.weightEntry.create({
    data: {
      weightKg: Number(weightKg),
      loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
    },
  });

  return NextResponse.json(entry, { status: 201 });
}
