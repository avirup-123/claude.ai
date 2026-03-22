import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const profile = await prisma.userProfile.findUnique({ where: { id: 1 } });
  if (!profile) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json(profile);
}
