// app/api/providers/route.ts (Next.js 13+ using the App Router)
// or pages/api/providers.ts (for the pages-based approach)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // Parse query parameters from the URL
  const { searchParams } = new URL(request.url);
  const filters = searchParams.get("filters"); // e.g., "Plumbing,Electrician"
  const filtersArray = filters ? filters.split(",") : [];

  // Build the query using Prisma
  const providers = await prisma.providerProfile.findMany({
    where: {
      ...(filtersArray.length > 0 && {
        services: { hasSome: filtersArray },
      }),
    },
    include: { user: true },
  });

  return NextResponse.json({ providers });
}
