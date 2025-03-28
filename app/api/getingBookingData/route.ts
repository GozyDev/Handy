import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { error } from "console";

interface UserPayload extends jwt.JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export async function GET (){
const token = (await cookies()).get("token")?.value
if(!token){
    return NextResponse.json({error:"Invalid Token"})
}

const secret = process.env.JWT_SECRET
if(!secret){
return NextResponse.json({error:'Invalid Secrete'})
}

const decode = jwt.verify(token,secret) as UserPayload

const userId = decode.userId

const getUser = await  prisma.user.findUnique({
    where:{id:userId},
    include:({consumerProfile:true})
})

if(!getUser || !getUser.consumerProfile){
    return NextResponse.json({error:"Invalid User"})
}

const BookingS = await prisma.booking.findMany({
    where: { consumerId: getUser.consumerProfile.id },
    include: {
      consumerProfile: {
        include: { user: true }, // Get consumer's user data (e.g., name)
      },
      providerProfile: {
        include: { user: true }, // Get provider's user data (e.g., name)
      },
    },
  });

if(!BookingS){
    return NextResponse.json({error:"Booking Problem"})
}

return NextResponse.json({message:BookingS})
}