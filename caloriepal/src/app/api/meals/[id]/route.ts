import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/meals/[id]">
) {
  const { id } = await ctx.params;
  await prisma.mealEntry.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
