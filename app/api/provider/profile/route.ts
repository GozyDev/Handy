import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

interface UserPayload extends jwt.JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export async function GET() {
  // Retrieve the token from cookies and verify it
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Secret is undefined" }, { status: 500 });
  }

  let decoded: UserPayload;
  try {
    decoded = jwt.verify(token, secret) as UserPayload;
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  // Retrieve provider's profile to get the providerId
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: { providerProfile: true },
  });

  if (!user || !user.providerProfile) {
    return NextResponse.json({ error: "Invalid provider user" }, { status: 401 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
