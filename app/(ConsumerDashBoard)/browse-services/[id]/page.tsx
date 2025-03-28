import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BookingButton from "../../componentC/BookingButton";
import { StarIcon, CurrencyDollarIcon, MapPinIcon, CheckIcon, UserCircleIcon } from "@heroicons/react/24/solid";

interface ProviderProfilePageProps {
  params: { id: string };
}

export default async function ProviderProfilePage({
  params,
}: ProviderProfilePageProps) {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: params.id },
    include: { user: true },
  });

  if (!provider) notFound();

  return (
    <div className="min-h-screen py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 md:gap-6">
          {/* Left Column - Profile Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-black/5 shadow-lg border border-white/20 p-6 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-purple-100/50 flex items-center justify-center mb-6">
                  <UserCircleIcon className="w-20 h-20 text-purple-600/80" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                  {provider.user.name}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium text-gray-600">5.0 (24 reviews)</span>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl">
                    <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Hourly Rate</p>
                      <p className="text-xl font-bold text-purple-600">
                        ${provider.rate}
                        <span className="text-sm font-medium text-gray-400">/hr</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl">
                    <MapPinIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Service Areas</p>
                      <p className="text-base font-medium text-gray-700">
                        {provider.locations.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Bio Section */}
            <div className="bg-white rounded-2xl  border  shadow-black/5 shadow-md  border-white/20 p-4 py-8 md:p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {provider.bio || "No bio provided yet"}
              </p>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-2xl  border  shadow-black/5 shadow-md border-white/20 p-4 py-8 md:p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {provider.services.map((service: string) => (
                  <div 
                    key={service}
                    className="flex items-center p-4 bg-purple-50/30 rounded-xl hover:bg-purple-50/50 transition-colors"
                  >
                    <CheckIcon className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="font-medium text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking CTA */}
            <div className="sticky bottom-6 bg-white rounded-2xl   shadow-black/10 shadow-md border-white/20 p-6 backdrop-blur-sm">
              <BookingButton providerID={provider.userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}