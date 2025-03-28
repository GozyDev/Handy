"use client";

import { useEffect, useState } from "react";
import ProviderCard from "../componentC/provider";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProviderCardProps } from "@/lib/type";
import { useRouter } from "next/navigation";

// Design System Constants
const GRADIENTS = {
  primary: "bg-gradient-to-r from-purple-600 to-blue-600",
  text: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
};

export default function BookingPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [providers, setProviders] = useState<ProviderCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();


  // Search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim().length > 2 || searchQuery.trim() === "") {
        fetchProviders();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const fetchProviders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/providers?search=${searchQuery}`);
      if (!res.ok) throw new Error("Fetch failed");
      setProviders(await res.json());
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
    

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 py-8">
        {/* Search Header */}
        {/* {<section className="mb-12 text-center">
          <h1 className={`text-xl md:text-4xl font-bold ${GRADIENTS.text} mb-3`}>
            Find Service Providers
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Connect with certified professionals in your local area
          </p>
        </section> } */}

        {/* Search Input */}
        <section className="mb-12">
          <div className="max-w-xl mx-auto relative bg-purple-500 rounded-full p-[1px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
            </div>
            <input
              type="search"
              placeholder="Search professionals by name, service, or location..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section>
          {providers.length > 0 ? (
            <div className="grid grid-cols-1  gap-6">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="inline-block bg-purple-100 p-4 rounded-full mb-4">
                <MagnifyingGlassIcon className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No matches found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or check back later
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}