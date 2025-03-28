import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextResponse} from "next/server";


export async function POST(req: Request) {
  try {
    const {
      role,
      name,
      email,
      password,
      services,
      rate,
      locations,
      bio,
      interestedServices,
      location,
    } = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "user with this email already exist " },
        { status: 400 }
      );
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const userDetail = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: bcryptPassword.trim(),
        role: role.trim(),
      },
    });

    if (role === "PROVIDER") {
      await prisma.providerProfile.create({
        data: {
          userId: userDetail.id.trim(),
          services: services.map((service: string) => service.trim()).filter((service:string) => service !== ""),
          rate: parseFloat(rate),
          locations: locations.map((location: string) => location.trim()).filter((location:string) => location !== ""),
          bio: bio.trim(),
        },
      });
    } else {
      await prisma.consumerProfile.create({
        data: {
          userId: userDetail.id.trim(),
          interestedServices: interestedServices.map((itService:string) => itService.trim()).filter((itservices:string) => itservices !== ""),
          location: location.trim(),
        },
      });
    }

    return NextResponse.json({
      message: "Success Full registered",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error || "An unexpected error occurred" });
  }
  
}
