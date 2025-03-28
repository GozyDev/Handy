import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const providers = await prisma.$queryRaw`
  SELECT 
    p.*,                  -- All provider profile fields
    u.name,               -- User's name
    u.email               -- User's email
  FROM "ProviderProfile" AS p
  JOIN "User" AS u        -- Join with User table
  ON p."userId" = u."id"  -- Matching userId to get user data
  WHERE ARRAY_TO_STRING(p."services", ',') ILIKE ${'%' + search + '%'}
`;

    return NextResponse.json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}