// pages/api/booking/update.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { bookingId, newStatus } = await req.json();
    // Update the booking in the database
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });
    return NextResponse.json({ booking: updatedBooking }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
