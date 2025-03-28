import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
import { use } from "react";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password should not be empty" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid Email" }, { status: 401 });
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, name:user.name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Set the token in an HTTP-only cookie (omitted cookie code for brevity)
    const response = NextResponse.json({
      message: "Successfully Logged In",
      role: user.role,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      {error: error.message },
      { status: 500 }
    );
  }
}
