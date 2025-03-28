import prisma from "@/lib/prisma";
import ProvidersBookingForm from "../../componentC/providersBooking/pBookingForm";
export default async function ProvidersBooking({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId: params.id,
    },
    include: { user: true },
  });

  if (!provider) {
    return <h1>Provider not found</h1>;
  }
  return (
    <>
     <ProvidersBookingForm provider={provider}/>
    </>
  );
}
