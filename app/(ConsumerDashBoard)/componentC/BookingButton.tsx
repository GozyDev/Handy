// Example BookingButton styling
"use client";
import { useRouter } from "next/navigation";

export default function BookingButton({providerID}:{providerID:string}) {
  const router = useRouter();
  function handleRoute(){
    router.push(`/pb/${providerID}`)
  }
  return (
    <button
      className=" w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      onClick={handleRoute}
    >
      Book Now
    </button>
  );
}
