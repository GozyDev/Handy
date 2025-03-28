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

export async function POST(req: Request) {
  try {
    // Parse booking details from request body
    const { providerID, selectedServices, note, location, scheduleTime } = await req.json();
    
    // Get the JWT token from cookies
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
    
    // Get JWT secret from environment variables
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Your secret is undefined" }, { status: 500 });
    }
    
    // Verify and decode the token
    const decoded = jwt.verify(token, secret) as UserPayload;
    const userid = decoded.userId;
    
    // Fetch the user, including the consumerProfile
    const user = await prisma.user.findUnique({
      where: { id: userid },
      include: { consumerProfile: true },
    });
    
    if (!user || !user.consumerProfile) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }
    
    // Create a booking record.
    // Convert scheduleTime to a Date object if necessary.
    const booking = await prisma.booking.create({
      data: {
        selectedServices: selectedServices,
        bookingTime: new Date(scheduleTime), // Ensure this is a valid date
        location: location,
        note: note,
        consumerId: user.consumerProfile.id,
        providerId: providerID,
      },
    });
    
    // Return a success response including the booking details
    return NextResponse.json(
      { message: "Booking created successfully", booking },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Error creating booking", err: error.message }, { status: 500 });
  }
}
