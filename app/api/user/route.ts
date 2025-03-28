import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Correct
import jwt from "jsonwebtoken";

interface UserPayload extends jwt.JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server configuration error" }, 
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret) as UserPayload;

    return NextResponse.json({
      user: {
        id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      },
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}