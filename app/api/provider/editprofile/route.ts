import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { link } from "fs";

interface UserPayload extends jwt.JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
  link: string;
}

export async function PUT(req: Request) {
  try {
    // 1. Get the JWT token from cookies
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get the JWT secret and verify the token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    const decoded = jwt.verify(token, secret) as UserPayload;
    const userId = decoded.userId;

    // 3. Parse the incoming JSON request body
    const { name, rate, location, bio, services , link} = await req.json();

    // 4. Update the user's name (in the User table) if provided
    let updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name: name.trim() },
        include: { providerProfile: true },
      });
  

    // 5. Update the provider profile in the ProviderProfile table
    //    Note: Our schema stores locations as an array, so convert the location string into an array if provided.
    const updatedProfile = await prisma.providerProfile.update({
      where: { userId: userId },
      data: {
        rate: rate !== undefined ? parseFloat(rate) : undefined,
        locations: location ? [location.trim()] : undefined,
        bio: bio ? bio.trim() : undefined,
        services: services ? services.map((s: string) => s.trim()) : undefined,
        link: link !== undefined ? link.trim() : undefined,
      },
    });

    const combined = {
      // If updatedUser exists, spread it; otherwise, fetch the current user to get providerProfile
      ...updatedUser, providerProfile: updatedProfile,
    };
    // 6. Return a success response
    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: combined,
        providerProfile: updatedProfile,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: error.message || "Error updating profile" },
      { status: 500 }
    );
  }
}
