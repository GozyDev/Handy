"use client";

import { useEffect, useState,useMemo } from "react";
import ProviderCard from "../componentC/provider";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProviderCardProps } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";
import SideSort from "../componentC/sidesort";
import { SideSortMObile } from "../componentC/sidesortMobile"
import debounce from "lodash.debounce";


export default function BookingPage() {
  // State management
  const [searchQuerys, setSearchQuerys] = useState<string[]>([]);
  const [providers, setProviders] = useState<ProviderCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(providers);

  useEffect(() => {
    const filters = searchParams.get("filters");
    if (filters) {
      const filterArray = filters.split(",");
      setSearchQuerys(filterArray);
    }
  }, [searchParams]);

  // Search with debounce
  // useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     // if (searchQuery.trim().length > 2 || searchQuery.trim() === "") {
  //     //   fetchProviders();
  //     // }
  //   }, 300);

  //   return () => clearTimeout(debounceTimer);
  // }, [searchQuery]);

  // const fetchProviders = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(`/api/providers?search=${searchQuery}`);
  //     if (!res.ok) throw new Error("Fetch failed");
  //     setProviders(await res.json());
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Update URL when searchQuerys changes (after render)
  useEffect(() => {
    const filters = searchQuerys.join(",");
    router.push(
      `/browse-services?filters=${encodeURIComponent(filters)}`,
      undefined,
      { shallow: true }
    );
  }, [searchQuerys, router]);

  // Read query parameters from the URL

  useEffect(() => {
    setIsLoading(true);
    // Get the 'filters' parameter from the URL, or an empty string if not provided
    const filters = searchParams.get("filters") || "";

    async function fetchProviders() {
      try {
        const res = await fetch(
          `/api/providers?filters=${encodeURIComponent(filters)}`
        );
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setProviders(data.providers);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProviders();
  }, [searchParams]); // Re-run effect whenever the query parameters change

  const filterSearch = (service: string, checked: boolean) => {
    setSearchQuerys((prev) =>
      checked ? [...prev, service] : prev.filter((s) => s !== service)
    );
  };

  const debouncedFilterSearch = useMemo(
    () =>
      debounce((service, checked) => {
        filterSearch(service, checked);
      }, 300),
    [filterSearch]
  );

  // This function just updates state.
 

  return (
    <div className="py-[10px] lg:py-[50px] px-[10px] md:px-[50px]">
      {/* Main Content */}
      <main className="">
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
        {/* <section className="mb-12">
          <div className="max-w-3xl mx-auto relative bg-purple-500  rounded-full p-[1px]">
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
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center"></div>
            )}
          </div>
        </section> */}

        {/* Search Querys List */}

        <div className="sm:hidden mb-5">
          <button
            onClick={() => setSortToggle(true)}
            className="text-purple-700 shadow p-2 rounded border"
          >
            show Filter
          </button>
        </div>

        {/* Sorting Section */}

        <div className="flex gap-5">
          <SideSort searchQuerys={searchQuerys} debouncedFilterSearch={debouncedFilterSearch} />
          {/* Results Section */}
          <section className="w-full">
            {searchQuerys.length > 0 && (
              <div className="mb-5">
                <ul className="flex gap-4 flex-wrap">
                  {searchQuerys.map((list) => (
                    <div key={list}>
                      <div className="text-gray-800 h-fit flex px-3 py-1 rounded-full gap-3 bg-purple-300/30">
                        <li>{list}</li>
                        <button
                          onClick={() =>
                            setSearchQuerys((prev) =>
                              prev.filter((search) => search !== list)
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}

            {isLoading ? (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : providers.length > 0 ? (
              <div className="grid grid-cols-1  gap-6">
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
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
        </div>
        {sortToggle && (
          <SideSortMObile
            searchQuerys={searchQuerys}
            filterSearch={filterSearch}
            setToogle={() => setSortToggle(false)}
          />
        )}
      </main>
    </div>
  );
}
